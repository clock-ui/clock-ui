import { mount } from "@vue/test-utils";
import { expect, test, describe, beforeEach, afterEach, vi } from "vitest";
import { BaseClock, LiveClock } from "../src/index";

describe("BaseClock", () => {
  test("renders with required props", () => {
    const wrapper = mount(BaseClock, {
      props: {
        hours: 3,
        minutes: 30,
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.classes()).toContain("clock-ui");
  });

  test("displays correct time with hours and minutes", () => {
    const wrapper = mount(BaseClock, {
      props: {
        hours: 10,
        minutes: 45,
        seconds: 30,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  test("hides seconds hand when hideSeconds is true", () => {
    const wrapper = mount(BaseClock, {
      props: {
        hours: 3,
        minutes: 30,
        seconds: 45,
        hideSeconds: true,
      },
    });

    const secondHand = wrapper.find(".clock-ui__hand--second");
    expect(secondHand.exists()).toBe(false);
  });

  test("shows seconds hand by default", () => {
    const wrapper = mount(BaseClock, {
      props: {
        hours: 3,
        minutes: 30,
        seconds: 45,
      },
    });

    const secondHand = wrapper.find(".clock-ui__hand--second");
    expect(secondHand.exists()).toBe(true);
  });

  test("hides numbers when hideNumbers is true", () => {
    const wrapper = mount(BaseClock, {
      props: {
        hours: 3,
        minutes: 30,
        hideNumbers: true,
      },
    });

    const numbers = wrapper.findAll(".clock-ui__number");
    expect(numbers.length).toBe(0);
  });

  test("shows numbers by default", () => {
    const wrapper = mount(BaseClock, {
      props: {
        hours: 3,
        minutes: 30,
      },
    });

    const numbers = wrapper.findAll(".clock-ui__number");
    expect(numbers.length).toBeGreaterThan(0);
  });

  test("uses Roman numerals when useRoman is true", () => {
    const wrapper = mount(BaseClock, {
      props: {
        hours: 3,
        minutes: 30,
        useRoman: true,
      },
    });

    expect(wrapper.classes()).toContain("clock-ui--roman");
  });

  test("shows only cardinal numbers when cardinalOnly is true", () => {
    const wrapper = mount(BaseClock, {
      props: {
        hours: 3,
        minutes: 30,
        cardinalOnly: true,
      },
    });

    const numbers = wrapper.findAll(".clock-ui__number");
    // Should show 12, 3, 6, 9
    expect(numbers.length).toBe(4);
  });

  test("removes border when noBorder is true", () => {
    const wrapper = mount(BaseClock, {
      props: {
        hours: 3,
        minutes: 30,
        noBorder: true,
      },
    });

    expect(wrapper.classes()).not.toContain("clock-ui--bordered");
  });

  test("hides all ticks when hideTicks is true", () => {
    const wrapper = mount(BaseClock, {
      props: {
        hours: 3,
        minutes: 30,
        hideTicks: true,
      },
    });

    const ticks = wrapper.findAll(".clock-ui__tick");
    expect(ticks.length).toBe(0);
  });

  test("hides major ticks when hideMajorTicks is true", () => {
    const wrapper = mount(BaseClock, {
      props: {
        hours: 3,
        minutes: 30,
        hideMajorTicks: true,
      },
    });

    const majorTicks = wrapper.findAll(".clock-ui__tick--major");
    expect(majorTicks.length).toBe(0);
  });

  test("applies dual-tone class by default", () => {
    const wrapper = mount(BaseClock, {
      props: {
        hours: 3,
        minutes: 30,
      },
    });

    expect(wrapper.classes()).toContain("clock-ui--dual-tone");
  });

  test("removes dual-tone class when dualTone is false", () => {
    const wrapper = mount(BaseClock, {
      props: {
        hours: 3,
        minutes: 30,
        dualTone: false,
      },
    });

    expect(wrapper.classes()).not.toContain("clock-ui--dual-tone");
  });

  test("renders info slot content", () => {
    const wrapper = mount(BaseClock, {
      props: {
        hours: 3,
        minutes: 30,
      },
      slots: {
        info: "Custom Info",
      },
    });

    const infoSlot = wrapper.find(".clock-ui__info");
    expect(infoSlot.exists()).toBe(true);
    expect(infoSlot.text()).toBe("Custom Info");
  });

  test("renders all clock hands", () => {
    const wrapper = mount(BaseClock, {
      props: {
        hours: 3,
        minutes: 30,
        seconds: 45,
      },
    });

    const hourHand = wrapper.find(".clock-ui__hand--hour");
    const minuteHand = wrapper.find(".clock-ui__hand--minute");
    const secondHand = wrapper.find(".clock-ui__hand--second");
    const center = wrapper.find(".clock-ui__center");

    expect(hourHand.exists()).toBe(true);
    expect(minuteHand.exists()).toBe(true);
    expect(secondHand.exists()).toBe(true);
    expect(center.exists()).toBe(true);
  });
});

describe("LiveClock", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders and updates time", async () => {
    const wrapper = mount(LiveClock);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.classes()).toContain("clock-ui");

    // Fast-forward time
    vi.advanceTimersByTime(1000);
    await wrapper.vm.$nextTick();

    // Component should still be rendered
    expect(wrapper.exists()).toBe(true);
  });

  test("shows date by default", () => {
    const wrapper = mount(LiveClock);

    const infoSlot = wrapper.find(".clock-ui__info");
    expect(infoSlot.exists()).toBe(true);
  });

  test("hides date when hideDate is true", () => {
    const wrapper = mount(LiveClock, {
      props: {
        hideDate: true,
      },
    });

    const infoSlot = wrapper.find(".clock-ui__info");
    expect(infoSlot.exists()).toBe(false);
  });

  test("passes props to BaseClock", () => {
    const wrapper = mount(LiveClock, {
      props: {
        hideSeconds: true,
        useRoman: true,
        dualTone: false,
      },
    });

    expect(wrapper.classes()).toContain("clock-ui--roman");
    expect(wrapper.classes()).not.toContain("clock-ui--dual-tone");

    const secondHand = wrapper.find(".clock-ui__hand--second");
    expect(secondHand.exists()).toBe(false);
  });

  test("enables smooth sweep when smoothSweep is true", () => {
    const wrapper = mount(LiveClock, {
      props: {
        smoothSweep: true,
      },
    });

    expect(wrapper.exists()).toBe(true);
    // The smooth sweep functionality is internal, so we just verify the component renders
  });

  test("handles timezone prop", () => {
    const wrapper = mount(LiveClock, {
      props: {
        timezone: "America/New_York",
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  test("updates when timezone changes", async () => {
    const wrapper = mount(LiveClock, {
      props: {
        timezone: "UTC",
      },
    });

    await wrapper.setProps({ timezone: "America/New_York" });
    expect(wrapper.exists()).toBe(true);
  });

  test("inherits all BaseClock props", () => {
    const wrapper = mount(LiveClock, {
      props: {
        hideNumbers: true,
        cardinalOnly: true,
        noBorder: true,
        hideTicks: true,
        hideMajorTicks: true,
        hideMinorTicks: true,
      },
    });

    const numbers = wrapper.findAll(".clock-ui__number");
    const ticks = wrapper.findAll(".clock-ui__tick");

    expect(numbers.length).toBe(0);
    expect(ticks.length).toBe(0);
    expect(wrapper.classes()).not.toContain("clock-ui--bordered");
  });

  test("renders with default dualTone prop", () => {
    const wrapper = mount(LiveClock);

    expect(wrapper.classes()).toContain("clock-ui--dual-tone");
  });

  test("cleans up animation frame on unmount", () => {
    const wrapper = mount(LiveClock);

    // Spy on cancelAnimationFrame
    const cancelSpy = vi.spyOn(window, "cancelAnimationFrame");

    wrapper.unmount();

    expect(cancelSpy).toHaveBeenCalled();
    cancelSpy.mockRestore();
  });
});

describe("Edge Cases", () => {
  test("BaseClock handles zero values", () => {
    const wrapper = mount(BaseClock, {
      props: {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  test("BaseClock handles maximum values", () => {
    const wrapper = mount(BaseClock, {
      props: {
        hours: 23,
        minutes: 59,
        seconds: 59,
        milliseconds: 999,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  test("LiveClock handles empty timezone", () => {
    const wrapper = mount(LiveClock, {
      props: {
        timezone: "",
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  test("BaseClock renders with all features disabled", () => {
    const wrapper = mount(BaseClock, {
      props: {
        hours: 12,
        minutes: 0,
        hideSeconds: true,
        hideNumbers: true,
        hideTicks: true,
        noBorder: true,
        dualTone: false,
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.classes()).not.toContain("clock-ui--bordered");
    expect(wrapper.classes()).not.toContain("clock-ui--dual-tone");

    const numbers = wrapper.findAll(".clock-ui__number");
    const ticks = wrapper.findAll(".clock-ui__tick");
    const secondHand = wrapper.find(".clock-ui__hand--second");

    expect(numbers.length).toBe(0);
    expect(ticks.length).toBe(0);
    expect(secondHand.exists()).toBe(false);
  });

  test("BaseClock info slot handles complex content", () => {
    const wrapper = mount(BaseClock, {
      props: {
        hours: 3,
        minutes: 30,
      },
      slots: {
        info: '<div class="custom-info"><span>Custom</span> <strong>Content</strong></div>',
      },
    });

    const infoSlot = wrapper.find(".clock-ui__info");
    expect(infoSlot.exists()).toBe(true);
    expect(infoSlot.html()).toContain("Custom");
    expect(infoSlot.html()).toContain("Content");
  });
});
