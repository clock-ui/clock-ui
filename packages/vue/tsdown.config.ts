import { withCSSExportConfig } from "config";

export default withCSSExportConfig({
  platform: "neutral",
  fromVite: true,
  format: ["esm", "cjs"],
  dts: { vue: true },
});
