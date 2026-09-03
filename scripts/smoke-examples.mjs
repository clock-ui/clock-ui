/**
 * Runtime smoke test for a built example.
 *
 * The unit tests import from `src`, and the example dev servers do not
 * tree-shake. Neither catches a package that builds fine but renders nothing
 * once a consumer bundles it for production — which is exactly how a stale
 * `sideEffects` field silently deleted the custom element from every
 * production build.
 *
 * This loads the real Vite output for examples/vanilla into a DOM and asserts
 * that clocks actually appear.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import assert from "node:assert/strict";
import { Window } from "happy-dom";

const dist = resolve("examples/vanilla/dist");
const html = readFileSync(join(dist, "index.html"), "utf8");

const bundle = readdirSync(join(dist, "assets")).find((f) => f.endsWith(".js"));
assert.ok(bundle, "no JS bundle found in examples/vanilla/dist/assets");

const window = new Window({ url: "http://localhost/" });

// Install the DOM globals the bundle expects before importing it.
for (const key of [
  "window", "document", "customElements", "HTMLElement", "Element",
  "Node", "CustomEvent", "Event", "getComputedStyle", "requestAnimationFrame",
  "cancelAnimationFrame", "MediaQueryList",
]) {
  if (window[key] === undefined) continue;

  // Some of these are getter-only on globalThis in Node.
  Object.defineProperty(globalThis, key, {
    value: window[key],
    configurable: true,
    writable: true,
  });
}

// happy-dom has no ResizeObserver. Report a real width so the clock sizes up —
// every dimension is derived from --cui-width.
globalThis.ResizeObserver = class {
  constructor(callback) {
    this.callback = callback;
  }
  observe(target) {
    // A real ResizeObserver delivers asynchronously. Firing synchronously here
    // would be overwritten by the initial getBoundingClientRect() read, which
    // is 0 outside a real browser.
    queueMicrotask(() =>
      this.callback([{ target, contentRect: { width: 240, height: 240 } }], this),
    );
  }
  disconnect() {}
};

globalThis.matchMedia = () => ({
  matches: false,
  addEventListener() {},
  removeEventListener() {},
});

document.documentElement.innerHTML = html
  .replace(/<script[^>]*>[\s\S]*?<\/script>/g, "")
  .replace(/<link[^>]*>/g, "");

await import(pathToFileURL(join(dist, "assets", bundle)).href);
await new Promise((r) => setTimeout(r, 50));

const failures = [];
const check = (label, condition, detail = "") => {
  if (!condition) failures.push(`${label}${detail ? ` — ${detail}` : ""}`);
  console.log(`${condition ? "✓" : "✗"} ${label}${detail && !condition ? ` — ${detail}` : ""}`);
};

// 1. The imperative API rendered.
const imperative = document.querySelectorAll("div.clock-ui");
check("imperative clocks rendered", imperative.length >= 4, `found ${imperative.length}`);

// 2. Hands, ticks and numerals are present — not just an empty root.
const faces = document.querySelectorAll(".clock-ui__face");
const hands = document.querySelectorAll(".clock-ui__hand");
check("clock faces rendered", faces.length >= 4, `found ${faces.length}`);
check("clock hands rendered", hands.length >= 12, `found ${hands.length}`);

// 3. The custom element survived tree-shaking and registered itself.
check("<clock-ui> is defined", !!customElements.get("clock-ui"));

const custom = [...document.querySelectorAll("clock-ui")];
const upgraded = custom.filter((el) => el.querySelector(".clock-ui__face"));
check("<clock-ui> elements upgraded", custom.length > 0 && upgraded.length === custom.length,
  `${upgraded.length}/${custom.length}`);

// 4. Accessible label is populated, which means the time actually resolved.
const labelled = [...document.querySelectorAll(".clock-ui")]
  .filter((el) => /^\d{1,2}:\d{2}$/.test(el.getAttribute("aria-label") ?? ""));
check("clocks expose an aria-label", labelled.length >= 4, `found ${labelled.length}`);

// 5. Sizing reached the DOM.
const sized = [...document.querySelectorAll(".clock-ui")]
  .filter((el) => Number(el.style.getPropertyValue("--cui-width")) > 0);
check("clocks received a width", sized.length >= 4, `found ${sized.length}`);

await window.happyDOM.close();

if (failures.length) {
  console.error(`\n${failures.length} check(s) failed:\n  ${failures.join("\n  ")}`);
  process.exit(1);
}
console.log("\nAll example smoke checks passed.");
