---
title: "Server-side rendering"
description: "How Clock UI behaves under SSR in Next, Nuxt, SvelteKit, Astro and Qwik, and what to do about the first paint."
---

# Server-side rendering

Every package is safe to import and render on the server. Nothing reads
`window` or `document` at module scope, and `@clock-ui/dom/element` detects the
absence of `HTMLElement` and skips registration rather than throwing.

## What the server renders

`BaseClock` is a pure function of its props, so the server renders the time you
pass it.

`LiveClock` renders a **fixed position — 12:00:00 — on the server**, then fills
in the real time on mount. This is deliberate. The alternative is to read the
clock during render, which makes the server and the client disagree about every
hand angle and produces a hydration mismatch on each one.

```jsx
// Server output and first client render agree, so hydration is clean.
<LiveClock smoothSweep />
```

No `<ClientOnly>` wrapper, no `ssr: false`, no `suppressHydrationWarning`.

## The first paint

Two things are worth knowing about the moment before hydration.

**The hands sit at 12:00.** They snap to the real time as soon as the component
mounts. If a visible jump bothers you, render a `BaseClock` at a fixed time
instead, or hide the clock until mounted.

**The clock has no size until it is measured.** Every dimension derives from
`--cui-width`, which a `ResizeObserver` sets on mount, so server-rendered markup
carries no intrinsic size. Give the container an explicit one to avoid layout
shift:

```css
.clock-wrapper {
  width: 240px;
  aspect-ratio: 1;
}
```

That is worth doing whether or not you server-render — it is the difference
between a clock that appears and one that expands into place.

## Timezones

`timezone` is resolved with `Intl`, on whichever side is rendering. A server in
UTC and a browser in Tokyo both render 12:00:00 for `LiveClock`, so there is
nothing to disagree about — the real, zone-adjusted time arrives on mount.

## The custom element

`<clock-ui>` upgrades in the browser, so the server emits an empty element and
the clock appears on hydration. Give it a width in CSS for the same reason as
above:

```css
clock-ui {
  display: block;
  width: 240px;
}
```

## Framework notes

| Framework | What to do |
| --- | --- |
| Next.js | Nothing. Works in both the App and Pages router. |
| Nuxt | Nothing. No `<ClientOnly>` needed. |
| SvelteKit / Astro / Qwik | Use the [web component](/docs/web-component). |
| Angular Universal | Use the web component with `CUSTOM_ELEMENTS_SCHEMA`. |
