# JSXGraph Drawing App

An embeddable React drawing widget built on top of [JSXGraph](https://jsxgraph.org/), designed for economics/math graphing exercises: a student reads a question, draws shapes on a first-quadrant coordinate board with a toolbar of drawing tools, and can have their work graded against a teacher-authored *expected* drawing, see a suggested answer, and download their graph as an image.

The whole app is a single component, `<DrawingApp />`, configured entirely through props. It can be used inside a React app, or, via the standalone library build, dropped into plain HTML pages and Quarto documents with the question supplied as JSON.

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Quick usage example](#quick-usage-example)
- [`<DrawingApp />` props](#drawingapp-props)
- [Drawing tools reference](#drawing-tools-reference)
- [Toolbar actions and footer buttons](#toolbar-actions-and-footer-buttons)
- [`initialObjects`: pre-drawn shapes](#initialobjects-pre-drawn-shapes)
- [Reading what the student drew](#reading-what-the-student-drew)
- [Grading: `expectedDrawing`](#grading-expecteddrawing)
- [Suggested answer](#suggested-answer)
- [Using it as a library (plain HTML / Quarto)](#using-it-as-a-library-plain-html--quarto)
- [Known limitations / roadmap](#known-limitations--roadmap)

---

## Features

- **First-quadrant coordinate board** (via JSXGraph): both axes start at the origin and run only in the positive direction (no negative coordinates, as usual in economics), with non-negative tick labels, configurable bounding box and axis titles. Panning with shift+drag; scroll-wheel zoom is off so the canvas doesn't jump while drawing.
- **Question text** above the widget, at the same width, centered, wrapping onto new lines, with multiple paragraphs.
- **A dark, icon-based toolbar** with tool buttons, a color picker, and undo/redo/clear actions, each independently toggleable.
- **Drawing tools**: select, point, line, segment, arrow, double-headed arrow, rectangle, circle, polygon, connected scatter plot, a 4-point curve, free text, a "coordinate" tool that drops a point with dashed guide lines to both axes, and an eraser.
- **Live previews** while drawing: polygon/scatter/curve edges are drawn as you place points, and the coordinate tool shows a crosshair + guide lines that follow the mouse.
- **In-place text editing**: click with the text tool and type directly on the board; Enter commits, Escape cancels.
- **Full undo/redo/clear history.**
- **Footer buttons** (each can be hidden): **Download** the board as a PNG, **Show Drawing Data** (live JSON of what's on the board), **Grade**, and **Suggested Answer**.
- **Grading** by slope + y-intercept (with a percentage tolerance, e.g. for budget lines) or by exact points, with a score and per-shape feedback.
- **Standalone library build** (`npm run build:lib`): one minified `.js` + one `.css` file usable from plain HTML or Quarto, with question props supplied as JSON.

## Tech stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [JSXGraph](https://jsxgraph.org/) for the interactive board
- [lucide-react](https://lucide.dev/) for icons
- [Vite](https://vitejs.dev/) for the dev server, app build, and library build

> Note: `tailwindcss`, `@radix-ui/react-slot`, `class-variance-authority`, `clsx`, `tailwind-merge`, and `html2canvas` are present in `package.json` as leftovers from an earlier scaffold. The current app does not use them; all styling lives in `src/canvas/DrawingCanvas.css`.

## Getting started

```bash
npm install       # install dependencies
npm run dev       # start the Vite dev server (renders src/App.tsx)
npm run build     # type-check (tsc) and build the demo app into dist/
npm run preview   # preview the demo app build
npm run build:lib # build the standalone library into dist_lib/
npm run lint      # run eslint
```

Open the URL Vite prints (typically `http://localhost:5173`) to see `src/App.tsx`, which renders `<DrawingApp />` with the question configured in `src/questionProps.ts`.

## Project structure

```
jsxgraph-as-library/
├── index.html                 # Dev/demo page (loads src/main.tsx)
├── vite.config.ts             # Dev server + demo app build (npm run dev / build)
├── vite.lib.config.ts         # Library build (npm run build:lib -> dist_lib/)
├── lib-example/               # Copied into dist_lib/ on every library build
│   ├── example.html           #   Demo page: 3 ways to mount the widget
│   ├── example.qmd            #   Quarto demo
│   └── question1.json         #   Sample question props (JSON copy of questionProps.ts)
└── src/
    ├── main.tsx               # React entry point for the dev/demo app
    ├── App.tsx                # Demo page: <DrawingApp {...questionProps} />
    ├── questionProps.ts       # The demo question's props (typed as DrawingAppProps)
    ├── lib.tsx                # Library entry: JSXDrawing.mount / mountFromUrl / autoMount
    ├── drawingApp.tsx         # Public <DrawingApp /> component (props, layout, footer UI)
    └── canvas/
        ├── drawingLogic.tsx   # <DrawingBoard />: JSXGraph board, all drawing/tool logic, undo/redo, PNG export
        ├── drawingTools.tsx   # <DrawingToolbar />: tool buttons, color picker, action buttons
        ├── grading.ts         # gradeDrawing() + expectedShapeToDrawable()
        └── DrawingCanvas.css  # All styling for the widget
```

The component tree is:

```
DrawingApp
├── question text        (above and outside the widget frame)
├── DrawingBoard         (the JSXGraph canvas + all pointer/keyboard handling)
├── DrawingToolbar       (tool buttons, color picker, undo/redo/clear)
└── footer               (Download, Show Drawing Data, Grade, Suggested Answer, result panels)
```

## Quick usage example

Keep a question's configuration in its own file, typed as `DrawingAppProps`:

```ts
// src/questionProps.ts
import type { DrawingAppProps } from "./drawingApp";

const questionProps: DrawingAppProps = {
  questionText: "Draw the budget line for income 80 when both goods cost 10.",
  boundingBox: [-1, 11, -1, 11],
  xLabel: "x-axis",
  yLabel: "y-axis",
  width: 700,
  height: 700,
  enabledTools: ["select", "segment", "text", "coordinate", "eraser", "scatter"],
  expectedDrawing: [{ type: "segment", yIntercept: 8, slope: -1, tolerance: 0.1 }],
  suggestedAnswer: [{ type: "segment", points: [[0, 8], [8, 0]], color: "#eb2525" }],
};

export default questionProps;
```

```tsx
// src/App.tsx
import DrawingApp from "./drawingApp";
import questionProps from "./questionProps";

function App() {
  return <DrawingApp {...questionProps} />;
}
```

## `<DrawingApp />` props

| Prop | Type | Default | Description |
|---|---|---|---|
| `questionText` | `ReactNode` (usually a `string`) | `undefined` | Question/instructions shown above the widget, outside its frame, centered, at the same width as the widget; long lines wrap. In a string, a blank line starts a new paragraph and a single line break is kept. Pass JSX for rich formatting (React only, not JSON). |
| `boundingBox` | `[xMin, xMax, yMin, yMax]` | `[-10, 10, -10, 10]` | Visible coordinate range. Axes are only drawn from the origin in the positive direction, so small negative minimums (e.g. `-1`) just leave room for the axis titles. |
| `xLabel` / `yLabel` | `string` | `"x"` / `"y"` | Axis titles. |
| `initialObjects` | `InitialObjectSpec[]` | `undefined` | Shapes drawn before the student starts (not counted as the student's work). |
| `expectedDrawing` | `ExpectedShape[]` | `undefined` | The teacher's reference drawing, used by Grade. Exact points, or for `line`/`segment`, `slope` + `yIntercept` + `tolerance`. See [Grading](#grading-expecteddrawing). |
| `suggestedAnswer` | `InitialObjectSpec[]` | `undefined` | Exact shapes, each with its own `color`, shown by the Suggested Answer button. Falls back to `expectedDrawing` when omitted. |
| `enabledTools` | `ToolName[]` | all tools | Which toolbar tool buttons are shown, and in what order. |
| `enabledActions` | `ActionName[]` (`"undo" \| "redo" \| "clear"`) | all actions | Which toolbar action buttons are shown. |
| `defaultTool` | `ToolName` | `"select"` | Tool selected when the board first mounts. |
| `defaultColor` | `string` (hex) | `"#111827"` | Color new shapes are drawn with. |
| `colors` | `string[]` (hex) | built-in 6-color palette | Quick-pick swatches under the color input. |
| `showColorPicker` | `boolean` | `true` | Show/hide the color picker entirely. |
| `showNavigation` | `boolean` | `false` | Show JSXGraph's built-in zoom/pan navigation widget. |
| `showDownloadButton` | `boolean` | `true` | Show/hide the Download button (saves the board as a PNG). |
| `downloadFilename` | `string` | `"drawing.png"` | File name used by the Download button. |
| `showOutputButton` | `boolean` | `true` | Show/hide the Show Drawing Data (eye) button. |
| `showGradeButton` | `boolean` | `true` | Show/hide the Grade button. It only appears when `expectedDrawing` is non-empty. |
| `showSuggestedAnswerButton` | `boolean` | `true` | Show/hide the Suggested Answer button. It only appears when `suggestedAnswer` or `expectedDrawing` is non-empty. |
| `width` | `number \| string` | `"100%"` | Width of the widget (and of the question text above it). |
| `height` | `number \| string` | `720` | Height of the widget frame (the question text is extra, above it). |

If the four footer buttons are all hidden (or not applicable), the footer disappears.

## Drawing tools reference

`ToolName` values, usable in `enabledTools`, `defaultTool`, and as the `type` of `initialObjects` / `expectedDrawing` / `suggestedAnswer` (where applicable):

| Tool | What it draws | `points` needed |
|---|---|---|
| `select` | No drawing; lets you drag existing user shapes. | — |
| `point` | A single point. | 1 |
| `line` | An infinite line through two points. | 2 |
| `segment` | A straight segment between two points. | 2 |
| `arrow` | A single-headed arrow. | 2 |
| `doubleArrow` | A segment with arrowheads on both ends. | 2 |
| `rectangle` | An axis-aligned rectangle from two opposite corners. | 2 |
| `circle` | A circle. Click-drag for center + rim point, or pass a `radius` instead of a 2nd point. | 1–2 (+ optional `radius`) |
| `polygon` | A closed, shaded polygon. Click each vertex; click the first vertex again (or press Enter) to close; Escape cancels. | 3+ |
| `scatter` | A connected scatter plot: dots joined by straight segments in click order, left **open**. Press Enter or click the last point again to finish; click the first point (with 3+ points) to close the loop instead. Escape cancels. Never shaded. Use `closed: true` in `initialObjects` for a closed one. | 2+ |
| `curve` | A smooth 4-point spline. Completes automatically after the 4th click; Enter finishes early, Escape cancels. | 2–4 |
| `text` | A text label. Click, then type on the board; Enter commits, Escape cancels. | 1 (+ `text`) |
| `coordinate` | A point with dashed guide lines to both axes and an `(x, y)` label. Single-shot: reselect the tool to place another. | 1 |
| `eraser` | Click a shape to delete it (and everything created with it). | — |

`select`, `eraser`, and `coordinate` can't be used as the `type` of an `InitialObjectSpec`.

## Toolbar actions and footer buttons

**Toolbar actions** (`enabledActions`):

| Action | Effect |
|---|---|
| `undo` | Removes the last shape the student drew. |
| `redo` | Re-applies the last undone shape. |
| `clear` | Removes everything the student has drawn (not `initialObjects`). |

**Footer buttons**, left to right:

| Button | Prop | Effect |
|---|---|---|
| Download | `showDownloadButton` | Saves the board (axes, labels, initial objects, student drawings, and the suggested answer if shown) as a 2x-resolution PNG named `downloadFilename`. |
| Show Drawing Data (eye) | `showOutputButton` | Toggles a live JSON panel of the student's drawings. |
| Grade | `showGradeButton` | Grades against `expectedDrawing` and shows a score + per-shape feedback. |
| Suggested Answer | `showSuggestedAnswerButton` | Toggles the suggested answer on the board. |

## `initialObjects`: pre-drawn shapes

```tsx
initialObjects={[
  { type: "segment", points: [[0, 9], [9, 0]], color: "#2563eb" },
  { type: "circle", points: [[5, 5]], radius: 2, color: "#dc2626" },
  { type: "scatter", points: [[1, 2], [3, 5], [6, 4]], closed: false },
  { type: "text", points: [[1, 1]], text: "Start here" },
]}
```

- `points` are `[x, y]` pairs in board coordinates; how many depends on `type` (see the [tools table](#drawing-tools-reference)).
- `radius` is only used for `circle` with a single point; `text` only for `text`; `closed` only for `scatter`.
- `color` defaults to dark gray.

These shapes are **not** included in `getUserDrawings()` or grading; they're the "given" part of the exercise.

## Reading what the student drew

1. **UI**: the Show Drawing Data (eye) button toggles a JSON panel of everything the student currently has on the board, also logged to the console. While open, it updates live as shapes are drawn, undone, redone, erased, cleared, or dragged.
2. **Programmatically**: `DrawingBoardHandle` (the ref of the lower-level `<DrawingBoard />` in `src/canvas/drawingLogic.tsx`) provides `undo()`, `redo()`, `clear()`, `downloadImage(filename?)`, and `getUserDrawings(): UserDrawing[]`:

   ```ts
   interface UserDrawing {
     tool: ToolName;
     points: Point2D[];
     color: string;
     text?: string;
     radius?: number;
     closed?: boolean;
   }
   ```

   The list is derived from the board's current state: undone, erased, and cleared shapes are excluded, and `points` are where shapes are *now* (after any dragging), not where they were first drawn.

## Grading: `expectedDrawing`

Each entry of `expectedDrawing` is either a **slope-intercept** shape (for `line`/`segment`) or an **exact-points** shape (same format as `initialObjects`):

```tsx
expectedDrawing={[
  // Budget line y = 8 - x: any segment on that line counts, wherever its endpoints are.
  { type: "segment", yIntercept: 8, slope: -1, tolerance: 0.10 },
  { type: "segment", yIntercept: 0, slope: 1, tolerance: 0.10 },
  // Exact points:
  { type: "segment", points: [[0, 8], [8, 0]] },
]}
```

Clicking **Grade** calls `gradeDrawing(expectedDrawing, getUserDrawings(), boundingBox)` from `src/canvas/grading.ts` and shows `Score: correct / total (percent)` plus one line per expected shape.

**Matching is strictly ordered**: `expectedDrawing[0]` is checked against the student's 1st drawn shape, `[1]` against the 2nd, and so on. Possible feedback:

- `Grading for "<tool>" is not implemented yet.`
- `Expected a "<tool>" here, but nothing was drawn at this position.`
- `Expected a "<tool>" here, but a "<other>" was drawn instead.`
- Slope-intercept: what was off, e.g. `Slope is -0.7, expected -1 (±0.1); y-intercept is 9, expected 8 (±0.8).`, or `The line is vertical, so it has no slope or y-intercept.`
- Exact points: `Points do not match within tolerance.`
- `Matched.`

**Slope-intercept tolerance**: the student's two endpoints define a line; its slope and y-intercept (where the *extended* line crosses `x = 0`, so the segment needn't touch the y-axis) are checked separately. `tolerance` is a fraction of the expected value (`0.10` = ±10%, the default). Expected values smaller than 1 in magnitude are treated as 1, so an expected `0` gets ±`tolerance` instead of requiring an exact 0.

**Exact-points tolerance**: each point may be off by up to 5% of the board's diagonal (4th argument of `gradeDrawing`). Direction doesn't matter.

Color is never checked. **Gradable tools**: `line` and `segment`.

**Adding a tool**: add an entry to the `comparators` map in `src/canvas/grading.ts`; ordering, scoring, and reporting are handled for you:

```ts
const comparators: Partial<Record<ToolName, Comparator>> = {
  line: lineComparator,
  segment: lineComparator,
  scatter: (expected, actual, pointTolerance) => {
    // your own geometric comparison here
    return { ok: false, reason: "The points are off." }; // or { ok: true }
  },
};
```

## Suggested answer

The Suggested Answer button toggles a dashed reference drawing on the board (the label switches to "Hide Suggested Answer").

- With `suggestedAnswer`, exactly those shapes are drawn, each in its own `color` (green if omitted).
- Without it, `expectedDrawing` is drawn in green. A slope-intercept `segment` is drawn as the part of its line inside the first quadrant (`0 ≤ x ≤ xMax`, `0 ≤ y ≤ yMax`), e.g. a budget line from axis to axis; a slope-intercept `line` as the full line.

Suggested-answer shapes are not the student's work: they're not graded, erased, undone, or listed in the drawing data, and students can draw right on top of them.

## Using it as a library (plain HTML / Quarto)

`npm run build:lib` builds a standalone bundle into `dist_lib/` (config: `vite.lib.config.ts`; `npm run dev` and `npm run build` are unaffected):

| File | What it is |
|---|---|
| `jsxdrawing.min.js` | Everything (React, JSXGraph, icons, the widget) in one script, ~1.1 MB (~300 KB gzipped). Exposes a `JSXDrawing` global. |
| `jsxdrawing.min.css` | The widget's styles. |
| `example.html`, `example.qmd`, `question1.json` | Copied from `lib-example/`: a demo page, a Quarto demo, and sample question props. |

Include the two files, then mount a widget in any of three ways:

```html
<link rel="stylesheet" href="jsxdrawing.min.css" />
<script src="jsxdrawing.min.js"></script>

<!-- 1. Props from a JSON file (same fields as the <DrawingApp /> props) -->
<div data-drawing-app data-props-src="question1.json"></div>

<!-- 2. Inline JSON props -->
<div data-drawing-app>
  <script type="application/json">{ "questionText": "Draw the budget line." }</script>
</div>

<!-- 3. From JavaScript -->
<div id="q3"></div>
<script>
  JSXDrawing.mount("#q3", { questionText: "Draw the budget line." });
  // JSXDrawing.mountFromUrl("#q3", "question1.json");
</script>
```

`[data-drawing-app]` elements are mounted automatically when the page loads; call `JSXDrawing.autoMount()` after adding more dynamically. `mount()` returns `{ update(props), unmount() }`.

Notes:

- Loading props from a JSON file uses `fetch`, which browsers block for pages opened as `file://`. Serve the folder instead, e.g. `npx vite preview --config vite.lib.config.ts --port 4180` and open `http://localhost:4180/example.html`, or `quarto preview`. Inline JSON and `JSXDrawing.mount()` also work from `file://`.
- JSON props are plain data, so `questionText` must be a string there (use `\n\n` inside the JSON string for a paragraph break), not JSX.
- In Quarto, put the `<div>`s inside ```` ```{=html} ```` blocks and include the files via `css:` and `include-after-body:`; see `lib-example/example.qmd`.
- `lib-example/question1.json` is a manual JSON copy of `src/questionProps.ts`; update it when the question changes.

## Known limitations / roadmap

- Grading only understands `line` and `segment`; other tools (including `scatter`) report "not implemented yet".
- Grading is strictly positional; it doesn't look for the best match if shapes are drawn out of order.
- No persistence: drawings live only in memory for the lifetime of the mounted board.
- Scroll-wheel zoom is intentionally disabled; only shift+drag panning is available.
- The library bundle includes its own copy of React, so it's meant for non-React pages; React apps should import `<DrawingApp />` directly.
