/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Relative asset paths so the built app works from any static host or subfolder.
  base: "./",
  // KaTeX + the Markdown pipeline alone are ~400 kB; the app is a single page.
  build: { chunkSizeWarningLimit: 800 },
  test: {
    environment: "jsdom",
    globals: false,
    setupFiles: ["./src/test/setup.ts"],
    css: false,
  },
});
