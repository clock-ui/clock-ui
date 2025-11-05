# @clock-ui/vue

Vue components for Clock UI, providing reactive clock widgets built with Vue 3 and Composition API.

## Installation

```bash
npm install @clock-ui/vue
```

or

```bash
pnpm add @clock-ui/vue
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
