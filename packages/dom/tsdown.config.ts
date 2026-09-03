import LightningCSS from "unplugin-lightningcss/rolldown";
import { defineConfig } from "tsdown";

const shared = {
  dts: true,
  minify: true,
  target: "chrome100",
  plugins: [LightningCSS({ options: { minify: true } })],
};

// Two single-entry builds rather than one two-entry build: UMD does not
// support code splitting, and the UMD bundle is what the CDN examples use.
export default defineConfig([
  {
    ...shared,
    entry: ["src/index.ts"],
    globalName: "ClockUI",
    format: ["esm", "umd"],
    clean: true,
    // tsdown regenerates this field on every build, so the full map has to
    // live here — editing package.json directly gets silently reverted.
    exports: {
      customExports() {
        return {
          ".": {
            types: "./dist/index.d.mts",
            default: "./dist/index.mjs",
          },
          "./element": {
            types: "./dist/element.d.mts",
            default: "./dist/element.mjs",
          },
          "./base.css": "./dist/index.css",
          "./package.json": "./package.json",
        };
      },
    },
  },
  {
    ...shared,
    entry: ["src/element.ts"],
    globalName: "ClockUIElement",
    format: ["esm", "umd"],
    clean: false,
  },
]);
