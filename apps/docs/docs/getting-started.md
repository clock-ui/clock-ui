---
title: "Getting Started"
description: "Install Clock UI for React, Vue, or vanilla JavaScript and render your first analog clock."
---

# Getting Started

Clock UI renders accurate, themeable analog clocks. Pick the package for your
framework — you only need one.

::: warning Import the stylesheet
Every package ships a stylesheet you have to import yourself. Without it the
clock has no size and renders as an empty element. This is the single most
common setup mistake.
:::

## React

```bash
npm install @clock-ui/react
```

```tsx
import { LiveClock } from "@clock-ui/react";
import "@clock-ui/react/base.css";

export default function App() {
  return <LiveClock smoothSweep />;
}
```

Works with React 18 and 19. → [React reference](/docs/react)

## Vue 3

```bash
npm install @clock-ui/vue
```

```vue
<script setup>
import { LiveClock } from "@clock-ui/vue";
import "@clock-ui/vue/base.css";
</script>

<template>
  <LiveClock smooth-sweep />
</template>
```

Requires Vue 3.5 or newer. → [Vue reference](/docs/vue)

## Vanilla JavaScript

```bash
npm install @clock-ui/dom
```

```js
import { LiveClockUI } from "@clock-ui/dom";
import "@clock-ui/dom/base.css";

new LiveClockUI("#clock", { smoothSweep: true });
```

→ [DOM reference](/docs/dom), including the CDN build with no bundler.

## Sizing

The clock fills its container and stays square. Give the container a width:

```css
.clock-wrapper {
  width: 240px;
}
```

Internally the size is measured with a `ResizeObserver` and published as
`--cui-width`, which every other dimension is derived from. That means the
clock scales cleanly to any size without you passing a `size` prop.

## Next

- [Playground](/docs/playground) — every prop and colour, live.
- [CSS Customization](/docs/styling) — the 19 theming variables.
- [Examples & Recipes](/docs/examples) — world clocks, dark themes, countdowns.
- [Accessibility](/docs/accessibility) — what screen readers get, and reduced motion.
