import "@clock-ui/styles/src/clock-ui.css";
import {
  calculateShadow,
  formatClockLabel,
  ClockFace,
  ClockWork,
  getHoursToDisplay,
  getTicksToDisplay,
  romanNumerals,
} from "@clock-ui/utils";

/**
 * Common options for clock components.
 */
export interface CommonClockOptions {
  /** Hide the second hand */
  hideSeconds?: boolean;
  /** Hide hour numbers */
  hideNumbers?: boolean;
  /** Use Roman numerals instead of Arabic */
  useRoman?: boolean;
  /** Show only cardinal hour numbers (3, 6, 9, 12) */
  cardinalOnly?: boolean;
  /** Remove clock border */
  noBorder?: boolean;
  /** Hide all ticks */
  hideTicks?: boolean;
  /** Hide major ticks (hour marks) */
  hideMajorTicks?: boolean;
  /** Hide minor ticks (minute marks) */
  hideMinorTicks?: boolean;
  /** Enable dual-tone styling */
  dualTone?: boolean;
}

/**
 * Options for the base clock component.
 */
export interface BaseClockOptions extends CommonClockOptions {
  /**
   * Text rendered inside the clock face's info window, e.g. the date.
   * Omit or pass an empty string to hide the window.
   */
  info?: string;

  /** Hour to display (0-23) */
  hours: number;
  /** Minutes to display (0-59) */
  minutes: number;
  /** Seconds to display (0-59) */
  seconds?: number;
  /** Milliseconds for precise positioning */
  milliseconds?: number;
}

/**
 * Options for the live clock component.
 */
export interface LiveClockOptions extends CommonClockOptions {
  /**
   * How long the second hand takes to swing to each new mark, in
   * milliseconds. Defaults to 600. `0` snaps with no swing. Ignored in
   * sweep mode, which moves continuously.
   */
  tickDuration?: number;

  /** Smooth second hand movement */
  smoothSweep?: boolean;
  /** Timezone for the clock */
  timezone?: string;
  /** Hide date display */
  hideDate?: boolean;
}

/**
 * Live clock UI component that displays the current time and updates in real-time.
 */
export class LiveClockUI {
  private clockWork: ClockWork;
  private options: LiveClockOptions;

  private domClock: BaseClockUI;

  private frameId: number | null = null;

  /**
   * A continuously sweeping hand is exactly what prefers-reduced-motion asks
   * us not to do, so sweep mode falls back to ticking when the user opts out.
   * The query is resolved once — `matches` stays live on the returned object.
   */
  private motionQuery: MediaQueryList | null =
    typeof window !== "undefined" && typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : null;

  private prefersReducedMotion(): boolean {
    return this.motionQuery?.matches ?? false;
  }

  /** Current hour */
  public hours = 0;
  /** Current minute */
  public minutes = 0;
  /** Current second */
  public seconds = 0;
  /** Current millisecond */
  public milliseconds = 0;
  /** Current date timestamp */
  public currentDate = 0;

  /**
   * @param {HTMLElement | string} el - The element or selector to render the clock in
   * @param {LiveClockOptions} options - Configuration options for the clock
   */
  constructor(el: HTMLElement | string, options: LiveClockOptions) {
    this.options = options;

    // Initialize ClockWork
    this.clockWork = new ClockWork({
      timezone: options.timezone,
      tickDuration: options.tickDuration,
    });

    // Initialize DomClock
    this.domClock = new BaseClockUI(el, {
      hideSeconds: options.hideSeconds,
      hideNumbers: options.hideNumbers,
      useRoman: options.useRoman,
      cardinalOnly: options.cardinalOnly,
      noBorder: options.noBorder,
      hideMinorTicks: options.hideMinorTicks,
      hideMajorTicks: options.hideMajorTicks,
      hideTicks: options.hideTicks,
      dualTone: options.dualTone ?? true,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });

    this.start();
  }

  private updateTime() {
    const reducedMotion = this.prefersReducedMotion();
    this.clockWork.setOptions({
      reducedMotion,
      tickDuration: this.options.tickDuration,
    });

    if (this.options.smoothSweep && !reducedMotion) {
      this.clockWork.updateSweep();
    } else {
      this.clockWork.updateTick();
    }

    const state = this.clockWork.getState();

    this.hours = state.hours;
    this.minutes = state.minutes;
    this.seconds = state.seconds;
    this.milliseconds = state.milliseconds;

    this.currentDate = this.clockWork.getCurrentDate();

    // Update the DOM clock hands
    this.domClock.update({
      hours: this.hours,
      minutes: this.minutes,
      seconds: this.seconds,
      milliseconds: this.milliseconds,
      info: this.options.hideDate ? "" : String(this.currentDate),
    });
  }

  private loop = () => {
    this.updateTime();
    this.frameId = requestAnimationFrame(this.loop);
  };

  /**
   * Start the live clock animation.
   */
  public start() {
    if (!this.frameId) {
      this.loop();
    }
  }

  /**
   * Stop the live clock animation.
   */
  public stop() {
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
  }

  /**
   * Change the timezone dynamically.
   * @param {string} timezone - The new timezone string
   */
  public setTimezone(timezone: string) {
    this.options.timezone = timezone;
    this.clockWork.setOptions({ timezone });
  }

  /**
   * Destroy the clock and clean up resources.
   */
  public destroy() {
    this.stop();
    this.domClock.destroy();
  }
}

/**
 * Base clock UI component for displaying a static clock.
 */
export class BaseClockUI {
  private options: BaseClockOptions;
  private el: HTMLElement;
  private width = 0;

