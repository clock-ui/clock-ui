<script setup>
import { ref } from "vue";

const selectedTimezone = ref("America/New_York");
const cities = [
  { name: "New York", timezone: "America/New_York" },
  { name: "London", timezone: "Europe/London" },
  { name: "Tokyo", timezone: "Asia/Tokyo" },
  { name: "Sydney", timezone: "Australia/Sydney" },
];
</script>

# Examples & Recipes

This page showcases practical examples and common patterns for using Clock UI components in real applications.

## Basic Usage

### Simple Live Clock

<div class="clock-wrapper">
  <LiveClock />
</div>

::: code-group

```vue [Vue]
<script setup>
import { LiveClock } from "@clock-ui/vue";
import "@clock-ui/vue/base.css";
</script>

<template>
  <h1>Current Time</h1>
  <LiveClock />
</template>
```

```tsx [React]
import { LiveClock } from "@clock-ui/react";
import "@clock-ui/react/base.css";

export function Now() {
  return (
    <>
      <h1>Current Time</h1>
      <LiveClock />
    </>
  );
}
```

```js [DOM]
import { LiveClockUI } from "@clock-ui/dom";
import "@clock-ui/dom/base.css";

new LiveClockUI("#clock", {});
```

```html [Web Component]
<script type="module">
  import "@clock-ui/dom/element";
  import "@clock-ui/dom/base.css";
</script>

<clock-ui style="width: 240px"></clock-ui>
```

:::

### Static Time Display

<div class="clock-wrapper">
  <BaseClock :hours="14" :minutes="30" />
</div>

::: code-group

```vue [Vue]
<script setup>
import { BaseClock } from "@clock-ui/vue";
</script>

<template>
  <h2>Meeting at 2:30 PM</h2>
  <BaseClock :hours="14" :minutes="30" />
</template>
```

```tsx [React]
import { BaseClock } from "@clock-ui/react";

export function Meeting() {
  return (
    <>
      <h2>Meeting at 2:30 PM</h2>
      <BaseClock hours={14} minutes={30} />
    </>
  );
}
```

```js [DOM]
import { BaseClockUI } from "@clock-ui/dom";

new BaseClockUI("#meeting", { hours: 14, minutes: 30 });
```

```html [Web Component]
<clock-ui hours="14" minutes="30"></clock-ui>
```

:::

## Timezone Examples

### World Clock Dashboard

<div class="world-clock-grid">
  <div v-for="city in cities" :key="city.timezone" class="city-clock">
    <h3>{{ city.name }}</h3>
    <LiveClock :timezone="city.timezone" />
  </div>
</div>

::: code-group

```vue [Vue]
<script setup>
import { LiveClock } from "@clock-ui/vue";

const cities = [
  { name: "New York", timezone: "America/New_York" },
  { name: "London", timezone: "Europe/London" },
  { name: "Tokyo", timezone: "Asia/Tokyo" },
  { name: "Sydney", timezone: "Australia/Sydney" },
];
</script>

<template>
  <div class="world-clock-grid">
    <div v-for="city in cities" :key="city.timezone" class="city-clock">
      <h3>{{ city.name }}</h3>
      <LiveClock :timezone="city.timezone" />
    </div>
  </div>
</template>
```

```tsx [React]
import { LiveClock } from "@clock-ui/react";

const cities = [
  { name: "New York", timezone: "America/New_York" },
  { name: "London", timezone: "Europe/London" },
  { name: "Tokyo", timezone: "Asia/Tokyo" },
  { name: "Sydney", timezone: "Australia/Sydney" },
];

export function WorldClocks() {
  return (
    <div className="world-clock-grid">
      {cities.map((city) => (
        <div key={city.timezone} className="city-clock">
          <h3>{city.name}</h3>
          <LiveClock timezone={city.timezone} />
        </div>
      ))}
    </div>
  );
}
```

```js [DOM]
import { LiveClockUI } from "@clock-ui/dom";

const cities = [
  { name: "New York", timezone: "America/New_York" },
  { name: "London", timezone: "Europe/London" },
  { name: "Tokyo", timezone: "Asia/Tokyo" },
  { name: "Sydney", timezone: "Australia/Sydney" },
];

const grid = document.querySelector(".world-clock-grid");

for (const city of cities) {
  const cell = document.createElement("div");
  cell.className = "city-clock";
  cell.innerHTML = `<h3>${city.name}</h3><div></div>`;
  grid.append(cell);

  new LiveClockUI(cell.lastElementChild, { timezone: city.timezone });
}
```

