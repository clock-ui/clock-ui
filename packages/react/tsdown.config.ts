import LightningCSS from "unplugin-lightningcss/rolldown";
import { defineConfig } from "tsdown";

export default defineConfig({
  format: ["esm", "cjs"],
  dts: true,

  minify: true,
  clean: true,
  // tsdown regenerates this field on every build, so the full map has to
  // live here — editing package.json directly gets silently reverted.
  exports: {
    customExports() {
      return {
        ".": {
          import: { types: "./dist/index.d.mts", default: "./dist/index.mjs" },
          require: {
            types: "./dist/index.d.cts",
            default: "./dist/index.cjs",
          },
        },
        "./base.css": "./dist/index.css",
        "./package.json": "./package.json",
      };
    },
  },
  target: "chrome100",
  plugins: [
    LightningCSS({
      options: {
        minify: true,
      },
    }),
  ],
});
