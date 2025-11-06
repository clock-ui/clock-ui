export interface CommonClockProps {
  /** Whether to hide the seconds hand */
  hideSeconds?: boolean;
  /** Whether to hide the hour numbers */
  hideNumbers?: boolean;
  /** Whether to use Roman numerals for hours */
  useRoman?: boolean;
  /** Whether to show only cardinal hours (3,6,9,12) */
  cardinalOnly?: boolean;
  /** Whether to remove the clock border */
  noBorder?: boolean;
  /** Whether to hide all ticks */
  hideTicks?: boolean;
  /** Whether to hide major ticks (hour marks) */
  hideMajorTicks?: boolean;
  /** Whether to hide minor ticks (minute marks) */
  hideMinorTicks?: boolean;
  /** Whether to use dual tone styling */
  dualTone?: boolean;
}

export interface BaseClockProps extends CommonClockProps {
  /** The hour value (0-23) */
  hours: number;
  /** The minute value (0-59) */
  minutes: number;
  /** The second value (0-59), optional */
  seconds?: number;
  /** The millisecond value (0-999), optional */
  milliseconds?: number;
}

export interface LiveClockProps extends CommonClockProps {
  /** Whether to use smooth sweep animation for seconds */
  smoothSweep?: boolean;
  /** The timezone for the clock */
  timezone?: string;
  /** Whether to hide the date display */
  hideDate?: boolean;
}
