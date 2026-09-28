# CLAUDE.md

This is the native-SVG counterpart of `../jsxgraph-library`. Preserve its public `DrawingAppProps`, tool names, grading behavior, demo app, and plain-HTML library API unless a deliberate breaking change is requested.

## Important files

- `src/canvas/DrawingBoard.tsx`: SVG rendering, pointer/keyboard interaction, history, panning, export
- `src/canvas/DrawingToolbar.tsx`: tool/action controls
- `src/canvas/grading.ts`: ordered grading and expected-answer conversion
- `src/drawingApp.tsx`: public component and footer
- `src/lib.tsx`: `SVGDrawing` standalone API

## Invariants

- `history` is the source of truth for student drawings.
- Initial and suggested objects never enter student history.
- Every state-changing interaction must update history so output and grading remain current.
- Board data uses mathematical coordinates (positive y upward); only the SVG rendering group flips y.
- Props should remain JSON-serializable except React-only `questionText` nodes.

Verify with `npm run build` and `npm run build:lib`.
