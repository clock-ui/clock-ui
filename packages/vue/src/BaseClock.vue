<script lang="ts" setup>
import type { BaseClockProps } from "./types/clock";
import {
  reactive,
  ref,
  onMounted,
  onUnmounted,
  watchEffect,
  useTemplateRef,
} from "vue";
import {
  calculateShadow,
  ClockFace,
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

const clockEl = useTemplateRef("clock");
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

const hourAngle = ref(0);
const minuteAngle = ref(0);
const secondAngle = ref(0);
const clockHandShadow = reactive({
  hour: "",
  minute: "",
  second: "",
});

watchEffect(() => {
  const clockFace = new ClockFace({ hours, minutes, seconds, milliseconds });

  const angles = clockFace.getAngles();

  // Calculate angles for each hand
  hourAngle.value = angles.hour;
  minuteAngle.value = angles.minute;
  secondAngle.value = angles.second;

  // Update shadows for each hand
  clockHandShadow.hour = calculateShadow(hourAngle.value, width.value);
  clockHandShadow.minute = calculateShadow(minuteAngle.value, width.value);
  clockHandShadow.second = calculateShadow(secondAngle.value, width.value, 8);
});
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
  >
    <div ref="clock" class="clock-ui__face">
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
        :style="{ '--angle': hourAngle, filter: clockHandShadow.hour }"
      ></div>

      <div
        class="clock-ui__hand--minute clock-ui__hand"
        :style="{ '--angle': minuteAngle, filter: clockHandShadow.minute }"
      ></div>

      <div
        v-if="!hideSeconds"
        class="clock-ui__hand--second clock-ui__hand"
        :style="{ '--angle': secondAngle, filter: clockHandShadow.second }"
      ></div>

      <div class="clock-ui__center"></div>
    </div>
  </div>
</template>
