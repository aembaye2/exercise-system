import { describe, expect, it } from "vitest";
import {
  assessmentReducer,
  attemptsRemaining,
  canNewVariant,
  createAssessmentState,
  isFinished,
  totals,
  type AssessmentAction,
  type AssessmentState,
} from "./assessment";
import { createVariant } from "./variant";
import { addQuestion, exam, exercise, seedCounter, testBank } from "../test/fixtures";

const NOW = "2026-01-01T00:00:00.000Z";

function correctSum(state: AssessmentState, index = 0): string {
  const q = state.questions[index];
  const part = q.preparedParts[0];
  if (part.type !== "integer") throw new Error("expected integer part");
  return String(part.correct);
}

function run(state: AssessmentState, ...actions: AssessmentAction[]): AssessmentState {
  return actions.reduce(assessmentReducer, state);
}

const set = (value: string, index = 0, part = "sum"): AssessmentAction => ({ type: "setValue", index, part, value });
const submit = (index = 0): AssessmentAction => ({ type: "submit", index, timestamp: NOW });

describe("createAssessmentState", () => {
  it("creates one prepared variant per question with the given seeds", () => {
    const s = createAssessmentState(exercise, testBank, seedCounter(100), NOW);
    expect(s.questions.map((q) => q.seed)).toEqual([100, 101]);
    expect(s.questions[0].preparedParts).toEqual(createVariant(addQuestion as never, 100).parts);
    expect(s.questions[0].maxAttempts).toBeNull();
  });

  it("uses exam defaults: maxAttempts 1 unless overridden", () => {
    const s = createAssessmentState(exam, testBank, seedCounter(), NOW);
    expect(s.questions[0].maxAttempts).toBe(1);
    expect(s.questions[1].maxAttempts).toBe(2);
  });

  it("throws for unknown questions", () => {
    expect(() =>
      createAssessmentState({ ...exercise, questions: [{ questionId: "nope", points: 1 }] }, testBank, seedCounter(), NOW),
    ).toThrow(/unknown question "nope"/);
  });
});

describe("submitting", () => {
  it("invalid input shows validation and does not consume an attempt", () => {
    let s = createAssessmentState(exercise, testBank, seedCounter(), NOW);
    s = run(s, set("3.5"), submit());
    expect(s.questions[0].submissions).toHaveLength(0);
    expect(s.questions[0].validation?.sum.valid).toBe(false);
    // editing the part clears its validation message
    s = run(s, set("4"));
    expect(s.questions[0].validation?.sum).toBeUndefined();
  });

  it("empty submission is invalid", () => {
    const s = run(createAssessmentState(exercise, testBank, seedCounter(), NOW), submit());
    expect(s.questions[0].submissions).toHaveLength(0);
    expect(s.questions[0].validation?.sum.message).toMatch(/enter an integer/i);
  });

  it("records graded submissions and keeps the best score", () => {
    let s = createAssessmentState(exercise, testBank, seedCounter(), NOW);
    s = run(s, set("999"), submit());
    expect(s.questions[0].submissions).toHaveLength(1);
    expect(s.questions[0].submissions[0].score).toBe(0);
    expect(s.questions[0].bestScore).toBe(0);
    s = run(s, set(correctSum(s)), submit());
    expect(s.questions[0].submissions).toHaveLength(2);
    expect(s.questions[0].bestScore).toBe(1);
    expect(totals(s)).toEqual({ earned: 10, possible: 14 });
  });

  it("computes weighted partial credit", () => {
    let s = createAssessmentState(exercise, testBank, seedCounter(), NOW);
    const part = s.questions[1].preparedParts[0];
    const correct = part.type === "integer" ? part.correct : NaN;
    s = run(s, set(String(correct), 1, "double"), { type: "setValue", index: 1, part: "parity", value: 1 }, submit(1));
    expect(s.questions[1].submissions[0].score).toBe(0.75);
    expect(s.questions[1].submissions[0].results.parity.feedback).toBe("Any multiple of 2 is even.");
    expect(totals(s).earned).toBe(3);
  });

  it("locks the variant after a correct answer", () => {
    let s = createAssessmentState(exercise, testBank, seedCounter(), NOW);
    s = run(s, set(correctSum(s)), submit());
    expect(isFinished(s.questions[0])).toBe(true);
    const after = run(s, set("1"), submit());
    expect(after).toBe(s);
  });
});

