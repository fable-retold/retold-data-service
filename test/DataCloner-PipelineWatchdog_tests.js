/**
 * Unit tests for the DataCloner headless pipeline liveness watchdog.
 *
 * Pure-function tests driven through the watchdog's clock/timer/exit seams --
 * no server boot, no real timers, no wall-clock waiting.
 *
 * @license MIT
 */

var Chai = require('chai');
var Expect = Chai.expect;

var libPipelineWatchdog = require('../source/services/data-cloner/DataCloner-PipelineWatchdog.js');
var resolvePipelineStallTimeout = libPipelineWatchdog.resolvePipelineStallTimeout;
var DEFAULT_PIPELINE_STALL_TIMEOUT_MS = libPipelineWatchdog.DEFAULT_PIPELINE_STALL_TIMEOUT_MS;

// ---- Test helpers ----

// A fable stand-in that records what was logged and, critically, lets the test
// drive the logger the watchdog subscribes to.
var fMakeFable = () =>
{
	var tmpEntries = [];
	var tmpLoggers = [];
	var fLogAt = (pLevel) =>
	{
		return (pMessage) =>
		{
			tmpEntries.push({ level: pLevel, msg: pMessage });
			for (var i = 0; i < tmpLoggers.length; i++)
			{
				tmpLoggers[i][pLevel](pMessage);
			}
		};
	};
	return {
		log:
			{
				addLogger: (pLogger) => { tmpLoggers.push(pLogger); return true; },
				trace: fLogAt('trace'),
				debug: fLogAt('debug'),
				info: fLogAt('info'),
				warn: fLogAt('warn'),
				error: fLogAt('error'),
				fatal: fLogAt('fatal')
			},
		Entries: tmpEntries,
		Loggers: tmpLoggers
	};
};

// A controllable clock plus a single-slot interval timer the test ticks by hand.
var fMakeSeams = () =>
{
	var tmpState = { NowMs: 1000000, Timer: null, TimerCleared: false, ExitCode: null, IntervalMS: null };
	return {
		State: tmpState,
		Seams:
			{
				now: () => tmpState.NowMs,
				setIntervalFunction: (fCallback, pDelayMS) =>
					{
						tmpState.IntervalMS = pDelayMS;
						tmpState.Timer = { callback: fCallback, unref: () => {} };
						return tmpState.Timer;
					},
				clearIntervalFunction: () => { tmpState.TimerCleared = true; tmpState.Timer = null; },
				exitFunction: (pCode) => { tmpState.ExitCode = pCode; }
			},
		// Advance the clock, then run one watchdog poll.
		Advance: (pMilliseconds) =>
			{
				tmpState.NowMs += pMilliseconds;
				if (tmpState.Timer)
				{
					tmpState.Timer.callback();
				}
			}
	};
};

