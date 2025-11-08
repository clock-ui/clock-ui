---
layout: home
title: Clock UI
description: A beautiful clock component library for DOM, React, and Vue

hero:
  name: Clock UI
  text: A beautiful clock component library for DOM, React, and Vue
  tagline: Display elegant analog clocks in your applications with real-time updates, customization, and TypeScript support.
  #image:
  #  src: /logo.png
  #  alt: VitePress
  actions:
    - theme: brand
      text: Get Started
      link: /docs/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/clock-ui/clock-ui

features:
  - icon: 🎨
    title: Beautiful Design
    details: Elegant analog clock components with smooth animations
  - icon: ⚡
    title: Lightweight & Performant
    details: Minimal bundle size with optimized rendering
  - icon: 🕐
    title: Real-time Updates
    details: Live clocks that update every second
  - icon: 🎯
    title: TypeScript Support
    details: Full type safety and IntelliSense
  - icon: 🎪
    title: Highly Customizable
    details: Colors, sizes, timezones, and more
  - icon: 🌍
    title: Timezone Aware
    details: Display time in any timezone
  - icon: 📦
    title: Multi-framework
    details: Available for DOM, React, and Vue
---

<script setup>
import WithinHero from "/components/WithinHero.vue";
</script>

<WithinHero>
  <div style="max-width: 320px; margin: auto;">
    <LiveClock smooth-sweep />
  </div>
</WithinHero>
