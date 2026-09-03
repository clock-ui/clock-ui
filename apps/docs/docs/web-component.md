---
title: "Web Component"
description: "Use Clock UI as a <clock-ui> custom element in Svelte, Solid, Angular, Astro, Qwik, or plain HTML."
---

# Web Component

`@clock-ui/dom` also ships the clock as a custom element. Custom elements are
consumed natively by Svelte, Solid, Angular, Astro, Qwik, Lit, and plain HTML,
so this one element covers every framework that does not have a dedicated
Clock UI package.

```bash
npm install @clock-ui/dom
```

```js
import "@clock-ui/dom/element";
import "@clock-ui/dom/base.css";
```

```html
<clock-ui smooth-sweep></clock-ui>
```

Importing the module registers `<clock-ui>` for you.

## From a CDN

No bundler, no build step:

```html
<link rel="stylesheet" href="https://unpkg.com/@clock-ui/dom@0.1/dist/element.css" />
<script src="https://unpkg.com/@clock-ui/dom@0.1/dist/element.umd.js"></script>

<clock-ui smooth-sweep style="width: 240px"></clock-ui>
```

## Attributes

Props become kebab-case attributes. Presence means `true`; write `="false"` to
turn a default-on option off.

| Attribute | Type | Description |
| --- | --- | --- |
| `smooth-sweep` | boolean | Continuous sweep instead of ticking. |
| `timezone` | string | IANA name, e.g. `Asia/Tokyo`. |
| `tick-duration` | number | Swing duration in ms. Defaults to 600; `0` snaps. |
| `hours`, `minutes`, `seconds` | number | Setting `hours` **and** `minutes` renders a static clock instead of a live one. |
| `use-roman` | boolean | Roman numerals. |
| `cardinal-only` | boolean | Only 12, 3, 6, 9. |
| `hide-numbers`, `hide-ticks`, `hide-major-ticks`, `hide-minor-ticks`, `hide-seconds`, `hide-date` | boolean | Hide the named part. |
| `no-border` | boolean | Drop the outer frame. |
| `dual-tone` | boolean | On by default; use `dual-tone="false"` to disable. |

Attributes are observed, so changing one re-renders the clock.

```html
<!-- live, Tokyo, roman numerals -->
<clock-ui use-roman timezone="Asia/Tokyo"></clock-ui>

<!-- static 10:09, minimal -->
<clock-ui hours="10" minutes="9" cardinal-only no-border></clock-ui>
```

## Attributes or properties

Frameworks disagree about how to hand data to a custom element. Svelte and
Astro write attributes; Solid, Lit, Angular's `[prop]` binding and React 19
write properties. Every attribute above is mirrored as a camelCase property
that reflects back to it, so both styles work:

```js
el.setAttribute("timezone", "Asia/Tokyo"); // attribute
el.timezone = "Asia/Tokyo"; // property — same result
el.useRoman = true; // sets use-roman
```

## Light DOM, on purpose

`<clock-ui>` renders into the light DOM rather than a shadow root. That keeps
the stylesheet you imported and any inherited `--cui-*` custom properties
working exactly as they do everywhere else — a shadow root would cut both off.

The practical consequence is that theming works the same way as the rest of
Clock UI:

```css
clock-ui {
  width: 240px;
  --cui-bg-color: #1f1a38;
  --cui-primary-color: #ead7d1;
  --cui-accent-color: #dd99bb;
}
```

## Framework notes

The module is safe to import anywhere, including in a server bundle — it
detects the absence of `HTMLElement` and skips registration rather than
throwing. You do not need a dynamic import or a browser guard.

**Svelte, Solid, Astro, plain HTML** — import the module once and use the tag.
Nothing else to do. Runnable examples for each live in
[`examples/`](https://github.com/clock-ui/clock-ui/tree/main/examples).

### Angular

Angular's template compiler rejects unknown elements, so add
`CUSTOM_ELEMENTS_SCHEMA` to the component (or module) that uses the tag:

```ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "@clock-ui/dom/element";
import "@clock-ui/dom/base.css";

@Component({
  selector: "app-clock",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <clock-ui smooth-sweep [timezone]="zone"></clock-ui>
  `,
})
export class ClockComponent {
  zone = "Asia/Tokyo";
}
```

Angular's `[prop]` syntax sets a **property**, which works because every
attribute is mirrored as one. Static values can use plain attributes
(`smooth-sweep`) and dynamic ones either `[timezone]` or `[attr.timezone]`.

### Qwik

Qwik renders on the server first. The module import is safe there, but the
element only registers in the browser, so the clock appears on hydration:

```tsx
import { component$ } from "@builder.io/qwik";
import "@clock-ui/dom/element";
import "@clock-ui/dom/base.css";

export default component$(() => {
  return <clock-ui smooth-sweep style={{ width: "240px" }} />;
});
```

Because the server renders an empty `<clock-ui>`, give it a width in CSS so the
layout does not jump when the clock upgrades.

### Vue

Vue treats unknown tags as components unless told otherwise. If you use the
custom element rather than [`@clock-ui/vue`](/docs/vue), mark it in your build
config:

```ts
vue({
  template: {
    compilerOptions: {
      isCustomElement: (tag) => tag === "clock-ui",
    },
  },
});
```

### React

React 19 handles custom elements natively and passes non-string values as
properties, which this element supports. On React 18, pass strings as
attributes (`smooth-sweep=""`). Either way,
[`@clock-ui/react`](/docs/react) is the better fit.

## Registering under a different name

If `clock-ui` collides with something, register your own tag:

```js
import { defineClockUI } from "@clock-ui/dom/element";

defineClockUI("analog-clock");
```

Calling it more than once is safe — a tag that is already defined is skipped.
