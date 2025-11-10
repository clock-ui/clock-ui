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
