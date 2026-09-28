# Exercise System

A browser-only system for online assessments, written in React and TypeScript and modeled on
[PrairieLearn](https://www.prairielearn.com/)'s question architecture. It has **no backend** and
**no login**. Every question is generated from a **seed**, so each attempt can get a fresh variant
of the question, and anyone who has the seed can rebuild exactly the same variant.

The question bank covers introductory economics (elasticity, equilibrium, taxes, consumer choice,
GDP, and so on). The engine itself doesn't depend on any subject.

You can use the system in two ways:

1. **As a standalone web app** (`npm run dev` / `npm run build`). It has a home page that lists the
   assessments, exercise and exam modes, a results page with JSON export, and an import page where
   an instructor can review a student's export.
2. **As an embeddable library** (`npm run build:lib`). This produces one `.js` file and one `.css`
   file that can be added to any static page, such as a chapter of a Quarto book, to show a quiz
   inline. The `quarto-demo/` folder has a working example.

`planning.md` holds the original design and milestone plan.

---

## Contents

- [Status](#status)
- [Quick start](#quick-start)
- [Project layout](#project-layout)
- [How it works](#how-it-works)
- [Element types](#element-types) (start with [Question types at a glance](#question-types-at-a-glance))
- [How to add a new question](#how-to-add-a-new-question)
- [How to add a new assessment](#how-to-add-a-new-assessment)
- [How to add a new element type](#how-to-add-a-new-element-type)
- [Persistence, export and import](#persistence-export-and-import)
- [Embedding in a Quarto book](#embedding-in-a-quarto-book)
- [Testing](#testing)
- [Roadmap](#roadmap)

---

## Status

Phase 1 from `planning.md` is done, and some later work has been added on top of it.

| Area | State |
| --- | --- |
| Seeded RNG, question engine, element registry | Done |
| Multiple choice (radio + dropdown), number, integer elements | Done |
| **Drawing element** (points, lines, polygons, curves on a graph) | Done. Added beyond phase 1 |
| **Table element** (fillable table with fixed and blank cells, partial credit) | Done. Added beyond phase 1 |
| **JSXGraph element** (drawing component built into the app; graded on Submit) | Done. Added beyond phase 1. Demo: `13_jsxgraph_budget_line.ts` in Exercise 1 |
| Exercise and exam modes, attempts, best score | Done |
| localStorage persistence, reset, JSON export, import/review page | Done |
| Accessibility, mobile layout, dark mode | Done |
| Embeddable library build + Quarto demo | Done. Added beyond phase 1 |
| Checkbox, matching/ordering, units, symbolic math, manual grading | Not started (see [Roadmap](#roadmap)) |

---

## Quick start

You need Node.js 20 or later.

```bash
npm install
npm run dev        # start the dev server (standalone app)
npm run test       # run the test suite once (Vitest)
npm run build      # type-check and build the standalone app into dist/
npm run build:lib  # build the embeddable bundle into dist-lib/
npm run preview    # serve the built app from dist/
```

The standalone app uses hash routing (`#/`, `#/assessment/<id>`, `#/assessment/<id>/results`,
`#/import`). Because of that, `dist/` works from any static host or subfolder, and also when opened
with `file://`.

### Tech stack

- Vite, React 18 and TypeScript in strict mode
- Tailwind CSS v4, with light and dark themes that follow `prefers-color-scheme`
- `react-markdown` + `remark-math` + `remark-gfm` + `rehype-katex` for question text:
  `$...$` for inline math and `$$...$$` for display math
- Vitest + React Testing Library + jsdom
- State lives in `useReducer` + context. There's no state library, and the RNG (mulberry32) is
  written in-house.

---

## Project layout

```
exercise_system/
├── planning.md               # original design + milestone plan
├── index.html                # entry page for the standalone app
├── vite.config.ts            # app build + Vitest config
├── vite.lib.config.ts        # library build (single ES module + CSS)
├── src/
│   ├── engine/               # subject-agnostic core (no React UI)
│   │   ├── types.ts          # Question, Part, Assessment, Rng, GradeResult, ...
│   │   ├── rng.ts            # mulberry32, string -> seed hashing, derived seeds
│   │   ├── seed.ts           # fresh random seeds (the ONLY non-seeded randomness)
│   │   ├── registry.ts       # element type -> { check, prepare, validate, grade, Input, ... }
│   │   ├── variant.ts        # { question, seed } -> Variant (text + prepared parts)
│   │   ├── gradeQuestion.ts  # validate every part, then grade, then weighted average
│   │   ├── assessment.ts     # reducer: attempts, variants, best score, exam lockout
│   │   └── storage.ts        # localStorage save/load + JSON export/import
│   ├── elements/             # one folder per element type
│   │   ├── index.ts          # registers every element with the engine
│   │   ├── multipleChoice/
│   │   ├── number/
│   │   ├── integer/
│   │   ├── svgdrawing/       # interactive SVG graph input + geometric grading
│   │   ├── table/            # fillable table (e.g. gains-from-trade worksheets)
│   │   ├── jsxgraph/         # element around the JSXGraph drawing component (input + grading)
│   │   └── TextInput.tsx     # shared text box used by number/integer
│   ├── questions/            # question bank: one file per question + index.ts
│   ├── assessments/index.ts  # assessment definitions (exercises, quizzes)
│   ├── components/           # QuestionView, AssessmentView, ReviewView, Markdown, ...
│   │   └── jsxgraphComponent/  # JSXGraph drawing board + toolbar + grading (copied from jsxgraph-library)
│   ├── pages/                # Home, Results, Import
│   ├── lib/                  # embeddable build: entry.tsx (mount API) + QuizWidget
│   └── test/                 # test setup + fixtures
├── jsxgraph-library/         # standalone JSXGraph widget project (the component was copied from here)
├── svg-drawing-library/      # separate project: the SVG drawing widget
├── dist/                     # built standalone app (generated)
├── dist-lib/                 # built library: exercise-system.js / .css (generated)
└── quarto-demo/              # sample Quarto book that embeds the library
```

---

## How it works

### From seed to graded answer

Each question is an object with three pure functions, similar to PrairieLearn's `server.py`:

1. **`generate(rng)`** returns the random parameters for this variant.
2. **`render(params)`** returns the question text as Markdown + LaTeX.
3. **`parts(params)`** returns the input elements (parts), each carrying its own correct answer.

`createVariant(question, seed)` (in `src/engine/variant.ts`) runs those three steps, checks the part
specs for authoring errors, and then lets each element **prepare** its part. For example,
multiple choice picks a subset of options and shuffles them at this point. Each part gets its own
RNG stream derived from the seed and the part name, so adding a part doesn't reshuffle the others.
The prepared parts are saved with the question state. That way rendering, grading and later review
always see the same option list.

`gradeQuestion` first **validates** every part. If any part is badly formatted (an empty box,
`2/3` typed into a number field, no option selected), the student sees a message and **no attempt
is used**. If every part is valid, each part is **graded** from 0 to 1 and the question score is
the **weighted average** of the part scores.

### Rules for randomness

- Never call `Math.random()` in question code. Use the `rng` passed to `generate`:
  `rng.int(min, max)`, `rng.float(min, max, decimals?)`, `rng.pick(arr)`, `rng.shuffle(arr)`,
  `rng.sample(arr, k)`, `rng.next()`.
- The same seed always gives the same parameters, option order and correct answers. A test
  checks this for every question in the bank.
- A variant is identified by `{ questionId, seed }`. The seed is shown in small text under each
  question.

### Assessment modes

| | `exercise` | `exam` |
| --- | --- | --- |
| Variants | "New variant" gives a fresh seed after a graded submission | One fixed seed per question, chosen when the assessment starts |
| Attempts | Unlimited by default | 1 by default |
| Score | Best score across all variants | Best score across attempts |
| Correct answers | Shown once the question is finished | Shown after the last attempt |

You can override `maxAttempts` for each question in the assessment definition.

---

## Element types

### Question types at a glance

There are **6 element types**. A question is made of one or more **parts**, and each part uses
one element, so a single question can mix them. For example, you could combine a number box with
a multiple-choice part, or a drawing with a follow-up number.

| Element | The student… | Options | Graded by |
| --- | --- | --- | --- |
| `multiple-choice` | picks one option | radio buttons or an inline dropdown; shuffled or fixed order; show a random subset (`numberAnswers`) | 1 if the correct option is chosen, else 0; optional per-option feedback |
| `number` | types a decimal number | units after the box (`suffix`) | relative/absolute tolerance (`relabs`), significant figures (`sigfig`) or decimal places (`decdig`) |
| `integer` | types a whole number | units after the box | exact match |
| `svgdrawing` | draws on an SVG graph | adds points, lines (drawn fresh or shifted from a given curve), shaded areas (polygons) and curves | position within a tolerance, direction of a shift, area overlap, or which side of a reference curve |
| `jsxgraph` | draws on a JSXGraph canvas | the tools of the drawing component (`src/components/jsxgraphComponent`) | the exercise app's **Submit**: the drawing is compared with `expectedDrawing` (slope/intercept lines or exact points), partial credit per shape |
| `table` | fills in blank cells of a table | fixed cells, section rows, grouped column headers | each blank like a `number` part; partial credit (default) or all-or-nothing |

`multiple-choice`, `number` and `integer` come from the phase 1 plan. `svgdrawing`, `table` and `jsxgraph` were
added later. All six are included in the embeddable library.

**Which questions use which elements.** The question bank in `src/questions/` has an example of
each element type:

| File | Question | Parts |
| --- | --- | --- |
| `01_number_price_elasticity.ts` | Price elasticity of demand (midpoint method) | number (`relabs`) |
| `02_mc_types_of_goods.ts` | Types of goods | multiple choice (4 random options from a pool) |
| `03_number-mc_market_equilibrium.ts` | Market equilibrium and price controls | number + multiple choice (weighted) |
| `04_integer_firm_profit.ts` | Profit of a firm | integer |
| `05_number_present_value.ts` | Present value | number (`sigfig`) |
| `06_mc_economic_terms.ts` | Economic terms | multiple choice (dropdown inside a sentence) |
| `10_number_gdp_deflator.ts` | Nominal GDP, real GDP, and the GDP deflator | 3 numbers |
| `11_mc-number_comparative_advantage.ts` | Opportunity cost, absolute and comparative advantage | 4 numbers + 4 dropdowns, with a Markdown table in the question text |
| `12_table_gains_from_trade.ts` | Gains from trade | table (16 blanks) |
| `13_jsxgraph_budget_line.ts` | Budget line | `jsxgraph` (draw a segment on the JSXGraph board; graded on Submit) |

The Quarto demo also has plain multiple-choice questions written as `.js` files, in
`quarto-demo/assets/exercise-system/questions/round2/`.

The sections below describe each element's options in full.

### Common part fields

Every part has these common fields: `name` (unique within the question), `weight` (default 1),
`label` (Markdown shown before the input) and `suffix` (Markdown shown after the input, such as a
unit).

### `multiple-choice`

```ts
{
  type: "multiple-choice",
  name: "unit",
  options: [
    { text: "Newton", correct: true },
    { text: "Joule", feedback: "That's energy." },
    // ...
  ],
  numberAnswers: 4,          // optional: show the correct option + 3 random distractors
  order: "random",           // or "fixed"
  display: "radio",          // or "dropdown" (option text is plain text in a dropdown)
}
```

Exactly one option must be `correct`, and option texts must be unique. Breaking either rule is an
authoring error. The score is 1 or 0, and the chosen option's `feedback` is shown if it has one.

### `number`

```ts
{
  type: "number",
  name: "price",
  correct: 12.5,
  comparison: "relabs",      // "relabs" (default) | "sigfig" | "decdig"
  rtol: 0.01, atol: 1e-8,    // relabs: |a - b| <= atol + rtol * |b|
  digits: 3,                 // sigfig / decdig: round both sides, then compare
  suffix: "dollars",
}
```

Accepts plain decimals and scientific notation (`3.2`, `-0.5`, `1e-3`, `4.5E6`). Rejects empty
input, `NaN`, `Infinity`, commas and expressions. The correct value isn't revealed until the
question is finished.

### `integer`

```ts
{ type: "integer", name: "profit", correct: 42, suffix: "dollars" }
```

Accepts only `/^[+-]?\d+$/`, so `3.0` and `1e2` are rejected. Grading checks for exact equality.

### `svgdrawing`

This is an SVG graph that students draw on with the mouse, touch or keyboard. Use it for
supply-and-demand shifts, tax wedges, surplus areas, indifference curves and similar graphs.
The full spec is in `src/elements/svgdrawing/types.ts`. In short:

- **`x`, `y`**: the axes (`max`, plus optional `min`, `label`, grid `step`, drag `snap`).
- **`initial`**: fixed objects already on the graph (points, lines, polygons, curves). They
  aren't graded.
- **`tools`**: what the student can add (`point`, `line`, `polygon`, `curve`), with a `label`,
  a short `tag` drawn on the graph, and `max` for how many of each. A line tool can start as a
  copy of an initial line (`copyOf`).
- **`answer`**: the expected objects. Each one is matched to a drawn object of the same type:
  - `point` must be near `(x, y)`.
  - `line` must lie on a given line, **or** be parallel to `shiftOf` and shifted in a
    `direction` (`up`/`down`/`left`/`right`) by any amount.
  - `polygon` must overlap a convex polygon by at least `minOverlap` (intersection over union).
  - `curve` is a 4-point curve. Only its two middle points are graded, as `on`/`above`/`below`
    a reference polyline, optionally with one point required at `through`. Build the reference
    curve with `sampleFunction(f, xmin, xmax, n)`.
- **`tol`**: the tolerance in graph units. The default is 4% of each axis range.

No demo question uses this element any more; see `src/elements/svgdrawing/drawing.test.ts` for example
specs.

### `table`

A fillable table. Fixed cells show given values; blank cells are text boxes graded like `number`
parts, each with its own `comparison`/`rtol`/`digits` if needed.

```ts
{
  type: "table",
  name: "trade",
  corner: "",                                   // optional top-left header text
  columnGroups: [                               // optional top header row
    { label: "Saudi Arabia", span: 2 },
    { label: "United States", span: 2 },
  ],
  columns: ["Oil (barrels)", "Corn (bushels)", "Oil (barrels)", "Corn (bushels)"],
  rows: [
    { label: "Without Trade" },                 // no `cells`: a section heading row
    { label: "Production", cells: [50, 12.5, 25, 50] },          // fixed cells
    { label: "With Trade" },
    { label: "Trade Action", cells: [{ correct: -45 }, { correct: 40 }, { correct: 45 }, { correct: -40 }] },
  ],
  grading: "partial",                           // default; or "all-or-nothing"
}
```

- A cell is a fixed value (number or Markdown string), `null` for an empty cell, or
  `{ correct, comparison?, rtol?, atol?, digits? }` for a blank.
- Every blank must hold a valid number before the table is graded. An incomplete table doesn't use
  an attempt.
- The score is the fraction of blanks that are correct. The feedback names the wrong cells, such as
  "With Trade – Consumption, Saudi Arabia, Corn (bushels)", without revealing their values.
- Once the question is finished, each wrong cell shows its correct value in green, in place.

See `src/questions/12_table_gains_from_trade.ts`. It computes every cell from the production
possibilities rather than hard-coding the answers.

### `jsxgraph`

A JSXGraph drawing board with a toolbar, used when the `svgdrawing` element isn't enough (for example
segments on a budget-line graph). The board is a **component of this app**
(`src/components/jsxgraphComponent/`, originally copied from `jsxgraph-library/`), not a separate
bundle. It has no Grade button: the student draws and presses the app's normal **Submit**, and the
drawing is graded then.

```ts
{
  type: "jsxgraph",
  name: "budget",
  props: {                                   // DrawingQuestionProps (JSON)
    boundingBox: [-1, 11, -1, 11],
    xLabel: "Pizzas",
    yLabel: "Books",
    enabledTools: ["select", "segment", "eraser"],
    expectedDrawing: [                       // required: what Submit grades against
      { type: "segment", yIntercept: 6, slope: -0.75, tolerance: 0.1 },
    ],
  },
}
```

- **`props`** are the component's `DrawingQuestionProps` (see `DrawingApp.tsx`): board size and
  labels, `initialObjects`, `enabledTools`/`enabledActions`, colors, button visibility, `width`
  and `height`. Only `expectedDrawing` is required (`check` throws an `AuthoringError` without it).
- **The value** of the part is the list of shapes the student drew (`UserDrawing[]`), updated on
  every change (draw, drag, erase, undo, redo, clear). It is saved, exported and restored like any
  other value: the board is rebuilt from it when saved progress is loaded.
- **Grading** runs `gradeDrawing(expectedDrawing, drawings, boundingBox)` on Submit. Shapes are
  matched in order; a line or segment given as `slope`/`yIntercept` only has to lie on that line,
  within `tolerance` (default 10%); exact-points shapes get 5% of the board diagonal. The score is
  the share of expected shapes drawn correctly. The feedback names the wrong shapes but not the
  expected values. An empty board is invalid, so it doesn't use an attempt.
- **When the question is finished** the board is locked (`readOnly`) and the correct answer is
  drawn dashed on top (`suggestedAnswer` if given, otherwise `expectedDrawing`).
- **Dependencies:** `jsxgraph` and `lucide-react` (both bundled, including into `exercise-system.js`
  for Quarto).

See `src/questions/13_jsxgraph_budget_line.ts`. Files: `src/elements/jsxgraph/` (`JsxGraphInput.tsx`,
`gradeJsxGraph.ts`, `types.ts`) and `src/components/jsxgraphComponent/` (`DrawingApp.tsx`,
`canvas/drawingLogic.tsx` for the board, `canvas/drawingTools.tsx`, `canvas/grading.ts`,
`canvas/DrawingCanvas.css`).

The component is a copy: fixes made in `jsxgraph-library/` don't reach it automatically.

---

## How to add a new question

**File names** are `NN_<type>_<description>`, for example `01_number_price_elasticity.ts` or
`07_mc_microeconomics_defined.js`. `<type>` is the element type of the question's parts, shortened to
`mc` for `multiple-choice`; a question that mixes types lists them in order, joined by `-`
(`03_number-mc_market_equilibrium.ts`). `NN` is the number in that folder.

1. **Create a file** in `src/questions/`, for example `src/questions/14_number_opportunity_cost.ts`:

   ```ts
   import type { Question } from "../engine/types";

   interface Params {
     wage: number;  // dollars per hour
     hours: number;
   }

   export const opportunityCost: Question<Params> = {
     id: "opportunity-cost",              // unique, stable: it's stored in saved progress
     title: "Opportunity cost of studying",
     generate: (rng) => ({
       wage: rng.int(10, 25),
       hours: rng.int(2, 8),
     }),
     render: ({ wage, hours }) =>
       `You skip $${hours}$ hours of work paying $\\$${wage}$ per hour to study.\n\n` +
       `**(a)** What is the opportunity cost of studying, in dollars?\n\n` +
       `**(b)** Is this cost explicit or implicit?`,
     parts: ({ wage, hours }) => [
       {
         type: "number",
         name: "cost",
         label: "**(a)**",
         correct: wage * hours,
         suffix: "dollars",
         weight: 2,
       },
       {
         type: "multiple-choice",
         name: "kind",
         label: "**(b)**",
         order: "fixed",
         options: [
           { text: "Explicit", feedback: "No money actually leaves your pocket." },
           { text: "Implicit", correct: true },
         ],
       },
     ],
   };
   ```

   Tips:
   - Remember that `render` returns a JavaScript string: escape backslashes (`\\frac`,
     `\\qquad`), and write a literal dollar sign as `\\$`.
   - Put display math on separate lines: `` `$$\n...\n$$\n\n` ``.
   - Choose parameters so the answers come out clean (for example, use `2 * rng.int(...)` when
     you'll divide by 2 later).
   - Keep all the math in `generate`/`parts`. The UI never computes answers.

2. **Register it** in `src/questions/index.ts`: import it and add it to the `questions` array.
   Duplicate ids throw an error at startup.

3. **Use it** in an assessment (see the next section).

4. **Run `npm run test`**. `src/questions/questions.test.ts` builds every question in the bank
   with many seeds and checks that it's deterministic, has valid parts and can be answered
   correctly. A malformed question fails here, with a clear `AuthoringError`, before any student
   sees it.

5. **Run `npm run dev`**, open the assessment and try a few variants.

---

## How to add a new assessment

Add an entry to the `assessments` array in `src/assessments/index.ts`:

```ts
{
  id: "exam3",                     // unique; used in the URL and the storage key
  title: "Quiz 3",
  description: "Shown to students before they start.",
  mode: "exam",                    // "exercise" or "exam"
  questions: [
    { questionId: "price-elasticity-midpoint", points: 10, maxAttempts: 2 },
    { questionId: "opportunity-cost", points: 10 },
  ],
}
```

- A question can appear in any number of assessments.
- **Don't rename `id` or reorder `questions` once students have started.** Saved progress is keyed
  by the assessment id and checked against the question list. If they no longer match, the saved
  state is thrown away.
- The new assessment shows up on the home page automatically.

---

## How to add a new element type

The engine never needs to change. An element type is a folder under `src/elements/` plus one line
of registration.

1. **Declare the part type** in `src/elements/<name>/types.ts` and add it to the engine's
   `PartTypeMap` through module augmentation. `Part` then includes it everywhere:

   ```ts
   import type { BasePart } from "../../engine/types";

   export interface StringPart extends BasePart {
     type: "string";
     correct: string;
     caseSensitive?: boolean;
   }

   declare module "../../engine/types" {
     interface PartTypeMap {
       string: StringPart;
     }
   }
   ```

2. **Write the pure logic** (for example `gradeString.ts`) and unit-test it:
   - `check(part)`: throw `AuthoringError` for a malformed spec (optional).
   - `prepare(part, rng)`: freeze any per-variant randomness (optional).
   - `validate(part, value)`: `{ valid, message? }`. Returning invalid doesn't use an attempt.
   - `grade(part, value)`: `{ score: 0..1, feedback? }`. It's only called on valid values.
   - `formatAnswer(part, value)` / `formatCorrectAnswer(part)`: Markdown for reviews and for
     revealing the answer.
   - `helpText(part)`: short text shown under the input (optional).

3. **Write the input component** `StringInput.tsx`. It receives `ElementInputProps`
   (`part`, `id`, `labelId`, `describedBy`, `value`, `onChange`, `disabled`, `invalid`,
   `showCorrect`). Values must be JSON-serializable because they're saved and exported. Keep
   grading logic out of the component.

4. **Bundle it** in `src/elements/<name>/index.ts` as an `ElementDefinition<StringPart>`.

5. **Register it** in `src/elements/index.ts`:

   ```ts
   registerElement<"string">(stringElement);
   ```

`src/elements/integer/` is the smallest complete example to copy. `src/elements/table/` is a
mid-sized one that reuses the `number` grader for each cell, and `src/elements/svgdrawing/` is the
most complex.

---

## Persistence, export and import

Since there's no backend, the browser and JSON files stand in for one.

- **Autosave:** the full state of each assessment is saved to `localStorage` under
  `assess:v1:<assessmentId>` on every change and restored on reload. If storage is unavailable
  (private mode, quota exceeded), the app keeps working in memory.
- **Reset:** each assessment has a "Reset assessment" button, with a confirmation, that clears
  its saved state.
- **Export:** on the results page the student types their name and downloads a JSON file
  (`<assessmentId>-<name>-<timestamp>.json`). It contains every question's seed, all
  submissions and the scores.
- **Import (instructor review):** open `#/import` and load an export. Every variant is rebuilt
  from its seed, and the questions, the student's answers and the grades are shown read-only.
  This is exactly what the student saw.

> Answers aren't hidden from the client. This is by design: the tool is for practice and
> low-stakes quizzes, not proctored exams.

---

## Embedding in a Quarto book

`npm run build:lib` produces a self-contained bundle in `dist-lib/`:

- `exercise-system.js`: an ES module with React, all 6 element types, JSXGraph and KaTeX
  (about 2.2 MB)
- `exercise-system.css`: Tailwind styles plus the KaTeX fonts, inlined (about 1.5 MB)

The bundle exports `mount(element, { assessment, questions })`, which returns an unmount function.
It also exports `sampleFunction` for `svgdrawing` questions. The embedded widget shows one
assessment and doesn't use the URL hash, so it won't clash with the page's own navigation.

**Once the book is set up (steps 1 to 3), a quiz is deployed with one line** in any chapter:

````markdown
```{=html}
<div class="exercise-system-root" data-quiz="sampleQuiz.js"></div>
```
````

The stylesheet and the script that mounts the quiz are loaded once for the whole book, from
`_quarto.yml`. Chapters contain no `<link>` and no `<script>`.

### One-time setup of a book

1. **Build and copy** the bundle into the book's assets folder. Repeat this whenever the library
   changes:

   ```powershell
   npm run build:lib
   Copy-Item dist-lib\exercise-system.js, dist-lib\exercise-system.css quarto-demo\assets\exercise-system\ -Force
   ```

2. **Add the loader.** Create `assets/exercise-system/header.html` (the demo has a copy in
   `quarto-demo/assets/exercise-system/`). It mounts every `<div data-quiz="...">` on the page,
   and imports the library only on pages that have one:

   ```html
   <script type="module">
     const roots = document.querySelectorAll("[data-quiz]:not([data-mounted])");
     if (roots.length > 0) {
       const { mount } = await import("./assets/exercise-system/exercise-system.js");
       for (const el of roots) {
         el.dataset.mounted = "";
         try {
           const { assessment, questions } = await import(`./assets/exercise-system/${el.dataset.quiz}`);
           mount(el, { assessment, questions });
         } catch (err) {
           el.textContent = `Could not load the practice questions (${el.dataset.quiz}): ${err.message}`;
           console.error(err);
         }
       }
     }
   </script>
   ```

3. **Register it in `_quarto.yml`**: the stylesheet and the loader for every page, and the assets
   folder so Quarto copies it into the rendered book:

   ```yaml
   project:
     resources:
       - assets/exercise-system/**

   format:
     html:
       css: assets/exercise-system/exercise-system.css
       include-in-header: assets/exercise-system/header.html
   ```

   The paths in `header.html` are relative to the page, so keep the chapters in the book's top
   folder (or change them). The stylesheet is downloaded once and then cached for all pages.

### Adding a quiz

1. **Write the questions as plain `.js` files** in `assets/exercise-system/questions/`, named
   `NN_<type>_<description>.js`. They have the same shape as the `.ts` files in `src/questions/`,
   just without type annotations. `svgdrawing` questions import the helper from the bundle:

   ```js
   import { sampleFunction } from "../exercise-system.js";   // from questions/
   import { sampleFunction } from "../../exercise-system.js"; // from questions/<subfolder>/
   ```

   The path is relative to the question file, so fix it if you move the file into another folder.
   If one import in a quiz fails, the whole quiz stays stuck on "Loading…". To find the missing
   file, look for a 404 in the browser console (F12).

2. **Write an assessment module**, for example `assets/exercise-system/sampleQuiz.js`, that
   exports `questions` and `assessment`:

   ```js
   import { priceElasticity } from "./questions/sample/01_number_price_elasticity.js";
   import { typesOfGoods } from "./questions/sample/02_mc_types_of_goods.js";

   export const questions = [priceElasticity, typesOfGoods];

   export const assessment = {
     id: "ch02-practice",
     title: "Chapter 2 practice",
     mode: "exercise",               // "exercise" or "exam"
     questions: questions.map((q) => ({ questionId: q.id, points: 10 })),
   };
   ```

3. **Embed it** with the one line shown at the top of this section. The `data-quiz` value is the
   quiz file name, relative to `assets/exercise-system/`.

   - **To show a different quiz**, change only the `data-quiz="…"` value. There's no id or import
     line to keep in sync.
   - **For more quizzes on the same page**, add more divs. Each one names its own quiz file.
   - **If the file name is wrong or the file doesn't load**, the div shows "Could not load the
     practice questions (sampleQuiz.js): …" instead of hanging on "Loading…".
   - **Keep each `assessment.id` unique across the whole site**, and use each quiz once per page.
     Saved progress is stored in the browser under that id, so two quizzes with the same id
     (or the same quiz twice) share their answers, even in different books on the same site.
   - **To make a quiz wider** than the text column, wrap the block in a Quarto column class such
     as `::: {.column-body-outset}` … `:::`, or `.column-page` for wider still.

4. **Render** with `cd quarto-demo` and then `quarto render`. ES modules don't load from
   `file://`, so view the result through a local server (for example `quarto preview`).

To use the bundle in another Quarto book, copy the same two files and `header.html` into that
book's `assets/exercise-system/` folder and add the `_quarto.yml` settings from step 3.

---

## Testing

```bash
npm run test         # run once
npm run test:watch   # watch mode
```

The tests cover:

- RNG determinism and seed derivation (`engine/rng.test.ts`)
- validate-then-grade and weighted scoring (`engine/gradeQuestion.test.ts`)
- the assessment reducer: attempts, best score, new variants, exam lockout
  (`engine/assessment.test.ts`)
- storage and export round-trips (`engine/storage.test.ts`)
- each element: preparation, parsing edge cases, every comparison mode including negative and
  near-zero values, drawing geometry and grading, table validation and partial credit, the
  jsxgraph grading and input syncing (`elements/jsxgraph/`), and input components
- every question in the bank across many seeds (`questions/questions.test.ts`)
- a component test that submits a wrong answer and then a right one
  (`components/QuestionView.test.tsx`), and the import page (`pages/Import.test.tsx`)

---

## Roadmap

The registry is designed so these can be added later without touching the engine:

- Checkbox (multiple answers) with partial credit: all-or-nothing, net-correct, coverage
- Matching and ordering (drag and drop)
- Units input (via mathjs units)
- Matrix input with symbolic entries (numeric grids are already covered by the `table` element)
- String input and symbolic math input (checked for equivalence by evaluating at random points)
- Big-O input
- Manually graded parts: essay, file upload, image capture

Code questions are out of scope.
