import { defineConfig } from "tsdown";
import LightningCSS from "unplugin-lightningcss/rolldown";

export default defineConfig({
  platform: "neutral",
  fromVite: true,
  format: ["esm", "cjs"],
  dts: { vue: true },

  minify: true,
  clean: true,
  // tsdown regenerates this field on every build, so the full map has to
  // live here — editing package.json directly gets silently reverted.
  exports: {
    customExports() {
      return {
        ".": {
          import: { types: "./dist/index.d.ts", default: "./dist/index.js" },
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