suite
	(
		'DataCloner Pipeline Watchdog',
		function ()
		{
			suite
				(
					'Timeout resolution',
					function ()
					{
						test
							(
								'An unconfigured threshold falls back to the ten minute default.',
								function ()
								{
									Expect(resolvePipelineStallTimeout(undefined)).to.equal(DEFAULT_PIPELINE_STALL_TIMEOUT_MS);
									Expect(DEFAULT_PIPELINE_STALL_TIMEOUT_MS).to.equal(600000);
								}
							);

						test
							(
								'An explicit zero disables the watchdog.',
								function ()
								{
									Expect(resolvePipelineStallTimeout(0)).to.equal(0);
									Expect(resolvePipelineStallTimeout('0')).to.equal(0);
								}
							);

						test
							(
								'A configured threshold is honored, and garbage falls back rather than disabling.',
								function ()
								{
									// Silently disabling the guard because a config value was
									// fat-fingered is the one outcome worth ruling out.
									Expect(resolvePipelineStallTimeout(90000)).to.equal(90000);
									Expect(resolvePipelineStallTimeout('90000')).to.equal(90000);
									Expect(resolvePipelineStallTimeout('banana')).to.equal(DEFAULT_PIPELINE_STALL_TIMEOUT_MS);
									Expect(resolvePipelineStallTimeout(-5)).to.equal(DEFAULT_PIPELINE_STALL_TIMEOUT_MS);
								}
							);
					}
				);

			suite
				(
					'Liveness',
					function ()
					{
						test
							(
								'Silence past the threshold exits non-zero and says so at fatal.',
								function ()
								{
									var tmpFable = fMakeFable();
									var tmpHarness = fMakeSeams();
									var tmpWatchdog = libPipelineWatchdog(tmpFable, 60000, tmpHarness.Seams);
									tmpWatchdog.arm();

									tmpHarness.Advance(59000);
									Expect(tmpHarness.State.ExitCode).to.equal(null);

									tmpHarness.Advance(2000);
									Expect(tmpHarness.State.ExitCode).to.equal(1);

									var tmpFatal = tmpFable.Entries.filter((pEntry) => { return pEntry.level === 'fatal'; });
									Expect(tmpFatal.length).to.equal(1);
									Expect(tmpFatal[0].msg).to.contain('PIPELINE STALL DETECTED');
									Expect(tmpFatal[0].msg).to.contain('wedged rather than slow');
								}
							);

						test
							(
								'Log output from any level keeps a slow-but-alive pipeline running.',
								function ()
								{
									// The real shape this has to survive: a CREATE INDEX that
									// legitimately reports only every ~145s for fourteen
									// minutes. A deadline would kill it; liveness must not.
									var tmpFable = fMakeFable();
									var tmpHarness = fMakeSeams();
									var tmpWatchdog = libPipelineWatchdog(tmpFable, 600000, tmpHarness.Seams);
									tmpWatchdog.arm();

									for (var i = 0; i < 6; i++)
									{
										tmpHarness.Advance(145700);
										Expect(tmpHarness.State.ExitCode).to.equal(null);
										tmpFable.log.warn('Meadow-MSSQL CREATE INDEX: attempt failed after 145446ms');
									}

									// Fourteen minutes of real work, never ten of silence.
									Expect(tmpHarness.State.ExitCode).to.equal(null);
								}
							);

						test
							(
								'A disarmed watchdog does not fire through the post-run delay.',
								function ()
								{
									// The bin idles for --delay seconds after a successful run
									// (900s in production). That is a longer silence than any
									// live step, so a watchdog left armed would turn every
									// success into an exit 1.
									var tmpFable = fMakeFable();
									var tmpHarness = fMakeSeams();
									var tmpWatchdog = libPipelineWatchdog(tmpFable, 600000, tmpHarness.Seams);
									tmpWatchdog.arm();

									tmpWatchdog.disarm();
									Expect(tmpHarness.State.TimerCleared).to.equal(true);

									tmpHarness.Advance(900000);
									Expect(tmpHarness.State.ExitCode).to.equal(null);
								}
							);

						test
							(
								'A zero threshold arms nothing at all.',
								function ()
								{
									var tmpFable = fMakeFable();
									var tmpHarness = fMakeSeams();
									var tmpWatchdog = libPipelineWatchdog(tmpFable, 0, tmpHarness.Seams);
									tmpWatchdog.arm();

									Expect(tmpWatchdog.timeoutMs).to.equal(0);
									Expect(tmpHarness.State.Timer).to.equal(null);
									Expect(tmpFable.Loggers.length).to.equal(0);
									Expect(tmpFable.Entries[0].msg).to.contain('Pipeline watchdog disabled');
								}
							);

						test
							(
								'The watchdog polls on a coarse cadence and unrefs its timer.',
								function ()
								{
									// Unref matters: the guard must never be the handle that
									// keeps an otherwise-finished process alive.
									var tmpFable = fMakeFable();
									var tmpHarness = fMakeSeams();
									var tmpUnrefCalled = false;
									tmpHarness.Seams.setIntervalFunction = (fCallback, pDelayMS) =>
										{
											tmpHarness.State.IntervalMS = pDelayMS;
											tmpHarness.State.Timer = { callback: fCallback, unref: () => { tmpUnrefCalled = true; } };
											return tmpHarness.State.Timer;
										};
									libPipelineWatchdog(tmpFable, 600000, tmpHarness.Seams).arm();

									Expect(tmpHarness.State.IntervalMS).to.equal(libPipelineWatchdog.WATCHDOG_POLL_INTERVAL_MS);
									Expect(tmpUnrefCalled).to.equal(true);
								}
							);

						test
							(
								'A logger it cannot subscribe to disables the guard rather than arming a blind one.',
								function ()
								{
									// Failing safe matters more than failing loudly here: a
									// watchdog with no liveness feed sees permanent silence
									// and would kill every healthy run.
									var tmpFable = fMakeFable();
									delete tmpFable.log.addLogger;
									var tmpHarness = fMakeSeams();
									var tmpWatchdog = libPipelineWatchdog(tmpFable, 60000, tmpHarness.Seams);
									tmpWatchdog.arm();

									Expect(tmpHarness.State.Timer).to.equal(null);
									tmpHarness.Advance(600000);
									Expect(tmpHarness.State.ExitCode).to.equal(null);
									var tmpWarn = tmpFable.Entries.filter(function (pEntry) { return pEntry.level === 'warn'; });
									Expect(tmpWarn.length).to.equal(1);
									Expect(tmpWarn[0].msg).to.contain('no addLogger');
								}
							);

						test
							(
								'Arming twice does not stack a second timer.',
								function ()
								{
									var tmpFable = fMakeFable();
									var tmpHarness = fMakeSeams();
									var tmpWatchdog = libPipelineWatchdog(tmpFable, 600000, tmpHarness.Seams);
									tmpWatchdog.arm();
									var tmpFirstTimer = tmpHarness.State.Timer;
									tmpWatchdog.arm();

									Expect(tmpHarness.State.Timer).to.equal(tmpFirstTimer);
									Expect(tmpFable.Loggers.length).to.equal(1);
								}
							);
					}
				);
		}
	);
