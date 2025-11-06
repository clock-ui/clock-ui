import { defineConfig } from "tsdown";

export default defineConfig({
  platform: "neutral",
  fromVite: true,
  format: ["esm", "cjs"],
  dts: { vue: true },
  minify: true,
  clean: true,
});
