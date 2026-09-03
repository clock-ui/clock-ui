<div align="center">

# @clock-ui/dom

**Accurate, customizable analog clocks for Vanilla JS.**

[![npm](https://img.shields.io/npm/v/@clock-ui/dom?color=f7df1e)](https://www.npmjs.com/package/@clock-ui/dom)
[![npm downloads](https://img.shields.io/npm/dm/@clock-ui/dom?color=blue)](https://www.npmjs.com/package/@clock-ui/dom)
[![gzip size](https://img.shields.io/bundlejs/size/@clock-ui/dom?label=gzip)](https://bundlejs.com/?q=%40clock-ui%2Fdom)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<img src="https://clock-ui.github.io/clock-ui/clock.gif" alt="Two Clock UI clocks running side by side, one sweeping smoothly and one ticking" width="640">

[**Playground**](https://clock-ui.github.io/clock-ui/docs/playground) ·
[**Documentation**](https://clock-ui.github.io/clock-ui/docs/dom) ·
[**Examples**](https://clock-ui.github.io/clock-ui/docs/examples)

</div>

## Installation

```bash
# npm
npm install @clock-ui/dom

# yarn
yarn add @clock-ui/dom

# pnpm
pnpm add @clock-ui/dom

# bun
bun add @clock-ui/dom
```

## Usage

### Live Clock

```html
<div id="clock"></div>
```

```js
import { LiveClockUI } from "@clock-ui/dom";
import "@clock-ui/dom/base.css";

const clock = new LiveClockUI("#clock", {
  hideSeconds: false,
  useRoman: false,
  dualTone: true,
  smoothSweep: true,
  timezone: "America/New_York",
});
```

### Static Clock

```html
<div id="static-clock"></div>
```

```js
import { BaseClockUI } from "@clock-ui/dom";
import "@clock-ui/dom/base.css";

const staticClock = new BaseClockUI("#static-clock", {
  hours: 3,
  minutes: 45,
  seconds: 30,
  hideSeconds: false,
  useRoman: true,
});
```

## CDN Usage

Include the CSS and JavaScript from a CDN:

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/@clock-ui/dom@0.1/dist/index.css"
/>
<script src="https://unpkg.com/@clock-ui/dom@0.1/dist/index.umd.js"></script>
```

### Live Clock

```html
<div id="clock"></div>

<script>
  const clock = new ClockUI.LiveClockUI("#clock", {
    hideSeconds: false,
    useRoman: false,
    dualTone: true,
    smoothSweep: true,
    timezone: "America/New_York",
  });
</script>
```

### Static Clock

```html
<div id="static-clock"></div>

<script>
  const staticClock = new ClockUI.BaseClockUI("#static-clock", {
    hours: 3,
    minutes: 45,
    seconds: 30,
    hideSeconds: false,
    useRoman: true,
  });
</script>
```

## API

### LiveClockUI Options

- `hideSeconds?: boolean` - Hide the second hand
- `hideNumbers?: boolean` - Hide hour numbers
- `useRoman?: boolean` - Use Roman numerals instead of Arabic
- `cardinalOnly?: boolean` - Show only cardinal hour numbers (3, 6, 9, 12)
- `noBorder?: boolean` - Remove clock border
- `hideTicks?: boolean` - Hide all ticks
- `hideMajorTicks?: boolean` - Hide major ticks (hour marks)
- `hideMinorTicks?: boolean` - Hide minor ticks (minute marks)
- `dualTone?: boolean` - Enable dual-tone styling
- `smoothSweep?: boolean` - Smooth second hand movement
- `timezone?: string` - Timezone for the clock
- `hideDate?: boolean` - Hide date display (if implemented)

### BaseClockUI Options

Extends CommonClockOptions with:

- `hours: number` - Hour to display (0-23)
- `minutes: number` - Minutes to display (0-59)
- `seconds?: number` - Seconds to display (0-59)
- `milliseconds?: number` - Milliseconds for precise positioning

### Methods

#### LiveClockUI

- `start()` - Start the live clock
- `stop()` - Stop the live clock
- `setTimezone(timezone: string)` - Change timezone
- `destroy()` - Cleanup and destroy the clock

#### BaseClockUI

- `update(options?: Partial<BaseClockOptions>)` - Update clock display
- `destroy()` - Cleanup and destroy the clock

## Styling

The component includes built-in CSS. Import it to apply default styles:

```js
import "@clock-ui/dom/base.css";
```

Customize appearance by overriding CSS variables or classes.

## License

MIT © [Robert Latamaosadi](https://github.com/clock-ui/clock-ui)
