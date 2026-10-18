# Exercise System

A browser-only system for online assessments, written in React and TypeScript and modeled on
[PrairieLearn](https://www.prairielearn.com/)'s question architecture. It has **no backend** and
**no login**. Every question is generated from a **seed**, so each attempt can get a fresh variant
of the question, and anyone who has the seed can rebuild exactly the same variant.

The question bank covers introductory economics (elasticity, equilibrium, taxes, consumer choice,
GDP, and so on). The engine itself doesn't depend on any subject.

You can use the system in two ways:

1. **As a standalone web app** (`npm run dev` / `npm run build`). It has a home page that lists the
   assessments, exercise and exam modes, a results page, and an import page where an instructor
   can review a student's results file (JSON).
2. **As an embeddable library** (`npm run build:lib`). This produces one `.js` file and one `.css`
   file that can be added to any static page, such as a chapter of a Quarto book, to show a quiz
   inline. The `quarto-demo/` folder is a minimal working example.

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
- [SCORM packages for an LMS (Blackboard Ultra)](#scorm-packages-for-an-lms-blackboard-ultra)
- [Testing](#testing)
- [Roadmap](#roadmap)

---

## Status

Phase 1 from `planning.md` is done, and some later work has been added on top of it.

| Area | State |
| --- | --- |
| Seeded RNG, question engine, element registry | Done |
| Multiple choice (radio + dropdown), number, integer elements | Done |
| **Table element** (fillable table with fixed and blank cells, partial credit) | Done. Added beyond phase 1 |
| **JSXGraph element** (drawing component built into the app; graded on Grade) | Done. Added beyond phase 1. Demo: `07_jsxgraph_budget_line.ts` in Exercise 1 |
| **svgDrawing element** (plain-SVG twin of the JSXGraph board; same tools, graded on Grade) | Done. Added beyond phase 1. Demo: `08_svgDrawing_ppf.ts` in Exercise 1 |
| **matching element** (drag-and-drop reordering to match a lettered column to a numbered one) | Done. Added beyond phase 1. Demo: `09_matching_econ_vocabulary.ts` in Exercise 1 |
| **true-false element** (a table of statements, each marked True/False independently) | Done. Added beyond phase 1. Demo: `10_true-false_elasticity_statements.ts` in Exercise 1 |
| **ordering element** (drag-and-drop a single sequence of boxes into the correct order) | Done. Added beyond phase 1. Demo: `11_ordering_income_demand_price.ts` in Exercise 1 |
| **expression element** (symbolic math input, checked by evaluating at random points, with a live KaTeX preview) | Done. Added beyond phase 1. Demo: `12_expression_marginal_cost.ts` in Exercise 1 |
| **essay element** (hand-graded written answer with word/character limits, MathLive equation editor, model answer shown after submitting) | Done. Added beyond phase 1. Demo: `13_essay_quadratic_equation.ts` in Exercise 1 |
| **conditional-grading element** (multi-step calculation; later steps graded from the student's own earlier answers, so an early error is carried forward) | Done. Added beyond phase 1. Demo: `14_conditional-grading_profit_maximum.ts` in Exercise 1 |
| **Manual (teacher) grading** (pending results, points + comment in the review page, graded results file; Quarto `data-review` page) | Done. Added beyond phase 1 |
| Exercise and exam modes, attempts, best score | Done |
| localStorage persistence, reset, import/review page | Done |
| Results file (JSON) format and download code (`buildExport`, `downloadJson`) | Done, but no student-facing download button yet (see [Persistence, export and import](#persistence-export-and-import)) |
| SCORM 2004 3rd edition packages for Blackboard Ultra (`npm run scorm`) | Done; tested in Blackboard Ultra |
| Grade/Save buttons, hidden grades (`gradeButton: false`) | Done |
| Accessibility, mobile layout, dark mode | Done |
| Embeddable library build + Quarto demo | Done. Added beyond phase 1 |
| Checkbox, units, file upload | Not started (see [Roadmap](#roadmap)) |

---

## Quick start

You need Node.js 20 or later.

```bash
npm install
npm run dev        # start the dev server (standalone app)
npm run test       # run the test suite once (Vitest)
npm run build      # type-check and build the standalone app into dist/
npm run build:lib  # build the embeddable bundle into dist-lib/
npm run scorm -- quarto-demo/quiz1.js  # SCORM 2004 zip into dist-scorm/
npm run preview    # serve the built app from dist/
```

The standalone app uses hash routing (`#/`, `#/assessment/<id>`, `#/assessment/<id>/results`,
`#/import`). Because of that, `dist/` works from any static host or subfolder, and also when opened
with `file://`.

### Tech stack

- Vite, React 18 and TypeScript in strict mode
- Tailwind CSS v4, with light and dark themes that follow `prefers-color-scheme`
- `react-markdown` + `remark-math` + `remark-gfm` + `rehype-katex` for question text:
  `$...$` for inline math and `$$...$$` for display math (the same syntax students use in essays)
- Element libraries: `jsxgraph` (drawing board), `mathjs/number` (expression grading),
  `mathlive` (essay equation editor, loaded on demand), `lucide-react` (icons)
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
├── scripts/scorm-package.mjs # packages a quiz as a SCORM 2004 zip (npm run scorm)
├── src/
│   ├── engine/               # subject-agnostic core (no React UI)
│   │   ├── types.ts          # Question, Part, Assessment, Rng, GradeResult, ...
│   │   ├── rng.ts            # mulberry32, string -> seed hashing, derived seeds
│   │   ├── seed.ts           # fresh random seeds (the ONLY non-seeded randomness)
│   │   ├── registry.ts       # element type -> { check, prepare, validate, grade, Input, ... }
│   │   ├── variant.ts        # { question, seed } -> Variant (text + prepared parts)
│   │   ├── gradeQuestion.ts  # validate every part, then grade, then weighted average
│   │   ├── assessment.ts     # reducer: attempts, variants, best score, exam lockout, pending points
│   │   └── storage.ts        # localStorage save/load, JSON export/import, setManualGrade
│   ├── elements/             # one folder per element type
│   │   ├── index.ts          # registers every element with the engine
│   │   ├── multipleChoice/
│   │   ├── number/
│   │   ├── integer/
│   │   ├── table/            # fillable table (e.g. gains-from-trade worksheets)
│   │   ├── jsxgraph/         # element around the JSXGraph drawing component (input + grading)
│   │   ├── svgDrawing/       # element around the plain-SVG drawing component (input + grading)
│   │   ├── matching/         # drag-and-drop matching of two columns
│   │   ├── trueFalse/        # table of True/False statements
│   │   ├── ordering/         # drag-and-drop a sequence into order
│   │   ├── expression/       # symbolic math input (mathjs)
│   │   ├── essay/            # hand-graded text answer + MathLive equation editor
│   │   ├── conditionalGrading/ # multi-step calculation, errors carried forward
│   │   └── TextInput.tsx     # shared text box used by number/integer
│   ├── questions/            # demo question bank (01-14, one per element type) + index.ts
│   ├── assessments/index.ts  # assessment definitions (exercises, quizzes)
│   ├── components/           # QuestionView, AssessmentView, ReviewView, Markdown, ...
│   │   ├── jsxgraphComponent/   # JSXGraph drawing board + toolbar + grading (copied from jsxgraph-library)
│   │   └── svgDrawingComponent/ # plain-SVG drawing board + toolbar + grading
│   ├── pages/                # Home, Results, Import
│   ├── lib/                  # embeddable build: entry.tsx (mount, mountScorm) + QuizWidget
│   ├── scorm/                # SCORM 2004 runtime: LMS API, suspend data, score/interaction reporting
│   └── test/                 # test setup + fixtures
├── jsxgraph-library/         # standalone JSXGraph widget project (the component was copied from here)
├── exams/sample-exam2/       # course quiz: exam2.js + questions/ (plain JS, SCORM-packaged; also "ex2" in the app)
├── dist/                     # built standalone app (generated)
├── dist-lib/                 # built library: exercise-system.js / .css (generated)
└── quarto-demo/              # minimal Quarto site running the demo quiz (quiz1.js + questions/)
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

You can override `maxAttempts` for each question in the assessment definition. A question with a
hand-graded part (`essay`) is the exception in both modes: one submission closes it, and its score
waits for the teacher (see [`essay`](#essay)).

### Grade and Save buttons

Each question has a **Grade** button (it was called Submit) that grades the answer and shows the
score, feedback and, once the question is finished, the correct answer. The optional assessment
field `gradeButton` changes that:

| Setting | Buttons | What students see |
| --- | --- | --- |
| *(default)* | Grade | score and feedback after each Grade, as described above |
| `gradeButton: false` | none on the question; **Save & next** / **Save & finish** below it | **no grades**: no scores, feedback, correct answers, attempt counts or totals, here or on the results page |

With `gradeButton: false` (grades hidden), there is no Save button: **moving on saves**. Save &
next (Save & finish on the last question) checks the answer format, grades the answer silently
and stores it as the question's answer, replacing the previous save: **the latest save counts**,
not the best one, and saving never uses up attempts or closes the question, so students can come
back and change their answers until the quiz is closed. If the question isn't answered completely,
the first press shows a warning (and marks the missing parts) and saves nothing; pressing again
skips the question for now. Previous, the Q1, Q2, ... buttons and the Results link also save a
complete, changed answer, without warning. Enter in an answer box saves too. The status line says
"Answer saved" or "You have unsaved changes". The silent grade still goes to the LMS in a SCORM
package and into results files, so a teacher can release grades after the due date (in
Blackboard, by hiding the grade column until then). `New variant` is not offered in this mode.

```js
export const assessment = {
  id: "midterm",
  title: "Midterm",
  mode: "exam",
  gradeButton: false,   // no Grade button: Save & next saves; grades are hidden
  questions: [/* ... */],
};
```

---

## Element types

### Question types at a glance

There are **12 element types**. A question is made of one or more **parts**, and each part uses
one element, so a single question can mix them. For example, you could combine a number box with
a multiple-choice part, or a drawing with a follow-up number.

| Element | The student… | Options | Graded by |
| --- | --- | --- | --- |
| `multiple-choice` | picks one option | radio buttons or an inline dropdown; shuffled or fixed order; show a random subset (`numberAnswers`) | 1 if the correct option is chosen, else 0; optional per-option feedback |
| `number` | types a decimal number | units after the box (`suffix`) | relative/absolute tolerance (`relabs`), significant figures (`sigfig`) or decimal places (`decdig`) |
| `integer` | types a whole number | units after the box | exact match |
| `jsxgraph` | draws on a JSXGraph canvas | the tools of the drawing component (`src/components/jsxgraphComponent`) | the app's **Grade** (or Save & next): the drawing is compared with `expectedDrawing` (slope/intercept lines or exact points), partial credit per shape |
| `svgDrawing` | draws on a plain-SVG canvas | the same tools as `jsxgraph` (`src/components/svgDrawingComponent`), no JSXGraph dependency | same as `jsxgraph`: graded on **Grade** against `expectedDrawing`, partial credit per shape |
| `table` | fills in blank cells of a table | fixed cells, section rows, grouped column headers | each blank like a `number` part; partial credit (default) or all-or-nothing |
| `matching` | drag-and-drop reorders the right column to match the fixed, numbered left column | left column (1, 2, 3, …) fixed at prepare time; right column (a, b, c, …) shuffled at prepare time | fraction of rows where the right item lines up with its correct left item; partial credit (default) or all-or-nothing |
| `true-false` | marks each statement in a table True or False, independently | a list of statements, each with its own `correct` boolean | fraction of statements marked correctly; partial credit (default) or all-or-nothing |
| `ordering` | drag-and-drop arranges a single sequence of boxes into the correct order | a list of items (authored in correct order), shuffled at prepare time; `layout: "vertical" \| "horizontal"` and an optional arrow between boxes | fraction of boxes in their correct position; partial credit (default) or all-or-nothing |
| `expression` | types a math expression, with a live KaTeX preview of it as they type | variables and the range to sample them from (`variables`), number of test points (`samples`) | evaluates the student's and the correct expression at the same random points (via mathjs) and compares within `tolerance` — so algebraically equivalent forms (`x^2 + .5 x + 1` vs `x^2 + 1/2 x + 1`) both grade as correct |
| `essay` | writes a short text answer (math via an equation editor or `$...$`), submitted once | word/character limits (`maxWords`, `maxChars`, `minWords`); an optional `modelAnswer` shown after submitting | **by the teacher**, later, in the review page (points + comment); pending until then |
| `conditional-grading` | answers a chain of steps (numbers or expressions), each building on the one before | per step: `kind` (`number`/`expression`), a `correct` formula that may use earlier steps' answers, `weight`; `carryForwardCredit` | each step against its formula evaluated with the correct earlier answers **and** with the student's own earlier answers; matching either earns the step (error carried forward), so one mistake costs only its own step |

`multiple-choice`, `number` and `integer` come from the phase 1 plan. `table`, `jsxgraph`, `svgDrawing`,
`matching`, `true-false`, `ordering`, `expression`, `essay` and `conditional-grading` were added later. All twelve are included in the
embeddable library.

**Which questions use which elements.** The question bank in `src/questions/` has an example of
each element type:

| File | Question | Parts |
| --- | --- | --- |
| `01_mc_types_of_goods.ts` | Types of goods | multiple choice (4 random options from a pool) |
| `02_number-mc_market_equilibrium.ts` | Market equilibrium and price controls | number + multiple choice (weighted) |
| `03_integer_firm_profit.ts` | Profit of a firm | integer |
| `04_mc_economic_terms.ts` | Economic terms | multiple choice (dropdown inside a sentence) |
| `05_mc-number_comparative_advantage.ts` | Opportunity cost, absolute and comparative advantage | 4 numbers + 4 dropdowns, with a Markdown table in the question text |
| `06_table_gains_from_trade.ts` | Gains from trade | table (16 blanks) |
| `07_jsxgraph_budget_line.ts` | Budget line | `jsxgraph` (draw a segment on the JSXGraph board; graded on Grade) |
| `08_svgDrawing_ppf.ts` | Production possibilities frontier | `svgDrawing` (draw a segment on the plain-SVG board; graded on Grade) |
| `09_matching_econ_vocabulary.ts` | Economic vocabulary | `matching` (5 terms sampled from a pool, matched to their definitions) |
| `10_true-false_elasticity_statements.ts` | Price elasticity of demand | `true-false` (3 fixed statements) |
| `11_ordering_income_demand_price.ts` | Order the causal chain | `ordering` (3 fixed items, horizontal layout) |
| `12_expression_marginal_cost.ts` | Find the marginal cost function | `expression` (derivative of a cubic; 1 variable) |
| `13_essay_quadratic_equation.ts` | Solve a quadratic equation | `essay` (hand-graded, up to 80 words; random integer roots) |
| `14_conditional-grading_profit_maximum.ts` | Maximize profit step by step | `conditional-grading` (derivative, then q*, then maximum profit; errors carried forward) |

The demo files are numbered consecutively (01-14); if you delete one, renumber the rest and update
the imports in `src/questions/index.ts`. `quarto-demo/questions/` has the same 14 questions as
plain `.js` files (same numbers and names, types removed), used by `quarto-demo/quiz1.js`; when you
change a demo question, change its `.js` copy too.

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

See `src/questions/06_table_gains_from_trade.ts`. It computes every cell from the production
possibilities rather than hard-coding the answers.

### `matching`

A left column (numbered 1, 2, 3, …, in fixed authored order) and a right column (lettered a, b,
c, …, shuffled per variant) that the student reorders by drag-and-drop (or the up/down buttons)
until each right item lines up with its correct left item.

```ts
{
  type: "matching",
  name: "terms",
  pairs: [                                    // pairs[i].left is the correct match for pairs[i].right
    { left: "Scarcity", right: "Unlimited wants, limited resources" },
    { left: "Opportunity cost", right: "Value of the next best alternative given up" },
    { left: "Market equilibrium", right: "Quantity supplied equals quantity demanded" },
  ],
  grading: "partial",                         // default; or "all-or-nothing"
}
```

- At least two `pairs`. The left column's order is fixed (authored order); the right column's
  starting order is shuffled once per variant by `prepare()` and stored as `rightOrder`.
- **The value** is the right column's current row order as indices into `pairs` (what the student's
  dragging has produced so far). There's always a complete arrangement to grade, even if the
  student never drags anything — an untouched submission is graded against the shuffled starting
  order, so it isn't free of an attempt like a blank text box would be.
- **Grading**: row `i` is correct when it holds `pairs[i]`. The score is the fraction of correct
  rows (`partial`, default) or 1 only if every row is correct (`all-or-nothing`). Feedback names the
  wrong row numbers but never reveals the correct pairing.
- Once the question is finished, each row is marked right or wrong in place, and a wrong row shows
  its correct right-hand text underneath, in green.

See `src/questions/09_matching_econ_vocabulary.ts`. Files: `src/elements/matching/`
(`MatchingInput.tsx`, `gradeMatching.ts`, `prepareMatching.ts`, `types.ts`).

### `ordering`

A single sequence of boxes (e.g. the steps of a causal chain) that the student drags into the
correct order, with an optional arrow between boxes showing the direction of the sequence. Unlike
`matching`, there's only one column/row, and the authored order itself is the correct answer.

```ts
{
  type: "ordering",
  name: "chain",
  items: ["Income increases", "Demand shifts right", "Price increases"], // authored in correct order
  layout: "horizontal",                       // "vertical" (default) or "horizontal"; the author's choice
  showArrows: true,                           // default; a → (horizontal) or ↓ (vertical) between boxes
  grading: "partial",                         // default; or "all-or-nothing"
}
```

- At least two `items`. The starting order is shuffled once per variant by `prepare()` and stored
  as `startOrder`; the correct order is always the authored order.
- `layout` and `showArrows` are authoring choices (set per question), not student-facing settings:
  pick `"horizontal"` for a short causal chain like the example above, `"vertical"` (default) for a
  longer list of steps.
- **The value** is the boxes' current order as indices into `items`. As with `matching`, there's
  always a complete arrangement to grade, even untouched — an unmoved submission is graded against
  the shuffled starting order.
- **Grading**: position `i` is correct when it holds `items[i]`. The score is the fraction of boxes
  in their correct position (`partial`, default) or 1 only if the whole sequence is correct
  (`all-or-nothing`). Feedback names the wrong position numbers but never reveals the correct order.
- Once the question is finished, each box is marked right or wrong in place, and a wrong box shows
  the item that belongs there underneath, in green.

See `src/questions/11_ordering_income_demand_price.ts`. Files: `src/elements/ordering/`
(`OrderingInput.tsx`, `gradeOrdering.ts`, `prepareOrdering.ts`, `types.ts`).

### `true-false`

A table of statements, each with its own independent True/False choice (two radio buttons per
row), styled after Perseus/Khan-Academy-style "which of the following are true" questions.

```ts
{
  type: "true-false",
  name: "statements",
  statements: [
    { text: "Demand is perfectly inelastic when quantity demanded doesn't change at all as price changes.", correct: true },
    { text: "An elastic demand curve means consumers are relatively unresponsive to price changes.", correct: false },
    { text: "Price elasticity of demand tends to be higher when there are more close substitutes.", correct: true },
  ],
  grading: "partial",                         // default; or "all-or-nothing"
}
```

- At least one `statement`, each with Markdown `text` and a boolean `correct`.
- **The value** is one `true`/`false`/`null` entry per statement (`null` = not yet answered). Every
  statement must be answered before the part is valid, so an untouched or partly answered table
  doesn't use an attempt.
- **Grading**: the score is the fraction of statements marked correctly (`partial`, default) or 1
  only if every statement is correct (`all-or-nothing`). Feedback names the wrong statement numbers
  but never reveals whether they should have been True or False.
- Once the question is finished, each statement's row is marked right or wrong in place, and a
  wrong row shows its correct answer underneath, in green.

See `src/questions/10_true-false_elasticity_statements.ts`. Files: `src/elements/trueFalse/`
(`TrueFalseInput.tsx`, `gradeTrueFalse.ts`, `types.ts`).

### `expression`

A text box for typing a math expression (e.g. a polynomial, a derivative), with a live KaTeX
preview typeset below it as the student types. Checked by **evaluating**, not by comparing text, so
any algebraically equivalent form is accepted.

```ts
{
  type: "expression",
  name: "mc",
  correct: "x^2 + 1/2 x + 1",              // mathjs syntax; "x^2 + .5 x + 1" answers this too
  variables: { x: [1, 9] },                // optional: defaults to [1, 9] for every auto-detected variable
  samples: 5,                              // optional: how many random points to test; default 5
  tolerance: 1e-6,                         // optional: relative tolerance when comparing; default 1e-6
}
```

- **`correct`** is plain math syntax parsed by [mathjs](https://mathjs.org/): `^` for powers, `*` or
  a space for implicit multiplication (`2x`, `1/2 x`), `/` for division, and mathjs's built-in
  functions/constants (`sqrt`, `sin`, `log`, `pi`, `e`, ...). Its variables are auto-detected (every
  symbol that isn't a mathjs constant or function) unless `variables` is given explicitly.
- **The value** is the expression exactly as the student typed it (a string).
- **Grading**: `prepare()` samples `samples` random points per variable, once per variant (so
  grading — including later review — is deterministic from the seed, like `matching`'s shuffle).
  Both the student's and the correct expression are evaluated at each point; the score is 1 only if
  every point matches within `tolerance`, else 0 (no partial credit — a symbolic expression either
  is or isn't equivalent). An expression that doesn't parse, uses an undeclared symbol, or fails to
  evaluate (e.g. a typo'd function name) is **invalid**, not wrong, so it doesn't use an attempt.
- **The live preview**: as the student types, the input is parsed and rendered as typeset math
  (mathjs's `node.toTex()` piped through the same KaTeX pipeline as question text) below the box.
  An expression that doesn't parse yet (e.g. mid-typing) just shows a quiet placeholder instead of
  an error.
- Once the question is finished, the correct expression is shown as typeset math too.
- **Extra dependency**: `mathjs` (imported from `mathjs/number`, the plain-JS-number build, to keep
  BigNumber/Fraction/Complex/Matrix/Unit support — and the bundle — out; this element doesn't need
  them). This adds a few hundred KB to the embeddable bundle, similar in scale to JSXGraph's cost.

See `src/questions/12_expression_marginal_cost.ts`. Files: `src/elements/expression/`
(`ExpressionInput.tsx`, `gradeExpression.ts`, `prepareExpression.ts`, `mathUtils.ts`, `types.ts`).

### `essay`

A hand-graded written answer: one text box with optional word/character limits. The student
submits **once**; the model answer is shown right away as feedback, and the teacher enters the
grade later while reviewing the exported results file.

```ts
{
  type: "essay",
  name: "explanation",
  label: "Your answer:",                     // optional, like any part
  modelAnswer: "$(x - 2)(x - 3) = 0$, so $x = 2$ or $x = 3$.",  // optional; Markdown + KaTeX; omit or "" to show none
  maxWords: 150,                             // optional upper limit on words
  maxChars: 1000,                            // optional upper limit on characters (spaces included)
  minWords: 20,                              // optional lower limit on words
  rows: 8,                                   // optional text box height; default 8
  equationEditor: false,                     // optional: hide the "Insert equation" button; default true
}
```

- **Math in answers**: the **Insert equation** button opens a [MathLive](https://mathlive.io/)
  equation editor (WYSIWYG, with an on-screen math keyboard behind its keyboard icon, handy on
  phones). **Insert** (or Enter) puts the equation into the essay at the cursor as LaTeX between
  dollar signs, e.g. `$x^2 + 5$`; Esc or **Cancel** closes it. Students can also type `$...$` (or
  `$$...$$`) by hand, same as question text. A live preview under the box typesets the math as they
  type. Because `$` starts math, a plain dollar sign is written `\$` (e.g. `\$5`); the help text
  under the box says so. A live counter shows words and characters against the limits and turns
  red when over.
- **Hiding the equation editor**: set `equationEditor: false` on the part to hide the **Insert
  equation** button (and its mention in the help text) when students should just type LaTeX.
  `$...$` and `$$...$$` work the same either way.
- **Line breaks**: each Enter in the essay starts a new line in the preview (`remark-breaks`; normal
  Markdown would join single lines), so a solution can be written step by step:

  ```
  Step 1: $x^2 - 5x + 6 = 0$
  Step 2: $(x - 2)(x - 3) = 0$
  ```

  A blank line starts a new paragraph. For line breaks *inside* one equation, use a display block
  with `aligned`: `\\` ends a line and `&` marks where the lines line up:

  ```
  $$
  \begin{aligned}
  x^2 - 5x + 6 &= 0 \\
  (x - 2)(x - 3) &= 0 \\
  x &= 2 \text{ or } x = 3
  \end{aligned}
  $$
  ```
- **Extra dependency**: `mathlive` (MIT, about 800 KB). It's loaded with a dynamic `import()` the
  first time the editor opens, so in the app it's a separate chunk fetched on demand; the
  embeddable bundle inlines it (`inlineDynamicImports` in `vite.lib.config.ts`) to stay a single
  file. Its own font and sound loading is turned off: it uses the KaTeX fonts the page already has.
- **Validation**: an empty answer, or one over `maxWords`/`maxChars` or under `minWords`, is
  **invalid**, so it doesn't use the submission.
- **Grade** closes the question (no second attempt, no "New variant"; with `gradeButton: false`, saving doesn't), whatever
  `maxAttempts` says. The part's result is *pending*: it scores 0 and shows an "Awaiting teacher's
  grade" badge; the header and results page show how many points are awaiting a grade. The model
  answer appears under a "Model answer" heading; without one (omitted or `""`), nothing is
  revealed.
- **Teacher grading**: the teacher opens a student's results file in
  the review page (`#/import` in the app, or a `data-review` div in Quarto, see below). Each essay
  has a form to enter **points** (out of the part's share of the question's points) and an
  optional **comment** for the student. Saving recomputes the scores; **Download graded results**
  saves the file with the grades (`...-graded.json`). The grades are stored on the submission as
  `manualGrades: { [partName]: { score: 0..1, comment? } }`, and opening the graded file again
  shows them (and the comment as the part's feedback).
- An essay can share a question with auto-graded parts; only the essay's weight waits for the
  teacher.

See `src/questions/13_essay_quadratic_equation.ts`. Files: `src/elements/essay/` (`EssayInput.tsx`,
`gradeEssay.ts`, `MathEditor.tsx`, `types.ts`). Engine support: `ElementDefinition.manualGrading`,
`GradeResult.pending`, `Submission.manualGrades`, `setManualGrade()` in `engine/storage.ts`.

### `conditional-grading`

A calculation in several steps where each step builds on the previous one, e.g. (a) a derivative,
(b) where it's zero, (c) the function's value there. Each step is graded **from the student's own
earlier answers** as well as from the correct ones, so a student who makes one mistake early and
then works correctly from it loses only the step with the mistake.

```ts
{
  type: "conditional-grading",
  name: "steps",
  steps: [
    { name: "a", kind: "expression", label: "a) $f'(x) =$", correct: "-x + 2" },
    { name: "b", kind: "number", label: "b) Maximum at $x =$", correct: "-a(0) / (a(1) - a(0))" },
    { name: "c", kind: "number", label: "c) Maximum value", correct: "-1/2 * b^2 + 2 * b + 1" },
  ],
  carryForwardCredit: 1,   // optional: credit for a step that's right only given earlier mistakes; default 1 (full)
}
```

- **Steps** are answered in order, one box each (`label`/`suffix` as for parts; optional `weight`,
  default 1). `kind: "number"` is a decimal box graded like a `number` part (`rtol`, `atol`);
  `kind: "expression"` is a math box graded like an `expression` part (`variables`, `tolerance`;
  test points are sampled once per variant by `prepare()`, `samples` per variable, default 5), with
  a live KaTeX preview.
- **`correct`** is always a mathjs formula, and it may use the answers to **earlier** steps by name:
  a number step is a number (`b`), an expression step is a function of its variables (`a(0)`,
  `a(x)`). Step names must be identifiers that aren't mathjs names (`e`, `pi`, ... are rejected).
  In the example, (b)'s formula is the zero of a linear `a`, so it works for whatever line the
  student entered in (a).
- **Grading**: each step's formula is evaluated twice: with the correct earlier answers, and with
  the student's own. Matching the first is "correct"; matching only the second is "carried forward"
  (`carryForwardCredit`). With the example, `a = -.5x + 2` (wrong), `b = 4`, `c = 1` scores 2/3:
  0 for (a), full credit for (b) and (c) because they follow from the student's (a). If a student's
  earlier answer makes a formula undefined (e.g. a constant derivative, so no zero), only the
  correct answer counts for that step. The feedback lists each step: ✓, ✗ or "✓ (follows from your
  earlier answers)".
- **The value** is `{ [stepName]: typed text }`. Every step must be filled in a valid format, or
  the answer is invalid (no attempt used) and the bad steps are marked.
- Once finished, the correct answers are shown (expressions typeset, number steps evaluated).
  `exampleConditional(part)` (for tests) only works if no expression step's formula uses an earlier step.

See `src/questions/14_conditional-grading_profit_maximum.ts`. Files: `src/elements/conditionalGrading/`
(`ConditionalGradingInput.tsx`, `gradeConditional.ts`, `types.ts`); reuses `expression/mathUtils.ts`
and `number/gradeNumber.ts`.

### `jsxgraph`

A JSXGraph drawing board with a toolbar (segments, lines, shapes, curves, ...). The board is a
**component of this app** (`src/components/jsxgraphComponent/`, originally copied from
`jsxgraph-library/`), not a separate bundle. It has no Grade button: the student draws and presses
the app's normal **Grade** (or Save & next), and the drawing is graded then.

```ts
{
  type: "jsxgraph",
  name: "budget",
  props: {                                   // DrawingQuestionProps (JSON)
    boundingBox: [-1, 11, -1, 11],
    xLabel: "Pizzas",
    yLabel: "Books",
    enabledTools: ["select", "segment", "eraser"],
    expectedDrawing: [                       // required: what Grade grades against
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
- **Grading** runs `gradeDrawing(expectedDrawing, drawings, boundingBox)` on Grade. Shapes are
  matched in order; a line or segment given as `slope`/`yIntercept` only has to lie on that line,
  within `tolerance` (default 10%); exact-points shapes get 5% of the board diagonal. The score is
  the share of expected shapes drawn correctly. The feedback names the wrong shapes but not the
  expected values. An empty board is invalid, so it doesn't use an attempt.
- **When the question is finished** the board is locked (`readOnly`) and the correct answer is
  drawn dashed on top (`suggestedAnswer` if given, otherwise `expectedDrawing`).
- **Dependencies:** `jsxgraph` and `lucide-react` (both bundled, including into `exercise-system.js`
  for Quarto).

See `src/questions/07_jsxgraph_budget_line.ts`. Files: `src/elements/jsxgraph/` (`JsxGraphInput.tsx`,
`gradeJsxGraph.ts`, `types.ts`) and `src/components/jsxgraphComponent/` (`DrawingApp.tsx`,
`canvas/drawingLogic.tsx` for the board, `canvas/drawingTools.tsx`, `canvas/grading.ts`,
`canvas/DrawingCanvas.css`).

The component is a copy: fixes made in `jsxgraph-library/` don't reach it automatically.

### `svgDrawing`

The plain-SVG twin of `jsxgraph`: same tool set (segment, line, arrow, rectangle, circle, polygon,
scatter, curve, text, coordinate, eraser, ...), same `DrawingQuestionProps` shape, same grading
(`gradeDrawing` on `expectedDrawing`, slope/intercept or exact points) - just rendered as hand-written
SVG instead of wrapping the JSXGraph library, so it doesn't pull in JSXGraph (about 2.2 MB). Use it
instead of `jsxgraph` when you don't need anything JSXGraph-specific.

```ts
{
  type: "svgDrawing",
  name: "ppf",
  props: {                                   // DrawingQuestionProps (JSON)
    boundingBox: [-1, 11, -1, 11],
    xLabel: "Guns",
    yLabel: "Butter",
    enabledTools: ["select", "segment", "eraser"],
    expectedDrawing: [                       // required: what Grade grades against
      { type: "segment", yIntercept: 8, slope: -1, tolerance: 0.1 },
    ],
  },
}
```

Everything under "**props**", "**The value**", "**Grading**", "**When the question is finished**" in
the `jsxgraph` section above applies unchanged. The only real difference: the eraser is a footer
toggle button here rather than a toolbar tool (everything else in `enabledTools` lives in the
toolbar grid).

See `src/questions/08_svgDrawing_ppf.ts`. Files: `src/elements/svgDrawing/` (`SvgDrawingInput.tsx`,
`gradeSvgDrawing.ts`, `types.ts`) and `src/components/svgDrawingComponent/` (`DrawingApp.tsx`,
`canvas/DrawingBoard.tsx`, `canvas/DrawingToolbar.tsx`, `canvas/grading.ts`, `canvas/DrawingCanvas.css`).

---

## How to add a new question

**File names** are `NN_<type>_<description>`, for example `01_mc_types_of_goods.ts` or
`07_mc_microeconomics_defined.js`. `<type>` is the element type of the question's parts, shortened to
`mc` for `multiple-choice`; a question that mixes types lists them in order, joined by `-`
(`02_number-mc_market_equilibrium.ts`). `NN` is the number in that folder.

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
    { questionId: "types-of-goods", points: 10, maxAttempts: 2 },
    { questionId: "opportunity-cost", points: 10 },
  ],
}
```

- A question can appear in any number of assessments.
- Optional `gradeButton: false` hides grades (Save & next saves the answers); see
  [Grade and Save buttons](#grade-and-save-buttons).
- Optional `resetButton: false` hides the "Reset assessment" button (which erases every answer),
  e.g. for exams. SCORM packages never show it.
- **Don't rename `id` or reorder `questions` once students have started.** Saved progress is keyed
  by the assessment id and checked against the question list. If they no longer match, the saved
  state is thrown away.
- The new assessment shows up on the home page automatically.
- A plain-JS quiz kept outside `src/` (like `exams/sample-exam2/exam2.js`, the same file the
  SCORM script packages) can be shown in the app too: give it a `.d.ts` next to it (see
  `exam2.d.ts`), add its questions to `courseQuestions` in `src/questions/index.ts` (not to the
  demo `questions` list), and add `{ ...assessment, id: "ex2" }` to `assessments`. The course
  questions are checked by `src/questions/questions.test.ts`.

---

## How to add a new element type

The engine doesn't need to change. An element type is a folder under `src/elements/` plus one
line of registration.

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
   - `manualGrading: true` (optional): a teacher grades the part. `grade()` then returns
     `{ score: 0, pending: true, feedback? }`; one submission closes the question, and a grade
     entered on the review page (`Submission.manualGrades`) replaces the pending result. See
     `essay`.
   - `correctAnswerHeading` (optional): show `formatCorrectAnswer` as a block under this heading
     (e.g. "Model answer") instead of inline after "Correct answer:".

3. **Write the input component** `StringInput.tsx`. It receives `ElementInputProps`
   (`part`, `id`, `labelId`, `describedBy`, `value`, `onChange`, `disabled`, `invalid`,
   `showCorrect`). Values must be JSON-serializable because they're saved and exported. Keep
   grading logic out of the component.

4. **Bundle it** in `src/elements/<name>/index.ts` as an `ElementDefinition<StringPart>`.

5. **Register it** in `src/elements/index.ts`:

   ```ts
   registerElement<"string">(stringElement);
   ```

`src/elements/integer/` is the smallest complete example to copy. `src/elements/trueFalse/` is a
similarly small one with no `prepare()` step, just an array of independently graded rows.
`src/elements/table/` is a mid-sized one that reuses the `number` grader for each cell,
`src/elements/matching/` and `src/elements/ordering/` are mid-sized ones that use `prepare()` to
shuffle an order (like `multipleChoice`) and grade a student-reordered array (`ordering` is the
simpler of the two: one column instead of matching two). `src/elements/expression/` uses
`prepare()` differently: to freeze random *test points* rather than shuffle anything, and pulls in
an external parsing/evaluation library (`mathjs`) rather than parsing the value itself like every
other element. `src/elements/essay/` is the hand-graded one (`manualGrading`) and lazy-loads an
external editor component (MathLive). `src/elements/conditionalGrading/` combines a `number` and an
`expression` box per step and grades each step from the student's own earlier answers.
`src/elements/jsxgraph/` / `src/elements/svgDrawing/` are the
most complex (a thin adapter around a drawing board that lives under `src/components/`).

---

## Persistence, export and import

Since there's no backend, the browser and JSON files stand in for one.

- **Autosave:** the full state of each assessment is saved to `localStorage` under
  `assess:v1:<assessmentId>` on every change and restored on reload. If storage is unavailable
  (private mode, quota exceeded), the app keeps working in memory.
- **Reset:** each assessment has a "Reset assessment" button, with a confirmation, that clears
  its saved state.
- **Results file:** `buildExport` and `downloadJson` (`engine/storage.ts`) produce a JSON file
  (`<assessmentId>-<name>-<timestamp>.json`) with every question's seed, all submissions and the
  scores. **No student-facing button calls them yet**, deliberately for now: in an exam students
  shouldn't be prompted to export anything. Inside an LMS the answers go to the LMS instead (see
  [SCORM packages](#scorm-packages-for-an-lms-blackboard-ultra)).
- **Import (instructor review):** open `#/import` and load an export. Every variant is rebuilt
  from its seed, and the questions, the student's answers and the grades are shown read-only
  (except the teacher grade forms below). This is exactly what the student saw. Course questions
  that live only in a Quarto book are reviewed on a Quarto `data-review` page instead (see
  [Teacher review page](#teacher-review-page-grading-essays)).
- **Teacher grading of essays:** on the same page, each hand-graded answer has a points + comment
  form. After grading, **Download graded results** saves `<original name>-graded.json` with the
  grades (`manualGrades` on each submission) and the updated totals. Opening the graded file again
  shows the grades and comments; this is how a student can see their essay grade (the quiz itself
  never receives it, since there's no backend).

> Answers aren't hidden from the client. This is by design: the tool is for practice and
> low-stakes quizzes, not proctored exams.

---

## Embedding in a Quarto book

`npm run build:lib` produces a self-contained bundle in `dist-lib/`:

- `exercise-system.js`: an ES module with React, all 12 element types, JSXGraph, mathjs, MathLive
  and KaTeX (about 3.9 MB)
- `exercise-system.css`: Tailwind styles plus the KaTeX fonts, inlined (about 1.5 MB)

The bundle exports `mount(element, { assessment, questions, review? })`, which returns an unmount
function (`review: true` shows the teacher review page for that quiz instead of the quiz).
The embedded widget shows one assessment and doesn't use the URL hash, so it won't clash with the
page's own navigation.

**Once the book is set up (steps 1 to 3), a quiz is deployed with one line** in any chapter:

````markdown
```{=html}
<div class="exercise-system-root" data-quiz="quiz1.js"></div>
```
````

The stylesheet and the script that mounts the quiz are loaded once for the whole book, from
`_quarto.yml`. Chapters contain no `<link>` and no `<script>`.

### One-time setup of a book

`quarto-demo/` is the smallest working setup:

```
quarto-demo/
├── _quarto.yml      # stylesheet + quiz loader for every page
├── index.qmd        # a page with <div class="exercise-system-root" data-quiz="quiz1.js">
├── quiz1.js         # the quiz: exports `assessment` and `questions`
├── questions/       # one .js file per question
└── assets/          # exercise-system.js and exercise-system.css (the built bundle)
```

1. **Build and copy** the bundle into the book's `assets/` folder. Repeat this whenever the library
   changes:

   ```powershell
   npm run build:lib
   Copy-Item dist-lib\exercise-system.js, dist-lib\exercise-system.css quarto-demo\assets\ -Force
   ```

2. **Register it in `_quarto.yml`**: the files Quarto must copy into the rendered site (the browser
   loads them at run time, so Quarto can't find them on its own), the stylesheet, and the loader
   script. The loader mounts every `<div data-quiz="...">` on the page and imports the library
   only on pages that have one:

   ```yaml
   project:
     type: website            # or book
     resources:
       - quiz1.js             # every quiz file
       - questions/**
       - assets/**

   format:
     html:
       css: assets/exercise-system.css
       include-in-header:
         text: |
           <script type="module">
             const roots = document.querySelectorAll("[data-quiz]:not([data-mounted])");
             if (roots.length > 0) {
               const { mount } = await import("./assets/exercise-system.js");
               for (const el of roots) {
                 el.dataset.mounted = "";
                 try {
                   const { assessment, questions } = await import(`./${el.dataset.quiz}`);
                   mount(el, { assessment, questions, review: "review" in el.dataset });
                 } catch (err) {
                   el.textContent = `Could not load the quiz (${el.dataset.quiz}): ${err.message}`;
                   console.error(err);
                 }
               }
             }
           </script>
   ```

   The loader's paths are relative to the page, so keep the pages in the book's top folder (or
   change them). The stylesheet is downloaded once and then cached for all pages.

### Teacher review page (grading essays)

Add `data-review` to a quiz div to get the teacher view for that quiz instead of the quiz itself:
load a student's results file, review every answer, grade the essays and download the graded file.
It uses the quiz's own questions, so course questions can be regenerated (the app's `#/import` page
only knows the demo questions).

````markdown
```{=html}
<div class="exercise-system-root" data-quiz="quiz1.js" data-review></div>
```
````

Put it on a page students aren't pointed to (answers aren't hidden from the client anyway). In code:
`mount(element, { assessment, questions, review: true })`.

### Adding a quiz

1. **Write the questions as plain `.js` files** in `questions/`, named
   `NN_<type>_<description>.js`. They have the same shape as the `.ts` files in `src/questions/`,
   just without type annotations.
   If one import in a quiz fails, the whole quiz stays stuck on "Loading…". To find the missing
   file, look for a 404 in the browser console (F12).

2. **Write an assessment module** next to `_quarto.yml`, for example `quiz2.js`, that exports
   `questions` and `assessment`, and add it to `resources` in `_quarto.yml`:

   ```js
   import { typesOfGoods } from "./questions/01_mc_types_of_goods.js";
   import { firmProfit } from "./questions/03_integer_firm_profit.js";

   export const questions = [typesOfGoods, firmProfit];

   export const assessment = {
     id: "ch02-practice",
     title: "Chapter 2 practice",
     mode: "exercise",               // "exercise" or "exam"
     questions: questions.map((q) => ({ questionId: q.id, points: 10 })),
   };
   ```

3. **Embed it** with the one line shown at the top of this section. The `data-quiz` value is the
   quiz file name, relative to the book's top folder.

   - **To show a different quiz**, change only the `data-quiz="…"` value. There's no id or import
     line to keep in sync.
   - **For more quizzes on the same page**, add more divs. Each one names its own quiz file.
   - **If the file name is wrong or the file doesn't load**, the div shows "Could not load the
     quiz (quiz2.js): …" instead of hanging on "Loading…".
   - **Keep each `assessment.id` unique across the whole site**, and use each quiz once per page.
     Saved progress is stored in the browser under that id, so two quizzes with the same id
     (or the same quiz twice) share their answers, even in different books on the same site.
   - **To make a quiz wider** than the text column, wrap the block in a Quarto column class such
     as `::: {.column-body-outset}` … `:::`, or `.column-page` for wider still.

4. **Render** with `cd quarto-demo` and then `quarto render`. ES modules don't load from
   `file://`, so view the result through a local server (for example `quarto preview`).

To use the bundle in another Quarto book, copy the two bundle files into that book's `assets/`
folder and add the `_quarto.yml` settings from step 2.

---

## SCORM packages for an LMS (Blackboard Ultra)

> Step-by-step guide (where the files are, what a quiz file must look like, uploading):
> [`Readme_scorm.md`](Readme_scorm.md). This section has the technical details.

`npm run scorm` turns a quiz module (the same `.js` file a Quarto page loads with `data-quiz`) into a
**SCORM 2004 3rd edition** zip (the version Blackboard Ultra uses) that you upload to an LMS such as Blackboard Ultra. Inside the
LMS the quiz reports the grade to the gradebook and keeps each student's progress, including
their answers on the last attempt of each question, so they can leave and come back.

```bash
npm run scorm -- quarto-demo/quiz1.js                 # -> dist-scorm/quiz1-scorm.zip
npm run scorm -- quarto-demo/quiz1.js --passing 0.7   # with a 70% passing score
npm run scorm -- path/to/quiz.js --out my-quiz.zip
```

The command rebuilds the bundle (`build:lib`) and then runs `scripts/scorm-package.mjs`, which
reads the quiz's `assessment` (its `id` and `title` name the package), follows the quiz's relative
imports to collect every question file, and zips:

- `imsmanifest.xml`: one SCO, SCORM 2004 3rd edition; `--passing` adds a primary objective with
  that minimum normalized measure (the LMS passes it to the quiz as `cmi.scaled_passing_score`)
- `index.html`: loads the bundle and the quiz and calls `mountScorm`
- `exercise-system.js` / `.css` (from `dist-lib/`) and the quiz with its question files, in the
  same folder layout as in the book

The quiz file and every file it imports must be inside the quiz's folder (as they are in
`quarto-demo/`).

### What the LMS receives

| SCORM element | Value |
| --- | --- |
| `cmi.score.raw` / `.min` / `.max` / `.scaled` | points earned / 0 / points possible / earned ÷ possible (best score per question, like the app) |
| `cmi.completion_status` | `completed` once every question is finished (with `gradeButton: false`: saved), else `incomplete` |
| `cmi.success_status` | `passed`/`failed` against the passing score; `unknown` without one, or while an essay awaits grading |
| `cmi.progress_measure` | share of questions finished |
| `cmi.interactions.n.*` | one per question (n = its position): `id`, `description` (title), `weighting` (points), and once answered `learner_response` (the latest answer: typed text as-is, e.g. the full essay; other answers as their review summary; drawings as each shape with its points, e.g. `Drew 1 shape: segment (0, 8.33) to (10, 0).`), `result` (`correct`, `incorrect`, a partial score, or `neutral` for an ungraded essay) and `timestamp` (SCORM `time(second,10,2)`, e.g. `2026-10-12T15:12:36.12Z`; a `Z` without fractional seconds is rejected with error 406) |
| `cmi.suspend_data` | the saved state (see below) |
| `cmi.exit` | `suspend`, so the next launch resumes the same attempt |
| `cmi.session_time` | time spent, set when the page closes |

The score and interactions are sent and committed right after each Grade (or, with
`gradeButton: false`, each save on Save & next); while a student
types, only the saved state changes, committed at most every 2 seconds and when the page closes.

### Saved progress (`cmi.suspend_data`)

The full assessment state (seeds, attempts, best scores, drafts, the current question) is saved to
`cmi.suspend_data` instead of `localStorage`. To fit the 64,000-character limit (SCORM 2004 3rd and 4th edition) it's
compacted and compressed (`lz-string`): prepared parts are dropped (they're rebuilt from each
question's seed), and only the **latest submission of each question keeps its answers**; older
submissions keep just their score and time, so attempt counts and best scores still work. A
fully answered 14-question demo quiz (with two graphs and an essay) needs about 4,000 to 10,000
characters; 40 shapes per graph and 30 attempts on every question still stay near 16,000. As with `localStorage`, saved
progress is ignored if the quiz's id or question list changes, so don't edit a quiz that students
have started.

Inside an LMS the **Reset assessment** button is hidden (students can't wipe their attempts), and
the student's name is filled in from the LMS (`cmi.learner_name`). Opened outside an LMS (for
example unzipped and served by a local web server; ES modules don't load from a double-clicked
`file://` page), the package runs as a preview: a banner says it isn't connected, progress goes to
`localStorage`, and nothing is reported.

### Essays in SCORM

SCORM can't send a teacher's grade back into the package. A quiz with essays reports the
auto-graded points (essays count 0 until graded) with `success_status` `unknown`, and the essay
text in its interaction's `learner_response`. Grade the essay in the LMS's gradebook (override or
adjust the attempt's score). The app's review page and graded results file are for quizzes used
outside an LMS.

### Uploading and testing

1. **Test the zip first** on [SCORM Cloud](https://cloud.scorm.com/) (free account): upload it,
   launch it, answer a few questions, close and relaunch (your answers should be back), and check
   the registration report for the score and interactions.
2. **In Blackboard Ultra**, add the zip to the course as a SCORM package (upload it from Course
   Content; Blackboard detects the manifest) and turn on grading for it. Blackboard's own settings
   (number of attempts, which attempt counts) apply on top of the quiz's `maxAttempts`.
3. After changing questions, re-run `npm run scorm` and upload the new zip as a new item: an
   updated package doesn't carry over students' saved progress from the old one.
4. **Students' answers** are in Blackboard under the SCORM item's **Student submissions**: each
   question's latest answer (full essay text, drawing coordinates) and result.

### Troubleshooting

If Blackboard rejects a value, the quiz shows "Your latest answers couldn't be saved to the course
site..." and logs one line per rejected value in the browser console (F12, Console), for example:

```
SCORM SetValue(cmi.interactions.0.timestamp) failed: error 406 Data Model Element Type Mismatch (...) [value length 20: "..."]
```

It names the element, the LMS's error code, message and diagnostic, and the value's length and
start. A long `cmi.suspend_data` value points to a size limit; anything else is usually a format
the LMS's validator doesn't accept. The quiz retries everything on the next change.

Files: `src/scorm/` (`api.ts` finds the LMS's `API_1484_11`, `suspend.ts`, `report.ts`,
`scormPersistence.ts`), `mountScorm` in `src/lib/entry.tsx`, and `scripts/scorm-package.mjs`.

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
- hand-graded parts: pending results, one-submission close, pending points, teacher grades on an
  exported file and their import validation (`engine/manualGrading.test.ts`)
- each element: preparation, parsing edge cases, every comparison mode including negative and
  near-zero values, table validation and partial credit, the jsxgraph/svgDrawing grading and input
  syncing (`elements/jsxgraph/`, `elements/svgDrawing/`), and input components; the essay's limits,
  `$...$` preview and equation editor (MathLive is mocked, since jsdom can't run it), plus the
  student flow from typing to "awaiting grade" (`elements/essay/`)
- every question in the bank across many seeds (`questions/questions.test.ts`)
- SCORM: finding the LMS API, suspend data round trips and size, the reported cmi values, commit
  timing and resuming, against an in-memory fake LMS (`scorm/scorm.test.ts`,
  `scorm/scormQuiz.test.tsx`), and the packager's manifest, file collection and zip
  (`scripts/scorm-package.test.mjs`)
- a component test that submits a wrong answer and then a right one
  (`components/QuestionView.test.tsx`), and the import page, including grading an essay
  (`pages/Import.test.tsx`)

---

## Roadmap

The registry is designed so these can be added later without touching the engine:

- Checkbox (multiple answers) with partial credit: all-or-nothing, net-correct, coverage
- Units input (via mathjs units — `expression` already uses mathjs, but the `/number` build excludes unit support to keep the bundle small)
- Matrix input with symbolic entries (numeric grids are already covered by the `table` element)
- String input (`expression`, added beyond phase 1, covers symbolic math; plain non-numeric string matching is still open)
- Big-O input
- More manually graded parts: file upload, image capture (`essay` is done; it uses the same
  `manualGrading` hook these would)

Code questions are out of scope.
