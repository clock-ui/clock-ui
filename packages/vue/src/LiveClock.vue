<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import BaseClock from "./BaseClock.vue";
import type { LiveClockProps } from "./types/clock";
import { ClockWork } from "@clock-ui/utils";

const props = withDefaults(defineProps<LiveClockProps>(), {
  dualTone: true,
});

const clock = new ClockWork({
  timezone: props.timezone,
  tickDuration: props.tickDuration,
});

const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const milliseconds = ref(0);
const currentDate = ref(0);

let frameId: number | null = null;

onMounted(() => {
  const state = clock.getState();
  hours.value = state.hours;
  minutes.value = state.minutes;
  seconds.value = state.seconds;
  currentDate.value = clock.getCurrentDate();

  updateClock();
});

onBeforeUnmount(() => {
  if (frameId) cancelAnimationFrame(frameId);
});

watch(
  () => [props.timezone, props.tickDuration],
  ([tz, tickDuration]) => {
    // Assign unconditionally: clearing a prop must fall back to the default.
    clock.setOptions({
      timezone: tz as string | undefined,
      tickDuration: tickDuration as number | undefined,
    });
  }
);

// A continuously sweeping hand is exactly what prefers-reduced-motion asks us
// not to do, so fall back to tick mode when the user has opted out.
const reduceMotion = ref(false);

onMounted(() => {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");

  const apply = () => {
    reduceMotion.value = query.matches;
    clock.setOptions({ reducedMotion: query.matches });
  };

  apply();
  query.addEventListener("change", apply);

  onBeforeUnmount(() => {
    query.removeEventListener("change", apply);
  });
});

function updateTime() {
  if (props.smoothSweep && !reduceMotion.value) {
    clock.updateSweep();
  } else {
    clock.updateTick();
  }

  const state = clock.getState();

  hours.value = state.hours;
  minutes.value = state.minutes;
  seconds.value = state.seconds;
  milliseconds.value = state.milliseconds;

  currentDate.value = clock.getCurrentDate();
}

function updateClock() {
  const loop = () => {
    updateTime();
    frameId = requestAnimationFrame(loop);
  };
  frameId = requestAnimationFrame(loop);
}
</script>

<template>
  <BaseClock v-bind="props" :hours :minutes :seconds :milliseconds>
    <template v-if="!hideDate" #info>{{ currentDate }}</template>
  </BaseClock>
</template>
