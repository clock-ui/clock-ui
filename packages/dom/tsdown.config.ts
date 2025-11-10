import LightningCSS from "unplugin-lightningcss/rolldown";
import { defineConfig } from "tsdown";

export default defineConfig({
  globalName: "ClockUI",
  format: ["esm", "umd"],
  dts: true,

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
