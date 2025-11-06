<script setup lang="ts">
import { LiveClock } from "../../src";
</script>

<template>
  <div style="display: grid; gap: 1rem; grid-template-columns: 1fr 1fr 1fr">
    <LiveClock smooth-sweep />
    <LiveClock use-roman />
    <LiveClock smooth-sweep hide-ticks cardinal-only />
  </div>
</template>
