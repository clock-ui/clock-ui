import { withCSSExportConfig } from "config/tsdown";

export default withCSSExportConfig({
  format: ["esm", "cjs"],
  dts: true,
});
