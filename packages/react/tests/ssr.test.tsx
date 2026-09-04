// @vitest-environment node

import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { LiveClock, BaseClock } from "../src";

const angles = (html: string) =>
  [...html.matchAll(/--angle:\s*([-\d.]+)/g)].map((m) => m[1]);

describe("server rendering", () => {
  it("renders LiveClock deterministically", () => {
    // Seeding state from the current time makes the server and the client
    // disagree on the hand angles, which React reports as a hydration
    // mismatch. The server must render a fixed position.
    const first = angles(renderToString(<LiveClock />));
    const second = angles(renderToString(<LiveClock smoothSweep />));

    expect(first).toEqual(second);
    expect(first.every((a) => Number(a) === 0)).toBe(true);
  });

  it("renders BaseClock from its props", () => {
    const html = renderToString(<BaseClock hours={2} minutes={30} />);

    expect(html).toContain('role="img"');
    expect(html).toContain('aria-label="2:30"');
  });
});
