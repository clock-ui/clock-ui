import { useEffect, useRef, useState } from "react";
import type { BaseClockProps } from "./types/clock";
import classnames from "classnames";
import {
  calculateShadow,
  ClockFace,
  formatClockLabel,
  getHoursToDisplay,
  getTicksToDisplay,
  romanNumerals,
} from "@clock-ui/utils";

export const BaseClock: React.FC<BaseClockProps> = ({
  hideSeconds,
  hideNumbers,
  useRoman,
  hours,
  minutes,
  seconds = 0,
  milliseconds = 0,
  cardinalOnly = false,
  noBorder,
  hideMinorTicks,
  hideMajorTicks,
  hideTicks,
  dualTone = true,
  className,
  style,
  children,
}) => {
  const clockRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!clockRef.current) return;

    const el = clockRef.current;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(el);

    // Initial size
    setWidth(el.getBoundingClientRect().width);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Angles and shadows are pure functions of the props plus the measured
  // width, so they are derived during render. Holding them in state would
  // cost an extra render pass per frame and lag the shadows by one frame.
  const angles = new ClockFace({
    hours,
    minutes,
    seconds,
    milliseconds,
  }).getAngles();

  const hourShadow = calculateShadow(angles.hour, width);
  const minuteShadow = calculateShadow(angles.minute, width);
  const secondShadow = calculateShadow(angles.second, width, 8);

  return (
    <div
      className={classnames(
        "clock-ui",
        {
          "clock-ui--roman": useRoman,
          "clock-ui--bordered": !noBorder,
          "clock-ui--dual-tone": dualTone,
        },
        className,
      )}
      style={{ ...style, "--cui-width": width } as React.CSSProperties}
      role="img"
      aria-label={formatClockLabel(hours, minutes)}
    >
      <div ref={clockRef} className="clock-ui__face" aria-hidden="true">
        {!hideTicks &&
          getTicksToDisplay({
            major: !hideMajorTicks,
            minor: !hideMinorTicks,
          }).map((tickIndex) => (
            <div
              key={tickIndex}
              className={classnames("clock-ui__tick", {
                "clock-ui__tick--major": tickIndex % 5 === 0,
              })}
              style={{ "--i": tickIndex } as React.CSSProperties}
            />
          ))}

        {!hideNumbers &&
          getHoursToDisplay(cardinalOnly).map((hour) => (
            <div
              key={hour}
              className={classnames("clock-ui__number", {
                "clock-ui__number--cardinal": hour % 3 === 0,
              })}
              style={{ "--n": hour } as React.CSSProperties}
            >
              {useRoman ? romanNumerals[hour - 1] : hour}
            </div>
          ))}

        {children && (
          <div className="clock-ui__info">
            {children}
          </div>
        )}

        <div
          className="clock-ui__hand--hour clock-ui__hand"
          style={
            {
              "--angle": angles.hour,
              filter: hourShadow,
            } as React.CSSProperties
          }
        />

        <div
          className="clock-ui__hand--minute clock-ui__hand"
          style={
            {
              "--angle": angles.minute,
              filter: minuteShadow,
            } as React.CSSProperties
          }
        />

        {!hideSeconds && (
          <div
            className="clock-ui__hand--second clock-ui__hand"
            style={
              {
                "--angle": angles.second,
                filter: secondShadow,
              } as React.CSSProperties
            }
          />
        )}

        <div className="clock-ui__center"></div>
      </div>
    </div>
  );
};
