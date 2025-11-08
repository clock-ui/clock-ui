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

```vue
<template>
  <div>
    <h1>Current Time</h1>
    <LiveClock />
  </div>
</template>

<script setup>
import { LiveClock } from "@clock-ui/vue";
</script>
```

### Static Time Display

<div class="clock-wrapper">
  <BaseClock :hours="14" :minutes="30" />
</div>

```vue
<template>
  <div>
    <h2>Meeting at 2:30 PM</h2>
    <BaseClock :hours="14" :minutes="30" />
  </div>
</template>

<script setup>
import { BaseClock } from "@clock-ui/vue";
</script>
```

## Timezone Examples

### World Clock Dashboard

<div class="world-clock-grid">
  <div v-for="city in cities" :key="city.timezone" class="city-clock">
    <h3>{{ city.name }}</h3>
    <LiveClock :timezone="city.timezone" />
  </div>
</div>

```vue
<template>
  <div class="world-clock-grid">
    <div v-for="city in cities" :key="city.timezone" class="city-clock">
      <h3>{{ city.name }}</h3>
      <LiveClock :timezone="city.timezone" />
    </div>
  </div>
</template>

<script setup>
import { LiveClock } from "@clock-ui/vue";

const cities = [
  { name: "New York", timezone: "America/New_York" },
  { name: "London", timezone: "Europe/London" },
  { name: "Tokyo", timezone: "Asia/Tokyo" },
  { name: "Sydney", timezone: "Australia/Sydney" },
];
</script>

<style scoped>
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
</style>
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

```vue
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

<script setup>
import { ref } from "vue";
import { LiveClock } from "@clock-ui/vue";

const selectedTimezone = ref("America/New_York");
</script>

<style scoped>
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
</style>
```

## Styling Examples

### Custom Themed Clock

<div class="clock-wrapper">
  <div class="dark-clock-wrapper">
    <LiveClock class="dark-clock" />
  </div>
</div>

```vue
<template>
  <div class="dark-clock-wrapper">
    <LiveClock class="dark-clock" />
  </div>
</template>

<script setup>
import { LiveClock } from "@clock-ui/vue";
</script>

<style scoped>
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
</style>
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

```vue
<template>
  <div class="minimalist-container">
    <LiveClock
      :hide-ticks="true"
      :hide-numbers="true"
      :no-border="true"
      class="minimal-clock"
    />
  </div>
</template>

<script setup>
import { LiveClock } from "@clock-ui/vue";
</script>

<style scoped>
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
</style>
```

### Vintage Clock

<div class="clock-wrapper">
  <div class="vintage-container">
    <LiveClock :use-roman="true" class="vintage-clock" />
  </div>
</div>

```vue
<template>
  <div class="vintage-container">
    <LiveClock :use-roman="true" class="vintage-clock" />
  </div>
</template>

<script setup>
import { LiveClock } from "@clock-ui/vue";
</script>

<style scoped>
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
</style>
```

## Advanced Examples

### Clock with Info Display

```vue
<template>
  <LiveClock>
    <template #info>
      <div class="date-display">
        {{ currentDate }}
      </div>
    </template>
  </LiveClock>
</template>

<script setup>
import { LiveClock } from "@clock-ui/vue";
import { ref, onMounted } from "vue";

const currentDate = ref("");

onMounted(() => {
  updateDate();
  setInterval(updateDate, 60000); // Update every minute
});

function updateDate() {
  currentDate.value = new Date().toLocaleDateString();
}
</script>

<style scoped>
.date-display {
  font-size: 0.8rem;
  opacity: 0.8;
  text-align: center;
}
</style>
```

### Countdown Timer

```vue
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

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { BaseClock } from "@clock-ui/vue";

const timeLeft = ref(300); // 5 minutes in seconds
let timer = null;

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

onMounted(() => {
  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    }
  }, 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped>
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
</style>
```

### Analog + Digital Clock Combo

```vue
<template>
  <div class="combo-clock">
    <LiveClock />
    <div class="digital-time">{{ currentTime }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { LiveClock } from "@clock-ui/vue";

const currentTime = ref("");

let timer = null;

onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

function updateTime() {
  currentTime.value = new Date().toLocaleTimeString();
}
</script>

<style scoped>
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
</style>
```
