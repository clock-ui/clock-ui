---
title: "React"
description: "Analog clock components for React: props, theming, and live examples."
---

# React Package

The React package provides React components for rendering clocks in React applications.

## Installation

```bash
# npm
npm install @clock-ui/react

# yarn
yarn add @clock-ui/react

# pnpm
pnpm add @clock-ui/react

# bun
bun add @clock-ui/react
```

## Usage

### BaseClock

Display a static clock at a specific time.

```tsx
import { BaseClock } from "@clock-ui/react";
import "@clock-ui/react/base.css";

function App() {
  return <BaseClock hours={10} minutes={30} seconds={45} />;
}
```

### LiveClock

Display a live clock that updates in real-time.

```tsx
import { LiveClock } from "@clock-ui/react";
import "@clock-ui/react/base.css";

function App() {
  return <LiveClock smoothSweep={true} timezone="America/New_York" />;
}
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
| `children` | `ReactNode` | — | Rendered in the face's info window, e.g. a date. |

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
} from "@clock-ui/react";
```
