# Making a SCORM package (for Blackboard Ultra)

This guide shows how to turn a quiz into a **SCORM 2004 (3rd edition) zip** that you upload to Blackboard Ultra
(or any LMS that supports SCORM 2004). Inside the LMS the quiz:

- sends the **grade** to the gradebook,
- saves each student's **progress**, including their **answers on the last attempt of each
  question**, so they can close the quiz and come back,
- reports each question's latest answer and result.

The technical details (exactly which SCORM values are sent) are in the "SCORM packages" section
of `Readme.md`.

---

## 1. Where everything is

All commands run from the **project root**, `C:\Users\aembaye\Documents\exercise-system`. The
example quiz is in the `quarto-demo/` folder:

```
exercise-system/                          <- project root: run npm commands here
├── scripts/scorm-package.mjs             <- the packaging script (npm run scorm)
├── dist-lib/                             <- the built library (made automatically)
├── dist-scorm/                           <- finished SCORM zips go here by default
└── quarto-demo/                          <- the "quiz folder"
    ├── quiz1.js                          <- a quiz file
    ├── questions/                        <- question files (01_... to 13_...)
    ├── assets/                           <- the bundle, for the Quarto page (not needed here)
    ├── _quarto.yml, index.qmd            <- the Quarto page that shows the quiz
```

Full path of the example quiz on this machine:
`C:\Users\aembaye\Documents\exercise-system\quarto-demo\quiz1.js`

---

## 2. Build the zip

Open PowerShell or Git Bash in the project root and run:

```bash
npm run scorm -- quarto-demo/quiz1.js --out quiz1.zip
```

This rebuilds the library, collects `quiz1.js` and every question file it imports, and writes
**`quiz1.zip` in the project root**. It prints something like:

```
SCORM 2004 package: quiz1.zip (1.8 MB, 18 files)
  "Quiz 1: Different types of questions" (id quiz1), 14 quiz module(s)
```

Options (add them after the quiz path):

| Option | What it does | Example |
| --- | --- | --- |
| `--out <file>` | where to write the zip; without it the zip goes to `dist-scorm/<quiz id>-scorm.zip` | `--out quiz1.zip` |
| `--passing <0..1>` | passing score as a fraction; Blackboard then gets passed/failed | `--passing 0.7` (70%) |

More examples:

```bash
npm run scorm -- quarto-demo/quiz1.js                              # -> dist-scorm/quiz1-scorm.zip
npm run scorm -- quarto-demo/quiz1.js --passing 0.7 --out quiz1.zip
npm run scorm -- path/to/another/quiz.js --out quiz2.zip
npm run scorm -- exams/macro-sample-exam2/exam2.js                       # -> dist-scorm/sample-exam2-scorm.zip
npm run scorm -- exams/micro-sample-exam2/sample-micro-exam2.js                       # -> dist-scorm/micro-sample-exam2-scorm.zip
```

The `--` after `npm run scorm` is required: it passes the rest of the line to the script.

### Example: Sample Exam 2

The exam is in its own folder, `exams/macro-sample-exam2/` (`exam2.js` plus its 29 question files in
`questions/`). To package it:

1. Open PowerShell or Git Bash in the project root:
   ```bash
   cd C:\Users\aembaye\Documents\exercise-system
   ```
2. If you want, set `gradeButton` and `resetButton` in `exams/macro-sample-exam2/exam2.js` first (see
   section 5).
3. Build the zip:
   ```bash
   npm run scorm -- exams/macro-sample-exam2/exam2.js
   ```
4. Upload `dist-scorm\sample-exam2-scorm.zip` to Blackboard (section 4).

After **any** change to the exam or its questions, or to the library in `src/`, run step 3 again
and upload the new zip. The zip is not updated by itself.

---

## 3. What a quiz file must look like

A quiz file is the same file a Quarto page loads with `data-quiz="..."`. Any quiz that works in
the Quarto book can be packaged as is. It must:

1. **Be a `.js` file inside the quiz folder** (here `quarto-demo/`).
2. **Import its questions with relative paths** (`./questions/...`). Every imported file must also
   be inside the quiz folder (a subfolder like `questions/` is fine; `../` paths that leave
   the folder are not).
