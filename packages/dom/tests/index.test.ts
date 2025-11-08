import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { BaseClockUI, LiveClockUI } from "../src";

describe("BaseClockUI", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it("initializes with basic options", () => {
    const clock = new BaseClockUI(container, {
      hours: 3,
      minutes: 0,
      seconds: 0,
    });

    expect(clock).toBeInstanceOf(BaseClockUI);
    expect(container.classList.contains("clock-ui")).toBe(true);
    expect(container.querySelector(".clock-ui__face")).toBeTruthy();
  });

  it("renders clock face with numbers and ticks", () => {
    const clock = new BaseClockUI(container, {
      hours: 12,
      minutes: 0,
      seconds: 0,
    });

    const face = container.querySelector(".clock-ui__face");
    expect(face).toBeTruthy();
    expect(face?.querySelectorAll(".clock-ui__number")).toHaveLength(12);
    expect(face?.querySelectorAll(".clock-ui__tick")).toHaveLength(60);
  });

  it("hides seconds hand when hideSeconds is true", () => {
    const clock = new BaseClockUI(container, {
      hours: 12,
      minutes: 0,
      seconds: 0,
      hideSeconds: true,
    });

    const secondHand = container.querySelector(".clock-ui__hand--second");
    expect(secondHand).toBeFalsy();
  });

  it("hides numbers when hideNumbers is true", () => {
    const clock = new BaseClockUI(container, {
      hours: 12,
      minutes: 0,
      seconds: 0,
      hideNumbers: true,
    });

    const numbers = container.querySelectorAll(".clock-ui__number");
    expect(numbers).toHaveLength(0);
  });

  it("hides ticks when hideTicks is true", () => {
    const clock = new BaseClockUI(container, {
      hours: 12,
      minutes: 0,
      seconds: 0,
      hideTicks: true,
    });

    const ticks = container.querySelectorAll(".clock-ui__tick");
    expect(ticks).toHaveLength(0);
  });

  it("shows only cardinal numbers when cardinalOnly is true", () => {
    const clock = new BaseClockUI(container, {
      hours: 12,
      minutes: 0,
      seconds: 0,
      cardinalOnly: true,
    });

    const numbers = container.querySelectorAll(".clock-ui__number");
    expect(numbers).toHaveLength(4); // 3, 6, 9, 12
  });

  it("uses Roman numerals when useRoman is true", () => {
    const clock = new BaseClockUI(container, {
      hours: 12,
      minutes: 0,
      seconds: 0,
      useRoman: true,
    });

    const number = container.querySelector(".clock-ui__number");
    expect(number?.textContent?.trim()).toBe("I");
  });

  it("applies dual-tone class when dualTone is true", () => {
    const clock = new BaseClockUI(container, {
      hours: 12,
      minutes: 0,
      seconds: 0,
      dualTone: true,
    });

    expect(container.classList.contains("clock-ui--dual-tone")).toBe(true);
  });

  it("updates clock hands when update is called", () => {
    const clock = new BaseClockUI(container, {
      hours: 12,
      minutes: 0,
      seconds: 0,
    });

    clock.update({
      hours: 3,
      minutes: 30,
      seconds: 45,
    });

    const hourHand = container.querySelector(
      ".clock-ui__hand--hour",
    ) as HTMLElement;
    const minuteHand = container.querySelector(
      ".clock-ui__hand--minute",
    ) as HTMLElement;
    const secondHand = container.querySelector(
      ".clock-ui__hand--second",
    ) as HTMLElement;

    expect(hourHand?.style.getPropertyValue("--angle")).toBe("105.375"); // 3:30:45
    expect(minuteHand?.style.getPropertyValue("--angle")).toBe("184.5"); // 30 minutes + 45 seconds
    expect(secondHand?.style.getPropertyValue("--angle")).toBe("270"); // 45 seconds
  });

  it("destroys and cleans up", () => {
    const clock = new BaseClockUI(container, {
      hours: 12,
      minutes: 0,
      seconds: 0,
    });

    clock.destroy();

    expect(container.innerHTML).toBe("");
  });

  it("throws error when element not found", () => {
    expect(() => {
      new BaseClockUI(".nonexistent", {
        hours: 12,
        minutes: 0,
        seconds: 0,
      });
    }).toThrow("Clock root element not found");
  });
});

describe("LiveClockUI", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    document.body.removeChild(container);
  });

  it("initializes with basic options", () => {
    const clock = new LiveClockUI(container, {});

    expect(clock).toBeInstanceOf(LiveClockUI);
    expect(container.classList.contains("clock-ui")).toBe(true);
  });

  it("starts and stops animation", () => {
    const clock = new LiveClockUI(container, {});

    expect(clock).toHaveProperty("start");
    expect(clock).toHaveProperty("stop");

    clock.stop();
    // Should not throw
  });

  it("updates timezone", () => {
    const clock = new LiveClockUI(container, {});
    clock.setTimezone("UTC");
    // Should not throw
  });

  it("destroys and cleans up", () => {
    const clock = new LiveClockUI(container, {});
    clock.destroy();

    expect(container.innerHTML).toBe("");
  });

  it("exposes time properties", () => {
    const clock = new LiveClockUI(container, {});

    expect(clock).toHaveProperty("hours");
    expect(clock).toHaveProperty("minutes");
    expect(clock).toHaveProperty("seconds");
    expect(clock).toHaveProperty("milliseconds");
    expect(clock).toHaveProperty("currentDate");

    expect(typeof clock.hours).toBe("number");
    expect(typeof clock.minutes).toBe("number");
    expect(typeof clock.seconds).toBe("number");
    expect(typeof clock.milliseconds).toBe("number");
    expect(typeof clock.currentDate).toBe("number");
  });
});