describe("exercise mode", () => {
  it("allows a new variant only after a graded submission, and best score persists", () => {
    const seeds = seedCounter(500);
    let s = createAssessmentState(exercise, testBank, seeds, NOW);
    const nv = (): AssessmentAction => {
      const seed = seeds();
      return { type: "newVariant", index: 0, seed, preparedParts: createVariant(addQuestion as never, seed).parts };
    };
    expect(canNewVariant(s.questions[0], "exercise")).toBe(false);
    expect(run(s, nv())).toBe(s);

    s = run(s, set(correctSum(s)), submit());
    expect(canNewVariant(s.questions[0], "exercise")).toBe(true);
    s = run(s, nv());
    const q = s.questions[0];
    expect(q.variant).toBe(1);
    expect(q.seed).not.toBe(500);
    expect(q.draft).toEqual({});
    expect(isFinished(q)).toBe(false);
    expect(q.bestScore).toBe(1);

    s = run(s, set("12345"), submit());
    expect(s.questions[0].bestScore).toBe(1);
    expect(s.questions[0].submissions.map((x) => x.variant)).toEqual([0, 1]);
  });

  it("unlimited attempts by default", () => {
    let s = createAssessmentState(exercise, testBank, seedCounter(), NOW);
    for (let i = 0; i < 20; i++) s = run(s, set("12345"), submit());
    expect(s.questions[0].submissions).toHaveLength(20);
    expect(attemptsRemaining(s.questions[0])).toBeNull();
    expect(isFinished(s.questions[0])).toBe(false);
  });
});

describe("exam mode", () => {
  it("locks out after maxAttempts and never allows new variants", () => {
    let s = createAssessmentState(exam, testBank, seedCounter(), NOW);
    s = run(s, set("12345"), submit());
    const q = s.questions[0];
    expect(attemptsRemaining(q)).toBe(0);
    expect(isFinished(q)).toBe(true);
    expect(canNewVariant(q, "exam")).toBe(false);
    // further submits and edits are ignored
    expect(run(s, set(correctSum(s)), submit())).toBe(s);
    expect(s.questions[0].bestScore).toBe(0);
  });

  it("invalid submissions don't count toward the exam limit", () => {
    let s = createAssessmentState(exam, testBank, seedCounter(), NOW);
    s = run(s, set("abc"), submit(), set("1e2"), submit());
    expect(attemptsRemaining(s.questions[0])).toBe(1);
    s = run(s, set(correctSum(s)), submit());
    expect(s.questions[0].bestScore).toBe(1);
  });

  it("respects a per-question maxAttempts override", () => {
    let s = createAssessmentState(exam, testBank, seedCounter(), NOW);
    s = run(s, set("0", 1, "double"), { type: "setValue", index: 1, part: "parity", value: 1 }, submit(1));
    expect(attemptsRemaining(s.questions[1])).toBe(1);
    expect(isFinished(s.questions[1])).toBe(false);
    s = run(s, submit(1));
    expect(isFinished(s.questions[1])).toBe(true);
    expect(s.questions[1].seed).toBe(s.questions[1].submissions[0].seed);
  });
});

describe("navigation and misc", () => {
  it("goTo stays in range", () => {
    const s = createAssessmentState(exercise, testBank, seedCounter(), NOW);
    expect(run(s, { type: "goTo", index: 1 }).currentIndex).toBe(1);
    expect(run(s, { type: "goTo", index: 5 })).toBe(s);
    expect(run(s, { type: "goTo", index: -1 })).toBe(s);
  });

  it("stores the student name", () => {
    const s = createAssessmentState(exercise, testBank, seedCounter(), NOW);
    expect(run(s, { type: "setStudentName", name: "Ada" }).studentName).toBe("Ada");
  });
});
