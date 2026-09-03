import { defineConfig } from "vite";

export default defineConfig({
  server: { port: 5312, open: true, strictPort: false },
});
