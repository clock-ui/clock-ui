import { useEffect, useRef, useState } from "react";
import type { BaseClockProps } from "./types/clock";
import classnames from "classnames";
import {
  calculateShadow,
  ClockFace,
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
}) => {
  const clockRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);

  const [hourAngle, setHourAngle] = useState(0);
  const [minuteAngle, setMinuteAngle] = useState(0);
  const [secondAngle, setSecondAngle] = useState(0);

  const [hourShadow, setHourShadow] = useState("");
  const [minuteShadow, setMinuteShadow] = useState("");
  const [secondShadow, setSecondShadow] = useState("");

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

  useEffect(() => {
    const clockFace = new ClockFace({ hours, minutes, seconds, milliseconds });

    const angles = clockFace.getAngles();

    // Calculate angles for each hand
    setHourAngle(angles.hour);
    setMinuteAngle(angles.minute);
    setSecondAngle(angles.second);

    // Update shadows for each hand
    setHourShadow(calculateShadow(hourAngle, width));
    setMinuteShadow(calculateShadow(minuteAngle, width));
    setSecondShadow(calculateShadow(secondAngle, width, 8));
  });

  return (
    <div
      className={classnames("clock-ui", {
        "clock-ui--roman": useRoman,
        "clock-ui--bordered": !noBorder,
        "clock-ui--dual-tone": dualTone,
      })}
      style={{ "--cui-width": width } as React.CSSProperties}
    >
      <div ref={clockRef} className="clock-ui__face">
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

        <div
          className="clock-ui__hand--hour clock-ui__hand"
          style={
            {
              "--angle": hourAngle,
              filter: hourShadow,
            } as React.CSSProperties
          }
        />

        <div
          className="clock-ui__hand--minute clock-ui__hand"
          style={
            {
              "--angle": minuteAngle,
              filter: minuteShadow,
            } as React.CSSProperties
          }
        />

        {!hideSeconds && (
          <div
            className="clock-ui__hand--second clock-ui__hand"
            style={
              {
                "--angle": secondAngle,
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
