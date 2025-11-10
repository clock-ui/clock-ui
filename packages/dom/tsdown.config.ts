import { withCSSExportConfig } from "config";

export default withCSSExportConfig({
  globalName: "ClockUI",
  format: ["esm", "umd"],
  dts: true,
});
