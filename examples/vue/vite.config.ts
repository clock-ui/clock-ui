import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: { port: 5311, open: true, strictPort: false },

  // Same monorepo symlink caveat as the React example — a single Vue instance.
  resolve: { dedupe: ["vue"] },
});
