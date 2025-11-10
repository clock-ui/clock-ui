import { withCSSExportConfig } from "config/tsdown";

export default withCSSExportConfig({
  globalName: "ClockUI",
  format: ["esm", "umd"],
  dts: true,
});
