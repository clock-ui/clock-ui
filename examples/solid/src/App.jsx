import { createSignal, For } from "solid-js";

const ZONES = [
  { label: "Local", value: "" },
  { label: "New York", value: "America/New_York" },
  { label: "London", value: "Europe/London" },
  { label: "Tokyo", value: "Asia/Tokyo" },
];

export default function App() {
  const [zone, setZone] = createSignal("");

  return (
    <>
      <h1>Clock UI — Solid</h1>
      <p class="lede">
        Solid has no wrapper package. This is the <code>&lt;clock-ui&gt;</code>
        custom element from <code>@clock-ui/dom</code>, used directly.
      </p>

      <div class="grid">
        <figure>
          <clock-ui class="clock" smooth-sweep />
          <figcaption>Live · smooth sweep</figcaption>
        </figure>

        <figure>
          <clock-ui class="clock" />
          <figcaption>Live · ticking</figcaption>
        </figure>

        <figure>
          <clock-ui class="clock" tick-duration="150" />
          <figcaption>Tick · 150ms swing</figcaption>
        </figure>

        <figure>
          <clock-ui class="clock" hours="10" minutes="9" seconds="36" />
          <figcaption>Static · 10:09</figcaption>
        </figure>

        <figure>
          <clock-ui class="clock theme-midnight" smooth-sweep />
          <figcaption>Themed · midnight</figcaption>
        </figure>

        <figure>
          <clock-ui class="clock theme-vintage" use-roman />
          <figcaption>Themed · vintage</figcaption>
        </figure>

        <figure>
          <clock-ui class="clock" hide-ticks hide-numbers no-border hide-date />
          <figcaption>Minimal</figcaption>
        </figure>

        <figure>
          <clock-ui class="clock" timezone={zone()} />
          <figcaption>
            <select
              value={zone()}
              onChange={(e) => setZone(e.currentTarget.value)}
            >
              <For each={ZONES}>
                {(z) => <option value={z.value}>{z.label}</option>}
              </For>
            </select>
          </figcaption>
        </figure>
      </div>
    </>
  );
}
