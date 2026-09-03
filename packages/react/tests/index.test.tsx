/// <reference types="@testing-library/jest-dom" />

import { render } from "@testing-library/react";
import { expect, test, vi, beforeEach, describe } from "vitest";
import { BaseClock } from "../src/BaseClock";
import { LiveClock } from "../src/LiveClock";

// @clock-ui/utils is exercised for real here — a hand-written mock of it
// silently drifts from the implementation it is standing in for.

// Mock matchMedia (not implemented in happy-dom)
global.matchMedia = vi.fn().mockImplementation((query: string) => ({
  matches: false,
  media: query,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(function () {
  return {
    observe: vi.fn(),
    disconnect: vi.fn(),
  };
});

describe("BaseClock", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders with default props", () => {
    const { container } = render(<BaseClock hours={12} minutes={0} />);

    const clockElement = container.querySelector(".clock-ui");
    expect(clockElement).toBeInTheDocument();
    expect(clockElement).toHaveClass(
      "clock-ui",
      "clock-ui--bordered",
      "clock-ui--dual-tone"
    );
  });

  test("renders with custom props", () => {
    const { container } = render(
      <BaseClock
        hours={3}
        minutes={45}
        seconds={30}
        hideSeconds={true}
        useRoman={true}
        noBorder={true}
        dualTone={false}
      />
    );

    const clockElement = container.querySelector(".clock-ui");
    expect(clockElement).toHaveClass("clock-ui", "clock-ui--roman");
    expect(clockElement).not.toHaveClass(
      "clock-ui--bordered",
      "clock-ui--dual-tone"
    );
  });

  test("renders clock hands", () => {
    const { container } = render(
      <BaseClock hours={12} minutes={0} seconds={0} />
    );

    const hourHand = container.querySelector(".clock-ui__hand--hour");
    const minuteHand = container.querySelector(".clock-ui__hand--minute");
    const secondHand = container.querySelector(".clock-ui__hand--second");

    expect(hourHand).toBeInTheDocument();
    expect(minuteHand).toBeInTheDocument();
    expect(secondHand).toBeInTheDocument();
  });

  test("hides seconds hand when hideSeconds is true", () => {
    const { container } = render(
      <BaseClock hours={12} minutes={0} seconds={0} hideSeconds={true} />
    );

    const secondHand = container.querySelector(".clock-ui__hand--second");
    expect(secondHand).not.toBeInTheDocument();
  });

  test("renders numbers when not hidden", () => {
    const { container } = render(
      <BaseClock hours={12} minutes={0} hideNumbers={false} />
    );

    const numbers = container.querySelectorAll(".clock-ui__number");
    expect(numbers.length).toBeGreaterThan(0);
  });

  test("hides numbers when hideNumbers is true", () => {
    const { container } = render(
      <BaseClock hours={12} minutes={0} hideNumbers={true} />
    );

    const numbers = container.querySelectorAll(".clock-ui__number");
    expect(numbers.length).toBe(0);
  });

  test("renders ticks when not hidden", () => {
    const { container } = render(
      <BaseClock hours={12} minutes={0} hideTicks={false} />
    );

    const ticks = container.querySelectorAll(".clock-ui__tick");
    expect(ticks.length).toBeGreaterThan(0);
  });

  test("hides ticks when hideTicks is true", () => {
    const { container } = render(
      <BaseClock hours={12} minutes={0} hideTicks={true} />
    );

    const ticks = container.querySelectorAll(".clock-ui__tick");
    expect(ticks.length).toBe(0);
  });
});

describe("LiveClock", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock requestAnimationFrame to not call callback immediately
    global.requestAnimationFrame = vi.fn(() => 1);
    global.cancelAnimationFrame = vi.fn();
  });

  test("renders with default props", () => {
    const { container } = render(<LiveClock />);

    const clockElement = container.querySelector(".clock-ui");
    expect(clockElement).toBeInTheDocument();
    expect(clockElement).toHaveClass(
      "clock-ui",
      "clock-ui--bordered",
      "clock-ui--dual-tone"
    );
  });

  test("passes props to BaseClock", () => {
    const { container } = render(
      <LiveClock hideSeconds={true} useRoman={true} />
    );

    const clockElement = container.querySelector(".clock-ui");
    expect(clockElement).toHaveClass(
      "clock-ui--roman",
      "clock-ui--bordered",
      "clock-ui--dual-tone"
    );

    // Check that seconds hand is hidden
    const secondHand = container.querySelector(".clock-ui__hand--second");
    expect(secondHand).not.toBeInTheDocument();
  });

  test("initializes with current time", () => {
    const { container } = render(<LiveClock />);

    // The component should render without errors and initialize state
    const clockElement = container.querySelector(".clock-ui");
    expect(clockElement).toBeInTheDocument();
  });
});

describe("class and style forwarding", () => {
  it("merges className onto the root, keeping its own classes", () => {
    const { container } = render(
      <BaseClock hours={10} minutes={9} className="dark-clock" />,
    );
    const root = container.querySelector(".clock-ui")!;

    // Theming works by putting --cui-* on the root, so a dropped className
    // silently breaks every themed clock.
    expect(root).toHaveClass("dark-clock");
    expect(root).toHaveClass("clock-ui");
    expect(root).toHaveClass("clock-ui--bordered");
  });

  it("merges style without clobbering the sizing variable", () => {
    const { container } = render(
      <BaseClock hours={10} minutes={9} style={{ opacity: 0.5 }} />,
    );
    const root = container.querySelector(".clock-ui") as HTMLElement;

    expect(root.style.opacity).toBe("0.5");
    expect(root.style.getPropertyValue("--cui-width")).toBe("0");
  });

  it("forwards className through LiveClock", () => {
    const { container } = render(<LiveClock className="themed" />);
    expect(container.querySelector(".clock-ui")).toHaveClass("themed");
  });
});
