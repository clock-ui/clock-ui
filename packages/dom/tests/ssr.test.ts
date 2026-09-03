// @vitest-environment node

import { describe, it, expect } from "vitest";

// This file deliberately runs without a DOM. `class X extends HTMLElement` is
// evaluated at import time, so an unguarded custom element module throws the
// moment an SSR framework pulls it into the server bundle.
describe("server-side import safety", () => {
  it("imports the element module without a DOM", async () => {
    expect(globalThis.HTMLElement).toBeUndefined();

    const mod = await import("../src/element");

    expect(mod.ClockUIElement).toBeDefined();
    expect(typeof mod.defineClockUI).toBe("function");
  });

  it("defineClockUI is a no-op without customElements", async () => {
    const { defineClockUI } = await import("../src/element");

    expect(() => defineClockUI()).not.toThrow();
  });

  it("imports the main entry without a DOM", async () => {
    const mod = await import("../src/index");

    expect(mod.BaseClockUI).toBeDefined();
    expect(mod.LiveClockUI).toBeDefined();
  });
});
