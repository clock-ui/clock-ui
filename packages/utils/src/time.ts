export function getTime(timezone?: string | undefined): Date {
  try {
    return timezone
      ? new Date(new Date().toLocaleString("en-US", { timeZone: timezone }))
      : new Date();
  } catch {
    return new Date();
  }
}
