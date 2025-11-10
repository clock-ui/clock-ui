import { mount } from "@vue/test-utils";
import { expect, test, vi, beforeEach, describe } from "vitest";
import { BaseClock, LiveClock } from "../src";

describe("BaseClock", () => {
  test("renders with default props", () => {
    const wrapper = mount(BaseClock, {
      props: {
        hours: 12,
        minutes: 0,
      },
    });

    const clockElement = wrapper.find(".clock-ui");
    expect(clockElement.exists()).toBe(true);
    expect(clockElement.classes()).toContain("clock-ui--bordered");
    expect(clockElement.classes()).toContain("clock-ui--dual-tone");
  });

  test("renders with custom props", () => {
    const wrapper = mount(BaseClock, {
      props: {
        hours: 3,
        minutes: 45,
        seconds: 30,
        hideSeconds: true,
        useRoman: true,
        noBorder: true,
        dualTone: false,
      },
    });

    const clockElement = wrapper.find(".clock-ui");
    expect(clockElement.classes()).toContain("clock-ui--roman");
    expect(clockElement.classes()).not.toContain("clock-ui--bordered");
    expect(clockElement.classes()).not.toContain("clock-ui--dual-tone");
  });

  test("renders clock hands", () => {
    const wrapper = mount(BaseClock, {
      props: {
        hours: 12,
        minutes: 0,
        seconds: 0,
      },
    });

    const hourHand = wrapper.find(".clock-ui__hand--hour");
    const minuteHand = wrapper.find(".clock-ui__hand--minute");
    const secondHand = wrapper.find(".clock-ui__hand--second");

    expect(hourHand.exists()).toBe(true);
    expect(minuteHand.exists()).toBe(true);
    expect(secondHand.exists()).toBe(true);
  });

  test("hides seconds hand when hideSeconds is true", () => {
    const wrapper = mount(BaseClock, {
      props: {
        hours: 12,
        minutes: 0,
        seconds: 0,
        hideSeconds: true,
      },
    });

    const secondHand = wrapper.find(".clock-ui__hand--second");
    expect(secondHand.exists()).toBe(false);
  });

  test("renders numbers when not hidden", () => {
    const wrapper = mount(BaseClock, {
      props: {
        hours: 12,
        minutes: 0,
        hideNumbers: false,
      },
    });

    const numbers = wrapper.findAll(".clock-ui__number");
    expect(numbers.length).toBeGreaterThan(0);
  });

  test("hides numbers when hideNumbers is true", () => {
    const wrapper = mount(BaseClock, {
      props: {
        hours: 12,
        minutes: 0,
        hideNumbers: true,
      },
    });

    const numbers = wrapper.findAll(".clock-ui__number");
    expect(numbers.length).toBe(0);
  });

  test("renders ticks when not hidden", () => {
    const wrapper = mount(BaseClock, {
      props: {
        hours: 12,
        minutes: 0,
        hideTicks: false,
      },
    });

    const ticks = wrapper.findAll(".clock-ui__tick");
    expect(ticks.length).toBeGreaterThan(0);
  });

  test("hides ticks when hideTicks is true", () => {
    const wrapper = mount(BaseClock, {
      props: {
        hours: 12,
        minutes: 0,
        hideTicks: true,
      },
    });

    const ticks = wrapper.findAll(".clock-ui__tick");
    expect(ticks.length).toBe(0);
  });
});

describe("LiveClock", () => {
  test("renders with default props", () => {
    const wrapper = mount(LiveClock);

    const clockElement = wrapper.find(".clock-ui");
    expect(clockElement.exists()).toBe(true);
    expect(clockElement.classes()).toContain("clock-ui--bordered");
    expect(clockElement.classes()).toContain("clock-ui--dual-tone");
  });

  test("passes props to BaseClock", () => {
    const wrapper = mount(LiveClock, {
      props: {
        hideSeconds: true,
        useRoman: true,
      },
    });

    const clockElement = wrapper.find(".clock-ui");
    expect(clockElement.classes()).toContain("clock-ui--roman");
    expect(clockElement.classes()).toContain("clock-ui--bordered");
    expect(clockElement.classes()).toContain("clock-ui--dual-tone");

    // Check that seconds hand is hidden
    const secondHand = wrapper.find(".clock-ui__hand--second");
    expect(secondHand.exists()).toBe(false);
  });

  test("initializes with current time", () => {
    const wrapper = mount(LiveClock);

    // The component should render without errors and initialize state
    const clockElement = wrapper.find(".clock-ui");
    expect(clockElement.exists()).toBe(true);
  });
});
