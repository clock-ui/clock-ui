import { getTime } from "./time";
import {
  updateTickAnimation,
  type TickAnimationState,
} from "./animation";
import { calculateAngles, type ClockAngles } from "./calculations";

export * from "./calculations";
export { getTime } from "./time";
export {
  updateTickAnimation,
  easeOutBack,
  DEFAULT_TICK_DURATION,
  type TickAnimationState,
} from "./animation";

/** How often tick mode re-reads the wall clock, in milliseconds */
const TICK_READ_INTERVAL = 100;

export interface ClockOptions {
  timezone?: string | undefined;

  /**
   * When true, the second hand snaps straight to each second instead of
   * easing into it. Set this from `prefers-reduced-motion`.
   */
  reducedMotion?: boolean | undefined;

  /**
   * How long the second hand takes to swing to the next mark, in
   * milliseconds. Defaults to {@link DEFAULT_TICK_DURATION}. `0` snaps with
   * no swing. Tick mode only — sweep mode is continuous.
   */
  tickDuration?: number | undefined;
}

export interface TimeState {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export interface ClockShadows {
  hour: string;
  minute: string;
  second: string;
}

/** Class representing a clock face */
export class ClockFace {
  private state: TimeState;

  /**
   * Create a clock face
   *
   * @param {TimeState} state - Object of time state
   * @param {number} state.hours - Hours of the clock hand
   * @param {number} state.minutes - Minutes of the clock hand
   * @param {number} state.seconds - Seconds of the clock hand
   * @param {number} state.milliseconds - Milliseconds, affecting seconds clock hand
   */
  constructor(state: TimeState) {
    this.state = state;
  }

  /**
   * Get angles of clock hands
   *
   * @returns {ClockAngles} Object of time angles
   */
  getAngles(): ClockAngles {
    return calculateAngles(
      this.state.hours,
      this.state.minutes,
      this.state.seconds,
      this.state.milliseconds,
    );
  }
}

/** Class representing a clock work */
export class ClockWork {
  private options: ClockOptions;
  private state: TimeState;
  private tickAnimationState: TickAnimationState;
  private tickTime: Date | null = null;
  private tickTimeRead = 0;

  /**
   * Create a clock work
   *
   * @param {ClockOptions} options - Object clock options
   * @param {string | undefined} options.timezone - Timezone of target time
   */
  constructor(options: ClockOptions) {
    this.options = options;

    const time = getTime(this.options.timezone);
    this.state = {
      hours: time.getHours(),
      minutes: time.getMinutes(),
      seconds: time.getSeconds(),
      milliseconds: time.getMilliseconds(),
    };

    this.tickAnimationState = {
      lastSecond: -1,
      startAngle: 0,
      targetAngle: 0,
      animationStart: 0,
    };
  }

  /**
   * Read the wall clock, reusing the previous reading for up to
   * TICK_READ_INTERVAL milliseconds.
   *
   * Callers that only care about whole seconds (or the date) do not need a
   * fresh reading on every animation frame, and a timezone-aware read costs a
   * toLocaleString round-trip. Sweep mode deliberately bypasses this.
   *
   * @returns {Date} Current time, possibly cached
   */
  private readClockThrottled(): Date {
    const stamp = performance.now();

    if (
      this.tickTime === null ||
      stamp - this.tickTimeRead >= TICK_READ_INTERVAL
    ) {
      this.tickTime = getTime(this.options.timezone);
      this.tickTimeRead = stamp;
    }

    return this.tickTime;
  }

  /**
   * Update time by milliseconds (Sweep Mode)
   *
   * @returns {void}
   */
  updateSweep(): void {
    const time = getTime(this.options.timezone);
    this.state.hours = time.getHours();
    this.state.minutes = time.getMinutes();
    this.state.seconds = time.getSeconds();
    this.state.milliseconds = time.getMilliseconds();
  }

  /**
   * Update time by seconds (Tick Mode)
   *
   * @returns {void}
   */
  updateTick(): void {
    // Every UTC offset is a whole number of minutes, so seconds and
    // milliseconds are identical in every timezone. The second boundary can
    // therefore be detected from a plain Date, without paying for a
    // toLocaleString conversion on each frame — and without the detection
    // latency that throttling that conversion would add.
    const targetSecond = new Date().getSeconds();

    // All of this clock's motion is JS-driven, so honouring reduced motion
    // means skipping the easing entirely rather than dropping a CSS
    // transition. Snapping also removes the need to defer the minute
    // rollover, since there is no animation left to wait for.
    if (this.options.reducedMotion) {
      const time = this.readClockThrottled();
      this.state.seconds = targetSecond;
      this.state.minutes = time.getMinutes();
      this.state.hours = time.getHours();
      this.state.milliseconds = 0;
      return;
    }

    // Tick animation
    const interpolatedSeconds = updateTickAnimation(
      this.state.seconds,
      targetSecond,
      this.tickAnimationState,
      this.options.tickDuration,
    );
    this.state.seconds = interpolatedSeconds;

    // Update hours and minutes only once the second hand has finished easing
    // up to 12. Rolling the minute over early would jump the minute hand a
    // near-full minute ahead, because calculateAngles derives the minute
    // angle from `minutes + seconds / 60` and `seconds` is still ~59 here.
    const isStartOfMinute = this.state.seconds >= 0 && this.state.seconds <= 1;
    if (isStartOfMinute) {
      // Hours and minutes do depend on the timezone, but only change once a
      // minute, so this is the one place worth converting.
      const time = this.readClockThrottled();
      this.state.minutes = time.getMinutes();
      this.state.hours = time.getHours();
    }
    this.state.milliseconds = 0;
  }

  /**
   * Get current time state of the clock
   *
   * @returns {TimeState} Object of clock time
   */
  getState(): TimeState {
    return { ...this.state };
  }

  /**
   * Get current date
   *
   * @returns {number} Current date
   */
  getCurrentDate(): number {
    return this.readClockThrottled().getDate();
  }

  /**
   * Update clock options
   *
   * @param {Partial<ClockOptions>} options - Object clock options
   * @param {string | undefined} options.timezone - Timezone of target time
   *
   * @returns {void}
   */
  setOptions(options: Partial<ClockOptions>): void {
    const previousTimezone = this.options.timezone;
    this.options = { ...this.options, ...options };

    // Only the timezone invalidates a cached reading, and this runs per frame.
    if (this.options.timezone !== previousTimezone) {
      this.tickTime = null;

      // Tick mode otherwise only refreshes hours and minutes at the start of a
      // minute, so switching zone would keep showing the old time for up to a
      // minute. A zone change is an explicit action — reflect it now.
      const time = getTime(this.options.timezone);
      this.state.hours = time.getHours();
      this.state.minutes = time.getMinutes();
    }
  }
}
