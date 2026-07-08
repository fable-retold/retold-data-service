/**
 * DataCloner Sync Routes
 *
 * Registers /clone/sync/* endpoints for starting, monitoring, and stopping
 * data synchronization via meadow-integration.
 *
 * @param {Object} pDataClonerService - The RetoldDataServiceDataCloner instance
 * @param {Object} pOratorServiceServer - The Orator ServiceServer instance
 */
const libFableLog = require('fable-log');
const libPath = require('path');

// Runtime-overridable sync properties for the /clone/sync/start route.
// Each entry is a coerce function returning the value to apply, or null
// if the input is invalid. Drives both the top-level body overrides and
// the per-entity `SyncEntityOptions` overrides — adding a new knob is a
// one-line change here.
const _RuntimeSyncProperties = {
	BackSyncTimeLimit:       (pVal) => { let tmpN = parseInt(pVal, 10); return (!isNaN(tmpN) && tmpN > 0) ? tmpN : null; },
	MaxRecordsPerEntity:     (pVal) => { let tmpN = parseInt(pVal, 10); return (!isNaN(tmpN) && tmpN > 0) ? tmpN : null; },
	DateTimePrecisionMS:     (pVal) => { let tmpN = parseInt(pVal, 10); return !isNaN(tmpN)               ? tmpN : null; },
	TrueUpPageSize:          (pVal) => { let tmpN = parseInt(pVal, 10); return (!isNaN(tmpN) && tmpN > 0) ? tmpN : null; },
	SyncRecordConcurrency:   (pVal) => { let tmpN = parseInt(pVal, 10); return (!isNaN(tmpN) && tmpN > 0) ? tmpN : null; },
	UseAdvancedIDPagination: (pVal) => !!pVal,
	SyncDeletedRecords:      (pVal) => !!pVal
};

/**
 * Apply runtime sync overrides from a request body to a live MeadowSync.
 *
 * Mutates `pMeadowSync.MeadowSyncEntities[*]` properties, plus mirrors the
 * "base" globals onto the MeadowSync orchestrator and `cloneState.SyncDeletedRecords`.
 * Top-level body keys form the base config; per-entity overrides under
 * `pBody.SyncEntityOptions[<TableName>]` are layered on top (per-entity wins).
 *
 * Only properties listed in `_RuntimeSyncProperties` are honored; unknown keys
 * and invalid values are silently ignored. Unknown entity names produce a warn.
 *
 * @param {Object} pBody - Request body (or any plain object with the same shape).
 * @param {Object} pMeadowSync - MeadowSync orchestrator instance with `MeadowSyncEntities`.
 * @param {Object} pCloneState - Clone-state object whose `SyncDeletedRecords` mirrors the base.
 * @param {Object} pLog - Logger with `info(msg)` and `warn(msg)`.
 */
