import { BaseClockUI, LiveClockUI } from "@clock-ui/dom";

// Registers <clock-ui>. Import it only if you want the custom element.
import "@clock-ui/dom/element";

// The stylesheet is required — without it the clock renders at zero size.
import "@clock-ui/dom/base.css";
import "./styles.css";

new LiveClockUI("#sweep", { smoothSweep: true });
new LiveClockUI("#tick", {});
new BaseClockUI("#static", { hours: 10, minutes: 9, seconds: 36 });
new LiveClockUI("#themed", { smoothSweep: true });

const zoned = new LiveClockUI("#zoned", {});

document.querySelector("#zone").addEventListener("change", (event) => {
  zoned.setTimezone(event.target.value);
});
