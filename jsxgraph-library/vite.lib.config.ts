// Library build: `npm run build:lib` -> dist_lib/
// Separate from vite.config.ts so `npm run dev` / `npm run build` are unaffected.
//
// Produces a single self-contained script (React, ReactDOM, JSXGraph and the
// icons are bundled in) exposing the `JSXDrawing` global, plus one CSS file,
// so it can be dropped into plain HTML or Quarto pages. The files in
// lib-example/ (a demo page + sample question JSON) are copied alongside.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";

const outDir = path.resolve(__dirname, "dist_lib");
const exampleDir = path.resolve(__dirname, "lib-example");

export default defineConfig({
  plugins: [
    react(),
    {
      name: "copy-lib-example",
      closeBundle() {
        if (!fs.existsSync(exampleDir)) return;
        fs.cpSync(exampleDir, outDir, { recursive: true });
      },
    },
  ],
  // React reads process.env.NODE_ENV; there is no `process` in the browser.
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir,
    emptyOutDir: true,
    copyPublicDir: false,
    minify: "esbuild",
    sourcemap: false,
    lib: {
      entry: path.resolve(__dirname, "src/lib.tsx"),
      name: "JSXDrawing",
      formats: ["iife"],
      fileName: () => "jsxdrawing.min.js",
      cssFileName: "jsxdrawing.min",
    },
  },
});
