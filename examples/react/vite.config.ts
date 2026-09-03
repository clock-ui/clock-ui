import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 5310, open: true, strictPort: false },

  resolve: {
    // In this workspace the app resolves `react` through the hoisted symlink
    // while @clock-ui/react resolves it through packages/react's own symlink
    // into .bun/. Without dedupe the bundler treats those as two modules and
    // ships two copies of React, which nulls the hook dispatcher.
    //
    // A real consumer installing from npm has a single react in their tree and
    // does not need this — it is an artifact of the monorepo layout.
    dedupe: ["react", "react-dom"],
  },
});
