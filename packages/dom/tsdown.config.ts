import { defineConfig } from "tsdown";

export default defineConfig({
  // ...config options
  globalName: "ClockUI",
  format: ["esm", "umd"],
  minify: true,
  clean: true,
  dts: true,
});
