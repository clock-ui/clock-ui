# Security Policy

## Supported versions

The latest published minor of each `@clock-ui/*` package receives fixes.

## Reporting a vulnerability

Please report security issues privately through
[GitHub's advisory form](https://github.com/clock-ui/clock-ui/security/advisories/new)
rather than a public issue.

Clock UI renders clock faces from numeric props and has no network access, no
`eval`, and no runtime dependencies, so its attack surface is small. The most
plausible issue would be markup injection through a value that reaches the DOM —
if you find one, that is worth reporting.

Expect an initial response within a week.
