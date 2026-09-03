import { useState } from "react";
import { BaseClock, LiveClock } from "@clock-ui/react";

const ZONES = [
  { label: "Local", value: undefined },
  { label: "New York", value: "America/New_York" },
  { label: "London", value: "Europe/London" },
  { label: "Tokyo", value: "Asia/Tokyo" },
];

export default function App() {
  const [zone, setZone] = useState<string | undefined>(undefined);

  return (
    <>
      <h1>Clock UI — React</h1>
      <p className="lede">
        Every clock below is <code>@clock-ui/react</code> consumed exactly as it
        is on npm. Edit <code>src/App.tsx</code> and it hot-reloads.
      </p>

      <div className="grid">
        <figure>
          <LiveClock className="clock" smoothSweep />
          <figcaption>Live · smooth sweep</figcaption>
        </figure>

        <figure>
          <LiveClock className="clock" />
          <figcaption>Live · ticking</figcaption>
        </figure>

        <figure>
          <LiveClock className="clock" tickDuration={150} />
          <figcaption>Tick · 150ms swing</figcaption>
        </figure>

        <figure>
          <BaseClock className="clock" hours={10} minutes={9} seconds={36} />
          <figcaption>Static · 10:09</figcaption>
        </figure>

        <figure>
          <LiveClock className="clock theme-midnight" smoothSweep />
          <figcaption>Themed · midnight</figcaption>
        </figure>

        <figure>
          <LiveClock className="clock theme-vintage" useRoman />
          <figcaption>Themed · vintage</figcaption>
        </figure>

        <figure>
          <LiveClock
            className="clock"
            hideTicks
            hideNumbers
            noBorder
            hideDate
          />
          <figcaption>Minimal</figcaption>
        </figure>

        <figure>
          <LiveClock className="clock" timezone={zone} />
          <figcaption>
            <select
              value={zone ?? ""}
              onChange={(e) => setZone(e.target.value || undefined)}
            >
              {ZONES.map((z) => (
                <option key={z.label} value={z.value ?? ""}>
                  {z.label}
                </option>
              ))}
            </select>
          </figcaption>
        </figure>
      </div>
    </>
  );
}
