/**
 * Common properties shared between BaseClock and LiveClock components.
 */
export interface CommonClockProps {
  /**
   * Whether to hide the seconds hand. Defaults to false.
   * When true, the second hand will not be rendered.
   */
  hideSeconds?: boolean;

  /**
   * Whether to hide the hour numbers around the clock face. Defaults to false.
   * When true, no numbers will be displayed on the clock face.
   */
  hideNumbers?: boolean;

  /**
   * Whether to use Roman numerals instead of Arabic numbers. Defaults to false.
   * When true, displays I, II, III, etc. instead of 1, 2, 3, etc.
   */
  useRoman?: boolean;

  /**
   * Whether to show only cardinal hour numbers (3, 6, 9, 12). Defaults to false.
   * When true, only the 3, 6, 9, and 12 positions will display numbers.
   */
  cardinalOnly?: boolean;

  /**
   * Whether to remove the border around the clock. Defaults to false.
   * When true, the clock will not have a visible border.
   */
  noBorder?: boolean;

  /**
   * Whether to hide all ticks (both major and minor). Defaults to false.
   * When true, no tick marks will be displayed on the clock face.
   */
  hideTicks?: boolean;

  /**
   * Whether to hide major ticks (hour markers). Defaults to false.
   * Major ticks are the longer lines that mark each hour position.
   */
  hideMajorTicks?: boolean;

  /**
   * Whether to hide minor ticks (minute markers). Defaults to false.
   * Minor ticks are the shorter lines between hour positions.
   */
  hideMinorTicks?: boolean;

  /**
   * Whether to use a dual-tone color scheme. Defaults to true.
   * When true, the clock uses contrasting colors for better visibility.
   */
  dualTone?: boolean;
}

/**
 * Props for the BaseClock component, which displays a static clock at a specific time.
 */
export interface BaseClockProps extends CommonClockProps {
  /**
   * The hour to display (0-23). Required.
   * This determines the position of the hour hand.
   */
  hours: number;

  /**
   * The minute to display (0-59). Required.
   * This determines the position of the minute hand.
   */
  minutes: number;

  /**
   * The second to display (0-59). Optional, defaults to 0.
   * This determines the position of the second hand.
   */
  seconds?: number;

  /**
   * The millisecond to display (0-999). Optional, defaults to 0.
   * Used for smooth second hand animation in live clocks.
   */
  milliseconds?: number;
}

/**
 * Props for the LiveClock component, which displays the current time and updates automatically.
 */
export interface LiveClockProps extends CommonClockProps {
  /**
   * Whether to use smooth sweeping animation for the second hand. Defaults to false.
   * When true, the second hand moves continuously instead of ticking.
   */
  smoothSweep?: boolean;

  /**
   * The timezone to display time in. Optional.
   * Should be a valid IANA timezone identifier (e.g., "America/New_York").
   * If not provided, uses the system's local timezone.
   */
  timezone?: string;

  /**
   * Whether to hide the date display. Defaults to false.
   * Note: Date display functionality may not be implemented in all versions.
   */
  hideDate?: boolean;
}
