<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import BaseClock from "./BaseClock.vue";
import type { LiveClockProps } from "./types/clock";
import { ClockWork } from "@clock-ui/utils";

const props = withDefaults(defineProps<LiveClockProps>(), {
  dualTone: true,
});

let clock = new ClockWork({ timezone: props.timezone });

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
  () => props.timezone,
  (tz) => {
    if (tz) {
      clock = new ClockWork({ timezone: tz });
    }
  }
);

function updateTime() {
  if (props.smoothSweep) {
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
