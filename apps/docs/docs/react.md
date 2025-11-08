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

function App() {
  return <BaseClock hours={10} minutes={30} seconds={45} />;
}
```

### LiveClock

Display a live clock that updates in real-time.

```tsx
import { LiveClock } from "@clock-ui/react";

function App() {
  return <LiveClock smoothSweep={true} timezone="America/New_York" />;
}
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
- `dualTone`: Enable dual-tone styling (default: true)

### BaseClock Props

Extends CommonClockProps with:

- `hours`: Hour (0-23) - required
- `minutes`: Minutes (0-59) - required
- `seconds`: Seconds (0-59) - optional, default 0
- `milliseconds`: Milliseconds (0-999) - optional, default 0

### LiveClock Props

Extends CommonClockProps with:

- `smoothSweep`: Smooth second hand animation
- `timezone`: Timezone string (IANA format)
- `hideDate`: Hide date display
