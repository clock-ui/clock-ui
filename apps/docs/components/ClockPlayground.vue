<script setup lang="ts">
import { computed, reactive, ref } from "vue";

const TOGGLES = [
  { key: "smoothSweep", label: "Smooth sweep" },
  { key: "useRoman", label: "Roman numerals" },
  { key: "cardinalOnly", label: "Cardinal hours only" },
  { key: "hideSeconds", label: "Hide second hand" },
  { key: "hideNumbers", label: "Hide numbers" },
  { key: "hideTicks", label: "Hide all ticks" },
  { key: "hideMajorTicks", label: "Hide major ticks" },
  { key: "hideMinorTicks", label: "Hide minor ticks" },
  { key: "hideDate", label: "Hide date" },
  { key: "noBorder", label: "No border" },
  { key: "dualTone", label: "Dual tone" },
] as const;

type ToggleKey = (typeof TOGGLES)[number]["key"];

const props = reactive<Record<ToggleKey, boolean>>({
  smoothSweep: true,
  useRoman: false,
  cardinalOnly: false,
  hideSeconds: false,
  hideNumbers: false,
  hideTicks: false,
  hideMajorTicks: false,
  hideMinorTicks: false,
  hideDate: false,
  noBorder: false,
  dualTone: true,
});

const colors = reactive({
  "--cui-bg-color": "#e8ebe4",
  "--cui-primary-color": "#13293d",
  "--cui-secondary-color": "#e8ebe4",
  "--cui-accent-color": "#f55d3e",
});

const timezone = ref("");
const tickDuration = ref(600);

const ZONES = [
  { label: "Local time", value: "" },
  { label: "New York", value: "America/New_York" },
  { label: "London", value: "Europe/London" },
  { label: "Tokyo", value: "Asia/Tokyo" },
  { label: "Sydney", value: "Australia/Sydney" },
];

// dualTone defaults to true, so only surface it in the snippet when turned off.
const activeProps = computed(() =>
  TOGGLES.filter(({ key }) =>
    key === "dualTone" ? !props[key] : props[key],
  ).map(({ key }) => (key === "dualTone" ? "dual-tone=\"false\"" : kebab(key))),
);

function kebab(value: string) {
  return value.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
}

const snippet = computed(() => {
  const attrs = [...activeProps.value];
  if (timezone.value) attrs.push(`timezone="${timezone.value}"`);
  if (tickDuration.value !== 600)
    attrs.push(`:tick-duration="${tickDuration.value}"`);

  const overrides = Object.entries(colors)
    .filter(([key, value]) => value.toLowerCase() !== DEFAULTS[key])
    .map(([key, value]) => `  ${key}: ${value};`);

  const tag = attrs.length
    ? `<LiveClock\n  ${attrs.join("\n  ")}\n/>`
    : "<LiveClock />";

  if (!overrides.length) return tag;

  return `${tag}\n\n<style>\n.my-clock {\n${overrides.join("\n")}\n}\n</style>`;
});

const DEFAULTS: Record<string, string> = {
  "--cui-bg-color": "#e8ebe4",
  "--cui-primary-color": "#13293d",
  "--cui-secondary-color": "#e8ebe4",
  "--cui-accent-color": "#f55d3e",
};

function reset() {
  Object.assign(props, {
    smoothSweep: true,
    useRoman: false,
    cardinalOnly: false,
    hideSeconds: false,
    hideNumbers: false,
    hideTicks: false,
    hideMajorTicks: false,
    hideMinorTicks: false,
    hideDate: false,
    noBorder: false,
    dualTone: true,
  });
  Object.assign(colors, DEFAULTS);
  timezone.value = "";
  tickDuration.value = 600;
}
</script>

<template>
  <div class="playground">
    <div class="playground__stage" :style="colors">
      <ClientOnly>
        <LiveClock
          v-bind="{
            ...props,
            timezone: timezone || undefined,
            tickDuration,
          }"
        />
      </ClientOnly>
    </div>

    <div class="playground__controls">
      <fieldset>
        <legend>Props</legend>
        <label v-for="toggle in TOGGLES" :key="toggle.key">
          <input type="checkbox" v-model="props[toggle.key]" />
          <code>{{ toggle.key }}</code>
        </label>
      </fieldset>

      <fieldset>
        <legend>Timezone</legend>
        <select v-model="timezone">
          <option v-for="zone in ZONES" :key="zone.value" :value="zone.value">
            {{ zone.label }}
          </option>
        </select>
      </fieldset>

      <fieldset :disabled="props.smoothSweep">
        <legend>Tick duration</legend>
        <div class="slider">
          <input type="range" min="0" max="800" step="50" v-model.number="tickDuration" />
          <output>{{ tickDuration }}ms</output>
        </div>
        <p class="hint">
          {{ props.smoothSweep
            ? "Sweep mode moves continuously — turn it off to feel this."
            : "How long the second hand takes to swing to each new mark. 0 snaps." }}
        </p>
      </fieldset>

      <fieldset>
        <legend>Colors</legend>
        <label v-for="(_, key) in colors" :key="key">
          <input type="color" v-model="colors[key]" />
          <code>{{ key }}</code>
        </label>
      </fieldset>

      <button type="button" @click="reset">Reset</button>
    </div>
  </div>

  <div class="language-vue playground__code">
    <pre><code>{{ snippet }}</code></pre>
  </div>
</template>

<style scoped>
.playground {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  align-items: start;
  margin: 1.5rem 0;
}

@media (min-width: 720px) {
  .playground {
    grid-template-columns: minmax(0, 260px) 1fr;
  }
}

.playground__stage {
  display: flex;
  justify-content: center;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.playground__stage :deep(.clock-ui) {
  width: 100%;
  max-width: 220px;
}

.playground__controls {
  display: grid;
  gap: 1rem;
}

fieldset {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem 1rem 1rem;
}

legend {
  padding: 0 0.4rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.15rem 0;
  font-size: 0.875rem;
  cursor: pointer;
}

fieldset:first-of-type {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

select {
  width: 100%;
  padding: 0.35rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.slider {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.slider input[type="range"] {
  flex: 1;
}

.slider output {
  min-width: 4.5em;
  font-size: 0.85rem;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-2);
}

fieldset[disabled] {
  opacity: 0.5;
}

.hint {
  margin: 0.6rem 0 0;
  font-size: 0.78rem;
  line-height: 1.4;
  color: var(--vp-c-text-3);
}

input[type="color"] {
  width: 2rem;
  height: 1.5rem;
  padding: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: none;
  cursor: pointer;
}

button {
  justify-self: start;
  padding: 0.4rem 0.9rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
  cursor: pointer;
}

button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.playground__code pre {
  margin: 0;
}
</style>
