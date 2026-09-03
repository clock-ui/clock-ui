# Examples

Runnable apps, one per way of consuming Clock UI. Each depends on the
`@clock-ui/*` packages through the workspace and imports them exactly as an npm
consumer would — from the built `dist`, with the stylesheet imported by hand.
That is deliberate: it means these apps exercise the real published surface
(the export map, the type conditions, the CSS entry), not the source tree.

| Directory | Uses | Port |
| --- | --- | --- |
| [`react`](react) | `@clock-ui/react` | 5310 |
| [`vue`](vue) | `@clock-ui/vue` | 5311 |
| [`vanilla`](vanilla) | `@clock-ui/dom` + `<clock-ui>` | 5312 |
| [`svelte`](svelte) | `<clock-ui>` | 5313 |
| [`solid`](solid) | `<clock-ui>` | 5314 |
| [`astro`](astro) | `<clock-ui>` | 5315 |

React and Vue have dedicated packages. Everything else uses the `<clock-ui>`
custom element, which needs no wrapper — that is the point of shipping one.

## Running one

From the repository root:

```bash
bun install
bun run example:react     # or vue / vanilla / svelte / solid / astro
```

Turbo builds the packages first, then starts Vite and opens your browser.
If the port is already taken, Vite picks the next free one and prints it. Edits
to the example hot-reload immediately.

To pick up a change to the **library** source, rebuild it — the examples read
`dist`, not `src`:

```bash
bun run build
```

Or run `bun run dev` in a second terminal for a watching build.

## What each one shows

- Live clocks in both sweep and tick mode, plus `tickDuration`
- A static clock via `BaseClock` / `BaseClockUI`
- Two themes, done entirely with `--cui-*` custom properties
- A minimal variant with the ticks, numerals and border switched off
- A timezone picker
- Vue additionally shows the `#info` slot; vanilla shows the imperative API
  and the custom element side by side

## Passing data to `<clock-ui>`

Frameworks disagree about this, and the element supports both. Svelte and Astro
write **attributes**; Solid, Lit, Angular's `[prop]` binding and React 19 write
**properties**. Every attribute is mirrored as a property that reflects back, so
either style works without a wrapper.

## Developing the library itself

These examples are for seeing the packages work as published. For fast
iteration on the library source there are also `packages/react/playground` and
`packages/vue/playground`, which import from `../../src` directly and so
hot-reload library changes without a rebuild:

```bash
cd packages/vue && bun run play
```
