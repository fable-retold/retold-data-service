'use strict';

/**
 * Live smoke test for the DataCloner index-convergence endpoint.
 *
 * Spawns the REAL data-cloner service and drives the actual HTTP path a headless
 * clone uses:  configure connection → fetch schema → deploy → POST
 * /clone/schema/indices/converge → converge again (idempotency).  Asserts the
 * operational indexes the policy declares are the ones the endpoint creates,
 * that a table with neither Deleted nor GUID gets none, and that a second run is
 * a no-op.  Exercises the provider registry + RetoldDataServiceConnectionManager
 * + IndexPolicy + IndexConvergence together — the production service path.
 *
 * Uses retold's own committed BookStore test model (no external data).
 *
 * Usage:  node tools/smoke-converge-endpoint.js [SQLite|MSSQL] [port]
 *   SQLite (default): zero infra.
 *   MSSQL: runtime-configures the local meadow-connection-mssql-test container
 *          (localhost:21433 / sa / db clonesmoke) and adds an independent
 *          sqlcmd cross-check + a managed-prune-through-the-endpoint check.
 */

const libChildProcess = require('child_process');
const libHttp = require('http');
const libPath = require('path');
const libOs = require('os');
const libFs = require('fs');

const libIndexPolicy = require('meadow-integration/source/services/clone/Meadow-Service-IndexPolicy.js');

const PROVIDER = process.argv[2] || 'SQLite';
const PORT = parseInt(process.argv[3], 10) || 9500;
const BASE = `http://localhost:${PORT}`;
const DEPLOY_TABLES = [ 'Book', 'Author', 'BookAuthorJoin' ]; // Book/Author: Deleted+GUID; join: neither
const MODEL = require('../test/model/MeadowModel-Extended.json');

const MSSQL_CONFIG = { server: 'localhost', port: 21433, user: 'sa', password: 'Retold1234567890!', database: 'clonesmoke', ConnectionPoolLimit: 5 };
const MSSQL_CONTAINER = 'meadow-connection-mssql-test';
const SQLCMD = '/opt/mssql-tools18/bin/sqlcmd';

let _pass = 0, _fail = 0;
function check(pCondition, pMessage)
{
	if (pCondition) { _pass++; console.log(`[ok]   ${pMessage}`); }
	else { _fail++; console.log(`[fail] ${pMessage}`); }
}

// -- tiny HTTP JSON client (promise) --
function httpJSON(pMethod, pPath, pBody)
{
	return new Promise((fResolve, fReject) =>
	{
		let tmpData = pBody ? JSON.stringify(pBody) : null;
		let tmpReq = libHttp.request(`${BASE}${pPath}`,
			{ method: pMethod, headers: { 'Content-Type': 'application/json', 'Content-Length': tmpData ? Buffer.byteLength(tmpData) : 0 } },
			(pRes) =>
			{
				let tmpChunks = '';
				pRes.on('data', (pChunk) => { tmpChunks += pChunk; });
				pRes.on('end', () =>
				{
					let tmpParsed;
					try { tmpParsed = tmpChunks ? JSON.parse(tmpChunks) : {}; }
					catch (e) { tmpParsed = { _raw: tmpChunks }; }
					fResolve({ status: pRes.statusCode, body: tmpParsed });
				});
			});
		tmpReq.on('error', fReject);
		if (tmpData) { tmpReq.write(tmpData); }
		tmpReq.end();
	});
}

function sleep(pMs) { return new Promise((r) => setTimeout(r, pMs)); }

async function waitForHealth(pTimeoutMs)
{
	let tmpDeadline = Date.now() + pTimeoutMs;
	while (Date.now() < tmpDeadline)
	{
		try { let r = await httpJSON('GET', '/clone/sync/status', null); if (r.status === 200) { return true; } }
		catch (e) { /* not up yet */ }
		await sleep(250);
	}
	return false;
}

function sqlcmd(pSQL)
{
	let tmpOut = libChildProcess.execFileSync('docker',
		[ 'exec', MSSQL_CONTAINER, SQLCMD, '-S', 'localhost', '-U', 'sa', '-P', MSSQL_CONFIG.password, '-C', '-d', MSSQL_CONFIG.database, '-h', '-1', '-Q', pSQL ],
		{ encoding: 'utf8' });
	return tmpOut;
}

