import { withCSSExportConfig } from "config";

export default withCSSExportConfig({
  format: ["esm", "cjs"],
  dts: true,
});
