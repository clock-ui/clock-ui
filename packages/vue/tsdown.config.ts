import { defineConfig } from "tsdown";
import LightningCSS from "unplugin-lightningcss/rolldown";

export default defineConfig({
  platform: "neutral",
  fromVite: true,
  format: ["esm", "cjs"],
  dts: { vue: true },

  minify: true,
  clean: true,
  exports: {
    customExports(exports) {
      exports["./base.css"] = "./dist/index.css";
      return exports;
    },
  },
  target: "chrome100",
  noExternal: [/^@clock-ui\/.*/],
  plugins: [
    LightningCSS({
      options: {
        minify: true,
      },
    }),
  ],
});
