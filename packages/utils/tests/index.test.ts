import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  getHoursToDisplay,
  getTicksToDisplay,
  calculateAngles,
  calculateShadow,
  romanNumerals,
  ClockFace,
  ClockWork,
  getTime,
  easeOutBack,
  updateTickAnimation,
  formatClockLabel,
  DEFAULT_TICK_DURATION,
} from "../src";

describe("calculations", () => {
  describe("getHoursToDisplay", () => {
    it("returns all hours when cardinalOnly is false", () => {
      const result = getHoursToDisplay(false);
      expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    });

    it("returns cardinal hours when cardinalOnly is true", () => {
      const result = getHoursToDisplay(true);
      expect(result).toEqual([3, 6, 9, 12]);
    });
  });

  describe("getTicksToDisplay", () => {
    it("returns major ticks when major is true", () => {
      const result = getTicksToDisplay({ major: true });
      expect(result).toEqual([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);
    });

    it("returns minor ticks when minor is true", () => {
      const result = getTicksToDisplay({ minor: true });
      expect(result).toEqual([
        1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 16, 17, 18, 19, 21, 22, 23, 24,
        26, 27, 28, 29, 31, 32, 33, 34, 36, 37, 38, 39, 41, 42, 43, 44, 46, 47,
        48, 49, 51, 52, 53, 54, 56, 57, 58, 59,
      ]);
    });

    it("returns both major and minor ticks when both are true", () => {
      const result = getTicksToDisplay({ major: true, minor: true });
      expect(result).toHaveLength(60);
      expect(result).toContain(0);
      expect(result).toContain(1);
    });
  });

  describe("romanNumerals", () => {
    it("has 12 roman numerals", () => {
      expect(romanNumerals).toHaveLength(12);
      expect(romanNumerals[0]).toBe("I");
      expect(romanNumerals[11]).toBe("XII");
    });
  });

  describe("calculateAngles", () => {
    it("calculates angles for 12:00:00", () => {
      const result = calculateAngles(12, 0, 0);
      expect(result.hour).toBe(0);
      expect(result.minute).toBe(0);
      expect(result.second).toBe(0);
    });

    it("calculates angles for 3:00:00", () => {
      const result = calculateAngles(3, 0, 0);
      expect(result.hour).toBe(90);
      expect(result.minute).toBe(0);
      expect(result.second).toBe(0);
    });

    it("calculates angles with milliseconds", () => {
      const result = calculateAngles(12, 0, 0, 500);
      expect(result.second).toBe(0.5 * 6); // 6 degrees per second
    });
  });

  describe("calculateShadow", () => {
    it("returns a drop-shadow CSS filter", () => {
      const result = calculateShadow(0, 500);
      expect(result).toMatch(
        /^drop-shadow\(-?\d+\.?\d*px -?\d+\.?\d*px \d+\.?\d*px rgba\(0,0,0,0\.5\)\)$/,
      );
    });

    it("scales with width", () => {
      const result500 = calculateShadow(0, 500);
      const result1000 = calculateShadow(0, 1000);
      expect(result1000).not.toBe(result500);
    });
  });
});

describe("time", () => {
  describe("getTime", () => {
    it("returns current date when no timezone", () => {
      const result = getTime();
      expect(result).toBeInstanceOf(Date);
    });

    it("returns date for valid timezone", () => {
      expect(getTime("UTC")).toBeInstanceOf(Date);
    });

    it("falls back to current date for invalid timezone", () => {
      const result = getTime("Invalid/Timezone");
      expect(result).toBeInstanceOf(Date);
    });
  });
});

describe("animation", () => {
  describe("easeOutBack", () => {
    it("returns 0 at progress 0", () => {
      expect(easeOutBack(0)).toBeCloseTo(0);
    });

    it("returns 1 at progress 1", () => {
      expect(easeOutBack(1)).toBe(1);
    });

    it("overshoots at intermediate values", () => {
      const result = easeOutBack(0.5);
      expect(result).toBeGreaterThan(0.5);
    });
  });

  describe("updateTickAnimation", () => {
    it("initializes animation state on second change", () => {
      const state = {
        lastSecond: -1,
        startAngle: 0,
        targetAngle: 0,
        animationStart: 0,
      };
      const result = updateTickAnimation(0, 1, state);
      expect(state.lastSecond).toBe(1);
      expect(state.startAngle).toBe(0);
      expect(state.targetAngle).toBe(6);
    });

    it("animates towards target second", () => {
      const state = {
        lastSecond: 0,
        startAngle: 0,
        targetAngle: 6,
        animationStart: performance.now() - 300, // halfway through animation
      };
      const result = updateTickAnimation(0, 1, state);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(1);
    });
  });
});

describe("ClockFace", () => {
  it("calculates angles from time state", () => {
    const clock = new ClockFace({
      hours: 3,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    const angles = clock.getAngles();
    expect(angles.hour).toBe(90);
    expect(angles.minute).toBe(0);
    expect(angles.second).toBe(0);
  });
});

describe("ClockWork", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("initializes with current time", () => {
    const clock = new ClockWork({});
    const state = clock.getState();
    expect(state).toHaveProperty("hours");
    expect(state).toHaveProperty("minutes");
    expect(state).toHaveProperty("seconds");
  });

  it("updates options", () => {
    const clock = new ClockWork({});
    clock.setOptions({ timezone: "UTC" });
    // Test that it doesn't throw
    expect(() => clock.updateSweep()).not.toThrow();
  });

  it("gets current date", () => {
    const clock = new ClockWork({});
    const date = clock.getCurrentDate();
    expect(typeof date).toBe("number");
    expect(date).toBeGreaterThan(0);
    expect(date).toBeLessThanOrEqual(31);
  });
});

describe("accuracy regressions", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not drop the sub-second term when milliseconds is exactly 0", () => {
    // A falsy check here used to fall through to whole seconds, snapping the
    // hand forward for one frame every time the clock read ms === 0.
    expect(calculateAngles(0, 0, 10, 0).second).toBe(60);
    expect(calculateAngles(0, 0, 10, 500).second).toBe(63);
  });

  it("sweeps in step with the wall clock, with no half-second offset", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 0, 1, 10, 30, 20, 250));

    const clock = new ClockWork({});
    clock.updateSweep();

    const state = clock.getState();
    expect(state.seconds).toBe(20);
    expect(state.milliseconds).toBe(250);

    // 20.25s * 6deg — the hand sits where the clock actually is.
    expect(calculateAngles(
      state.hours,
      state.minutes,
      state.seconds,
      state.milliseconds,
    ).second).toBeCloseTo(121.5);
  });

  it("keeps milliseconds when a timezone is applied", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 0, 1, 10, 30, 20, 250));

    // toLocaleString truncates to whole seconds; without restoring the
    // sub-second part a timezone-aware clock can never sweep smoothly.
    expect(getTime("UTC").getMilliseconds()).toBe(250);
    expect(getTime("Asia/Tokyo").getMilliseconds()).toBe(250);
  });

  it("snaps instead of easing when reducedMotion is set", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 0, 1, 10, 30, 45, 0));

    const eased = new ClockWork({});
    const snapped = new ClockWork({ reducedMotion: true });

    // Advance past the cached-read window so both pick up the new second.
    vi.setSystemTime(new Date(2026, 0, 1, 10, 30, 46, 0));
    vi.advanceTimersByTime(200);

    eased.updateTick();
    snapped.updateTick();

    // The eased clock is still travelling towards :46; the snapped one is there.
    expect(snapped.getState().seconds).toBe(46);
    expect(eased.getState().seconds).not.toBe(46);
  });
});