3. **Export `questions`**: the list of question objects.
4. **Export `assessment`** with at least:
   - `id`: unique across all your quizzes (it names the zip and keys the saved progress),
   - `title`: shown in Blackboard and at the top of the quiz,
   - `mode`: `"exercise"` (unlimited attempts, new variants) or `"exam"` (1 attempt by default),
   - `questions`: one `{ questionId, points }` entry per question (optionally `maxAttempts`).

Here is `quiz1.js` (the same 15 questions as the app's demo assessment), which follows all of
these rules:

```js
import { typesOfGoods } from "./questions/01_mc_types_of_goods.js";
import { marketEquilibrium } from "./questions/02_number-mc_market_equilibrium.js";
// ... one import per question file, 03 to 14 ...
import { supplyDemandShiftGraph } from "./questions/15_mc_graph_supply_demand_shift.js";

export const questions = [
  typesOfGoods,
  marketEquilibrium,
  // ...
  supplyDemandShiftGraph,
];

export const assessment = {
  id: "quiz1",
  title: "Quiz 1: Different types of questions",
  description: "One question of every type.",
  mode: "exercise",
  // gradeButton: false,   // uncomment to hide grades: no Grade button, Save & next saves
  questions: questions.map((q) => ({ questionId: q.id, points: 10 })),
};
```

### A question file

Each question is its own `.js` file exporting one question object (the same shape as the `.ts`
files in `src/questions/`, without type annotations). For example
`questions/03_integer_firm_profit.js` (comments added):

```js
export const firmProfit = {
  id: "firm-profit-integer",            // unique and stable: saved progress refers to it
  title: "Profit of a firm",
  generate: (rng) => ({                 // random numbers only through rng
    q: rng.int(20, 300),
    p: rng.int(10, 40),
    avc: rng.int(5, 35),
    fc: rng.int(10, 80) * 50,
  }),
  render: ({ q, p, avc, fc }) =>        // question text: Markdown + LaTeX
    `A firm sells $${q}$ units at a price of $${p}$ dollars each. ` +
    `Its average variable cost is $${avc}$ dollars per unit and its fixed cost is $${fc}$ dollars.\n\n` +
    `Compute the firm's profit $\\pi = TR - TC$. Enter a negative number for a loss.`,
  parts: ({ q, p, avc, fc }) => [       // the answer boxes, each with its correct answer
    { type: "integer", name: "profit", label: "$\\pi =$", correct: p * q - (avc * q + fc), suffix: "dollars" },
  ],
};
```

All element types (multiple-choice, number, integer, table, jsxgraph, svgDrawing, matching,
true-false, ordering, expression, essay) are described in `Readme.md` under "Element types".

### A new quiz from scratch

Say you want a graded exam with two existing questions and a new essay:

1. Write the essay question as `quarto-demo/questions/midterm/01_essay_price_ceiling.js`:

   ```js
   export const priceCeilingEssay = {
     id: "midterm-price-ceiling-essay",
     title: "Explain a price ceiling",
     generate: () => ({}),
     render: () => "Explain what happens when a city caps rents below the equilibrium rent.",
     parts: () => [
       {
         type: "essay",
         name: "answer",
         maxWords: 200,
         modelAnswer: "A binding price ceiling causes a **shortage** ...",  // optional
       },
     ],
   };
   ```

2. Write the quiz file `quarto-demo/midterm.js`:

   ```js
   import { typesOfGoods } from "./questions/01_mc_types_of_goods.js";
   import { firmProfit } from "./questions/03_integer_firm_profit.js";
   import { priceCeilingEssay } from "./questions/midterm/01_essay_price_ceiling.js";

   export const questions = [typesOfGoods, firmProfit, priceCeilingEssay];

   export const assessment = {
     id: "econ101-midterm",
     title: "ECON 101 Midterm",
     mode: "exam",
     questions: [
       { questionId: typesOfGoods.id, points: 10 },
       { questionId: firmProfit.id, points: 10, maxAttempts: 2 },
       { questionId: priceCeilingEssay.id, points: 20 },
     ],
   };
   ```

3. Package it:

   ```bash
   npm run scorm -- quarto-demo/midterm.js --passing 0.6 --out midterm.zip
   ```

---

## 4. Test, then upload

1. **Test on SCORM Cloud first** (free account at https://cloud.scorm.com/): upload the zip,
   launch it, answer a few questions, close it and launch it again (your answers should still be
   there), and check the registration report for the score and the answers.
2. **Upload to Blackboard Ultra**: in the course's Course Content, upload the zip as a SCORM
   package (Blackboard recognizes it from its `imsmanifest.xml`) and turn on grading for it.
   Blackboard's own settings (number of attempts, which attempt counts) apply on top of the
   quiz's `maxAttempts`.
3. **To preview without an LMS**, unzip it and serve the folder with a local web server; a banner
   says it isn't connected and nothing is reported. (Double-clicking `index.html` doesn't work:
   browsers don't load the quiz's modules from `file://`.)

