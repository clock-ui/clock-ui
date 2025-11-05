// Clock face constants
const HOURS_IN_CLOCK = 12;
const MINUTES_IN_CLOCK = 60;

// Constants for angle calculations
const DEGREES_PER_HOUR: number = 360 / 12; // 30 degrees
const DEGREES_PER_MINUTE: number = 360 / 60; // 6 degrees
const DEGREES_PER_SECOND: number = 360 / 60; // 6 degrees

// When `cardinalOnly` is true we only show every CARDINAL_STEP hour (3, 6, 9, 12)
const CARDINAL_STEP = 3;

// When `cardinalOnly` is true we only show every CARDINAL_STEP hour (3, 6, 9, 12)
const MAJOR_TICK_STEP = 5;

// Roman numerals for clock hours (note: IIII is traditionally used instead of IV on clock faces)
export const romanNumerals: string[] = [
  "I",
  "II",
  "III",
  "IIII",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
  "XII",
];

// Generate arrays for clock face elements
const listHours = Array.from(
  { length: HOURS_IN_CLOCK },
  (_, index) => index + 1
);
const listTicks = Array.from({ length: MINUTES_IN_CLOCK }, (_, index) => index);

/**
 * Returns list of hours to display on the clock face.
 *
 * @param {boolean} cardinalOnly - option to filter the hour list to display cardinal number only
 *
 * @returns {number[]} list of hours as number
 */
export function getHoursToDisplay(cardinalOnly?: boolean): number[] {
  return cardinalOnly
    ? listHours.filter((hour) => hour % CARDINAL_STEP === 0)
    : listHours.slice();
}

interface TickOptions {
  major?: boolean | undefined;
  minor?: boolean | undefined;
}

/**
 * Returns list of ticks that represents minutes/seconds to display on the clock face.
 *
 * @param {TickOptions} options - object of options
 * @param {boolean} options.major - display major ticks
 * @param {boolean} options.minor - display minor ticks
 *
 * @returns {number[]} list ticks index
 */
export function getTicksToDisplay({ major, minor }: TickOptions): number[] {
  const ticks: number[] = [];

  if (!!major) {
    ticks.push(...listTicks.filter((t) => t % MAJOR_TICK_STEP === 0));
  }

  if (!!minor) {
    ticks.push(...listTicks.filter((t) => t % MAJOR_TICK_STEP !== 0));
  }

  return ticks;
}

export interface ClockAngles {
  hour: number;
  minute: number;
  second: number;
}

/**
 * Calculate the angles of given time state
 *
 * @param {number} hours
 * @param {number} minutes
 * @param {number} seconds
 * @param {number} [milliseconds]
 *
 * @returns {ClockAngles} object of time angles
 */
export function calculateAngles(
  hours: number,
  minutes: number,
  seconds: number,
  milliseconds?: number
): ClockAngles {
  // Calculate precise second position including milliseconds
  const secondFraction = milliseconds ? seconds + milliseconds / 1000 : seconds;
  const realSeconds = secondFraction % 60;

  // Calculate angles for each hand
  const hourAngle =
    ((hours % HOURS_IN_CLOCK) + // Hours (0-11)
      minutes / MINUTES_IN_CLOCK + // Minutes contribution
      realSeconds / (MINUTES_IN_CLOCK * 60)) * // Seconds contribution
    DEGREES_PER_HOUR;

  const minuteAngle =
    (minutes + // Minutes
      realSeconds / 60) * // Seconds contribution
    DEGREES_PER_MINUTE;

  const secondAngle = secondFraction * DEGREES_PER_SECOND;

  return { hour: hourAngle, minute: minuteAngle, second: secondAngle };
}

/**
 * Calculate the shadow of an angle relative to a distance to give it depth illusion
 *
 * @param {number} angle - angle of clock hand
 * @param {number} width - width of the clock container
 * @param {number} [distance] - distance of the hand from the face
 *
 * @returns {string} css drop shadow filter value
 */
export function calculateShadow(
  angle: number,
  width: number,
  distance: number = 4
): string {
  // Constants for shadow calculation
  const LIGHT_ANGLE = 135; // Light source angle (in degrees)
  const BASE_CLOCK_SIZE = 500; // Reference size for scaling
  const BLUR_RATIO = 180; // Blur scaling factor
  const SHADOW_OPACITY = 0.5;

  // Convert angle to radians, adjusting for light source position
  const angleInRadians = ((angle + LIGHT_ANGLE) * Math.PI) / 180;

  // Scale distance based on current clock size
  const scaledDistance = width * (distance / BASE_CLOCK_SIZE);

  // Calculate shadow offset
  const shadowX = -Math.sin(angleInRadians) * scaledDistance;
  const shadowY = -Math.cos(angleInRadians) * scaledDistance;

  // Calculate blur radius
  const blurRadius = (width / BLUR_RATIO) * (distance / 8);

  return `drop-shadow(${shadowX}px ${shadowY}px ${blurRadius}px rgba(0,0,0,${SHADOW_OPACITY}))`;
}
