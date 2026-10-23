# CLAUDE.md

Guidance for working in this repo. User-facing documentation (element types, how to add questions, the Quarto workflow) is in `Readme.md`; keep it in sync with code changes.

## What this is

A React + TypeScript + Vite exercise/quiz system for economics: seeded question variants, graded parts (multiple-choice, number, integer, table, jsxgraph, svgDrawing, matching, true-false, ordering, expression, essay, conditional-grading), exercise and exam modes, localStorage persistence. It ships as a standalone app and as an embeddable bundle (`exercise-system.js/.css`) used by Quarto books.

Sibling projects in this folder, each with its own package.json:
- `jsxgraph-library/`: the JSXGraph drawing widget (has its own `CLAUDE.md` and `README.md`).
- `quarto-demo/`: minimal Quarto website that embeds the bundle and runs the demo quiz.

## Commands

```bash
npm run dev         # standalone app
npm run test        # Vitest, run once
npm run build       # tsc -b + app build -> dist/
npm run build:lib   # embeddable bundle -> dist-lib/ (then copy to the Quarto assets folder)
npm run scorm -- quarto-demo/quiz1.js   # SCORM 2004 zip -> dist-scorm/
```

The environment is Windows (PowerShell/Git Bash). Verify changes with `npm run test` and `npx tsc -b`.

- Vitest swallows `console.log` from tests; write to a file if you need to inspect output.
- Vitest sometimes fails with "Timeout waiting for worker to respond" on this machine; that's a startup hiccup, rerun.
- When scripting edits to files containing backslashes (LaTeX like `\frac`, `\$`), shell heredocs and Python string escaping easily mangle them; prefer the Edit tool for those lines.
- The Chrome browser extension may not be connected; if so, say UI changes were verified by tests only.

## Layout

- `src/engine/`: subject-agnostic core (types, seeded RNG, element registry, grading, assessment reducer, storage).
- `src/elements/<type>/`: one folder per element type (types, grade logic, input component, `index.ts`); registered in `src/elements/index.ts`.
- `src/questions/`, `src/assessments/index.ts`: demo question bank and assessments.
- `src/lib/`: embeddable build entry (`mount`, with `review: true` for the teacher review page).
- `src/pages/Import.tsx` + `src/components/ReviewView.tsx`: review a results file (regrades every submission) and enter teacher grades; `Import` takes the question bank as a prop.
- `src/components/jsxgraphComponent/`: the JSXGraph drawing board used by the `jsxgraph` element.
- `src/components/svgDrawingComponent/`: the plain-SVG drawing board used by the `svgDrawing` element.
- `src/components/graphView/`: static (display-only) SVG graphs, used by multiple-choice graph options.
- `AssessmentView` navigation: a sidebar when the view is >= 56rem wide, Q-chips when narrower (see "Question navigation" below).

## Content lives in two places (important)