```html [Web Component]
<div class="world-clock-grid">
  <div class="city-clock">
    <h3>New York</h3><clock-ui timezone="America/New_York"></clock-ui>
  </div>
  <div class="city-clock">
    <h3>London</h3><clock-ui timezone="Europe/London"></clock-ui>
  </div>
  <div class="city-clock">
    <h3>Tokyo</h3><clock-ui timezone="Asia/Tokyo"></clock-ui>
  </div>
  <div class="city-clock">
    <h3>Sydney</h3><clock-ui timezone="Australia/Sydney"></clock-ui>
  </div>
</div>
```

:::

The grid styling is the same in every case:

```css
.world-clock-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.city-clock {
  text-align: center;
}

.city-clock h3 {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}
```

### Timezone Converter

<div class="timezone-converter">
  <select v-model="selectedTimezone">
    <option value="America/New_York">Eastern Time</option>
    <option value="America/Chicago">Central Time</option>
    <option value="America/Denver">Mountain Time</option>
    <option value="America/Los_Angeles">Pacific Time</option>
  </select>
  <div class="clock-wrapper">
    <LiveClock :timezone="selectedTimezone" />
  </div>
</div>

::: code-group

```vue [Vue]
<script setup>
import { ref } from "vue";
import { LiveClock } from "@clock-ui/vue";

const selectedTimezone = ref("America/New_York");
</script>

<template>
  <div class="timezone-converter">
    <select v-model="selectedTimezone">
      <option value="America/New_York">Eastern Time</option>
      <option value="America/Chicago">Central Time</option>
      <option value="America/Denver">Mountain Time</option>
      <option value="America/Los_Angeles">Pacific Time</option>
    </select>
    <LiveClock :timezone="selectedTimezone" />
  </div>
</template>
```

```tsx [React]
import { useState } from "react";
import { LiveClock } from "@clock-ui/react";

const ZONES = [
  { label: "Eastern Time", value: "America/New_York" },
  { label: "Central Time", value: "America/Chicago" },
  { label: "Mountain Time", value: "America/Denver" },
  { label: "Pacific Time", value: "America/Los_Angeles" },
];

export function TimezoneConverter() {
  const [timezone, setTimezone] = useState(ZONES[0].value);

  return (
    <div className="timezone-converter">
      <select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
        {ZONES.map((zone) => (
          <option key={zone.value} value={zone.value}>
            {zone.label}
          </option>
        ))}
      </select>
      <LiveClock timezone={timezone} />
    </div>
  );
}
```

```js [DOM]
import { LiveClockUI } from "@clock-ui/dom";

const clock = new LiveClockUI("#clock", { timezone: "America/New_York" });

document.querySelector("#zone").addEventListener("change", (event) => {
  clock.setTimezone(event.target.value);
});
```

:::

```css
.timezone-converter {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
}

select {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
}
```

## Styling Examples

Everything below is done with CSS custom properties, so the recipes are
identical in every framework — only the markup that applies the class differs:

::: code-group

```vue [Vue]
<LiveClock class="dark-clock" />
```

```tsx [React]
<LiveClock className="dark-clock" />
```

```js [DOM]
new LiveClockUI("#clock", {}); // then: el.classList.add("dark-clock")
```

```html [Web Component]
<clock-ui class="dark-clock"></clock-ui>
```

:::


### Custom Themed Clock

<div class="clock-wrapper">
  <div class="dark-clock-wrapper">
    <LiveClock class="dark-clock" />
  </div>
</div>

```css
.dark-clock {
  --cui-bg-color: #1a1a1a;
  --cui-primary-color: #ffffff;
  --cui-secondary-color: #333333;
  --cui-accent-color: #ff6b6b;
}

.dark-clock-wrapper {
  background: #0f0f0f;
  padding: 2rem;
  border-radius: 8px;
  margin: 2rem 0;
}
```

### Minimalist Clock

