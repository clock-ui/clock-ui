<div align="center">

# Clock UI

**Accurate, customizable analog clocks for the web.**

[![npm](https://img.shields.io/npm/v/@clock-ui/react?label=%40clock-ui%2Freact&color=cb3837)](https://www.npmjs.com/package/@clock-ui/react)
[![npm](https://img.shields.io/npm/v/@clock-ui/vue?label=%40clock-ui%2Fvue&color=42b883)](https://www.npmjs.com/package/@clock-ui/vue)
[![npm](https://img.shields.io/npm/v/@clock-ui/dom?label=%40clock-ui%2Fdom&color=f7df1e)](https://www.npmjs.com/package/@clock-ui/dom)
[![gzip size](https://img.shields.io/bundlejs/size/@clock-ui/dom?label=gzip)](https://bundlejs.com/?q=%40clock-ui%2Fdom)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<img src="https://clock-ui.github.io/clock-ui/clock.gif" alt="Two Clock UI clocks running side by side, one sweeping smoothly and one ticking" width="680">

[**Playground**](https://clock-ui.github.io/clock-ui/docs/playground) ·
[**Documentation**](https://clock-ui.github.io/clock-ui/) ·
[**Examples**](https://clock-ui.github.io/clock-ui/docs/examples)

</div>

## Why

- **Accurate.** The hands are driven from the wall clock on every frame, not from
  an interval that drifts. Sweep mode is millisecond-precise, in any timezone.
- **Customizable.** 19 CSS custom properties, no styling props to learn, and no
  stylesheet to fight. Theme it like any other element.
- **Small.** ~2.5 kB gzipped JavaScript plus ~1.1 kB of CSS, with zero runtime
  dependencies.
- **Accessible.** `role="img"` with a readable time label, and it honours
  `prefers-reduced-motion` — which matters, because all of its motion is
  JavaScript-driven and your own media query cannot switch it off.

Available for React, Vue 3, and vanilla DOM. Same look, same options, one API.

<img src="https://clock-ui.github.io/clock-ui/themes.png" alt="Four Clock UI themes: default, midnight, vintage roman, and minimal" width="960">

## Install

Pick the package for your framework. **Each one ships a stylesheet you must
import** — the clock renders at zero size without it.

### React

```bash
npm install @clock-ui/react
```

```jsx
import { LiveClock } from "@clock-ui/react";
import "@clock-ui/react/base.css";

export default () => <LiveClock smoothSweep />;
```

### Vue 3

```bash
npm install @clock-ui/vue
```

```vue
<script setup>
import { LiveClock } from "@clock-ui/vue";
import "@clock-ui/vue/base.css";
</script>

<template>
  <LiveClock smooth-sweep />
</template>
```

### Vanilla DOM

```bash
npm install @clock-ui/dom
```

```js
import { LiveClockUI } from "@clock-ui/dom";
import "@clock-ui/dom/base.css";

new LiveClockUI("#clock", { smoothSweep: true });
```

Or straight from a CDN, no build step:

```html
<link rel="stylesheet" href="https://unpkg.com/@clock-ui/dom@0.1/dist/index.css" />
<script src="https://unpkg.com/@clock-ui/dom@0.1/dist/index.umd.js"></script>
<div id="clock" style="width: 240px"></div>
<script>
  new ClockUI.LiveClockUI("#clock", { smoothSweep: true });
</script>
```

## Components

| Component | Purpose |
| --- | --- |
| `LiveClock` / `LiveClockUI` | Shows the current time and updates itself. Supports timezones and smooth sweep. |
| `BaseClock` / `BaseClockUI` | Shows a fixed time you pass in. Use it for static displays or to drive the hands yourself. |

Full prop tables live in the [documentation](https://clock-ui.github.io/clock-ui/docs/getting-started).

## Theming

Every colour is a CSS custom property, so you theme the clock from any ancestor:

```css
.my-clock {
  --cui-bg-color: #1f1a38;
  --cui-primary-color: #ead7d1;
  --cui-accent-color: #dd99bb;
}
```

See [CSS Customization](https://clock-ui.github.io/clock-ui/docs/styling) for all
19 variables, including per-element overrides for each hand, tick, and numeral.

## Packages

| Package | Version | Description |
| --- | --- | --- |
| [`@clock-ui/react`](packages/react) | [![npm](https://img.shields.io/npm/v/@clock-ui/react?label=)](https://www.npmjs.com/package/@clock-ui/react) | React 18 & 19 components |
| [`@clock-ui/vue`](packages/vue) | [![npm](https://img.shields.io/npm/v/@clock-ui/vue?label=)](https://www.npmjs.com/package/@clock-ui/vue) | Vue 3.5+ components |
| [`@clock-ui/dom`](packages/dom) | [![npm](https://img.shields.io/npm/v/@clock-ui/dom?label=)](https://www.npmjs.com/package/@clock-ui/dom) | Framework-free classes + UMD build |

## Contributing

Issues and pull requests are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md).

```bash
bun install
bun run test        # 68 tests
bun run typecheck
bun run dev
```

## License

MIT © [Robert Latamaosadi](https://github.com/latamaosadi)
