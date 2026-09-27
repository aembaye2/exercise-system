# CLAUDE.md

Guidance for working in this repo. User-facing documentation (props, tools, grading rules, library usage) is in `README.md`; keep it in sync with code changes.

## What this is

A React + TypeScript + JSXGraph drawing widget (`<DrawingApp />`) for **economics** graphing exercises: question text, a first-quadrant board, drawing tools, grading against an expected drawing, a suggested answer, and PNG download. It ships two ways: the Vite demo app (`npm run dev`) and a standalone library bundle (`npm run build:lib` -> `dist_lib/`) for plain HTML / Quarto pages.

## Commands

```bash
npm run dev               # demo app (src/App.tsx) on http://localhost:5173
npx tsc --noEmit -p .     # type-check; the main verification step (there are no tests)
npm run build             # tsc + demo app build -> dist/
npm run build:lib         # library build -> dist_lib/ (vite.lib.config.ts)
npx vite preview --config vite.lib.config.ts --port 4180   # serve dist_lib (JSON props need http, not file://)
```

The environment is Windows. For multi-line scripted edits, write the script to a file first; long inline `python - <<'EOF'` heredocs in Bash have broken on quoting.

## Layout

- `src/drawingApp.tsx`: public `<DrawingApp />`. Props interface `DrawingAppProps`, question text, footer buttons (Download, Show Drawing Data, Grade, Suggested Answer), result panels.
- `src/canvas/drawingLogic.tsx`: `<DrawingBoard />`. JSXGraph board init, axes, `buildShape()`, all pointer/keyboard handling, undo/redo, overlay rendering, PNG export. Exposes `DrawingBoardHandle` via ref.
- `src/canvas/drawingTools.tsx`: `<DrawingToolbar />`; `ALL_TOOLS` defines toolbar order and icons (custom SVG icons live here).
- `src/canvas/grading.ts`: `gradeDrawing()`, per-tool `comparators`, `expectedShapeToDrawable()` (for the suggested-answer fallback).
- `src/canvas/DrawingCanvas.css`: all styles (no Tailwind in use despite the leftover deps).
- `src/questionProps.ts`: the demo question, typed `DrawingAppProps`; `src/App.tsx` just spreads it.
- `src/lib.tsx`: library entry: `JSXDrawing.mount / mountFromUrl / autoMount`, auto-mounts `[data-drawing-app]` elements.
- `lib-example/`: demo HTML, Quarto `.qmd`, `question1.json`; copied into `dist_lib/` by the lib build. `question1.json` is a manual copy of `questionProps.ts`, so regenerate it when the question changes.

## Invariants (easy to break)

- **The undo stack is the source of truth** for what the student has drawn. `getUserDrawings()` (`readUserDrawings`) is derived from `undoStackRef`; don't reintroduce a separate append-only list (it went stale on undo/erase/clear).
- **`buildShape()` must return the elements that define `points` first, in order** (for text, the text element itself). `readUserDrawings` reads live coordinates by index (`ids[i]` ↔ `points[i]`) so dragged shapes report current positions.
- Anything that changes drawings must end in `notifyHistory()`; it also fires `onDrawingsChange`, which keeps the live data panel in sync. Drags are reported from `onUp` in select mode.
- **Overlay (suggested answer) elements** are tracked in `overlayIdsRef`, excluded from the `hitsExisting` check, and never added to `userElementIdsRef`/undo, so they're not erasable, gradable, or blocking.
- Axes are created with `straightFirst: false` so they start at the origin; tick arrays are non-negative only. No negative quadrants: this is intentional for economics.
- JSXGraph typings are incomplete, so board/element objects are `any` (`const JXG: any`).
- New shape attributes that must survive undo/redo (like `closed`) need to go through `DrawingAction`, `trackAction`'s spec, the redo `buildShape` call, and the `initialObjects`/overlay `buildShape` calls.

## Checklists

**Adding a drawing tool:** `ToolName` union -> `buildShape` case (defining points first) -> `onDown`/`onMove`/`onUp` branches (multi-click tools follow polygon/scatter/curve) and `finalizePendingShape` min points / hint text -> `ALL_TOOLS` entry + icon -> README tools table -> optionally a `comparators` entry in `grading.ts`.

**Adding a `<DrawingApp />` prop:** `DrawingAppProps` (with a doc comment) + default in the destructuring -> README props table -> `questionProps.ts` if the demo should use it. Props must stay JSON-serializable where possible, since library users pass them as JSON.

**After changing widget code:** `npx tsc --noEmit -p .`; rebuild `dist_lib` with `npm run build:lib` if the library output matters. Browser checks need the Claude in Chrome extension; if it isn't connected, say what was not verified.

## Grading semantics (decided with the user)

- Ordered matching: expected shape N vs. the student's Nth drawing.
- Slope-intercept shapes: slope and y-intercept (of the extended line) each within `tolerance` × max(|expected|, 1), with default `tolerance` 0.10. The max(…, 1) floor exists so expected 0 values are gradable.
- Exact-points shapes: 5% of the board diagonal; direction-insensitive. Color is never graded.
- `suggestedAnswer` (exact shapes, own colors) is display-only and independent from `expectedDrawing` (grading-only).