- `src/questions/` is the **demo** set only: one question per element type, numbered consecutively `01`-`15` (15 is a second multiple-choice, showing graph options) (`ex1` in `src/assessments/index.ts` is the demo assessment and must include every bank question; a test checks that).
- Exception, at the user's request: `exams/macro-sample-exam2/` (`exam2.js` + `questions/`, plain JS, from the Sample Exam 2 PDF, questions `01`-`29` (sub-part questions worth 3 points, set in `exam2.js`; `26` is conditional grading: saving as a function of r, then r* and I* from it; `27` is an IS-LM-FE jsxgraph question (temporary beneficial supply shock: draw FE1 and LM1); `28` (solve IS and LM simultaneously, show steps) and `29` (China vs U.S. growth with the Solow model, max 100 characters) are hand-graded essays; ids must be unique across `questions` + `courseQuestions`); SCORM-packaged with `npm run scorm -- exams/macro-sample-exam2/exam2.js`) is also shown in the app as assessment `ex2` (exam mode, grades hidden). `exam2.d.ts` types it for TS; its questions go in `courseQuestions` in `src/questions/index.ts` (found by `getQuestion`, not in the demo `questions` list), and `questions.test.ts` checks them. Don't add course questions there. When a demo question is deleted, renumber the remaining files and update `src/questions/index.ts`, the Readme tables and the demo paths in this file.
- Second exception, same layout: `exams/micro-sample-exam2/` (quiz file `sample-micro-exam2.js` + `.d.ts`, so it isn't confused with the macro `exam2.js`; Econ 30303 micro, from `Exam 2 Ch6-9_Sp2026_corrected.Rmd`, kept in the folder; assessment id `micro-sample-exam2`, shown in the app as `ex3`; question ids `micro-exam2-qNN-...`). `01`-`07` are multiple choice from `additional.md` (2 points each; its tie-in sales, two-country pricing and Honda parts questions were removed as not covered in class); `08`-`17` are true/false + hand-graded essay defense (`trueFalseDefend` in its `helpers.js`, 4 points each); `18` is MC/AVC curves (students draw AVC, MC, a price line and q1/q2 on blank axes with the 5-point curve tool; the jsxgraph part has `manualGrading: true`, plus an essay on why q2 beats q1; both hand-graded); `19` is monopoly profit and DWL (demand P = 120 - Q and MC = ATC = 40 given; students draw MR (slope-intercept), the profit rectangle and the DWL triangle, graded by corners in any order; drawing only, no subparts); `20` is conditional grading (AVC, ATC, min AVC, q* and profit at P = 32, carried forward). 114 points. Its zip is `dist-scorm/micro-sample-exam2-scorm.zip`; never overwrite the macro exam's files or its `sample-exam2` id.
- Editable copies (made 2026-10-23, for the user to change questions; now back in `mode: "exercise"`): `exams/macro-exam2/` (`macro-exam2.js`, id `macro-exam2`, title "Exam 2") and `exams/micro-exam2/` (`micro-exam2.js`, id `micro-exam2`, title "Micro Exam 2"). Same question files and question ids as the sample exams; not shown in the app (adding them would need new question ids, unique across `questions` + `courseQuestions`). Zips: `dist-scorm/macro-exam2-scorm.zip`, `dist-scorm/micro-exam2-scorm.zip`.
- `quarto-demo/` is kept as slim as possible: `_quarto.yml` (website; the quiz loader script is inlined under `include-in-header: text:`), `index.qmd` (one `<div class="exercise-system-root" data-quiz="quiz1.js">`), `quiz1.js` (= assessment `ex1`), `questions/01`-`15` and `assets/exercise-system.js/.css`. Don't add template/book files back.
- `quarto-demo/questions/NN_*.js` are plain-JS copies of `src/questions/NN_*.ts` with only the types removed (same numbers, names, ids, text). When a demo question changes, update its `.js` twin too; `quiz1.js` lists the same questions as `ex1`.
- Real course quizzes live in the user's own Quarto books outside this repo (same structure: quiz `.js` + `questions/` + the bundle).
- Library code changes go in `src/` first, get tested, then `npm run build:lib` and copy `dist-lib/exercise-system.js/.css` into `quarto-demo/assets/`. Never hand-edit the bundle.

## jsxgraph element (drawing component built into the app)

- `src/components/jsxgraphComponent/` is the JSXGraph board, toolbar and grader, copied from `jsxgraph-library/` and changed for this app. It is **not** loaded as a separate bundle. It has no Grade button: `DrawingApp` reports drawings through `onDrawingsChange`, and the element grades on the app's Grade (or Save).
- `src/elements/jsxgraph/`: `JsxGraphInput` keeps the part value in sync with the board (value = `UserDrawing[]`); `gradeJsxGraph` calls `gradeDrawing` from `canvas/grading.ts`. Import pure logic from `canvas/grading` directly, not from the component's `index.ts`, so logic tests don't load JSXGraph.
- The board only draws for itself; `JsxGraphInput` remounts it (via `key`) when the value changes from outside (new variant, loaded progress) so `initialDrawings` restores it. `readOnly` and `showAnswer` cover finished questions.
- Part `props` are `DrawingQuestionProps` as JSON; `expectedDrawing` is required (`check` enforces it). Keep values JSON-serializable: they're saved and exported.
- Extra deps: `jsxgraph`, `lucide-react`. The board's CSS (`canvas/DrawingCanvas.css`) uses generic class names (`.toolbar`, `.board`, ...); don't reuse them elsewhere.
- Later fixes to `jsxgraph-library/` are not picked up automatically; port them by hand.
- Grading extensions made here (not in `svgDrawingComponent` or `jsxgraph-library/`): `VerticalShape` (`x`), `ThroughPointShape` (`through` + `slope: "up" | "down"`), both accepting any of `LINE_LIKE_TOOLS`; `props.anyOrder` (best matching, text/coordinate drawings ignored, extras lower the score; `GradeResult.extra`); `InitialObjectSpec.showPoints: false`. Tests: `canvas/grading.test.ts`.
- `triangle` tool (added here, not in `svgDrawingComponent` or `jsxgraph-library/`): three clicks, completes on the third (`TRIANGLE_POINTS` in `drawingLogic.tsx`), built like a polygon. Rectangles and triangles are gradable by exact corners (`compareRectangle`: either diagonal; `compareTriangle`: any click order; both within `tolerancePercent`) in `canvas/grading.ts`, also only here.
- `curve5` tool (also only here): like `curve` but 5 clicks (`CURVE_POINTS` / `isCurveTool` in `drawingLogic.tsx`); in `LINE_LIKE_TOOLS`.
- Rotated y-axis titles get clipped when long (a board-label issue, not fixed): keep `yLabel` short (e.g. `r`), and name the axes in the question text.
- Demo: `src/questions/07_jsxgraph_budget_line.ts` (in assessment `ex1`).
- JSXGraph's JessieCode parser has a direct `eval`; both Vite configs filter out that one `[EVAL]` build warning (`onLog`), and only for files under `jsxgraph/`.
- The bundle includes JSXGraph (about 2.2 MB). `quarto-demo` uses it in `questions/07_jsxgraph_budget_line.js`.
- `quarto-demo` loads the stylesheet (`css:`) and the quiz loader (inline `include-in-header`) once, from `_quarto.yml`; pages only contain `<div class="exercise-system-root" data-quiz="quizN.js">`.

## svgDrawing element (plain-SVG twin of jsxgraph)

- `src/components/svgDrawingComponent/` is the same board/toolbar/grading design as `jsxgraphComponent` (same `ToolName`s, same `DrawingQuestionProps`, same `gradeDrawing`), originally copied from a sibling `svg-drawing-library/` project (since removed, as it wasn't needed here) and adapted for this app the same way jsxgraph was: no Grade button, `initialDrawings`/`readOnly`/`showAnswer` for the app's save/restore and Grade/Save flow. It renders hand-written SVG instead of wrapping the JSXGraph library, so it doesn't pull that dependency in.
- `src/elements/svgDrawing/`: `SvgDrawingInput`/`gradeSvgDrawing` mirror `JsxGraphInput`/`gradeJsxGraph` file-for-file. Import pure logic from `canvas/grading` directly, not from the component's `index.ts`, so logic tests don't render the board.
- One difference from jsxgraph's toolbar: the eraser is a footer toggle button here, not a toolbar tool.
- Both boards' stylesheets use the same generic class names (`.toolbar`, `.tool-tooltip`, ...) and both are in the bundle, so a rule in one styles the other too. Don't give `.toolbar` an `overflow`: it clipped the tool tooltips (which open to the left, over the board) in both boards.
- Demo: `src/questions/08_svgDrawing_ppf.ts` (in assessment `ex1`).
- There used to be a different, unrelated `svgdrawing` element (axis-based points/lines/polygons/curves with economics-specific grading: shift-direction, polygon overlap, curve relation). It was deleted (unused, no demo or course question referenced it) to free up the name for this one; its grading logic was not ported.

## matching element

- `src/elements/matching/`: a left column (numbered, fixed authored order) and a right column (lettered, shuffled) that the student reorders by drag-and-drop or up/down buttons until each right item lines up with its correct left item. `MatchingInput.tsx`, `gradeMatching.ts`, `prepareMatching.ts`, `types.ts`.
- `prepareMatching` shuffles the right column once per variant and stores it as `rightOrder`; the left column's order is always the authored order. The value is the right column's current row order as indices into `pairs` — there's always a complete arrangement to grade, even untouched (graded against the shuffled starting order), so it isn't free of an attempt like a blank box would be.
- Demo: `src/questions/09_matching_econ_vocabulary.ts` (in assessment `ex1`).

## true-false element

- `src/elements/trueFalse/`: a table of statements, each graded independently as True/False (`TrueFalseInput.tsx`, `gradeTrueFalse.ts`, `types.ts`). No `prepare()` step; smallest element alongside `integer`.
- Demo: `src/questions/10_true-false_elasticity_statements.ts` (in assessment `ex1`).

## ordering element

- `src/elements/ordering/`: a single sequence of boxes (e.g. a causal chain) the student drags into the correct order, like `matching` but with one column instead of two. `OrderingInput.tsx`, `gradeOrdering.ts`, `prepareOrdering.ts`, `types.ts`.
- `prepareOrdering` shuffles the boxes once per variant and stores it as `startOrder`; the correct order is always the authored `items` order. Same "always a complete arrangement to grade" pattern as `matching`.
- `layout: "vertical" | "horizontal"` and `showArrows` are teacher-set per question (author-time authoring fields on the part), not a student preference. `layout` picks stacked boxes with up/down move buttons and a ↓ between them, or a row of boxes with left/right move buttons and a → between them.
- Demo: `src/questions/11_ordering_income_demand_price.ts` (in assessment `ex1`), horizontal layout.

## expression element (symbolic math input)

- `src/elements/expression/`: a text box for a math expression (e.g. a polynomial), graded by **evaluating** at random points rather than comparing text — `"x^2 + .5 x + 1"` and `"x^2 + 1/2 x + 1"` both grade as correct. `ExpressionInput.tsx`, `gradeExpression.ts`, `prepareExpression.ts`, `mathUtils.ts`, `types.ts`.
- `prepareExpression` samples `samples` random test points per variable (default range `[1, 9]`) once per variant and stores them as `testPoints`, the same "freeze randomness at prepare-time" pattern as `matching`'s shuffle — this is what keeps grading deterministic on review (`ReviewView` recomputes `gradeQuestion` from the stored seed + submitted value, so grading can never depend on fresh `Math.random()` calls).
- Variables are auto-detected from `correct` (every symbol that isn't a mathjs constant/function) unless `variables` is given explicitly. `validateExpression` also runs a trial evaluation to catch typos (an undefined function, an undeclared symbol) as an **invalid** answer (no attempt used) rather than a silently-wrong one.
- `ExpressionInput` renders a live KaTeX preview below the box as the student types, via mathjs's `node.toTex()` piped through the same `Markdown`/KaTeX pipeline as question text.
- Extra dep: `mathjs`, imported from `mathjs/number` (not the top-level `mathjs` entry point) — the plain-JS-number build, which drops BigNumber/Fraction/Complex/Matrix/Unit support to keep the bundle down. This still adds several hundred KB; see `mathUtils.ts`'s comment before reaching for the full `mathjs` import.
- Demo: `src/questions/12_expression_marginal_cost.ts` (in assessment `ex1`).

## essay element (hand-graded)

- `src/elements/essay/`: one text box with optional `maxWords`/`maxChars`/`minWords`; optional `modelAnswer` is shown under a "Model answer" heading once submitted (omitted or `""` reveals nothing: an empty `formatCorrectAnswer` hides the correct-answer box in `QuestionBody`). `EssayInput.tsx`, `gradeEssay.ts`, `types.ts`.
- Student LaTeX goes between `$...$` (or `$$...$$`), rendered by the same `Markdown` as question text; a plain dollar sign is `\$` (the help text says so). The essay preview uses `<Markdown breaks>` (`remark-breaks`) so each Enter is a new line; multi-line equations use `$$\begin{aligned} ... \\ ... \end{aligned}$$`. The "Insert equation" button is off by default; `equationEditor: true` on the part shows it.
- "Insert equation" opens `MathEditor.tsx`: a MathLive `<math-field>` created imperatively in a ref'd div (React 18 + no JSX typings), whose LaTeX is inserted at the textarea cursor as `$...$`. MathLive is `import()`ed on first open (separate chunk in the app; `rolldownOptions.output.inlineDynamicImports` in `vite.lib.config.ts` keeps the bundle one file) with `fontsDirectory`/`soundsDirectory` set to `null` (it reuses the KaTeX fonts). Tests `vi.mock("mathlive")` with a stub custom element; jsdom can't run the real one.
- Manual grading is engine-level, not essay-specific: `isManualPart(part)` (`engine/registry.ts`) is true for an element type with `ElementDefinition.manualGrading` (essay) or any part with `manualGrading: true` (`BasePart`; e.g. a free-hand jsxgraph drawing, which then needs no `expectedDrawing` and is never auto-graded). Always check through `isManualPart`, not `getElement(...).manualGrading`. `ElementDefinition.manualGrading` makes `grade()` return `{ score: 0, pending: true }`; a question with a manual part is finished after one submission (`isFinished`/`canNewVariant` in `engine/assessment.ts`); `pendingPoints`/`totals().pending` report what awaits grading.
- Teacher grades live on the submission as `manualGrades: { [part]: { score: 0..1, comment? } }`; `gradeQuestion(parts, values, manualGrades)` swaps them in, so review regrading stays deterministic. `setManualGrade()` in `engine/storage.ts` updates an exported file; `ReviewView` has the points/comment form and "Download graded results".
- Quarto teacher view: `<div class="exercise-system-root" data-quiz="quizN.js" data-review>` mounts `Import` with that quiz's questions (`mount(..., { review: true })`).
- Demo: `src/questions/13_essay_quadratic_equation.ts` (in assessment `ex1`).

## conditional-grading element (multi-step, errors carried forward)

- `src/elements/conditionalGrading/`: one part with ordered `steps` (`kind: "number" | "expression"`), one box per step (`ConditionalGradingInput.tsx`, `gradeConditional.ts`, `types.ts`). Value = `{ [stepName]: text }`.
- Each step's `correct` is a mathjs formula that may use earlier steps by name (number step = number, expression step = function of its variables, e.g. `a(0)`). `gradeSteps` evaluates it with the correct earlier answers and with the student's own; matching only the latter is "carried-forward" (`carryForwardCredit`, default 1). An undefined carried-forward value (e.g. division by zero) just doesn't match.
- Everything stays JSON (formulas are strings, `prepare` stores `testPoints`), so review regrading is deterministic. Reuses `expression/mathUtils.ts` (`evaluateAt` accepts function-valued scope entries for this) and `number/gradeNumber.ts`.
- Optional `placeholder` per step (default `e.g. -2x + 3` on expression steps, none on number steps) and on `expression` parts (default `e.g. x^2 + 1/2 x + 1`), so the hint can use the question's variable (`e.g. 2q + 3`).
- Demo: `src/questions/14_conditional-grading_profit_maximum.ts` (in assessment `ex1`).

## Question navigation (AssessmentView)

- A Tailwind container query (`@container` on the view, `@4xl:` = 56rem) switches the `<nav aria-label="Questions">` between a left sidebar (status mark, `Qn`, truncated title, points unless grades are hidden; sticky) and the old wrapping row of `Q1`, `Q2`, ... chips when narrow. One `<ol>` with responsive classes, not two navs, so tests and screen readers see the same buttons (`aria-label` unchanged).
- `App.tsx` widens the assessment route to `max-w-6xl` (other pages stay `max-w-4xl`) so the sidebar fits; a normal-width Quarto column stays below 56rem and keeps the chips. The previous top-row-only layout is the commit before this change.

## Graph options in multiple-choice (graphView)

- `MultipleChoiceOption.graph?: GraphSpec` shows the option as a static SVG graph; `MultipleChoiceInput` then renders `GraphGrid` (cards, `@container` + `@lg:grid-cols-2`, "Graph A/B/..." by display index via `graphName`). Same value/grading as any multiple-choice; `formatAnswer`/`formatCorrectAnswer` prefix `Graph X: ` to the option text. The text is hidden visually but is the SVG's `aria-label`. `check` rejects graph options with `display: "dropdown"` and runs `checkGraph`.
- `src/components/graphView/`: `types.ts` (`GraphSpec`, shapes: segment, function, point, polygon, arrow, text; a fixed `GraphColor` palette), `geometry.ts` (pure: `scales`, `functionRuns` via `expression/mathUtils`, `arrowHead`, `checkGraph`), `GraphView.tsx` (display only; shapes clipped to the plot; labels unclipped with a background-colored halo). Tailwind color classes are spelled out in full maps so the build finds them.
- Demo: `src/questions/15_mc_graph_supply_demand_shift.ts` (in assessment `ex1`).
- Visual check without the Chrome extension: render a variant with `renderToStaticMarkup` in a throwaway vitest file, link `dist-lib/exercise-system.css` (after `build:lib`), screenshot with headless Edge (`msedge --headless --screenshot=...`).

## Grade and Save buttons

- The question button is **Grade** (formerly Submit). There is no Save button any more (the old `saveButton` option was removed at the user's request).
- One grade per variant: `isFinished` is true once the current variant has a graded submission (or no attempts remain), so Grade locks the variant and shows the correct answer, whatever the score; retrying takes "New variant". Only with grades shown: hidden-grades saves ignore `isFinished`.
- "New variant" (`canNewVariant(q, hideGrades)` in `engine/assessment.ts`) is tied to grades being shown, not to `mode`: any mode with the Grade button, after a graded submission of the current variant, with attempts left and no hand-graded part. Exams default to 1 attempt, so they only show it with `maxAttempts` > 1.
- `Assessment.resetButton: false` hides "Reset assessment" (`AssessmentView` shows it only when `persistence.canReset` and `resetButton !== false`). The header link is "Results" (it was "Results & export"; there is no student-facing export).
- `Assessment.gradeButton: false` (`hidesGrades()` in `engine/types.ts`) = hidden-grades mode: no button on the question; `AssessmentView`'s `leave()` saves on navigation. "Save & next"/"Save & finish" save a complete changed answer (`isDraftComplete`/`isDraftSaved` in `engine/assessment.ts`), and on an incomplete one the first press warns (role=alert, marks missing parts) and a second press skips; Previous, the Q buttons and the Results link save a complete answer silently; Enter in the form saves too. Saving dispatches the `save` action (`createAssessmentReducer({ hideGrades: true })`; the plain `assessmentReducer` ignores it). It validates, grades silently, and replaces the current variant's submission (latest save counts, `bestScore` recomputed, never closes the question). `setValue` stays allowed after `isFinished`. The context exposes `hideGrades`; `QuestionView`, `AssessmentView` and `Results` hide scores/feedback/correct answers/attempts with it.
- SCORM: `connectScorm(api, bank, { hideGrades })`; `scormReport` counts a question done via `isDone(q, hideGrades)` (saved once). Scores still go to the LMS, which hides them until release.

## SCORM packages (Blackboard Ultra)

- `npm run scorm -- <quiz.js> [--passing 0.7] [--out file.zip]` = `build:lib` + `scripts/scorm-package.mjs`: zips `imsmanifest.xml` (SCORM 2004 3rd ed., one SCO; uses only 3rd-edition data-model elements), an `index.html` that calls `mountScorm`, the `dist-lib` bundle, and the quiz plus every module it imports (relative imports, followed transitively; must stay inside the quiz's folder). Output goes to `dist-scorm/` (git-ignored). The script's pure parts are exported and tested in `scripts/scorm-package.test.mjs` (`@vitest-environment node`).
- Storage is pluggable: `Persistence` (`src/engine/persistence.ts`) is passed to `AssessmentProvider`/`QuizWidget`; `localPersistence` is the default. `canReset: false` hides Reset; `learnerName` pre-fills the name; `saveFailedMessage` replaces the storage warning. Pass a stable object (it's an effect dependency).
- `src/scorm/`: `findScormApi` (walks parent frames, then `opener`, for `API_1484_11`); `connectScorm` (Initialize, `canReset` option (`mountScorm` passes `mode === "exercise"`, so exams never show Reset), `cmi.exit=suspend`, reads `cmi.scaled_passing_score`/`cmi.learner_name`, `terminate()` sets `session_time`); `suspend.ts` (drops `preparedParts`, rebuilt from seeds on load; strips answers from all but each question's `lastSubmission`; lz-string, `es1:` prefix; 64,000-char limit); `report.ts` (pure `scormReport(state, bank, passingScore)` -> ordered `[element, value]` pairs: score, completion/success/progress, one interaction per question index, written 0..k so indices are created in order).
- `cmi.interactions.n.timestamp` must be SCORM `time(second,10,2)`: `scormTimestamp` keeps 2 fractional digits (`...:36.12Z`); a `Z` without a fraction is rejected by Blackboard (error 406). A test checks the pattern.
- `learner_response` comes from each element's `formatAnswer` (typed strings as-is). The drawing elements list every shape with its points rounded to 2 decimals (`Drew 1 shape: segment (0, 8.33) to (10, 0).`), so teachers can see drawings in Blackboard's Student submissions; the same text shows in `ReviewView`.
- Every failed `SetValue` is logged as `SCORM SetValue(<element>) failed: error <code> <message> (<GetDiagnostic>) [value length N: "<start>"]` and makes `save()` return false, which shows `saveFailedMessage`. The messages never mention exporting (exams): there is no student-facing export button (`buildExport`/`downloadJson` exist but aren't wired to the student UI), and the user doesn't want students prompted to export.
- Reporting runs on every save but only re-sends score/interactions (and commits immediately) when the report changes, i.e. after a submission; drafts only update `suspend_data`, with a debounced (2 s) commit.
- Essays: no grade can flow back into a SCORM package; pending essays count 0, `success_status` stays `unknown`, interaction `result` is `neutral`, the essay text is the `learner_response`. Teachers grade in the LMS gradebook.
- Tests use `src/scorm/fakeLms.ts` (in-memory API that records calls). The user has tested the demo package in Blackboard Ultra (3rd edition): scores, saved progress/resume and Student submissions work; Blackboard validates data-model value formats strictly, so check the spec's type for any new `cmi.*` value.

## Conventions

- Question files are named `NN_<type>_<description>` (`mc` = multiple-choice; mixed types joined with `-`), in `src/questions/` and in the Quarto `questions/` folders.
- Element types: `multiple-choice`, `number`, `integer`, `table`, `jsxgraph` (`src/elements/jsxgraph/`), `svgDrawing` (`src/elements/svgDrawing/`), `matching` (`src/elements/matching/`), `true-false` (`src/elements/trueFalse/`), `ordering` (`src/elements/ordering/`), `expression` (`src/elements/expression/`), `essay` (`src/elements/essay/`), `conditional-grading` (`src/elements/conditionalGrading/`).
- Randomness only through the seeded `rng` passed to `generate`; `engine/seed.ts` is the only non-seeded source.
- An invalid part value must return `{ valid: false }` from `validate`, not a wrong grade, so no attempt is used.
- Every `<button>` needs `type="button"` (or another explicit type): inputs render inside the question's `<form>`, so a typeless button presses Grade. `src/components/buttonTypes.test.ts` checks all `.tsx` sources.
- Question text is Markdown with KaTeX: write a literal dollar sign as `\$` inside TS template strings.
- New element type checklist: see "How to add a new element type" in `Readme.md`.