describe("formatClockLabel", () => {
  it("renders a 12-hour reading with padded minutes", () => {
    expect(formatClockLabel(14, 30)).toBe("2:30");
    expect(formatClockLabel(9, 5)).toBe("9:05");
  });

  it("renders midnight and noon as 12", () => {
    expect(formatClockLabel(0, 0)).toBe("12:00");
    expect(formatClockLabel(12, 0)).toBe("12:00");
  });

  it("floors fractional minutes from the tick interpolation", () => {
    expect(formatClockLabel(3, 7.94)).toBe("3:07");
  });
});

describe("tickDuration", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("defaults to DEFAULT_TICK_DURATION", () => {
    expect(DEFAULT_TICK_DURATION).toBe(600);
  });

  it("reaches the target sooner with a shorter duration", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 0, 1, 10, 30, 20, 0));

    const slow = new ClockWork({ tickDuration: 600 });
    const fast = new ClockWork({ tickDuration: 150 });

    // Move to the next second, then sample 200ms into the swing.
    vi.setSystemTime(new Date(2026, 0, 1, 10, 30, 21, 0));
    slow.updateTick();
    fast.updateTick();
    vi.advanceTimersByTime(200);
    slow.updateTick();
    fast.updateTick();

    const distance = (c: ClockWork) => Math.abs(c.getState().seconds - 21);

    // The fast clock has arrived; the slow one is still travelling.
    expect(distance(fast)).toBeLessThan(distance(slow));
  });

  it("snaps with no swing when the duration is 0", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 0, 1, 10, 30, 20, 0));

    const clock = new ClockWork({ tickDuration: 0 });
    clock.updateTick();

    vi.setSystemTime(new Date(2026, 0, 1, 10, 30, 21, 0));
    clock.updateTick();

    expect(clock.getState().seconds).toBe(21);
  });
});

describe("timezone switching", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("reflects a timezone change immediately in tick mode", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 0, 1, 10, 30, 20, 0));

    const clock = new ClockWork({ timezone: "UTC" });
    clock.updateTick();
    const utcHours = clock.getState().hours;

    // Tick mode only refreshes hours and minutes at the start of a minute, so
    // without an explicit refresh this would lag by up to 60 seconds.
    //
    // Both zones are named rather than relying on the machine's own: CI
    // runners are UTC, so comparing against local time asserts nothing there.
    // Tokyo observes no DST, so the offset is always exactly 9 hours.
    clock.setOptions({ timezone: "Asia/Tokyo" });

    expect(clock.getState().hours).toBe((utcHours + 9) % 24);
  });
});
