---
title: "Vue"
description: "Analog clock components for Vue: props, theming, and live examples."
---

# Vue Package

The Vue package provides Vue components for rendering clocks in Vue applications.

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

### BaseClock

Display a static clock at a specific time.

```vue
<template>
  <BaseClock :hours="10" :minutes="30" :seconds="45" />
</template>

<script setup>
import { BaseClock } from "@clock-ui/vue";
import "@clock-ui/vue/base.css";
</script>
```

### LiveClock

Display a live clock that updates in real-time.

```vue
<template>
  <LiveClock :smooth-sweep="true" timezone="America/New_York" />
</template>

<script setup>
import { LiveClock } from "@clock-ui/vue";
import "@clock-ui/vue/base.css";
</script>
```

## Props

### Shared

Both components accept these:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `useRoman` | `boolean` | `false` | Roman numerals instead of Arabic. Note that these are oriented radially, so the lower numerals read upside down — the traditional tower-clock style. |
| `cardinalOnly` | `boolean` | `false` | Show only 12, 3, 6, and 9. |
| `hideNumbers` | `boolean` | `false` | Hide all numerals. |
| `hideTicks` | `boolean` | `false` | Hide all tick marks. |
| `hideMajorTicks` | `boolean` | `false` | Hide the five-minute ticks. |
| `hideMinorTicks` | `boolean` | `false` | Hide the single-minute ticks. |
| `hideSeconds` | `boolean` | `false` | Hide the second hand. |
| `noBorder` | `boolean` | `false` | Drop the outer frame. |
| `dualTone` | `boolean` | `true` | Two-tone hands for contrast against the face. |

### `BaseClock`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `hours` | `number` | — | **Required.** 0–23. |
| `minutes` | `number` | — | **Required.** 0–59. |
| `seconds` | `number` | `0` | 0–59. |
| `milliseconds` | `number` | `0` | 0–999. Drives sub-second hand position. |
| — | — | — | Use the `#info` slot for the info window instead. |

### `LiveClock`

Takes the shared props plus:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `smoothSweep` | `boolean` | `false` | Continuous sweep instead of ticking. Ignored under `prefers-reduced-motion`. |
| `timezone` | `string` | — | IANA name, e.g. `"Asia/Tokyo"`. Defaults to local time. Invalid names fall back to local. |
| `hideDate` | `boolean` | `false` | Hide the date window. |
| `tickDuration` | `number` | `600` | How long the second hand takes to swing to each new mark, in milliseconds. `0` snaps with no swing. Ignored in sweep mode. |

`LiveClock` reads the clock itself, so it takes no `hours`/`minutes`.

### Types

Prop types are exported if you need to wrap the components:

```ts
import type {
  CommonClockProps,
  BaseClockProps,
  LiveClockProps,
} from "@clock-ui/vue";
```

### Slots

`BaseClock` exposes one named slot, `info`, rendered in the small window on the
face. `LiveClock` fills it with the day of the month unless `hideDate` is set.

```vue
<BaseClock :hours="10" :minutes="9">
  <template #info>SUN</template>
</BaseClock>
```

Vue props are kebab-case in templates: `smooth-sweep`, `use-roman`,
`cardinal-only`, `hide-major-ticks`, and so on.
