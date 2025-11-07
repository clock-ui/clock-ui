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
</script>
```

## Props

### Common Props

- `hideSeconds`: Hide the second hand
- `hideNumbers`: Hide hour numbers
- `useRoman`: Use Roman numerals
- `cardinalOnly`: Show only 3, 6, 9, 12
- `noBorder`: Remove clock border
- `hideTicks`: Hide all ticks
- `hideMajorTicks`: Hide hour ticks
- `hideMinorTicks`: Hide minute ticks
- `dualTone`: Enable dual-tone styling

### BaseClock Props

Extends CommonClockProps with:

- `hours`: Hour (0-23) - required
- `minutes`: Minutes (0-59) - required
- `seconds`: Seconds (0-59) - optional
- `milliseconds`: Milliseconds (0-999) - optional

### LiveClock Props

Extends CommonClockProps with:

- `smoothSweep`: Smooth second hand animation
- `timezone`: Timezone string (IANA format)
- `hideDate`: Hide date display
