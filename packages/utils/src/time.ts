/**
 * Get the current time, optionally shifted into a target timezone.
 *
 * `toLocaleString` truncates to whole seconds, so the sub-second part is
 * copied back from the original reading — without it a timezone-aware clock
 * can never sweep smoothly.
 *
 * ponytail: string round-trip is implementation-defined but works in every
 * major engine; move to Intl.DateTimeFormat().formatToParts if it ever bites.
 *
 * @param {string | undefined} timezone - IANA timezone name
 *
 * @returns {Date} Current time, shifted if a valid timezone was given
 */
export function getTime(timezone?: string | undefined): Date {
  const now = new Date();

  if (!timezone) return now;

  try {
    const shifted = new Date(now.toLocaleString("en-US", { timeZone: timezone }));
    shifted.setMilliseconds(now.getMilliseconds());
    return shifted;
  } catch {
    return now;
  }
}
