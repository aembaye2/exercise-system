# we are in C:\Users\aembaye\Documents\exercise_system
# PLAN.md — Frontend-Only Assessment System (Phase 1: Multiple Choice + Numeric)

## Goal

Build a browser-only online assessment app in React, inspired by PrairieLearn's
architecture. There is **no backend**, **no authentication**, and **no need to hide
answers** from the client. Questions are randomized from a seed, so every student
attempt can get a fresh, reproducible variant.

Phase 1 delivers two question element types, **multiple choice** and **numeric input**
(real numbers and integers), plus the full engine they run on. The engine must be
built so that later types plug in without changing the core.

## How to work (instructions for the coding agent)

- Work through the **Milestones** section in order. Finish and verify each milestone
  before starting the next.
- After each milestone, run `npm run test` and `npm run build`, fix any failures,
  then summarize what was done and stop so I can review.
- Keep grading logic in **pure functions** with unit tests. UI components must not
  contain grading logic.
- Use TypeScript strictly (`"strict": true`). No `any` unless justified in a comment.
- Do not add libraries beyond the ones listed in **Tech stack** without asking.
- Never use `Math.random()` inside question code. All randomness goes through the
  seeded RNG.

## Tech stack

- Vite + React 18 + TypeScript
- Vitest + React Testing Library for tests
- Tailwind CSS for styling
- `react-markdown` + `remark-math` + `rehype-katex` + `katex` for question text with math
  (`$...$` inline, `$$...$$` display)
- No state library in phase 1; use `useReducer` + context
- Seeded RNG: implement our own (mulberry32) in `src/engine/rng.ts`, no dependency

## Core architecture

Every question goes through three steps, like PrairieLearn's `server.py`:

1. **generate(rng)** returns random parameters for this variant.
2. **render(params)** returns the question text (Markdown + LaTeX string).
3. **parts(params)** returns the list of input elements, each with its correct answer.

Grading happens per part through an **element registry**: each element type provides
a React input component and a pure `grade` function. The question score is the
weighted average of part scores.

### Folder structure

```
src/
  engine/
    rng.ts              # seeded RNG (mulberry32) + helpers
    types.ts            # shared types (Question, Part, Submission, GradeResult...)
    registry.ts         # element type -> { Input, grade, validate }
    gradeQuestion.ts    # runs validate + grade over all parts
    assessment.ts       # reducer: attempts, variants, scoring
    storage.ts          # localStorage persistence + JSON export/import
  elements/
    multipleChoice/
      MultipleChoiceInput.tsx
      gradeMultipleChoice.ts
      prepareMultipleChoice.ts   # subsample + shuffle options using rng
      *.test.ts
    number/
      NumberInput.tsx
      gradeNumber.ts
      *.test.ts
    integer/
      IntegerInput.tsx
      gradeInteger.ts
      *.test.ts
  questions/
    index.ts            # question bank registry
    *.ts                # one file per question
  assessments/
    index.ts            # assessment definitions
  components/
    QuestionView.tsx    # renders text + parts + submit + feedback
    AssessmentView.tsx  # list of questions, scores, navigation
    Markdown.tsx        # react-markdown + KaTeX wrapper
  pages/
    Home.tsx            # list of assessments
    Results.tsx         # score summary + export button
```

### Types (starting point, refine as needed)

```ts
export interface Rng {
  next(): number;                         // [0, 1)
  int(min: number, max: number): number;  // inclusive
  float(min: number, max: number, decimals?: number): number;
  pick<T>(arr: T[]): T;
  shuffle<T>(arr: T[]): T[];              // returns a new array
}

export interface Question<P = Record<string, unknown>> {
  id: string;
  title: string;
  generate: (rng: Rng) => P;
  render: (params: P) => string;          // Markdown + LaTeX
  parts: (params: P) => Part[];
}

export type Part = MultipleChoicePart | NumberPart | IntegerPart;

interface BasePart {
  name: string;       // unique within the question
  weight?: number;    // default 1
  label?: string;     // optional prompt shown next to the input
}

export interface GradeResult {
  score: number;      // 0..1
  feedback?: string;
}

// validate() runs before grade(). An invalid-format submission returns a
// message and does NOT consume an attempt.
export interface ValidationResult {
  valid: boolean;
  message?: string;
}
```

