# DOM Package

The DOM package provides vanilla JavaScript classes for rendering clocks in any web application.

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

## CDN Usage

You can also use Clock UI directly from a CDN without installation. This is perfect for quick prototyping, CodePen examples, or when you don't want to set up a build system.

### Via UNPKG

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Clock UI CDN Example</title>
    <!-- Include Clock UI CSS -->
    <link rel="stylesheet" href="https://unpkg.com/@clock-ui/dom/base.css" />
  </head>
  <body>
    <!-- Clock containers -->
    <div id="static-clock" style="width: 200px; height: 200px;"></div>
    <div id="live-clock" style="width: 200px; height: 200px;"></div>

    <!-- Include Clock UI JavaScript -->
    <script src="https://unpkg.com/@clock-ui/dom/dist/index.js"></script>
    <script>
      // Static clock
      const staticClock = new clockui.LiveClockUI("#static-clock", {
        hours: 10,
        minutes: 30,
        seconds: 45,
        useRoman: true,
      });

      // Live clock
      const liveClock = new clockui.LiveClockUI("#live-clock", {
        smoothSweep: true,
        timezone: "America/New_York",
      });

      // Cleanup when page unloads
      window.addEventListener("beforeunload", () => {
        staticClock.destroy();
        liveClock.destroy();
      });
    </script>
  </body>
</html>
```

### Via jsDelivr

```html
<!-- CSS -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@clock-ui/styles@latest/base.css"
/>

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/@clock-ui/dom@latest/dist/index.js"></script>
```

### Specific Version

```html
<!-- Use a specific version for production -->
<link
  rel="stylesheet"
  href="https://unpkg.com/@clock-ui/styles@0.1.0/base.css"
/>
<script src="https://unpkg.com/@clock-ui/dom@0.1.0/dist/index.js"></script>
```

### CDN with ES Modules

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Clock UI ES Modules</title>
    <link rel="stylesheet" href="https://unpkg.com/@clock-ui/styles/base.css" />
  </head>
  <body>
    <div id="clock" style="width: 200px; height: 200px;"></div>

    <script type="module">
      import { LiveClockUI } from "https://unpkg.com/@clock-ui/dom/dist/index.js";

      const clock = new LiveClockUI("#clock", {
        timezone: "Europe/London",
        smoothSweep: true,
      });

      // Optional: Add custom styling
      document
        .getElementById("clock")
        .style.setProperty("--cui-primary-color", "#ff6b6b");
    </script>
  </body>
</html>
```

### CodePen Example

```html
<div id="clock" style="width: 200px; height: 200px;"></div>

<script src="https://unpkg.com/@clock-ui/dom/dist/index.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@clock-ui/styles/base.css" />

<script>
  const clock = new clockui.LiveClockUI("#clock", {
    smoothSweep: true,
    useRoman: true,
  });
</script>
```

## Usage

### Base Clock

Display a static clock at a specific time.

```html
<div id="clock"></div>
```

```javascript
import { BaseClockUI } from "@clock-ui/dom";

const clock = new BaseClockUI("#clock", {
  hours: 10,
  minutes: 30,
  seconds: 45,
});
```

### Live Clock

Display a live clock that updates in real-time.

```html
<div id="live-clock"></div>
```

```javascript
import { LiveClockUI } from "@clock-ui/dom";

const liveClock = new LiveClockUI("#live-clock", {
  smoothSweep: true,
  timezone: "America/New_York",
});
```

## Options

### Common Options

- `hideSeconds`: Hide the second hand
- `hideNumbers`: Hide hour numbers
- `useRoman`: Use Roman numerals
- `cardinalOnly`: Show only 3, 6, 9, 12
- `noBorder`: Remove clock border
- `hideTicks`: Hide all ticks
- `hideMajorTicks`: Hide hour ticks
- `hideMinorTicks`: Hide minute ticks
- `dualTone`: Enable dual-tone styling

### BaseClockOptions

Extends CommonClockOptions with:

- `hours`: Hour (0-23)
- `minutes`: Minutes (0-59)
- `seconds`: Seconds (0-59)
- `milliseconds`: Milliseconds

### LiveClockOptions

Extends CommonClockOptions with:

- `smoothSweep`: Smooth second hand
- `timezone`: Timezone string
- `hideDate`: Hide date display

## API

### BaseClockUI

- `update(options)`: Update clock time/options
- `destroy()`: Clean up

### LiveClockUI

- `start()`: Start animation
- `stop()`: Stop animation
- `setTimezone(tz)`: Change timezone
- `destroy()`: Clean up