<div class="clock-wrapper">
  <div class="minimalist-container">
    <LiveClock
      :hide-ticks="true"
      :hide-numbers="true"
      :no-border="true"
      hide-date
      class="minimal-clock"
    />
  </div>
</div>

::: code-group

```vue [Vue]
<LiveClock hide-ticks hide-numbers no-border hide-date class="minimal-clock" />
```

```tsx [React]
<LiveClock hideTicks hideNumbers noBorder hideDate className="minimal-clock" />
```

```js [DOM]
new LiveClockUI("#clock", {
  hideTicks: true,
  hideNumbers: true,
  noBorder: true,
  hideDate: true,
});
```

```html [Web Component]
<clock-ui hide-ticks hide-numbers no-border hide-date class="minimal-clock"></clock-ui>
```

:::

```css
.minimal-clock {
  --cui-bg-color: transparent;
  --cui-primary-color: #333333;
  --cui-accent-color: #666666;
}

.minimalist-container {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem;
  border-radius: 8px;
  margin: 2rem 0;
}
```

### Vintage Clock

<div class="clock-wrapper">
  <div class="vintage-container">
    <LiveClock :use-roman="true" class="vintage-clock" />
  </div>
</div>

::: code-group

```vue [Vue]
<LiveClock use-roman class="vintage-clock" />
```

```tsx [React]
<LiveClock useRoman className="vintage-clock" />
```

```js [DOM]
new LiveClockUI("#clock", { useRoman: true });
```

```html [Web Component]
<clock-ui use-roman class="vintage-clock"></clock-ui>
```

:::

Roman numerals are oriented radially, so the lower ones read upside down —
the traditional tower-clock style.

```css
.vintage-clock {
  --cui-font-family: "Times New Roman", serif;
  --cui-font-family-roman: "Times New Roman", serif;
  --cui-bg-color: #f5f5dc;
  --cui-primary-color: #8b4513;
  --cui-secondary-color: #daa520;
  --cui-accent-color: #dc143c;
}

.vintage-container {
  background: linear-gradient(135deg, #8b4513 0%, #daa520 100%);
  padding: 2rem;
  border-radius: 8px;
  margin: 2rem 0;
  border: 4px solid #8b4513;
}
```

## Advanced Examples

### Clock with Info Display

The small window on the face takes arbitrary content — a date, a weekday, a
label. In Vue it is the `info` slot; in React it is `children`; in the DOM
package it is the `info` option.

::: code-group

```vue [Vue]
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { LiveClock } from "@clock-ui/vue";

const currentDate = ref(new Date().toLocaleDateString());
let timer = null;

onMounted(() => {
  timer = setInterval(() => {
    currentDate.value = new Date().toLocaleDateString();
  }, 60_000);
});

onUnmounted(() => clearInterval(timer));
</script>

<template>
  <LiveClock hide-date>
    <template #info>
      <div class="date-display">{{ currentDate }}</div>
    </template>
  </LiveClock>
</template>
```

```tsx [React]
import { useEffect, useState } from "react";
import { LiveClock } from "@clock-ui/react";

export function ClockWithDate() {
  const [date, setDate] = useState(() => new Date().toLocaleDateString());

  useEffect(() => {
    const timer = setInterval(
      () => setDate(new Date().toLocaleDateString()),
      60_000,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <LiveClock hideDate>
      <div className="date-display">{date}</div>
    </LiveClock>
  );
}
```

```js [DOM]
import { BaseClockUI } from "@clock-ui/dom";

const clock = new BaseClockUI("#clock", {
  hours: 10,
  minutes: 9,
  info: new Date().toLocaleDateString(),
});

// Refresh the window whenever the value changes.
clock.update({ info: new Date().toLocaleDateString() });
```

:::

`hideDate` turns off the built-in day-of-month so it does not compete with your
own content.

```css
.date-display {
  font-size: 0.8rem;
  opacity: 0.8;
  text-align: center;
}
```

### Countdown Timer

Derive the remaining time from a fixed deadline rather than decrementing a
counter on an interval — `setInterval` drifts, and the error accumulates for as
long as the countdown runs.

::: code-group

