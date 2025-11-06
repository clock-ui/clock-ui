# @clock-ui/react

[![npm version](https://badge.fury.io/js/%40clock-ui%2Freact.svg)](https://badge.fury.io/js/%40clock-ui%2Freact)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

React components for Clock UI, providing live and static clock widgets built with React and hooks for reactive time updates.

## Installation

```bash
npm install @clock-ui/react
```

## Usage

### LiveClock

A live clock component that updates in real-time.

```tsx
import { LiveClock } from "@clock-ui/react";

function App() {
  return (
    <div>
      <LiveClock />
    </div>
  );
}
```

### BaseClock

A static clock component for displaying specific times.

```tsx
import { BaseClock } from "@clock-ui/react";

function App() {
  return (
    <div>
      <BaseClock hours={3} minutes={30} seconds={45} />
    </div>
  );
}
```

## Components

### LiveClock

A real-time clock component that automatically updates.

#### Props

| Prop             | Type      | Default | Description                                |
| ---------------- | --------- | ------- | ------------------------------------------ |
| `smoothSweep`    | `boolean` | `false` | Enables smooth second hand movement        |
| `timezone`       | `string`  | -       | Timezone string (e.g., 'America/New_York') |
| `hideDate`       | `boolean` | `false` | Hides date display                         |
| `hideSeconds`    | `boolean` | `false` | Hides the second hand                      |
| `hideNumbers`    | `boolean` | `false` | Hides hour numbers                         |
| `useRoman`       | `boolean` | `false` | Uses Roman numerals instead of Arabic      |
| `cardinalOnly`   | `boolean` | `false` | Shows only cardinal numbers (3, 6, 9, 12)  |
| `noBorder`       | `boolean` | `false` | Removes clock border                       |
| `hideTicks`      | `boolean` | `false` | Hides all tick marks                       |
| `hideMajorTicks` | `boolean` | `false` | Hides major tick marks                     |
| `hideMinorTicks` | `boolean` | `false` | Hides minor tick marks                     |
| `dualTone`       | `boolean` | `true`  | Enables dual-tone styling                  |

### BaseClock

A static clock component for displaying specific times.

#### Props

| Prop             | Type      | Default | Description                               |
| ---------------- | --------- | ------- | ----------------------------------------- |
| `hours`          | `number`  | -       | Hour (0-23)                               |
| `minutes`        | `number`  | -       | Minutes (0-59)                            |
| `seconds`        | `number`  | `0`     | Seconds (0-59)                            |
| `milliseconds`   | `number`  | `0`     | Milliseconds (0-999)                      |
| `hideSeconds`    | `boolean` | `false` | Hides the second hand                     |
| `hideNumbers`    | `boolean` | `false` | Hides hour numbers                        |
| `useRoman`       | `boolean` | `false` | Uses Roman numerals instead of Arabic     |
| `cardinalOnly`   | `boolean` | `false` | Shows only cardinal numbers (3, 6, 9, 12) |
| `noBorder`       | `boolean` | `false` | Removes clock border                      |
| `hideTicks`      | `boolean` | `false` | Hides all tick marks                      |
| `hideMajorTicks` | `boolean` | `false` | Hides major tick marks                    |
| `hideMinorTicks` | `boolean` | `false` | Hides minor tick marks                    |
| `dualTone`       | `boolean` | `true`  | Enables dual-tone styling                 |

## Styling

The components use CSS custom properties for theming. Import the CSS file to apply default styles:

```tsx
import "@clock-ui/react/dist/index.css";
```

## Examples

### Different Timezones

```tsx
<LiveClock timezone="America/New_York" />
<LiveClock timezone="Europe/London" />
<LiveClock timezone="Asia/Tokyo" />
```

### Custom Styling

```tsx
<LiveClock
  useRoman={true}
  cardinalOnly={true}
  noBorder={true}
  dualTone={false}
/>
```

### Static Time Display

```tsx
<BaseClock hours={12} minutes={0} seconds={0} />
<BaseClock hours={6} minutes={30} seconds={45} />
```

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

MIT © [Robert Latamaosadi](https://github.com/clock-ui/clock-ui)
