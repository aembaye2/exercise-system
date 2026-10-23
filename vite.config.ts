/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Relative asset paths so the built app works from any static host or subfolder.
  base: "./",
  // KaTeX + the Markdown pipeline alone are ~400 kB; the app is a single page.
  build: {
    chunkSizeWarningLimit: 800,
    rolldownOptions: {
      // JSXGraph's JessieCode parser uses a direct `eval` (only for JessieCode scripts, which
      // this app never runs); hide that one warning, but keep it for any other module.
      onLog(level, log, handler) {
        if (log.code === "EVAL" && /[\\/]jsxgraph[\\/]/.test(log.id ?? "")) return;
        handler(level, log);
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: false,
    setupFiles: ["./src/test/setup.ts"],
    css: false,
  },
});
