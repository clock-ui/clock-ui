import LightningCSS from "unplugin-lightningcss/rolldown";
import { defineConfig } from "tsdown";

export default defineConfig({
  format: ["esm", "cjs"],
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