const applyRuntimeSyncOverrides = (pBody, pMeadowSync, pCloneState, pLog) =>
{
	// Compute the base runtime config from top-level body keys.
	let tmpBase = {};
	let tmpBaseSchemaKeys = Object.keys(_RuntimeSyncProperties);
	for (let i = 0; i < tmpBaseSchemaKeys.length; i++)
	{
		let tmpKey = tmpBaseSchemaKeys[i];
		if (!pBody.hasOwnProperty(tmpKey)) continue;
		let tmpCoerced = _RuntimeSyncProperties[tmpKey](pBody[tmpKey]);
		if (tmpCoerced === null) continue;
		tmpBase[tmpKey] = tmpCoerced;
	}

	let tmpPerEntity = (pBody.SyncEntityOptions && typeof(pBody.SyncEntityOptions) === 'object') ? pBody.SyncEntityOptions : {};

	// Mirror base values onto the MeadowSync orchestrator + cloneState.
	let tmpBaseKeys = Object.keys(tmpBase);
	for (let i = 0; i < tmpBaseKeys.length; i++)
	{
		if (pMeadowSync.hasOwnProperty(tmpBaseKeys[i]))
		{
			pMeadowSync[tmpBaseKeys[i]] = tmpBase[tmpBaseKeys[i]];
		}
	}
	if (tmpBase.hasOwnProperty('SyncDeletedRecords'))
	{
		pCloneState.SyncDeletedRecords = tmpBase.SyncDeletedRecords;
	}

	// Apply base to every entity.
	let tmpAllEntityNames = Object.keys(pMeadowSync.MeadowSyncEntities || {});
	for (let i = 0; i < tmpAllEntityNames.length; i++)
	{
		let tmpEntity = pMeadowSync.MeadowSyncEntities[tmpAllEntityNames[i]];
		for (let j = 0; j < tmpBaseKeys.length; j++)
		{
			tmpEntity[tmpBaseKeys[j]] = tmpBase[tmpBaseKeys[j]];
		}
	}

	// Layer per-entity overrides on top. Log per entity that actually had
	// overrides applied; warn on unknown entity names.
	let tmpPerEntityNames = Object.keys(tmpPerEntity);
	for (let i = 0; i < tmpPerEntityNames.length; i++)
	{
		let tmpEntityName = tmpPerEntityNames[i];
		let tmpEntity = pMeadowSync.MeadowSyncEntities && pMeadowSync.MeadowSyncEntities[tmpEntityName];
		if (!tmpEntity)
		{
			pLog.warn(`SyncEntityOptions: no sync entity ${tmpEntityName} loaded; ignoring overrides for it.`);
			continue;
		}
		let tmpOverrides = tmpPerEntity[tmpEntityName];
		if (!tmpOverrides || typeof(tmpOverrides) !== 'object') continue;
		let tmpApplied = [];
		let tmpOverrideKeys = Object.keys(tmpOverrides);
		for (let j = 0; j < tmpOverrideKeys.length; j++)
		{
			let tmpKey = tmpOverrideKeys[j];
			if (!_RuntimeSyncProperties.hasOwnProperty(tmpKey)) continue;
			let tmpCoerced = _RuntimeSyncProperties[tmpKey](tmpOverrides[tmpKey]);
			if (tmpCoerced === null) continue;
			tmpEntity[tmpKey] = tmpCoerced;
			tmpApplied.push(`${tmpKey}=${tmpCoerced}`);
		}
		if (tmpApplied.length > 0)
		{
			pLog.info(`SyncEntityOptions: ${tmpEntityName} ← ${tmpApplied.join(', ')}`);
		}
	}
};

