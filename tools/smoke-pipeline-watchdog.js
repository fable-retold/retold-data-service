/**
 * Smoke test: the pipeline watchdog against a REAL fable logger and REAL timers.
 *
 * The unit suite drives the watchdog through its seams, which necessarily fakes
 * the one integration that carries risk: whether fable-log's addLogger(…,
 * 'trace') really feeds a heartbeat from every level. Its switch cases fall
 * through on purpose, and if that ever changed the watchdog would go blind to
 * some levels and start killing healthy runs. This asserts it against the
 * shipped logger.
 *
 * Only process.exit is stubbed -- the logger, the marks, and the clock are real.
 * poll() is driven directly so the run takes seconds rather than the production
 * 15s cadence.
 *
 *   node tools/smoke-pipeline-watchdog.js
 */

const libFable = require('fable');
const libPipelineWatchdog = require('../source/services/data-cloner/DataCloner-PipelineWatchdog.js');

const LEVELS = [ 'trace', 'debug', 'info', 'warn', 'error', 'fatal' ];
const THRESHOLD_MS = 150;

let _Passed = 0;
let _Failed = 0;

const fCheck = (pDescription, pCondition) =>
{
	if (pCondition)
	{
		_Passed++;
		console.log(`  [ok]   ${pDescription}`);
	}
	else
	{
		_Failed++;
		console.log(`  [fail] ${pDescription}`);
	}
};

// A quiet real fable -- fatal only, so the harness output stays readable while
// the logger underneath is the genuine article.
const fMakeFable = () => new libFable({ Product: 'WatchdogSmoke', LogStreams: [ { streamtype: 'console', level: 'fatal' } ] });

// Log at pLevel faster than the threshold, then poll: a watchdog that can see
// this level must not trip.
const fProbeLevel = (pLevel, fNext) =>
{
	let tmpFable = fMakeFable();
	let tmpExited = false;
	let tmpWatchdog = libPipelineWatchdog(tmpFable, THRESHOLD_MS, { exitFunction: () => { tmpExited = true; } });
	tmpWatchdog.arm();

	let tmpChatter = setInterval(() => { tmpFable.log[pLevel](`watchdog smoke: alive at ${pLevel}`); }, 25);
	setTimeout(() =>
		{
			clearInterval(tmpChatter);
			tmpWatchdog.poll();
			tmpWatchdog.disarm();
			return fNext(tmpExited);
		}, THRESHOLD_MS * 4);
};

const fTestEveryLevelFeedsTheHeartbeat = (fNext) =>
{
	let tmpBlind = [];
	let fRunLevel = (pIndex) =>
	{
		if (pIndex >= LEVELS.length)
		{
			fCheck(`chatter at every log level holds the watchdog off (blind to: ${tmpBlind.join(', ') || 'none'})`, tmpBlind.length === 0);
			return fNext();
		}
		return fProbeLevel(LEVELS[pIndex], (pExited) =>
			{
				if (pExited)
				{
					tmpBlind.push(LEVELS[pIndex]);
				}
				return fRunLevel(pIndex + 1);
			});
	};
	return fRunLevel(0);
};

const fTestSilenceTrips = (fNext) =>
{
	let tmpFable = fMakeFable();
	let tmpExitCode = null;
	let tmpWatchdog = libPipelineWatchdog(tmpFable, THRESHOLD_MS, { exitFunction: (pCode) => { tmpExitCode = pCode; } });
	tmpWatchdog.arm();
	setTimeout(() =>
		{
			let tmpTripped = tmpWatchdog.poll();
			fCheck('real silence past the threshold trips and exits non-zero', tmpTripped === true && tmpExitCode === 1);
			tmpWatchdog.disarm();
			return fNext();
		}, THRESHOLD_MS * 4);
};

const fTestDisarmedStaysQuiet = (fNext) =>
{
	// The production shape: the bin idles 900s after a successful run.
	let tmpFable = fMakeFable();
	let tmpExitCode = null;
	let tmpWatchdog = libPipelineWatchdog(tmpFable, THRESHOLD_MS, { exitFunction: (pCode) => { tmpExitCode = pCode; } });
	tmpWatchdog.arm();
	tmpWatchdog.disarm();
	setTimeout(() =>
		{
			tmpWatchdog.poll();
			fCheck('a disarmed watchdog never fires through a long idle', tmpExitCode === null);
			return fNext();
		}, THRESHOLD_MS * 4);
};

const fTestDisabledArmsNothing = (fNext) =>
{
	let tmpFable = fMakeFable();
	let tmpExitCode = null;
	let tmpWatchdog = libPipelineWatchdog(tmpFable, 0, { exitFunction: (pCode) => { tmpExitCode = pCode; } });
	tmpWatchdog.arm();
	setTimeout(() =>
		{
			tmpWatchdog.poll();
			fCheck('a zero threshold arms nothing and never trips', tmpWatchdog.timeoutMs === 0 && tmpExitCode === null);
			return fNext();
		}, THRESHOLD_MS * 4);
};

console.log(`\nPipeline watchdog — real fable ${require('fable/package.json').version} logger, real timers, ${THRESHOLD_MS}ms threshold\n`);

fTestEveryLevelFeedsTheHeartbeat(() =>
{
	fTestSilenceTrips(() =>
	{
		fTestDisarmedStaysQuiet(() =>
		{
			fTestDisabledArmsNothing(() =>
			{
				console.log(`\n  ${_Passed} ok, ${_Failed} failed\n`);
				return process.exit(_Failed > 0 ? 1 : 0);
			});
		});
	});
});
