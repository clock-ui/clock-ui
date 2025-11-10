import { getTime } from "./time";
import {
  updateTickAnimation,
  type TickAnimationState,
  easeOutBack,
} from "./animation";
import { calculateAngles, type ClockAngles } from "./calculations";

export * from "./calculations";
export { getTime } from "./time";
export {
  updateTickAnimation,
  easeOutBack,
  type TickAnimationState,
} from "./animation";

export interface ClockOptions {
  timezone?: string | undefined;
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
   * Update time by milliseconds (Sweep Mode)
   *
   * @returns {void}
   */
  updateSweep(): void {
    const time = getTime(this.options.timezone);
    this.state.hours = time.getHours();
    this.state.minutes = time.getMinutes();
    this.state.seconds = time.getSeconds();
    const now = new Date();
    this.state.milliseconds = now.getMilliseconds() - 500;
  }

  /**
   * Update time by seconds (Tick Mode)
   *
   * @returns {void}
   */
  updateTick(): void {
    const time = getTime(this.options.timezone);

    const targetSecond = time.getSeconds();

    // Tick animation
    const interpolatedSeconds = updateTickAnimation(
      this.state.seconds,
      targetSecond,
      this.tickAnimationState,
    );
    this.state.seconds = interpolatedSeconds;

    // Update hours and minutes at the start of each minute
    const isStartOfMinute = this.state.seconds >= 0 && this.state.seconds <= 1;
    if (isStartOfMinute) {
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
    const time = getTime(this.options.timezone);
    return time.getDate();
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
    this.options = { ...this.options, ...options };
  }
}
