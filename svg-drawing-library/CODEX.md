# Codex continuation notes

## Goal

Recreate the complete app in `../jsxgraph-library` as a native-SVG app in this directory, preserving its public API and behavior while removing JSXGraph.

## Work completed

- Created a standalone React 18 + TypeScript + Vite project.
- Implemented native SVG rendering and interactions in `src/canvas/DrawingBoard.tsx`.
- Implemented all source-app tools:
  - select and whole-shape dragging
  - point, line, segment, arrow, double arrow
  - rectangle, circle, polygon
  - connected scatter, 4-point curve
  - text input, coordinate guides, eraser
- Implemented undo, redo, clear, drawing-data output, grading, suggested-answer overlays, shift-drag panning, optional navigation buttons, and PNG export.
- Preserved the `DrawingAppProps` API and exported types.
- Preserved ordered line/segment grading, exact-point grading, and slope/intercept grading semantics.
- Added the standalone global library API as `SVGDrawing`:
  - `mount()`
  - `mountFromUrl()`
  - `autoMount()`
  - mount instance `update()` and `unmount()`
- Added the demo question and `lib-example` files.
- Added `README.md` and `CLAUDE.md` for the SVG implementation.
- Installed npm dependencies; `package-lock.json` and `node_modules` now exist.

## Verification completed

Both final builds succeed after the interaction fixes:

```text
npm run build
  dist/assets/index-*.css  4.30 kB
  dist/assets/index-*.js   173.80 kB

npm run build:lib
  dist_lib/svgdrawing.min.css  4.30 kB
  dist_lib/svgdrawing.min.js   173.28 kB
```

The final fixes were:

1. Infinite SVG lines were extended through the viewport instead of appearing as finite control-point segments.
2. Drawing/history callbacks were moved through refs to avoid unstable callback dependencies, and the coordinate tool became single-shot until reselected (matching the source app).
3. The point tool now commits on click instead of being discarded as a zero-length drag.

## Next steps

1. Start the demo and perform a browser smoke test:

   ```powershell
   npm run dev
   ```

2. Specifically verify:
   - every two-point tool draws on drag
   - polygon/scatter/curve multi-click completion via Enter and first/last point
   - text Enter/Escape/blur behavior does not create duplicates
   - select dragging and eraser hit targets
   - coordinate tool is single-shot and re-arms when its toolbar button is clicked again
   - undo/redo/clear and live drawing JSON
   - grade and feedback overlay
   - PNG download
   - shift-drag pan and navigation controls

3. Fix any smoke-test issues and rerun both builds.

## Likely review hotspots

- `Shape` currently renders a transparent duplicate of shape markup for hit testing. Confirm text and marker hit behavior in a browser.
- The SVG uses a flipped shape group and an unflipped label group. Confirm axis labels and titles look correct at non-default bounding boxes.
- Check the text input's Enter and blur event sequence for a possible duplicate commit. It is expected that unmounting the input after Enter will prevent a second blur commit, but this needs a browser check.
- Native SVG circles follow board coordinate scaling; a non-square board can visually stretch them, consistent with independent x/y scaling.

## Important files

- `src/canvas/DrawingBoard.tsx` — core SVG engine
- `src/canvas/DrawingToolbar.tsx` — toolbar
- `src/canvas/grading.ts` — grading
- `src/drawingApp.tsx` — public component
- `src/lib.tsx` — standalone library API
- `src/types.ts` — shared public types
- `src/DrawingCanvas.css` — all styling

Do not modify `../jsxgraph-library`; it is the behavioral reference.
