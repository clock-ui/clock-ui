# Contributing to Clock UI

Thanks for taking the time. Bug reports, docs fixes, and new theme recipes are
all welcome.

## Setup

Clock UI is a Bun + Turborepo monorepo. You need Bun 1.3+.

```bash
git clone https://github.com/clock-ui/clock-ui.git
cd clock-ui
bun install
```

## Layout

| Path | What it is |
| --- | --- |
| `packages/utils` | Time reading, angle math, tick easing. Private, bundled into the others. |
| `packages/styles` | The single stylesheet. Private, bundled into the others. |
| `packages/dom` | Framework-free classes plus the UMD build. |
| `packages/react` | React components. |
| `packages/vue` | Vue 3 components. |
| `apps/docs` | The VitePress site. |

`utils` and `styles` are `private: true` and are inlined at build time. That is
why the published packages have no runtime dependencies — keep it that way.

## Commands

```bash
bun run test        # vitest across every package
bun run typecheck   # tsc / vue-tsc
bun run build       # tsdown, all packages
bun run dev         # watch mode
bun run docs:dev    # the documentation site
```

Per-package playgrounds, useful for eyeballing a change:

```bash
cd packages/vue   && bun run play
cd packages/react && bun run play
```

## Before you open a PR

1. `bun run test` and `bun run typecheck` both pass.
2. `bunx publint --strict` passes in any package whose `package.json` you touched.
3. Add a changeset: `bun run changeset`. Skip this only for docs-only changes.

## Things worth knowing

- **The clock's motion is JavaScript-driven**, not CSS transitions. A
  `prefers-reduced-motion` media query cannot switch it off from the outside,
  which is why `ClockWork` takes a `reducedMotion` flag. If you add motion,
  make sure that flag still disables it.
- **Accuracy is a feature.** The hands are derived from the wall clock on every
  frame rather than accumulated from an interval. Don't introduce drift.
- **The face is `aria-hidden`** and the readable time lives in the root's
  `aria-label`. New visual elements go inside the face; new *information* needs
  to reach the label.
- **`getTime()` restores milliseconds by hand** after the timezone conversion,
  because `toLocaleString` truncates to whole seconds. Removing that breaks
  smooth sweep in every non-local timezone.

## Reporting a bug

Include the package and version, the framework version, and ideally a small
reproduction. A screenshot helps a lot for anything visual.
