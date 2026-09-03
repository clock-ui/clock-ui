<div align="center">

# @clock-ui/vue

**Accurate, customizable analog clocks for Vue 3.5+.**

[![npm](https://img.shields.io/npm/v/@clock-ui/vue?color=42b883)](https://www.npmjs.com/package/@clock-ui/vue)
[![npm downloads](https://img.shields.io/npm/dm/@clock-ui/vue?color=blue)](https://www.npmjs.com/package/@clock-ui/vue)
[![gzip size](https://img.shields.io/bundlejs/size/@clock-ui/vue?label=gzip)](https://bundlejs.com/?q=%40clock-ui%2Fvue)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<img src="https://clock-ui.github.io/clock-ui/clock.gif" alt="Two Clock UI clocks running side by side, one sweeping smoothly and one ticking" width="640">

[**Playground**](https://clock-ui.github.io/clock-ui/docs/playground) ·
[**Documentation**](https://clock-ui.github.io/clock-ui/docs/vue) ·
[**Examples**](https://clock-ui.github.io/clock-ui/docs/examples)

</div>

## Installation

```bash
# npm
npm install @clock-ui/vue

# yarn
yarn add @clock-ui/vue

# pnpm
pnpm add @clock-ui/vue

# bun
bun add @clock-ui/vue
```

## Usage

### LiveClock

A real-time clock component that displays the current time.

```vue
<template>
  <LiveClock />
</template>

<script setup>
import { LiveClock } from "@clock-ui/vue";
import "@clock-ui/vue/base.css";
</script>
```

### BaseClock

A static clock component that displays a specific time.

```vue
<template>
  <BaseClock :hours="3" :minutes="30" :seconds="45" />
</template>

<script setup>
import { BaseClock } from "@clock-ui/vue";
import "@clock-ui/vue/base.css";
</script>
```

## API

### LiveClock Props

| Prop             | Type      | Default | Description                                       |
| ---------------- | --------- | ------- | ------------------------------------------------- |
| `hideSeconds`    | `boolean` | `false` | Hide the second hand                              |
| `hideNumbers`    | `boolean` | `false` | Hide hour numbers                                 |
| `useRoman`       | `boolean` | `false` | Use Roman numerals instead of Arabic              |
| `cardinalOnly`   | `boolean` | `false` | Show only cardinal hour numbers (3, 6, 9, 12)     |
| `noBorder`       | `boolean` | `false` | Remove clock border                               |
| `hideTicks`      | `boolean` | `false` | Hide all tick marks                               |
| `hideMajorTicks` | `boolean` | `false` | Hide major tick marks                             |
| `hideMinorTicks` | `boolean` | `false` | Hide minor tick marks                             |
| `dualTone`       | `boolean` | `true`  | Use dual-tone styling                             |
| `smoothSweep`    | `boolean` | `false` | Enable smooth second hand sweep                   |
| `timezone`       | `string`  | -       | Timezone for the clock (e.g., 'America/New_York') |
| `hideDate`       | `boolean` | `false` | Hide the date display                             |

### BaseClock Props

| Prop             | Type      | Default | Description                                   |
| ---------------- | --------- | ------- | --------------------------------------------- |
| `hours`          | `number`  | -       | Hour to display (required)                    |
| `minutes`        | `number`  | -       | Minutes to display (required)                 |
| `seconds`        | `number`  | `0`     | Seconds to display                            |
| `milliseconds`   | `number`  | `0`     | Milliseconds to display                       |
| `hideSeconds`    | `boolean` | `false` | Hide the second hand                          |
| `hideNumbers`    | `boolean` | `false` | Hide hour numbers                             |
| `useRoman`       | `boolean` | `false` | Use Roman numerals instead of Arabic          |
| `cardinalOnly`   | `boolean` | `false` | Show only cardinal hour numbers (3, 6, 9, 12) |
| `noBorder`       | `boolean` | `false` | Remove clock border                           |
| `hideTicks`      | `boolean` | `false` | Hide all tick marks                           |
| `hideMajorTicks` | `boolean` | `false` | Hide major tick marks                         |
| `hideMinorTicks` | `boolean` | `false` | Hide minor tick marks                         |
| `dualTone`       | `boolean` | `true`  | Use dual-tone styling                         |

## Slots

### BaseClock

- `info`: Content displayed in the center of the clock (used by LiveClock for date display)

## Development

### Install dependencies

```bash
npm install
```

### Run the playground

```bash
npm run play
```

### Run tests

```bash
npm run test
```

### Build the library

```bash
npm run build
```

### Type checking

```bash
npm run typecheck
```

## License

MIT © [Robert Latamaosadi](https://github.com/latamaosadi)
