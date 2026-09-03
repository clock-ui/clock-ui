<script setup lang="ts">
import { ref } from "vue";
import { BaseClock, LiveClock } from "@clock-ui/vue";

const zone = ref("");

const ZONES = [
  { label: "Local", value: "" },
  { label: "New York", value: "America/New_York" },
  { label: "London", value: "Europe/London" },
  { label: "Tokyo", value: "Asia/Tokyo" },
];
</script>

<template>
  <h1>Clock UI — Vue</h1>
  <p class="lede">
    Every clock below is <code>@clock-ui/vue</code> consumed exactly as it is on
    npm. Edit <code>src/App.vue</code> and it hot-reloads.
  </p>

  <div class="grid">
    <figure>
      <LiveClock class="clock" smooth-sweep />
      <figcaption>Live · smooth sweep</figcaption>
    </figure>

    <figure>
      <LiveClock class="clock" />
      <figcaption>Live · ticking</figcaption>
    </figure>

    <figure>
      <LiveClock class="clock" :tick-duration="150" />
      <figcaption>Tick · 150ms swing</figcaption>
    </figure>

    <figure>
      <BaseClock class="clock" :hours="10" :minutes="9" :seconds="36" />
      <figcaption>Static · 10:09</figcaption>
    </figure>

    <figure>
      <LiveClock class="clock theme-midnight" smooth-sweep />
      <figcaption>Themed · midnight</figcaption>
    </figure>

    <figure>
      <LiveClock class="clock theme-vintage" use-roman />
      <figcaption>Themed · vintage</figcaption>
    </figure>

    <figure>
      <LiveClock class="clock" hide-ticks hide-numbers no-border hide-date />
      <figcaption>Minimal</figcaption>
    </figure>

    <figure>
      <LiveClock class="clock" :timezone="zone || undefined" />
      <figcaption>
        <select v-model="zone">
          <option v-for="z in ZONES" :key="z.label" :value="z.value">
            {{ z.label }}
          </option>
        </select>
      </figcaption>
    </figure>

    <figure>
      <BaseClock class="clock" :hours="9" :minutes="41">
        <template #info>SUN</template>
      </BaseClock>
      <figcaption>Custom info slot</figcaption>
    </figure>
  </div>
</template>
