# @clock-ui/utils

Internal shared logic for [Clock UI](https://github.com/clock-ui/clock-ui): time
reading, hand-angle math, tick easing, and shadow calculation.

**This package is private and is not published to npm.** It is bundled into
`@clock-ui/dom`, `@clock-ui/react`, and `@clock-ui/vue` at build time, which is
why those packages have no runtime dependencies.

If you want to drive the hands yourself, use `BaseClock` / `BaseClockUI` from
one of the published packages instead.
