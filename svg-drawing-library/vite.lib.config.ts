import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import fs from "node:fs";
const outDir = path.resolve(__dirname, "dist_lib");
const exampleDir = path.resolve(__dirname, "lib-example");
export default defineConfig({
  plugins: [react(), { name: "copy-lib-example", closeBundle() { if (fs.existsSync(exampleDir)) fs.cpSync(exampleDir, outDir, { recursive: true }); } }],
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  build: { outDir, emptyOutDir: true, copyPublicDir: false, minify: "esbuild", lib: {
    entry: path.resolve(__dirname, "src/lib.tsx"), name: "SVGDrawing", formats: ["iife"],
    fileName: () => "svgdrawing.min.js", cssFileName: "svgdrawing.min"
  } }
});