module.exports = (pDataClonerService, pOratorServiceServer) =>
{
	let tmpFable = pDataClonerService.fable;
	let tmpCloneState = pDataClonerService.cloneState;
	let tmpPrefix = pDataClonerService.routePrefix;

	// POST /clone/sync/start
	pOratorServiceServer.post(`${tmpPrefix}/sync/start`,
		(pRequest, pResponse, fNext) =>
		{
			if (tmpCloneState.SyncRunning)
			{
				pResponse.send(400, { Success: false, Error: 'Sync is already running.' });
				return fNext();
			}

			if (!tmpCloneState.RemoteServerURL)
			{
				pResponse.send(400, { Success: false, Error: 'No remote server configured.' });
				return fNext();
			}

			if (!tmpFable.MeadowSync || !tmpFable.MeadowSync.MeadowSyncEntities)
			{
				pResponse.send(400, { Success: false, Error: 'No sync entities available. Deploy a schema first.' });
				return fNext();
			}

			let tmpBody = pRequest.body || {};
			let tmpSelectedTables = tmpBody.Tables || [];
			let tmpRequestedMode = tmpBody.SyncMode || 'Initial';
			let tmpMaxRecords = parseInt(tmpBody.MaxRecordsPerEntity, 10) || 0;

			// Apply global + per-entity runtime sync overrides. See
			// applyRuntimeSyncOverrides() at module scope.
			applyRuntimeSyncOverrides(tmpBody, tmpFable.MeadowSync, tmpCloneState, tmpFable.log);

			// If no tables specified, sync all entities
			if (tmpSelectedTables.length === 0)
			{
				tmpSelectedTables = tmpFable.MeadowSync.SyncEntityList || Object.keys(tmpFable.MeadowSync.MeadowSyncEntities);
			}

			if (tmpSelectedTables.length === 0)
			{
				pResponse.send(400, { Success: false, Error: 'No tables available for sync. Deploy a schema first.' });
				return fNext();
			}

			// ---- Enable log-to-file if requested ----
			if (tmpBody.LogToFile)
			{
				// Remove any previous sync log stream
				if (tmpCloneState.SyncLogFileLogger)
				{
					try { tmpCloneState.SyncLogFileLogger.closeWriter(() => {}); }
					catch (pErr) { /* ignore */ }
					tmpCloneState.SyncLogFileLogger = null;
				}

				let tmpTimestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
				let tmpLogPath = libPath.join(process.cwd(), `DataCloner-Run-${tmpTimestamp}.log`);
				let tmpFileLogger = new libFableLog.LogProviderFlatfile(
					{
						path: tmpLogPath,
						showtimestamps: true,
						formattedtimestamps: true,
						outputloglinestoconsole: false
					}, tmpFable.log);
				tmpFileLogger.initialize();
				tmpFable.log.addLogger(tmpFileLogger, 'trace');
				tmpCloneState.SyncLogFileLogger = tmpFileLogger;
				tmpCloneState.SyncLogFilePath = tmpLogPath;
				tmpFable.log.info(`Data Cloner: Log file enabled — writing to ${tmpLogPath}`);
			}

			// ---- Handle Sync Mode switching ----
			let fStartSync = () =>
			{
				tmpFable.log.info(`Data Cloner: Starting ${tmpCloneState.SyncMode} sync for ${tmpSelectedTables.length} tables via meadow-integration (SyncDeletedRecords: ${tmpCloneState.SyncDeletedRecords})`);

				// Initialize progress tracking
				tmpCloneState.SyncRunning = true;
				tmpCloneState.SyncStopping = false;
				tmpCloneState.SyncProgress = {};
				tmpCloneState.SyncRESTErrors = {};

				for (let i = 0; i < tmpSelectedTables.length; i++)
				{
					tmpCloneState.SyncProgress[tmpSelectedTables[i]] = (
						{
							Status: 'Pending',
							Total: 0,
							Synced: 0,
							Errors: 0,
							StartTime: null,
							EndTime: null
						});
					tmpCloneState.SyncRESTErrors[tmpSelectedTables[i]] = 0;
				}

				// Start the sync process asynchronously
				pDataClonerService.syncTables(tmpSelectedTables);

				pResponse.send(200,
					{
						Success: true,
						Tables: tmpSelectedTables,
						SyncMode: tmpCloneState.SyncMode,
						SyncDeletedRecords: tmpCloneState.SyncDeletedRecords,
						Message: `${tmpCloneState.SyncMode} sync started via meadow-integration.`
					});
				return fNext();
			};

			if (tmpRequestedMode !== tmpCloneState.SyncMode && tmpCloneState.DeployedModelObject)
			{
				tmpFable.log.info(`Data Cloner: Switching sync mode from ${tmpCloneState.SyncMode} to ${tmpRequestedMode} — re-creating sync entities...`);
				tmpCloneState.SyncMode = tmpRequestedMode;
				tmpFable.MeadowSync.SyncMode = tmpRequestedMode;

				tmpFable.MeadowSync.loadMeadowSchema(tmpCloneState.DeployedModelObject,
					(pReinitError) =>
					{
						if (pReinitError)
						{
							tmpFable.log.warn(`Data Cloner: Mode switch schema re-init warning: ${pReinitError}`);
						}
						let tmpReinitEntities = Object.keys(tmpFable.MeadowSync.MeadowSyncEntities);
						tmpFable.log.info(`Data Cloner: Re-created ${tmpReinitEntities.length} sync entities in ${tmpRequestedMode} mode`);

						// Update SyncDeletedRecords, MaxRecordsPerEntity, and UseAdvancedIDPagination on new entities
						for (let i = 0; i < tmpReinitEntities.length; i++)
						{
							tmpFable.MeadowSync.MeadowSyncEntities[tmpReinitEntities[i]].SyncDeletedRecords = tmpCloneState.SyncDeletedRecords;
							if (tmpMaxRecords > 0)
							{
								tmpFable.MeadowSync.MeadowSyncEntities[tmpReinitEntities[i]].MaxRecordsPerEntity = tmpMaxRecords;
							}
							if (tmpBody.hasOwnProperty('UseAdvancedIDPagination'))
							{
								tmpFable.MeadowSync.MeadowSyncEntities[tmpReinitEntities[i]].UseAdvancedIDPagination = !!tmpBody.UseAdvancedIDPagination;
							}
						}

						return fStartSync();
					});
			}
			else
			{
				tmpCloneState.SyncMode = tmpRequestedMode;
				return fStartSync();
			}
		});

	// GET /clone/sync/status
	pOratorServiceServer.get(`${tmpPrefix}/sync/status`,
		(pRequest, pResponse, fNext) =>
		{
			// Build a read-only snapshot of progress (never mutate SyncProgress during a poll)
			let tmpTablesSnapshot = {};
			let tmpTableNames = Object.keys(tmpCloneState.SyncProgress);
			for (let i = 0; i < tmpTableNames.length; i++)
			{
				let tmpName = tmpTableNames[i];
				let tmpP = tmpCloneState.SyncProgress[tmpName];
				let tmpSnap = { Status: tmpP.Status, Total: tmpP.Total || 0, Synced: tmpP.Synced || 0, Errors: tmpP.Errors || 0 };
				if (tmpP.ErrorMessage) tmpSnap.ErrorMessage = tmpP.ErrorMessage;

				// Include per-record breakdown fields if available (set after entity sync completes)
				if (tmpP.hasOwnProperty('New')) tmpSnap.New = tmpP.New;
				if (tmpP.hasOwnProperty('Updated')) tmpSnap.Updated = tmpP.Updated;
				if (tmpP.hasOwnProperty('Unchanged')) tmpSnap.Unchanged = tmpP.Unchanged;
				if (tmpP.hasOwnProperty('Deleted')) tmpSnap.Deleted = tmpP.Deleted;
				if (tmpP.hasOwnProperty('ServerTotal')) tmpSnap.ServerTotal = tmpP.ServerTotal;

				if ((tmpP.Status === 'Syncing' || tmpP.Status === 'Pending') && tmpFable.MeadowSync && tmpFable.MeadowSync.MeadowSyncEntities)
				{
					let tmpSyncEntity = tmpFable.MeadowSync.MeadowSyncEntities[tmpName];
					if (tmpSyncEntity && tmpSyncEntity.operation)
					{
						let tmpTracker = tmpSyncEntity.operation.progressTrackers[`FullSync-${tmpName}`];
						if (tmpTracker)
						{
							tmpSnap.Total = tmpTracker.TotalCount || tmpSnap.Total;
							tmpSnap.Synced = Math.max(tmpTracker.CurrentCount || 0, 0);
						}
					}
					let tmpRESTErrors = tmpCloneState.SyncRESTErrors[tmpName] || 0;
					if (tmpRESTErrors > 0)
					{
						tmpSnap.Errors = tmpRESTErrors;
					}
				}
				tmpTablesSnapshot[tmpName] = tmpSnap;
			}

			pResponse.send(200,
				{
					Running: tmpCloneState.SyncRunning,
					Stopping: tmpCloneState.SyncStopping,
					SyncMode: tmpCloneState.SyncMode,
					Tables: tmpTablesSnapshot
				});
			return fNext();
		});

	// GET /clone/sync/live-status
	// Returns a human-readable narrative of what the data cloner is doing right now.
	pOratorServiceServer.get(`${tmpPrefix}/sync/live-status`,
		(pRequest, pResponse, fNext) =>
		{
			let fFormatNumber = (pNum) =>
			{
				return pNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			};

			let fFormatDuration = (pMs) =>
			{
				let tmpSeconds = Math.floor(pMs / 1000);
				if (tmpSeconds < 60) return `${tmpSeconds}s`;
				let tmpMin = Math.floor(tmpSeconds / 60);
				let tmpSec = tmpSeconds % 60;
				if (tmpMin < 60) return `${tmpMin}m ${tmpSec}s`;
				let tmpHr = Math.floor(tmpMin / 60);
				tmpMin = tmpMin % 60;
				return `${tmpHr}h ${tmpMin}m`;
			};

			// Determine overall phase
			let tmpPhase = 'idle';
			let tmpMessage = 'Idle';
			let tmpActiveEntity = null;
			let tmpActiveProgress = null;
			let tmpCompleted = [];
			let tmpPending = [];
			let tmpErrors = [];
			let tmpTotalSynced = 0;
			let tmpTotalRecords = 0;
			let tmpElapsed = null;
			let tmpETA = null;

			if (!tmpCloneState.ConnectionConnected)
			{
				tmpPhase = 'disconnected';
				tmpMessage = 'No database connected';
			}
			else if (!tmpCloneState.SessionAuthenticated && !tmpCloneState.SessionConfigured)
			{
				tmpPhase = 'idle';
				tmpMessage = `Connected to ${tmpCloneState.ConnectionProvider} — waiting for remote session configuration`;
			}
			else if (tmpCloneState.SessionConfigured && !tmpCloneState.SessionAuthenticated)
			{
				tmpPhase = 'idle';
				tmpMessage = `Connected to ${tmpCloneState.ConnectionProvider} — waiting for authentication`;
			}
			else if (tmpCloneState.SyncStopping)
			{
				tmpPhase = 'stopping';
				tmpMessage = 'Stopping sync...';
			}
			else if (tmpCloneState.SyncRunning)
			{
				tmpPhase = 'syncing';

				// Check for pre-count phase
				if (tmpCloneState.SyncPhase === 'counting')
				{
					let tmpPC = tmpCloneState.PreCountProgress || { Counted: 0, TotalTables: 0, Tables: [] };
					tmpMessage = `Analyzing tables: counted ${tmpPC.Counted} / ${tmpPC.TotalTables}...`;

					let tmpCountElapsed = null;
					if (tmpPC.StartTime)
					{
						tmpCountElapsed = fFormatDuration(Date.now() - tmpPC.StartTime);
					}

					pResponse.send(200,
						{
							Phase: tmpPhase,
							Message: tmpMessage,
							ActiveEntity: null,
							ActiveProgress: null,
							Completed: 0,
							Pending: tmpPC.TotalTables,
							Errors: 0,
							TotalTables: tmpPC.TotalTables,
							TotalSynced: 0,
							TotalRecords: 0,
							Elapsed: tmpCountElapsed,
							SyncMode: tmpCloneState.SyncMode,
							ETA: null,
							PreCountGrandTotal: tmpCloneState.PreCountGrandTotal || 0,
							PreCountProgress: tmpPC,
							ThroughputSamples: []
						});
					return fNext();
				}

				// Read progress from MeadowSync operation trackers (read-only snapshot — never write back to SyncProgress during a poll)
				let tmpTableNames = Object.keys(tmpCloneState.SyncProgress);
				for (let i = 0; i < tmpTableNames.length; i++)
				{
					let tmpName = tmpTableNames[i];
					let tmpP = tmpCloneState.SyncProgress[tmpName];

					// Snapshot live tracker values without mutating SyncProgress
					let tmpLiveTotal = tmpP.Total || 0;
					let tmpLiveSynced = tmpP.Synced || 0;
					let tmpLiveErrors = tmpP.Errors || 0;

					if (tmpP.Status === 'Syncing' || tmpP.Status === 'Pending')
					{
						if (tmpFable.MeadowSync && tmpFable.MeadowSync.MeadowSyncEntities)
						{
							let tmpSyncEntity = tmpFable.MeadowSync.MeadowSyncEntities[tmpName];
							if (tmpSyncEntity && tmpSyncEntity.operation)
							{
								let tmpTracker = tmpSyncEntity.operation.progressTrackers[`FullSync-${tmpName}`];
								if (tmpTracker)
								{
									tmpLiveTotal = tmpTracker.TotalCount || tmpLiveTotal;
									tmpLiveSynced = Math.max(tmpTracker.CurrentCount || 0, 0);
								}
							}
						}
						let tmpRESTErrors = tmpCloneState.SyncRESTErrors[tmpName] || 0;
						if (tmpRESTErrors > 0)
						{
							tmpLiveErrors = tmpRESTErrors;
						}
					}

					tmpTotalSynced += tmpLiveSynced;
					tmpTotalRecords += tmpLiveTotal;

					if (tmpP.Status === 'Syncing')
					{
						tmpActiveEntity = tmpName;
						tmpActiveProgress = { Synced: tmpLiveSynced, Total: tmpLiveTotal };
					}
					else if (tmpP.Status === 'Complete' || tmpP.Status === 'Partial')
					{
						tmpCompleted.push({ Name: tmpName, Synced: tmpLiveSynced, Total: tmpLiveTotal, Status: tmpP.Status });
					}
					else if (tmpP.Status === 'Error')
					{
						tmpErrors.push({ Name: tmpName, Error: tmpP.ErrorMessage || 'Unknown error' });
					}
					else if (tmpP.Status === 'Pending')
					{
						tmpPending.push(tmpName);
					}
				}

				// Build elapsed time and ETA
				if (tmpCloneState.SyncStartTime)
				{
					let tmpElapsedMs = Date.now() - new Date(tmpCloneState.SyncStartTime).getTime();
					tmpElapsed = fFormatDuration(tmpElapsedMs);

					// Compute ETA using pre-counted grand total (or running total) and records synced so far
					let tmpETATotalRecords = tmpCloneState.PreCountGrandTotal || tmpTotalRecords;
					if (tmpETATotalRecords > 0 && tmpTotalSynced > 0 && tmpElapsedMs > 5000)
					{
						let tmpRate = tmpTotalSynced / tmpElapsedMs; // records per ms
						let tmpRemaining = tmpETATotalRecords - tmpTotalSynced;
						if (tmpRate > 0 && tmpRemaining > 0)
						{
							tmpETA = fFormatDuration(tmpRemaining / tmpRate);
						}
					}
				}

				// Build the narrative
				let tmpParts = [];

				if (tmpActiveEntity && tmpActiveProgress)
				{
					let tmpRecordProgress = '';
					if (tmpActiveProgress.Total > 0)
					{
						tmpRecordProgress = ` — record ${fFormatNumber(tmpActiveProgress.Synced)} / ${fFormatNumber(tmpActiveProgress.Total)}`;
					}
					else
					{
						tmpRecordProgress = ' — counting records...';
					}
					tmpParts.push(`${tmpCloneState.SyncMode} sync: ${tmpActiveEntity}${tmpRecordProgress}`);
				}
				else
				{
					tmpParts.push(`${tmpCloneState.SyncMode} sync in progress`);
				}

				// Summarize completed tables
				if (tmpCompleted.length > 0)
				{
					// Show a few completed entities by name, then summarize the rest
					let tmpCompletedSummary = [];
					let tmpShowCount = Math.min(3, tmpCompleted.length);
					// Show the most recently completed (last in the list)
					for (let i = tmpCompleted.length - tmpShowCount; i < tmpCompleted.length; i++)
					{
						let tmpC = tmpCompleted[i];
						tmpCompletedSummary.push(`${tmpC.Name} (${fFormatNumber(tmpC.Synced)})`);
					}
					let tmpCompletedStr = tmpCompletedSummary.join(', ');
					if (tmpCompleted.length > tmpShowCount)
					{
						tmpCompletedStr = `${tmpCompleted.length - tmpShowCount} others, ` + tmpCompletedStr;
					}
					tmpParts.push(`Synced: ${tmpCompletedStr}`);
				}

				if (tmpPending.length > 0)
				{
					tmpParts.push(`${tmpPending.length} table${tmpPending.length === 1 ? '' : 's'} remaining`);
				}

				if (tmpErrors.length > 0)
				{
					tmpParts.push(`${tmpErrors.length} error${tmpErrors.length === 1 ? '' : 's'}`);
				}

				tmpMessage = tmpParts.join('. ') + '.';
			}
			else if (tmpCloneState.SyncReport)
			{
				// Sync finished — show summary
				tmpPhase = 'complete';
				let tmpR = tmpCloneState.SyncReport;
				tmpMessage = `Sync ${tmpR.Outcome.toLowerCase()}: ${fFormatNumber(tmpR.Summary.TotalSynced)} records across ${tmpR.Summary.TotalTables} tables`;
				if (tmpR.RunTimestamps && tmpR.RunTimestamps.DurationSeconds)
				{
					tmpMessage += ` in ${fFormatDuration(tmpR.RunTimestamps.DurationSeconds * 1000)}`;
				}
				tmpTotalSynced = tmpR.Summary.TotalSynced;
				tmpTotalRecords = tmpR.Summary.TotalRecords;
			}
			else if (tmpCloneState.SessionAuthenticated)
			{
				tmpPhase = 'ready';
				tmpMessage = `Connected to ${tmpCloneState.ConnectionProvider}, authenticated to ${tmpCloneState.RemoteServerURL || 'remote'} — ready to sync`;
			}

			pResponse.send(200,
				{
					Phase: tmpPhase,
					Message: tmpMessage,
					ActiveEntity: tmpActiveEntity,
					ActiveProgress: tmpActiveProgress ? { Synced: tmpActiveProgress.Synced, Total: tmpActiveProgress.Total } : null,
					Completed: tmpCompleted.length,
					Pending: tmpPending.length,
					Errors: tmpErrors.length,
					TotalTables: tmpCompleted.length + tmpPending.length + tmpErrors.length + (tmpActiveEntity ? 1 : 0),
					TotalSynced: tmpTotalSynced,
					TotalRecords: tmpTotalRecords,
					Elapsed: tmpElapsed,
					SyncMode: tmpCloneState.SyncMode,
					ETA: tmpETA,
					PreCountGrandTotal: tmpCloneState.PreCountGrandTotal || 0,
					ThroughputSamples: tmpCloneState.ThroughputSamples || []
				});
			return fNext();
		});

	// POST /clone/sync/stop
	pOratorServiceServer.post(`${tmpPrefix}/sync/stop`,
		(pRequest, pResponse, fNext) =>
		{
			if (tmpCloneState.SyncRunning)
			{
				tmpCloneState.SyncStopping = true;
				tmpFable.log.info('Data Cloner: Sync stop requested.');
			}

			pResponse.send(200, { Success: true, Message: 'Sync stop requested.' });
			return fNext();
		});

	// GET /clone/sync/report
	pOratorServiceServer.get(`${tmpPrefix}/sync/report`,
		(pRequest, pResponse, fNext) =>
		{
			if (tmpCloneState.SyncReport)
			{
				pResponse.send(200, tmpCloneState.SyncReport);
			}
			else
			{
				pResponse.send(200, { Success: false, Error: 'No report available. Run a sync first.' });
			}
			return fNext();
		});
};

// Exposed for unit tests.
module.exports._RuntimeSyncProperties = _RuntimeSyncProperties;
module.exports.applyRuntimeSyncOverrides = applyRuntimeSyncOverrides;
