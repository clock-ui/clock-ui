import { withCSSExportConfig } from "config/tsdown";

export default withCSSExportConfig({
  platform: "neutral",
  fromVite: true,
  format: ["esm", "cjs"],
  dts: { vue: true },
});
