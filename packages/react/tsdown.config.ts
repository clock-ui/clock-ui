import { defineConfig } from "tsdown";

export default defineConfig({
  // ...config options
  format: ["esm", "cjs"],
  minify: true,
  clean: true,
});
