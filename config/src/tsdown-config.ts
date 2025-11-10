import { defineConfig, type UserConfig } from "tsdown";
import LightningCSS from "unplugin-lightningcss/rolldown";

export function withCSSExportConfig(config: UserConfig) {
  return defineConfig({
    ...config,
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
}
