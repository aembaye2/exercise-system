import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

// Builds the standalone embeddable bundle: a single ES module plus a single
// CSS file (React, Tailwind's compiled CSS, KaTeX fonts inlined as data URIs,
// and every element type included) that any static page can import, with no
// build step of its own. See src/lib/entry.tsx for the public API.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Library mode doesn't get Vite's usual automatic `process.env.NODE_ENV`
  // replacement, so React's dev/production branch (inside react-dom) ships
  // as literal `process.env.NODE_ENV` and throws "process is not defined"
  // in a real browser (Node has a global `process`, so this only shows up
  // once the bundle actually runs client-side).
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    outDir: "dist-lib",
    emptyOutDir: true,
    cssCodeSplit: false,
    chunkSizeWarningLimit: 1600,
    lib: {
      entry: resolve(import.meta.dirname, "src/lib/entry.tsx"),
      formats: ["es"],
      fileName: () => "exercise-system.js",
    },
  },
});
