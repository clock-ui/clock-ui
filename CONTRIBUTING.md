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

## Releasing

Releases are driven by changesets and run in CI. Nothing is versioned,
tagged or published by hand.

1. Land your change with a changeset (`bun run changeset`).
2. On push to `main`, the Release workflow opens a **chore(release): version
   packages** pull request containing the version bumps and changelog entries.
3. Merging that pull request publishes to npm.

Two things are deliberate about this setup:

- **Versioning happens in CI, not locally.** `@changesets/changelog-github`
  needs a `GITHUB_TOKEN` to resolve pull request and author links, and fails
  outright without one. Running it in the workflow means nobody needs a
  personal token to cut a release. If you do want to preview the result
  locally, `GITHUB_TOKEN=$(gh auth token) bun run version:packages` works —
  just do not commit the result.
- **The three published packages share one version.** `fixed` in
  `.changeset/config.json` keeps `@clock-ui/dom`, `@clock-ui/react` and
  `@clock-ui/vue` in lockstep, so a library sold as one API across three
  frameworks does not ship as three drifting version numbers. The private
  `utils` and `styles` packages are unaffected, and the example apps are
  excluded through `ignore` so they do not collect pointless bumps.

### Trusted publishing

There is no npm token. Publishing authenticates through OIDC: the workflow
mints a short-lived token scoped to that single run, which npm exchanges for
publish rights. Nothing long-lived is stored in repository secrets.

This has to be configured once per package on npmjs.com, under
**Settings → Trusted Publisher → GitHub Actions**:

| Field | Value |
| --- | --- |
| Organization or user | `clock-ui` |
| Repository | `clock-ui` |
| Workflow filename | `release.yml` |
| Environment | leave blank |

Repeat for `@clock-ui/dom`, `@clock-ui/react` and `@clock-ui/vue`. The workflow
filename must match exactly, extension included.

Leave the environment field empty on purpose. Setting it puts GitHub's
deployment protection in front of *every* run of the workflow, including the
ones that only open the version pull request — so you would be approving
deployments to get a changelog.

Two details that are easy to get wrong:

- **Node 24 and an explicit npm upgrade.** OIDC needs Node 22.14+ and npm
  11.5.1+. Installing a recent Node does not give you a recent enough npm, so
  the workflow upgrades npm before publishing and prints both versions.
- **No `NODE_AUTH_TOKEN` in the workflow.** npm prefers an explicit token over
  OIDC, so leaving one in place silently bypasses trusted publishing. For the
  same reason `NPM_CONFIG_PROVENANCE` is gone — provenance is automatic here.

If publishing fails with a 404 on a scoped package
(`PUT /@clock-ui%2fdom`), that is
[npm/cli#8976](https://github.com/npm/cli/issues/8976), which was still open
when this was set up. The fallback is to restore `NODE_AUTH_TOKEN:
${{ secrets.NPM_TOKEN }}` to the publish step using an npm **automation**
token — a granular token with 2FA will fail in CI.