---

## 5. Good to know

- **Grade**: points earned out of points possible, using each question's best score, exactly as
  in the quiz's own score display (with `gradeButton: false`: each question's latest save).
- **Seeing students' answers**: in Blackboard, open the SCORM item's **Student submissions**. Each
  question shows the student's latest answer and whether it was correct: typed answers and the
  full essay text as written, other answers as a short summary, and graphs as each shape with its
  coordinates (2 decimals), e.g. `Drew 1 shape: segment (0, 8.33) to (10, 0).` Students are never
  asked to export or download anything.
- **Saved progress** lives in Blackboard, not the browser, so it follows the student to another
  computer. Inside an LMS the **Reset assessment** button shows only in `mode: "exercise"`
  (exams never show it, so students can't erase their attempts), and the student's name is
  filled in from Blackboard.
- **Essays** can't be graded inside the package (SCORM has no way to send a teacher's grade back
  in). They count 0 until you grade them, the pass/fail status stays "unknown", and the essay text
  is sent as the student's answer. Grade the essay in Blackboard's gradebook.
- **Hiding grades until the due date**: add `gradeButton: false` to the quiz's `assessment`.
  There is then no Grade button, and students see no scores, feedback or correct answers.
  **Save & next** (on the last question, **Save & finish**) saves the answer and moves on. If the
  question isn't fully answered, the first press shows a warning and a second press skips it.
  Previous and the question-number buttons also save a complete answer. Students can come back,
  change an answer and save it again; the latest save counts. The grade goes to the Blackboard
  gradebook on every save, so hide that grade column from students until the due date (or until
  you release it). Details: "Grade and Save buttons" in `Readme.md`.
- **The Reset button**: inside Blackboard, **Reset assessment** shows only when the assessment's
  `mode` is `"exercise"`; it erases the student's answers and sets the Blackboard score back to 0.
  It never shows in `mode: "exam"`. `resetButton: false` in the `assessment` hides it everywhere.
- **Changing a quiz after students started**: if you change the quiz's `id` or its list of
  questions, saved progress no longer matches and is dropped. Re-run `npm run scorm` and upload
  the new zip as a **new** item rather than replacing the old one mid-term.
- **Fixing a typo in question text** (same ids, same order) is safe to re-package.
- **Graphs in an exam**: a `jsxgraph` question with `showDownloadButton: true` lets students save
  their drawing as an image, and `showOutputButton: true` shows the drawing's data. Nothing is sent
  anywhere, but set both to `false` in the question's `props` if you don't want those buttons in an
  exam.

## 6. If students see "Your latest answers couldn't be saved to the course site"

Blackboard rejected something the quiz sent. The quiz tries again on every change, so a one-off
network hiccup clears itself. If the message stays:

1. Open the quiz as a test student, press **F12** and open the **Console** tab.
2. Answer a question until the message appears and copy the lines that start with
   `SCORM SetValue(...) failed:`. Each one names the rejected value, Blackboard's error code and
   reason, and the value's length and start.
3. A very long `cmi.suspend_data` value means Blackboard's size limit was hit; anything else is a
   value Blackboard's checker doesn't accept (for example, error 406 on `timestamp` was a time
   format bug, now fixed). Fix it in `src/scorm/`, then re-run `npm run scorm` and re-upload.

## 7. If the script stops with an error

| Message | Fix |
| --- | --- |
| `Usage: npm run scorm -- <quiz.js> ...` | give the path to the quiz file after `--` |
| `... must export \`assessment\` (with id and title) and \`questions\`.` | add both exports to the quiz file (section 3) |
| `Missing module ...` | an import path in the quiz or a question file is wrong; check the file name and folder |
| `... is outside ...; the package can only hold files under it.` | move that file into the quiz folder and fix the import |
| `--passing must be between 0 and 1` | write `--passing 0.7`, not `--passing 70` |
| `dist-lib/exercise-system.js not found` | run `npm run build:lib` (normally `npm run scorm` does this for you) |
