import { LiveClockUI, BaseClockUI } from "./index";
import type { LiveClockOptions } from "./index";

/**
 * Boolean attributes, in the kebab-case form they take in markup.
 * Presence means true, `="false"` means false.
 */
const BOOLEAN_ATTRS = [
  "smooth-sweep",
  "use-roman",
  "cardinal-only",
  "hide-seconds",
  "hide-numbers",
  "hide-ticks",
  "hide-major-ticks",
  "hide-minor-ticks",
  "hide-date",
  "no-border",
  "dual-tone",
] as const;

const VALUE_ATTRS = [
  "timezone",
  "hours",
  "minutes",
  "seconds",
  "tick-duration",
] as const;

function camel(attr: string): string {
  return attr.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
}

/**
 * `HTMLElement` does not exist on the server, and `class X extends HTMLElement`
 * is evaluated as soon as the module is imported. Without this fallback the
 * module throws during SSR in Nuxt, Next, SvelteKit, Astro and Qwik — before
 * any of the guards below get a chance to run.
 */
const ElementBase: typeof HTMLElement =
  typeof HTMLElement === "undefined"
    ? (class {} as unknown as typeof HTMLElement)
    : HTMLElement;

/**
 * `<clock-ui>` — the clock as a custom element, for Svelte, Solid, Angular,
 * Astro, or plain HTML.
 *
 * Deliberately light DOM: the clock is themed through inherited `--cui-*`
 * custom properties and a stylesheet you import yourself, and a shadow root
 * would cut both off.
 *
 * ```html
 * <clock-ui smooth-sweep timezone="Asia/Tokyo"></clock-ui>
 * ```
 *
 * Passing `hours` and `minutes` renders a static clock instead of a live one.
 */
export class ClockUIElement extends ElementBase {
  static get observedAttributes(): string[] {
    return [...BOOLEAN_ATTRS, ...VALUE_ATTRS];
  }

  private clock: LiveClockUI | BaseClockUI | null = null;

  connectedCallback(): void {
    this.render();
  }

  disconnectedCallback(): void {
    this.clock?.destroy();
    this.clock = null;
  }

  attributeChangedCallback(): void {
    // Only rebuild once the element is actually in the document; the initial
    // attribute pass fires before connectedCallback.
    if (this.isConnected) this.render();
  }

  private readOptions(): Record<string, unknown> {
    const options: Record<string, unknown> = {};

    for (const attr of BOOLEAN_ATTRS) {
      if (!this.hasAttribute(attr)) continue;
      options[camel(attr)] = this.getAttribute(attr) !== "false";
    }

    for (const attr of VALUE_ATTRS) {
      const raw = this.getAttribute(attr);
      if (raw === null) continue;
      options[camel(attr)] = attr === "timezone" ? raw : Number(raw);
    }

    return options;
  }

  private render(): void {
    this.clock?.destroy();

    const options = this.readOptions();
    const isStatic =
      typeof options.hours === "number" && typeof options.minutes === "number";

    this.clock = isStatic
      ? new BaseClockUI(this, options as never)
      : new LiveClockUI(this, options as LiveClockOptions);
  }
}

/**
 * Mirror every attribute as a property.
 *
 * Frameworks disagree about how to pass data to a custom element: Svelte and
 * Astro write attributes, while Solid, Lit, Angular's `[prop]` binding and
 * React 19 write properties. An element that only observes attributes silently
 * ignores half of them, so each one gets an accessor that reflects back to the
 * attribute the element already watches.
 */
for (const attr of [...BOOLEAN_ATTRS, ...VALUE_ATTRS]) {
  const isBoolean = (BOOLEAN_ATTRS as readonly string[]).includes(attr);

  Object.defineProperty(ClockUIElement.prototype, camel(attr), {
    configurable: true,
    enumerable: true,

    get(this: ClockUIElement) {
      if (isBoolean) {
        return this.hasAttribute(attr) && this.getAttribute(attr) !== "false";
      }

      const raw = this.getAttribute(attr);
      if (raw === null) return undefined;
      return attr === "timezone" ? raw : Number(raw);
    },

    set(this: ClockUIElement, value: unknown) {
      if (value === null || value === undefined || value === false) {
        this.removeAttribute(attr);
        return;
      }

      this.setAttribute(attr, value === true ? "" : String(value));
    },
  });
}

/**
 * Register the element. Safe to call more than once.
 *
 * @param {string} [tagName] - Tag to register under
 *
 * @returns {void}
 */
export function defineClockUI(tagName = "clock-ui"): void {
  if (typeof customElements === "undefined") return;
  if (customElements.get(tagName)) return;
  customElements.define(tagName, ClockUIElement);
}

defineClockUI();
