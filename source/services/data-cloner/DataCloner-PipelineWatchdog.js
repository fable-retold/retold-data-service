/**
 * DataCloner Pipeline Liveness Watchdog
 *
 * A last-resort guard that exits a wedged headless pipeline so the container
 * restart loop can recover it.
 *
 * WHY LIVENESS AND NOT A DEADLINE.  The obvious guard is a per-step deadline,
 * but that needs an estimate of how long each step *should* take, and the
 * honest answer moves by orders of magnitude with a customer's data -- a first
 * index build over a 32M-row table legitimately runs far longer than a whole
 * healthy sync, so any deadline generous enough to be safe is too generous to
 * catch anything.  What a healthy pipeline always does is talk.  So the only
 * number to pick is how long it may be SILENT, which is bounded below by the
 * noisiest inner timeout rather than by any dataset: the longest silence
 * observed across healthy production runs is 145.7s (an MSSQL requestTimeout
 * plus its pool recycle).  The 10 minute default leaves ~4x that headroom and
 * does not need revisiting as the data grows.
 *
 * Liveness is read straight off the logger, as a stream that writes nowhere and
 * only marks the time, so every layer that already reports progress feeds the
 * watchdog for free and no step needs its own instrumentation.
 *
 * This is deliberately NOT the sync stall detector, which stays where it is:
 * during a sync both are armed and they answer different questions -- this one
 * catches "nothing is happening at all", the stall detector catches "things are
 * happening but no records are moving".
 *
 * @module DataCloner-PipelineWatchdog
 */

/** Silence, in ms, that counts as a wedge when the caller configures nothing. */
const DEFAULT_PIPELINE_STALL_TIMEOUT_MS = 600000;

/** How often the guard wakes to compare the clock. Coarse on purpose. */
const WATCHDOG_POLL_INTERVAL_MS = 15000;

/**
 * Resolve the configured silence threshold.
 *
 * An explicit 0 disables the watchdog; anything unparseable or negative falls
 * back to the default rather than silently disabling the guard.
 *
 * @param {number|string} [pConfiguredTimeoutMs] - Sync.PipelineStallTimeoutMs, as configured.
 * @return {number} Milliseconds of silence to tolerate, or 0 when disabled.
 */
const resolvePipelineStallTimeout = (pConfiguredTimeoutMs) =>
{
	let tmpConfigured = parseInt(pConfiguredTimeoutMs, 10);
	if (tmpConfigured === 0)
	{
		return 0;
	}
	if (!isNaN(tmpConfigured) && tmpConfigured > 0)
	{
		return tmpConfigured;
	}
	return DEFAULT_PIPELINE_STALL_TIMEOUT_MS;
};

/**
 * Build a watchdog for one headless pipeline run.
 *
 * @param {Object} pFable - The fable instance whose logger is watched and warned through.
 * @param {number|string} [pConfiguredTimeoutMs] - Sync.PipelineStallTimeoutMs, as configured.
 * @param {Object} [pSeams] - Test seams; production passes none.
 * @param {() => number} [pSeams.now] - Clock source.
 * @param {(fCallback: Function, pDelayMS: number) => any} [pSeams.setIntervalFunction] - Timer source.
 * @param {(pTimer: any) => void} [pSeams.clearIntervalFunction] - Timer canceller.
 * @param {(pCode: number) => void} [pSeams.exitFunction] - Process exit.
 * @return {{arm: () => void, disarm: () => void, mark: () => void, poll: () => boolean, timeoutMs: number}} The watchdog; poll() runs one liveness check and reports whether it tripped.
 */
const createPipelineWatchdog = (pFable, pConfiguredTimeoutMs, pSeams) =>
{
	let tmpSeams = pSeams || {};
	let fNow = tmpSeams.now || (() => Date.now());
	let fSetInterval = tmpSeams.setIntervalFunction || ((fCallback, pDelayMS) => setInterval(fCallback, pDelayMS));
	let fClearInterval = tmpSeams.clearIntervalFunction || ((pTimer) => clearInterval(pTimer));
	let fExit = tmpSeams.exitFunction || ((pCode) => process.exit(pCode));

	let tmpTimeoutMs = resolvePipelineStallTimeout(pConfiguredTimeoutMs);
	let tmpLastLogAtMs = fNow();
	let tmpTimer = null;

	let fMark = () => { tmpLastLogAtMs = fNow(); };

	let fDisarm = () =>
	{
		if (tmpTimer !== null)
		{
			fClearInterval(tmpTimer);
			tmpTimer = null;
		}
	};

	// One liveness check. The interval calls this; callers may drive it directly
	// to check without waiting out a poll cadence.
	let fPoll = () =>
	{
		if (tmpTimer === null)
		{
			return false;
		}
		let tmpSilentMs = fNow() - tmpLastLogAtMs;
		if (tmpSilentMs < tmpTimeoutMs)
		{
			return false;
		}
		fDisarm();
		let fLogStall = (typeof(pFable.log.fatal) === 'function') ? pFable.log.fatal.bind(pFable.log) : pFable.log.error.bind(pFable.log);
		fLogStall(`Headless: PIPELINE STALL DETECTED — no log output for ${(tmpSilentMs / 60000).toFixed(1)} min (threshold ${(tmpTimeoutMs / 60000).toFixed(1)} min). The pipeline is wedged rather than slow. Exiting non-zero so the container restart loop can recover; cursor/progress state persists on the mounted volume.`);
		fExit(1);
		return true;
	};

	let fArm = () =>
	{
		if (tmpTimeoutMs < 1)
		{
			pFable.log.info('Headless: Pipeline watchdog disabled.');
			return;
		}
		if (tmpTimer !== null)
		{
			return;
		}

		// Fail safe, never dangerous. Without a feed the watchdog would see
		// permanent silence and kill every healthy run, so a logger it cannot
		// subscribe to disables the guard rather than arming a blind one.
		if (typeof(pFable.log.addLogger) !== 'function')
		{
			pFable.log.warn('Headless: Pipeline watchdog disabled — this logger exposes no addLogger to observe liveness through.');
			return;
		}

		// addLogger's level cases fall through, so registering at 'trace' feeds
		// the mark from every level. The logger writes nothing itself, which is
		// what keeps this from feeding on its own output.
		pFable.log.addLogger(
			{
				loggerUUID: 'DataClonerPipelineWatchdog',
				initialize: () => {},
				trace: fMark, debug: fMark, info: fMark, warn: fMark, error: fMark, fatal: fMark
			}, 'trace');

		tmpLastLogAtMs = fNow();
		tmpTimer = fSetInterval(fPoll, WATCHDOG_POLL_INTERVAL_MS);

		// Unref'd so the watchdog can never be the handle that keeps an
		// otherwise-finished process alive.
		if (tmpTimer && typeof(tmpTimer.unref) === 'function')
		{
			tmpTimer.unref();
		}

		pFable.log.info(`Headless: Pipeline watchdog armed at ${(tmpTimeoutMs / 60000).toFixed(1)} min of no log output.`);
	};

	return { arm: fArm, disarm: fDisarm, mark: fMark, poll: fPoll, timeoutMs: tmpTimeoutMs };
};

module.exports = createPipelineWatchdog;
module.exports.createPipelineWatchdog = createPipelineWatchdog;
module.exports.resolvePipelineStallTimeout = resolvePipelineStallTimeout;
module.exports.DEFAULT_PIPELINE_STALL_TIMEOUT_MS = DEFAULT_PIPELINE_STALL_TIMEOUT_MS;
module.exports.WATCHDOG_POLL_INTERVAL_MS = WATCHDOG_POLL_INTERVAL_MS;