// Expected operational index names for a table, straight from the policy.
function expectedIndexNames(pTableName)
{
	return libIndexPolicy.resolveDesiredIndexes(MODEL.Tables[pTableName], {}).map((pIndex) => pIndex.Name);
}

async function main()
{
	let tmpTempDir = libPath.join(libOs.tmpdir(), `rds-converge-smoke-${PORT}`);
	libFs.rmSync(tmpTempDir, { recursive: true, force: true }); // fresh SQLite file per run
	libFs.mkdirSync(tmpTempDir, { recursive: true });

	console.log(`Spawning data-cloner on :${PORT} (provider target: ${PROVIDER})...\n`);
	let tmpChild = libChildProcess.spawn('node',
		[ libPath.resolve(__dirname, '..', 'bin', 'retold-data-service-clone.js'), '--port', String(PORT) ],
		{ cwd: tmpTempDir, env: process.env, stdio: [ 'ignore', 'ignore', 'pipe' ] });
	let tmpStderr = '';
	tmpChild.stderr.on('data', (d) => { tmpStderr += d.toString(); });

	try
	{
		let tmpHealthy = await waitForHealth(20000);
		check(tmpHealthy, 'service came up healthy (GET /clone/sync/status)');
		if (!tmpHealthy) { if (tmpStderr) { console.log('--- stderr ---\n' + tmpStderr.slice(-1200)); } return; }

		// -- (MSSQL only) fresh DB + runtime-configure the connection --
		if (PROVIDER === 'MSSQL')
		{
			libChildProcess.execFileSync('docker', [ 'exec', MSSQL_CONTAINER, SQLCMD, '-S', 'localhost', '-U', 'sa', '-P', MSSQL_CONFIG.password, '-C', '-Q',
				"IF DB_ID('clonesmoke') IS NOT NULL BEGIN ALTER DATABASE clonesmoke SET SINGLE_USER WITH ROLLBACK IMMEDIATE; DROP DATABASE clonesmoke; END; CREATE DATABASE clonesmoke;" ], { encoding: 'utf8' });
			let tmpCfg = await httpJSON('POST', '/clone/connection/configure', { Provider: 'MSSQL', Config: MSSQL_CONFIG });
			check(tmpCfg.status === 200 && tmpCfg.body.Success, 'configured MSSQL connection');
			let tmpStatus = await httpJSON('GET', '/clone/connection/status', null);
			check(tmpStatus.body.Provider === 'MSSQL', `active provider is MSSQL (got ${tmpStatus.body.Provider})`);
		}

		// -- fetch (raw schema object) → deploy --
		let tmpFetch = await httpJSON('POST', '/clone/schema/fetch', { Schema: MODEL });
		check(tmpFetch.status === 200 && tmpFetch.body.Success, `fetched schema (${tmpFetch.body.TableCount} tables)`);

		let tmpDeploy = await httpJSON('POST', '/clone/schema/deploy', { Tables: DEPLOY_TABLES });
		check(tmpDeploy.status === 200 && tmpDeploy.body.Success, 'deployed tables');
		check(DEPLOY_TABLES.every((t) => (tmpDeploy.body.TablesDeployed || []).indexOf(t) > -1), `all ${DEPLOY_TABLES.length} tables deployed [${(tmpDeploy.body.TablesDeployed || []).join(', ')}]`);

		// -- converge #1 --
		let tmpConv1 = await httpJSON('POST', '/clone/schema/indices/converge', { Tables: DEPLOY_TABLES, IndexPolicy: { PruneScope: 'managed' } });
		check(tmpConv1.status === 200 && tmpConv1.body.Success, 'converge #1 succeeded');

		let tmpAllCreated = (tmpConv1.body.Results || []).reduce((pAcc, pR) => pAcc.concat(pR.created || []), []);
		let tmpExpected = DEPLOY_TABLES.reduce((pAcc, t) => pAcc.concat(expectedIndexNames(t)), []);
		console.log(`      created: [${tmpAllCreated.join(', ')}]`);
		check(tmpExpected.every((n) => tmpAllCreated.indexOf(n) > -1), `all policy-declared indexes created [${tmpExpected.join(', ')}]`);
		check(tmpAllCreated.length === tmpExpected.length && tmpAllCreated.slice().sort().join(',') === tmpExpected.slice().sort().join(','),
			`created set exactly matches the policy (${tmpAllCreated.length} indexes, no extras)`);
		// Deleted-gated composite: BookAuthorJoin has a GUID column but no Deleted →
		// it should get the GUID lookup index but NO (Deleted, ID) composite.
		check(tmpAllCreated.indexOf('IX_M_SYNC_BookAuthorJoin_GUIDBookAuthorJoin') > -1, 'GUID-only join table got its GUID index');
		check(!tmpAllCreated.some((n) => n.indexOf('IX_M_SYNC_BookAuthorJoin_Deleted_') === 0), 'GUID-only join table got NO composite (composite correctly gated on Deleted)');

		// -- converge #2 (idempotency) --
		let tmpConv2 = await httpJSON('POST', '/clone/schema/indices/converge', { Tables: DEPLOY_TABLES, IndexPolicy: { PruneScope: 'managed' } });
		let tmpCreated2 = (tmpConv2.body.Results || []).reduce((pAcc, pR) => pAcc + (pR.created || []).length, 0);
		let tmpDropped2 = (tmpConv2.body.Results || []).reduce((pAcc, pR) => pAcc + (pR.dropped || []).length, 0);
		check(tmpConv2.body.Success && tmpCreated2 === 0 && tmpDropped2 === 0, `idempotent — converge #2 created ${tmpCreated2}, dropped ${tmpDropped2}`);

		// -- MSSQL: independent sqlcmd cross-check + managed-prune-through-the-endpoint --
		if (PROVIDER === 'MSSQL')
		{
			let tmpIdxRows = sqlcmd("SET NOCOUNT ON; SELECT i.name + '|' + CAST(i.is_unique AS VARCHAR) FROM sys.indexes i JOIN sys.tables t ON t.object_id=i.object_id WHERE t.name='Book' AND i.type>0 AND i.is_primary_key=0;");
			let tmpNames = tmpIdxRows.split('\n').map((s) => s.trim()).filter(Boolean);
			check(tmpNames.some((r) => r.startsWith('IX_M_SYNC_Book_Deleted_') && r.endsWith('|0')), `sqlcmd: Book composite present + NON-unique (${tmpNames.join(' ')})`);
			check(tmpNames.some((r) => r === 'IX_M_SYNC_Book_GUIDBook|0'), 'sqlcmd: Book GUID index present + NON-unique');

			// Seed a precursor [Deleted] single-column index out-of-band, then converge
			// again — managed prune should drop it (it names a column) via the endpoint.
			sqlcmd("IF NOT EXISTS(SELECT * FROM sys.indexes WHERE name='Deleted' AND object_id=OBJECT_ID('dbo.Book')) CREATE INDEX [Deleted] ON [dbo].[Book]([Deleted]);");
			let tmpConv3 = await httpJSON('POST', '/clone/schema/indices/converge', { Tables: [ 'Book' ], IndexPolicy: { PruneScope: 'managed' } });
			let tmpDropped3 = (tmpConv3.body.Results || []).reduce((pAcc, pR) => pAcc.concat(pR.dropped || []), []);
			check(tmpConv3.body.Success && tmpDropped3.indexOf('Deleted') > -1, `managed prune via endpoint dropped precursor [Deleted] (dropped: [${tmpDropped3.join(', ')}])`);
			let tmpAfter = sqlcmd("SET NOCOUNT ON; SELECT name FROM sys.indexes WHERE object_id=OBJECT_ID('dbo.Book') AND type>0 AND is_primary_key=0;").split('\n').map((s) => s.trim()).filter(Boolean);
			check(tmpAfter.indexOf('Deleted') === -1 && tmpAfter.some((n) => n.indexOf('IX_M_SYNC_Book') === 0), `sqlcmd: precursor gone, operational indexes remain [${tmpAfter.join(', ')}]`);
		}
	}
	finally
	{
		tmpChild.kill('SIGTERM');
		await sleep(300);
		try { tmpChild.kill('SIGKILL'); } catch (e) {}
	}

	console.log(`\n──────── ${_pass} ok, ${_fail} fail (${PROVIDER}) ────────`);
	process.exit(_fail > 0 ? 1 : 0);
}

main().catch((pErr) => { console.error('harness error:', pErr); process.exit(2); });