## Seeded RNG

- Implement mulberry32 seeded from a 32-bit integer. Add a helper to derive a
  seed from a string (e.g. a simple hash) so seeds can be stored and shown.
- The same seed must always produce the same parameters, option order, and
  correct answers. Write a test that asserts this.
- Each question variant is identified by `{ questionId, seed }`.

## Element spec: multiple choice (`type: "multiple-choice"`)

```ts
export interface MultipleChoicePart extends BasePart {
  type: "multiple-choice";
  options: { text: string; correct?: boolean; feedback?: string }[];
  numberAnswers?: number;          // show this many options (1 correct + distractors)
  order?: "random" | "fixed";      // default "random"
  display?: "radio" | "dropdown";  // default "radio"
}
```

Rules:
- Exactly one option has `correct: true`. Throw a clear authoring error otherwise.
- Duplicate option texts are an authoring error.
- If `numberAnswers` is set, always include the correct option and randomly pick the
  rest from distractors, using the seeded RNG.
- Option order is shuffled with the seeded RNG unless `order: "fixed"`.
- The prepared option list (after subsampling and shuffling) must be computed once
  per variant and stored with the variant, so grading and rendering see the same list.
- Validation: no option selected → invalid ("Please select an option").
- Grading: 1 if the selected option is the correct one, else 0. Return the option's
  `feedback` if present.
- Option text supports Markdown + LaTeX.

## Element spec: numeric input (`type: "number"`)

```ts
export interface NumberPart extends BasePart {
  type: "number";
  correct: number;
  comparison?: "relabs" | "sigfig" | "decdig";  // default "relabs"
  rtol?: number;     // default 1e-2
  atol?: number;     // default 1e-8
  digits?: number;   // for sigfig / decdig, default 2
  suffix?: string;   // shown after the input, e.g. "m/s"
  showHelpText?: boolean; // default true: explains accepted format
}
```

Rules:
- Accept plain decimals and scientific notation (`3.2`, `-0.5`, `1e-3`, `4.5E6`).
  Trim whitespace. Reject anything else, including empty input, `NaN`, `Infinity`,
  commas, and expressions like `2/3`.
- Invalid input returns a validation message and does **not** consume an attempt.
- `relabs`: correct if `|a - b| <= atol + rtol * |b|`.
- `sigfig`: round both values to `digits` significant figures and compare.
- `decdig`: round both values to `digits` decimal places and compare.
- Feedback on wrong answers should not reveal the correct value until the question
  is finished (all attempts used or answered correctly).

## Element spec: integer input (`type: "integer"`)

```ts
export interface IntegerPart extends BasePart {
  type: "integer";
  correct: number;   // must be an integer; authoring error otherwise
  suffix?: string;
}
```

Rules:
- Accept only `/^[+-]?\d+$/` after trimming. `3.0` and `1e2` are invalid.
- Invalid format does not consume an attempt.
- Grading is exact equality.

## Assessments and attempts

```ts
export interface Assessment {
  id: string;
  title: string;
  mode: "homework" | "exam";
  questions: { questionId: string; points: number; maxAttempts?: number }[];
}
```

- **Homework mode:** after each graded submission, the student can click "New
  variant" to get a fresh seed. The question's best score counts. `maxAttempts`
  is unlimited by default.
- **Exam mode:** one fixed seed per question, created when the assessment starts.
  `maxAttempts` default 1. After the final attempt, show the correct answers.
- A submission is graded only if every part passes validation.
- Per-question state: `{ seed, preparedParts, submissions[], bestScore, status }`.
- Show per-part feedback (correct / incorrect badge + optional message) and a total
  score for the question and the assessment.

