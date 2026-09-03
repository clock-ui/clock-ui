<script lang="ts" setup>
import type { BaseClockProps } from "./types/clock";
import { computed, ref, onMounted, onUnmounted } from "vue";
import {
  calculateShadow,
  ClockFace,
  formatClockLabel,
  getHoursToDisplay,
  getTicksToDisplay,
  romanNumerals,
} from "@clock-ui/utils";

const {
  hideSeconds,
  hideNumbers,
  useRoman,
  hours,
  minutes,
  seconds = 0,
  milliseconds = 0,
  cardinalOnly,
  noBorder,
  hideMinorTicks,
  hideMajorTicks,
  hideTicks,
  dualTone = true,
} = defineProps<BaseClockProps>();

const clockEl = ref<HTMLElement>();
const width = ref(0);

// Custom element size observer
onMounted(() => {
  if (!clockEl.value) return;

  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      width.value = entry.contentRect.width;
    }
  });

  resizeObserver.observe(clockEl.value);

  // Initial size
  width.value = clockEl.value.getBoundingClientRect().width;

  onUnmounted(() => {
    resizeObserver.disconnect();
  });
});

// Angles and shadows are pure functions of the props plus the measured width.
const angles = computed(() =>
  new ClockFace({ hours, minutes, seconds, milliseconds }).getAngles(),
);

const clockHandShadow = computed(() => ({
  hour: calculateShadow(angles.value.hour, width.value),
  minute: calculateShadow(angles.value.minute, width.value),
  second: calculateShadow(angles.value.second, width.value, 8),
}));

const label = computed(() => formatClockLabel(hours, minutes));
</script>

<template>
  <div
    :class="[
      'clock-ui',
      {
        'clock-ui--roman': useRoman,
        'clock-ui--bordered': !noBorder,
        'clock-ui--dual-tone': dualTone,
      },
    ]"
    :style="{ '--cui-width': width }"
    role="img"
    :aria-label="label"
  >
    <div ref="clockEl" class="clock-ui__face" aria-hidden="true">
      <template v-if="!hideTicks">
        <div
          v-for="tickIndex in getTicksToDisplay({
            major: !hideMajorTicks,
            minor: !hideMinorTicks,
          })"
          :key="tickIndex"
          class="clock-ui__tick"
          :class="{ 'clock-ui__tick--major': tickIndex % 5 === 0 }"
          :style="{ '--i': tickIndex }"
        />
      </template>

      <template v-if="!hideNumbers">
        <div
          v-for="hour in getHoursToDisplay(cardinalOnly)"
          :key="hour"
          :class="[
            'clock-ui__number',
            { 'clock-ui__number--cardinal': hour % 3 === 0 },
          ]"
          :style="{ '--n': hour }"
        >
          {{ useRoman ? romanNumerals[hour - 1] : hour }}
        </div>
      </template>

      <div v-if="$slots['info']" class="clock-ui__info">
        <slot name="info" />
      </div>

      <div
        class="clock-ui__hand--hour clock-ui__hand"
        :style="{ '--angle': angles.hour, filter: clockHandShadow.hour }"
      ></div>

      <div
        class="clock-ui__hand--minute clock-ui__hand"
        :style="{ '--angle': angles.minute, filter: clockHandShadow.minute }"
      ></div>

      <div
        v-if="!hideSeconds"
        class="clock-ui__hand--second clock-ui__hand"
        :style="{ '--angle': angles.second, filter: clockHandShadow.second }"
      ></div>

      <div class="clock-ui__center"></div>
    </div>
  </div>
</template>
