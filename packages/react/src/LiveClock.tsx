import { useEffect, useRef, useState } from "react";
import type { LiveClockProps } from "./types/clock";
import { ClockWork } from "@clock-ui/utils";
import { BaseClock } from "./BaseClock";

export const LiveClock: React.FC<LiveClockProps> = (props) => {
  const clockRef = useRef(
    new ClockWork({
      timezone: props.timezone,
      tickDuration: props.tickDuration,
    }),
  );
  const frameId = useRef<number | null>(null);

  const smoothSweepRef = useRef(props.smoothSweep);

  const initial = clockRef.current.getState();

  const [hours, setHours] = useState(initial.hours);
  const [minutes, setMinutes] = useState(initial.minutes);
  const [seconds, setSeconds] = useState(initial.seconds);
  const [milliseconds, setMilliseconds] = useState(initial.milliseconds);
  const [currentDate, setCurrentDate] = useState(() =>
    clockRef.current.getCurrentDate(),
  );

  useEffect(() => {
    clockRef.current.setOptions({
      timezone: props.timezone,
      tickDuration: props.tickDuration,
    });
  }, [props.timezone, props.tickDuration]);

  // A continuously sweeping hand is exactly what prefers-reduced-motion asks
  // us not to do, so fall back to tick mode when the user has opted out.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = () => {
      smoothSweepRef.current = props.smoothSweep && !query.matches;
      clockRef.current.setOptions({ reducedMotion: query.matches });
    };

    apply();
    query.addEventListener("change", apply);

    return () => {
      query.removeEventListener("change", apply);
    };
  }, [props.smoothSweep]);

  function updateTime() {
    const clock = clockRef.current;

    if (smoothSweepRef.current) {
      clock.updateSweep();
    } else {
      clock.updateTick();
    }

    const state = clock.getState();

    setHours(state.hours);
    setMinutes(state.minutes);
    setSeconds(state.seconds);
    setMilliseconds(state.milliseconds);
    setCurrentDate(clock.getCurrentDate());
  }

  const loop = () => {
    updateTime();
    frameId.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    frameId.current = requestAnimationFrame(loop);

    return () => {
      if (frameId.current) cancelAnimationFrame(frameId.current);
    };
  }, []);

  return (
    <BaseClock
      {...props}
      hours={hours}
      minutes={minutes}
      seconds={seconds}
      milliseconds={milliseconds}
    >
      {props.hideDate ? null : currentDate}
    </BaseClock>
  );
};
