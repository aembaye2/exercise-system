# CLAUDE.md

Guidance for working in this repo. User-facing documentation (element types, how to add questions, the Quarto workflow) is in `Readme.md`; keep it in sync with code changes.

## What this is

A React + TypeScript + Vite exercise/quiz system for economics: seeded question variants, graded parts (multiple-choice, number, integer, drawing, table, jsxgraph), exercise and exam modes, localStorage persistence. It ships as a standalone app and as an embeddable bundle (`exercise-system.js/.css`) used by Quarto books.

Sibling projects in this folder, each with its own package.json:
- `jsxgraph-library/`: the JSXGraph drawing widget (has its own `CLAUDE.md` and `README.md`).
- `svg-drawing-library/`: the SVG drawing widget.
- `quarto-demo/`: sample Quarto book that embeds the bundle.

## Commands

```bash
npm run dev         # standalone app
npm run test        # Vitest, run once
npm run build       # tsc -b + app build -> dist/
npm run build:lib   # embeddable bundle -> dist-lib/ (then copy to the Quarto assets folder)
```

The environment is Windows (PowerShell/Git Bash). Verify changes with `npm run test` and `npx tsc -b`.

## Layout

- `src/engine/`: subject-agnostic core (types, seeded RNG, element registry, grading, assessment reducer, storage).
- `src/elements/<type>/`: one folder per element type (types, grade logic, input component, `index.ts`); registered in `src/elements/index.ts`.
- `src/questions/`, `src/assessments/index.ts`: demo question bank and assessments.
- `src/lib/`: embeddable build entry (`mount`, `sampleFunction`).
- `src/components/jsxgraphComponent/`: the JSXGraph drawing board used by the `jsxgraph` element.

## Content lives in two places (important)

- `src/questions/` is the **demo** set only. Do not add more questions there.
- Real course questions and quizzes are plain `.js` files under `quarto-demo/assets/exercise-system/` (e.g. `questions/round2/`, `quiz1.js`).
- Library code changes go in `src/` first, get tested, then `npm run build:lib` and copy `dist-lib/exercise-system.js/.css` into the Quarto assets. Never hand-edit the bundle.

## jsxgraph element (drawing component built into the app)

- `src/components/jsxgraphComponent/` is the JSXGraph board, toolbar and grader, copied from `jsxgraph-library/` and changed for this app. It is **not** loaded as a separate bundle. It has no Grade button: `DrawingApp` reports drawings through `onDrawingsChange`, and the element grades on the app's Submit.
- `src/elements/jsxgraph/`: `JsxGraphInput` keeps the part value in sync with the board (value = `UserDrawing[]`); `gradeJsxGraph` calls `gradeDrawing` from `canvas/grading.ts`. Import pure logic from `canvas/grading` directly, not from the component's `index.ts`, so logic tests don't load JSXGraph.
- The board only draws for itself; `JsxGraphInput` remounts it (via `key`) when the value changes from outside (new variant, loaded progress) so `initialDrawings` restores it. `readOnly` and `showAnswer` cover finished questions.
- Part `props` are `DrawingQuestionProps` as JSON; `expectedDrawing` is required (`check` enforces it). Keep values JSON-serializable: they're saved and exported.
- Extra deps: `jsxgraph`, `lucide-react`. The board's CSS (`canvas/DrawingCanvas.css`) uses generic class names (`.toolbar`, `.board`, ...); don't reuse them elsewhere.
- Later fixes to `jsxgraph-library/` are not picked up automatically; port them by hand.
- Demo: `src/questions/13_jsxgraph_budget_line.ts` (in assessment `ex1`).
- The bundle includes JSXGraph (about 2.2 MB). `quarto-demo` quizzes use it: `questions/sample/13_jsxgraph_budget_line.js` and `questions/round2/08_jsxgraph_budget_line.js`.
- `quarto-demo` loads the stylesheet (`css:`) and a quiz loader (`include-in-header: assets/exercise-system/header.html`) once, from `_quarto.yml`; chapters only contain `<div class="exercise-system-root" data-quiz="quizN.js">`.

## Conventions

- Question files are named `NN_<type>_<description>` (`mc` = multiple-choice; mixed types joined with `-`), in `src/questions/` and in the Quarto `questions/` folders.
- Element types: `multiple-choice`, `number`, `integer`, `svgdrawing` (SVG, `src/elements/svgdrawing/`), `table`, `jsxgraph`.
- Randomness only through the seeded `rng` passed to `generate`; `engine/seed.ts` is the only non-seeded source.
- An invalid part value must return `{ valid: false }` from `validate`, not a wrong grade, so no attempt is used.
- Question text is Markdown with KaTeX: write a literal dollar sign as `\$` inside TS template strings.
- New element type checklist: see "How to add a new element type" in `Readme.md`.