## Persistence and export (replaces a backend)

- Save the full assessment state to `localStorage` on every change, under a
  versioned key such as `assess:v1:<assessmentId>`. Wrap all storage access in
  try/catch and fall back to in-memory state if storage fails.
- On load, restore state if present. Provide a "Reset assessment" button with a
  confirmation.
- **Export results** as a downloadable JSON file: assessment id, timestamp, and for
  each question the seed, submissions, and scores. Include a student name field that
  the student types in before export (no auth, just a text field).
- **Import results** page: load an exported JSON file, regenerate every variant from
  its seed, and show the questions, submissions, and grades read-only. This is how an
  instructor reviews work.

## Sample content (include in phase 1)

Create at least these questions to exercise the engine:

1. **Kinematics (number):** random speed `v` and time `t`, ask for distance, `relabs`.
2. **Unit choice (multiple choice):** pick the correct SI unit for a random quantity,
   `numberAnswers: 4` from a larger pool.
3. **Mixed question:** one numeric part and one multiple-choice part in the same
   question, with weights.
4. **Integer arithmetic (integer):** e.g. remainder of `a mod b` with random values.
5. **Significant figures (number, sigfig):** a computed value graded to 3 sig figs.
6. **Dropdown MC:** a multiple-choice part with `display: "dropdown"` inline in a
   sentence.

And two assessments: one homework containing all questions, one short exam with 3.

## UI requirements

- Clean, readable layout; works on mobile widths down to 360px.
- Light and dark mode via `prefers-color-scheme`.
- Keyboard accessible: inputs reachable by Tab, radio groups navigable by arrow keys,
  Enter submits. Proper labels and `aria-live` for feedback messages.
- Show attempt count and remaining attempts per question.
- Show the variant seed in small text (useful for debugging and instructor review).

## Testing requirements

- Unit tests for: RNG determinism, MC preparation (subsample always includes the
  correct answer, deterministic shuffle), MC grading, number parsing edge cases,
  each numeric comparison mode (including negative values and values near zero),
  integer parsing, assessment reducer (attempts, best score, exam lockout).
- A component test that renders a question, submits a wrong answer, then a correct
  one, and checks the feedback and score.

## Milestones

1. **Scaffold:** Vite + React + TS + Tailwind + Vitest set up; `npm run dev`, `test`,
   `build` all work. Markdown + KaTeX component renders `$x^2$`.
2. **Engine core:** RNG, types, registry, `gradeQuestion` with validate-then-grade.
   Tests passing.
3. **Multiple choice element:** preparation, input component (radio + dropdown),
   grader, tests.
4. **Numeric elements:** number and integer inputs, parsing, all comparison modes,
   tests.
5. **Question and assessment views:** `QuestionView`, `AssessmentView`, reducer for
   homework and exam modes, sample questions and assessments wired in.
6. **Persistence and export/import:** localStorage save/restore, reset, JSON export,
   import + read-only review page.
7. **Polish:** accessibility pass, mobile layout, dark mode, README with how to
   author a new question.

## Out of scope for phase 1 (design for, do not build)

The registry must make these easy to add later without touching the engine core:

- Checkbox (multiple answers) with partial-credit modes: all-or-nothing,
  net-correct, coverage
- Matching and ordering (drag and drop)
- Units input (via mathjs units)
- Matrix input
- String input and symbolic math input (equivalence checked by evaluating at random
  points)
- Big-O input
- Manually graded parts: essay, file upload, image capture, drawing

Code questions are excluded entirely.

## Definition of done (phase 1)

- All milestones complete, tests pass, production build succeeds.
- A student can open an assessment, answer MC and numeric questions, see feedback,
  retry with new variants in homework mode, refresh without losing progress, and
  export results.
- An instructor can import that export and see the exact same variants and answers.
- README explains how to add a new question and how to add a new element type.