  private resizeObserver?: ResizeObserver;

  private handHour!: HTMLElement;
  private handMinute!: HTMLElement;
  private handSecond?: HTMLElement | null;
  private info!: HTMLElement;

  private angles = {
    hour: 0,
    minute: 0,
    second: 0,
  };

  private shadows = {
    hour: "",
    minute: "",
    second: "",
  };

  /**
   * @param {HTMLElement | string} el - The element or selector to render the clock in
   * @param {BaseClockOptions} options - Configuration options for the clock
   */
  constructor(el: HTMLElement | string, options: BaseClockOptions) {
    this.el =
      typeof el === "string" ? (document.querySelector(el) as HTMLElement) : el;

    if (!this.el) {
      throw new Error("Clock root element not found");
    }

    this.options = {
      hideSeconds: false,
      hideNumbers: false,
      useRoman: false,
      seconds: 0,
      milliseconds: 0,
      cardinalOnly: false,
      noBorder: false,
      hideMinorTicks: false,
      hideMajorTicks: false,
      hideTicks: false,
      dualTone: true,
      ...options,
    };

    this.init();
  }

  private init() {
    this.renderClock();
    this.observeSize();
    this.update();
  }

  private observeSize() {
    const clockFace = this.el.querySelector(".clock-ui__face") as HTMLElement;
    if (!clockFace) return;

    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        this.width = entry.contentRect.width;
        this.el.style.setProperty("--cui-width", this.width.toString());
        this.update();
      }
    });

    this.resizeObserver.observe(clockFace);
    this.width = clockFace.getBoundingClientRect().width;
    this.el.style.setProperty("--cui-width", this.width.toString());
  }

  private renderClock() {
    const p = this.options;

    this.el.classList.add("clock-ui");
    if (p.useRoman) this.el.classList.add("clock-ui--roman");
    if (!p.noBorder) this.el.classList.add("clock-ui--bordered");
    if (p.dualTone) this.el.classList.add("clock-ui--dual-tone");

    // The face is decorative; the readable time lives on the root's aria-label.
    this.el.setAttribute("role", "img");

    this.el.innerHTML = `
      <div class="clock-ui__face" aria-hidden="true">
        ${!p.hideTicks ? this.renderTicks() : ""}
        ${!p.hideNumbers ? this.renderNumbers() : ""}
        <div class="clock-ui__info"></div>
        <div class="clock-ui__hand clock-ui__hand--hour"></div>
        <div class="clock-ui__hand clock-ui__hand--minute"></div>
        ${!p.hideSeconds ? `<div class="clock-ui__hand clock-ui__hand--second"></div>` : ""}
        <div class="clock-ui__center"></div>
      </div>
    `;

    this.handHour = this.el.querySelector(
      ".clock-ui__hand--hour"
    ) as HTMLElement;
    this.handMinute = this.el.querySelector(
      ".clock-ui__hand--minute"
    ) as HTMLElement;
    this.handSecond = this.el.querySelector(
      ".clock-ui__hand--second"
    ) as HTMLElement | null;
    this.info = this.el.querySelector(".clock-ui__info") as HTMLElement;
  }

  private renderTicks(): string {
    const ticks = getTicksToDisplay({
      major: !this.options.hideMajorTicks,
      minor: !this.options.hideMinorTicks,
    });

    return ticks
      .map((i) => {
        const major = i % 5 === 0 ? "clock-ui__tick--major" : "";
        return `<div class="clock-ui__tick ${major}" style="--i:${i}"></div>`;
      })
      .join("");
  }

  private renderNumbers(): string {
    return getHoursToDisplay(this.options.cardinalOnly)
      .map((hour) => {
        const cardinal = hour % 3 === 0 ? "clock-ui__number--cardinal" : "";
        const text = this.options.useRoman ? romanNumerals[hour - 1] : hour;

        return `
          <div class="clock-ui__number ${cardinal}" style="--n:${hour}">
            ${text}
          </div>
        `;
      })
      .join("");
  }

  /**
   * Update the clock display with new options.
   * @param {Partial<BaseClockOptions>} [options] - Partial options to update
   */
  update(options?: Partial<BaseClockOptions>) {
    if (options) {
      this.options = { ...this.options, ...options };
    }

    const face = new ClockFace({
      hours: this.options.hours,
      minutes: this.options.minutes,
      seconds: this.options.seconds || 0,
      milliseconds: this.options.milliseconds || 0,
    });

    this.angles = face.getAngles();

    this.shadows.hour = calculateShadow(this.angles.hour, this.width);
    this.shadows.minute = calculateShadow(this.angles.minute, this.width);
    this.shadows.second = calculateShadow(this.angles.second, this.width, 8);

    this.applyStyles();
  }

  /**
   * Destroy the clock and clean up resources.
   */
  destroy() {
    this.resizeObserver?.disconnect();
    this.el.innerHTML = "";
  }

  private applyStyles() {
    this.el.setAttribute(
      "aria-label",
      formatClockLabel(this.options.hours, this.options.minutes)
    );

    const info = this.options.info ?? "";
    this.info.textContent = info;
    this.info.style.display = info ? "" : "none";

    this.handHour.style.setProperty("--angle", String(this.angles.hour));
    this.handHour.style.filter = this.shadows.hour;

    this.handMinute.style.setProperty("--angle", String(this.angles.minute));
    this.handMinute.style.filter = this.shadows.minute;

    if (this.handSecond && !this.options.hideSeconds) {
      this.handSecond.style.setProperty("--angle", String(this.angles.second));
      this.handSecond.style.filter = this.shadows.second;
    }
  }
}
