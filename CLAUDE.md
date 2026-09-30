# CLAUDE.md

Guidance for working in this repo. User-facing documentation (element types, how to add questions, the Quarto workflow) is in `Readme.md`; keep it in sync with code changes.

## What this is

A React + TypeScript + Vite exercise/quiz system for economics: seeded question variants, graded parts (multiple-choice, number, integer, table, jsxgraph, svgDrawing, matching, true-false, ordering, expression), exercise and exam modes, localStorage persistence. It ships as a standalone app and as an embeddable bundle (`exercise-system.js/.css`) used by Quarto books.

Sibling projects in this folder, each with its own package.json:
- `jsxgraph-library/`: the JSXGraph drawing widget (has its own `CLAUDE.md` and `README.md`).
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
- `src/lib/`: embeddable build entry (`mount`).
- `src/components/jsxgraphComponent/`: the JSXGraph drawing board used by the `jsxgraph` element.
- `src/components/svgDrawingComponent/`: the plain-SVG drawing board used by the `svgDrawing` element.

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

## svgDrawing element (plain-SVG twin of jsxgraph)

- `src/components/svgDrawingComponent/` is the same board/toolbar/grading design as `jsxgraphComponent` (same `ToolName`s, same `DrawingQuestionProps`, same `gradeDrawing`), originally copied from a sibling `svg-drawing-library/` project (since removed, as it wasn't needed here) and adapted for this app the same way jsxgraph was: no Grade button, `initialDrawings`/`readOnly`/`showAnswer` for the app's save/restore and Submit flow. It renders hand-written SVG instead of wrapping the JSXGraph library, so it doesn't pull that dependency in.
- `src/elements/svgDrawing/`: `SvgDrawingInput`/`gradeSvgDrawing` mirror `JsxGraphInput`/`gradeJsxGraph` file-for-file. Import pure logic from `canvas/grading` directly, not from the component's `index.ts`, so logic tests don't render the board.
- One difference from jsxgraph's toolbar: the eraser is a footer toggle button here, not a toolbar tool.
- Demo: `src/questions/14_svgDrawing_ppf.ts` (in assessment `ex1`).
- There used to be a different, unrelated `svgdrawing` element (axis-based points/lines/polygons/curves with economics-specific grading: shift-direction, polygon overlap, curve relation). It was deleted (unused, no demo or course question referenced it) to free up the name for this one; its grading logic was not ported.

## matching element

- `src/elements/matching/`: a left column (numbered, fixed authored order) and a right column (lettered, shuffled) that the student reorders by drag-and-drop or up/down buttons until each right item lines up with its correct left item. `MatchingInput.tsx`, `gradeMatching.ts`, `prepareMatching.ts`, `types.ts`.
- `prepareMatching` shuffles the right column once per variant and stores it as `rightOrder`; the left column's order is always the authored order. The value is the right column's current row order as indices into `pairs` — there's always a complete arrangement to grade, even untouched (graded against the shuffled starting order), so it isn't free of an attempt like a blank box would be.
- Demo: `src/questions/15_matching_econ_vocabulary.ts` (in assessment `ex1`).

## true-false element

- `src/elements/trueFalse/`: a table of statements, each graded independently as True/False (`TrueFalseInput.tsx`, `gradeTrueFalse.ts`, `types.ts`). No `prepare()` step; smallest element alongside `integer`.
- Demo: `src/questions/16_true-false_elasticity_statements.ts` (in assessment `ex1`).

## ordering element

- `src/elements/ordering/`: a single sequence of boxes (e.g. a causal chain) the student drags into the correct order, like `matching` but with one column instead of two. `OrderingInput.tsx`, `gradeOrdering.ts`, `prepareOrdering.ts`, `types.ts`.
- `prepareOrdering` shuffles the boxes once per variant and stores it as `startOrder`; the correct order is always the authored `items` order. Same "always a complete arrangement to grade" pattern as `matching`.
- `layout: "vertical" | "horizontal"` and `showArrows` are teacher-set per question (author-time authoring fields on the part), not a student preference. `layout` picks stacked boxes with up/down move buttons and a ↓ between them, or a row of boxes with left/right move buttons and a → between them.
- Demo: `src/questions/17_ordering_income_demand_price.ts` (in assessment `ex1`), horizontal layout.

## expression element (symbolic math input)

- `src/elements/expression/`: a text box for a math expression (e.g. a polynomial), graded by **evaluating** at random points rather than comparing text — `"x^2 + .5 x + 1"` and `"x^2 + 1/2 x + 1"` both grade as correct. `ExpressionInput.tsx`, `gradeExpression.ts`, `prepareExpression.ts`, `mathUtils.ts`, `types.ts`.
- `prepareExpression` samples `samples` random test points per variable (default range `[1, 9]`) once per variant and stores them as `testPoints`, the same "freeze randomness at prepare-time" pattern as `matching`'s shuffle — this is what keeps grading deterministic on review (`ReviewView` recomputes `gradeQuestion` from the stored seed + submitted value, so grading can never depend on fresh `Math.random()` calls).
- Variables are auto-detected from `correct` (every symbol that isn't a mathjs constant/function) unless `variables` is given explicitly. `validateExpression` also runs a trial evaluation to catch typos (an undefined function, an undeclared symbol) as an **invalid** answer (no attempt used) rather than a silently-wrong one.
- `ExpressionInput` renders a live KaTeX preview below the box as the student types, via mathjs's `node.toTex()` piped through the same `Markdown`/KaTeX pipeline as question text.
- Extra dep: `mathjs`, imported from `mathjs/number` (not the top-level `mathjs` entry point) — the plain-JS-number build, which drops BigNumber/Fraction/Complex/Matrix/Unit support to keep the bundle down. This still adds several hundred KB; see `mathUtils.ts`'s comment before reaching for the full `mathjs` import.
- Demo: `src/questions/18_expression_marginal_cost.ts` (in assessment `ex1`).

## Conventions

- Question files are named `NN_<type>_<description>` (`mc` = multiple-choice; mixed types joined with `-`), in `src/questions/` and in the Quarto `questions/` folders.
- Element types: `multiple-choice`, `number`, `integer`, `table`, `jsxgraph` (`src/elements/jsxgraph/`), `svgDrawing` (`src/elements/svgDrawing/`), `matching` (`src/elements/matching/`), `true-false` (`src/elements/trueFalse/`), `ordering` (`src/elements/ordering/`), `expression` (`src/elements/expression/`).
- Randomness only through the seeded `rng` passed to `generate`; `engine/seed.ts` is the only non-seeded source.
- An invalid part value must return `{ valid: false }` from `validate`, not a wrong grade, so no attempt is used.
- Question text is Markdown with KaTeX: write a literal dollar sign as `\$` inside TS template strings.
- New element type checklist: see "How to add a new element type" in `Readme.md`.
