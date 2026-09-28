# SVG Drawing App

A native-SVG version of the JSXGraph economics drawing widget. It keeps the same React component API, tool names, JSON configuration, grading rules, standalone mounting workflow, and visual layout, but has no JSXGraph dependency.

## Commands

```bash
npm install
npm run dev
npm run build
npm run build:lib
```

The library build writes `dist_lib/svgdrawing.min.js` and `dist_lib/svgdrawing.min.css`. It exposes the global `SVGDrawing` object.

## React usage

```tsx
import DrawingApp from "./drawingApp";

<DrawingApp
  questionText="Draw a budget line."
  boundingBox={[-1, 11, -1, 11]}
  enabledTools={["select", "segment", "text", "coordinate", "eraser"]}
  expectedDrawing={[{ type: "segment", slope: -1, yIntercept: 8 }]}
/>
```

`DrawingAppProps` is API-compatible with the app in `../jsxgraph-library`:

- `questionText`, `boundingBox`, `xLabel`, `yLabel`, `width`, `height`
- `initialObjects`, `expectedDrawing`, `suggestedAnswer`
- `enabledTools`, `enabledActions`, `defaultTool`, `defaultColor`, `colors`
- `showColorPicker`, `showNavigation`, `showDownloadButton`, `downloadFilename`
- `showOutputButton`, `showGradeButton`, `showSuggestedAnswerButton`

Tools are `select`, `point`, `line`, `segment`, `arrow`, `doubleArrow`, `rectangle`, `circle`, `polygon`, `scatter`, `curve`, `text`, `coordinate`, and `eraser`. Polygon, scatter, and curve are multi-click tools: Enter finishes and Escape cancels. Polygon closes automatically when its first point is clicked; scatter can be open or closed. Shift-drag pans the board.

The imperative `DrawingBoardHandle` supports `undo()`, `redo()`, `clear()`, `getUserDrawings()`, and `downloadImage()`.

## Plain HTML / Quarto

```html
<link rel="stylesheet" href="svgdrawing.min.css">
<script src="svgdrawing.min.js"></script>
<div data-drawing-app data-props-src="question1.json"></div>
```

You can also use `SVGDrawing.mount(target, props)`, `mountFromUrl(target, url)`, or `autoMount()`. A mount instance has `update(props)` and `unmount()` methods.

## Grading

Grading matches expected shapes to student shapes in drawing order. Lines and segments support exact endpoints or slope/y-intercept grading. Endpoint tolerance defaults to 5% of the board diagonal. Slope and intercept tolerance defaults to 10% of `max(abs(expected), 1)`. Colors are not graded.

## Implementation notes

- The board, axes, grid, shapes, previews, overlays, and interactions are native SVG.
- User history is the source of truth, so undo, erase, clear, drag, output, and grading stay synchronized.
- Suggested answers are display-only and do not participate in selection, erasing, history, or grading.
- PNG download rasterizes a cloned copy of the current SVG at 2× resolution.