```vue [Vue]
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { BaseClock } from "@clock-ui/vue";

const deadline = Date.now() + 5 * 60 * 1000;
const timeLeft = ref(5 * 60);
let frame = null;

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  return `${mins}:${String(seconds % 60).padStart(2, "0")}`;
};

onMounted(() => {
  const tick = () => {
    timeLeft.value = Math.max(0, Math.round((deadline - Date.now()) / 1000));
    frame = requestAnimationFrame(tick);
  };
  tick();
});

onUnmounted(() => {
  if (frame) cancelAnimationFrame(frame);
});
</script>

<template>
  <div class="countdown-container">
    <h3>Time Remaining: {{ formatTime(timeLeft) }}</h3>
    <BaseClock
      :hours="Math.floor(timeLeft / 3600)"
      :minutes="Math.floor((timeLeft % 3600) / 60)"
      :seconds="timeLeft % 60"
    />
  </div>
</template>
```

```tsx [React]
import { useEffect, useRef, useState } from "react";
import { BaseClock } from "@clock-ui/react";

const formatTime = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

export function Countdown({ minutes = 5 }) {
  const deadline = useRef(Date.now() + minutes * 60 * 1000);
  const [timeLeft, setTimeLeft] = useState(minutes * 60);

  useEffect(() => {
    let frame: number;
    const tick = () => {
      setTimeLeft(Math.max(0, Math.round((deadline.current - Date.now()) / 1000)));
      frame = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="countdown-container">
      <h3>Time Remaining: {formatTime(timeLeft)}</h3>
      <BaseClock
        hours={Math.floor(timeLeft / 3600)}
        minutes={Math.floor((timeLeft % 3600) / 60)}
        seconds={timeLeft % 60}
      />
    </div>
  );
}
```

```js [DOM]
import { BaseClockUI } from "@clock-ui/dom";

const deadline = Date.now() + 5 * 60 * 1000;
const clock = new BaseClockUI("#countdown", { hours: 0, minutes: 5 });
const label = document.querySelector("#countdown-label");

(function tick() {
  const left = Math.max(0, Math.round((deadline - Date.now()) / 1000));

  label.textContent =
    `${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`;

  clock.update({
    hours: Math.floor(left / 3600),
    minutes: Math.floor((left % 3600) / 60),
    seconds: left % 60,
  });

  requestAnimationFrame(tick);
})();
```

:::

```css
.countdown-container {
  text-align: center;
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
  padding: 2rem;
  border-radius: 8px;
  margin: 2rem 0;
}

.countdown-container h3 {
  margin-bottom: 1rem;
  color: #333;
}
```

### Analog + Digital Clock Combo

Read the clock once per frame from a single `Date` so the two readings can
never disagree.

::: code-group

```vue [Vue]
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { LiveClock } from "@clock-ui/vue";

const currentTime = ref(new Date().toLocaleTimeString());
let frame = null;

onMounted(() => {
  const tick = () => {
    currentTime.value = new Date().toLocaleTimeString();
    frame = requestAnimationFrame(tick);
  };
  tick();
});

onUnmounted(() => {
  if (frame) cancelAnimationFrame(frame);
});
</script>

<template>
  <div class="combo-clock">
    <LiveClock smooth-sweep />
    <div class="digital-time">{{ currentTime }}</div>
  </div>
</template>
```

```tsx [React]
import { useEffect, useState } from "react";
import { LiveClock } from "@clock-ui/react";

export function ComboClock() {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString());

  useEffect(() => {
    let frame: number;
    const tick = () => {
      setTime(new Date().toLocaleTimeString());
      frame = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="combo-clock">
      <LiveClock smoothSweep />
      <div className="digital-time">{time}</div>
    </div>
  );
}
```

```js [DOM]
import { LiveClockUI } from "@clock-ui/dom";

new LiveClockUI("#clock", { smoothSweep: true });

const digital = document.querySelector(".digital-time");

(function tick() {
  digital.textContent = new Date().toLocaleTimeString();
  requestAnimationFrame(tick);
})();
```

:::

```css
.combo-clock {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  padding: 2rem;
  border-radius: 8px;
  margin: 2rem 0;
}

.digital-time {
  font-size: 2rem;
  font-weight: bold;
  color: white;
  font-family: "Courier New", monospace;
}
```
