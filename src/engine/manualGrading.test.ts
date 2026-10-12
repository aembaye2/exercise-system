import { describe, expect, it } from "vitest";
import {
  assessmentReducer,
  canNewVariant,
  createAssessmentState,
  isFinished,
  pendingPoints,
  totals,
  type AssessmentAction,
  type AssessmentState,
} from "./assessment";
import { gradeQuestion } from "./gradeQuestion";
import { buildExport, ImportError, parseExport, setManualGrade } from "./storage";
import type { Assessment, Question } from "./types";
import { createVariant } from "./variant";

const NOW = "2026-01-01T00:00:00.000Z";

/** An essay (weight 3) plus an auto-graded integer (weight 1). */
const essayQuestion: Question<Record<string, never>> = {
  id: "essay-q",
  title: "Essay",
  generate: () => ({}),
  render: () => "Explain, then compute 2 + 2.",
  parts: () => [
    { type: "essay", name: "why", modelAnswer: "Because.", maxWords: 10, weight: 3 },
    { type: "integer", name: "sum", correct: 4 },
  ],
};
const bank = (id: string) => (id === "essay-q" ? (essayQuestion as Question<unknown>) : undefined);
const assessment: Assessment = { id: "essay-hw", title: "Essay HW", mode: "exercise", questions: [{ questionId: "essay-q", points: 8 }] };

function submitted(): AssessmentState {
  const actions: AssessmentAction[] = [
    { type: "setValue", index: 0, part: "why", value: "Supply falls short of demand." },
    { type: "setValue", index: 0, part: "sum", value: "4" },
    { type: "submit", index: 0, timestamp: NOW },
  ];
  return actions.reduce(assessmentReducer, createAssessmentState(assessment, bank, () => 1, NOW));
}

describe("hand-graded parts", () => {
  it("rejects an over-limit essay without using an attempt", () => {
    let s = createAssessmentState(assessment, bank, () => 1, NOW);
    s = assessmentReducer(s, { type: "setValue", index: 0, part: "why", value: "w ".repeat(11) });
    s = assessmentReducer(s, { type: "setValue", index: 0, part: "sum", value: "4" });
    s = assessmentReducer(s, { type: "submit", index: 0, timestamp: NOW });
    expect(s.questions[0].submissions).toHaveLength(0);
    expect(s.questions[0].validation?.why.valid).toBe(false);
  });

  it("closes the question after one submission, with the essay's share pending", () => {
    const s = submitted();
    const q = s.questions[0];
    expect(q.submissions[0].results.why).toMatchObject({ score: 0, pending: true });
    expect(q.submissions[0].score).toBeCloseTo(0.25);
    expect(isFinished(q)).toBe(true);
    expect(canNewVariant(q, "exercise")).toBe(false);
    expect(pendingPoints(q)).toBeCloseTo(6);
    expect(totals(s)).toEqual({ earned: 2, possible: 8, pending: 6 });
  });

  it("replaces the pending result with the teacher's grade", () => {
    const parts = createVariant(essayQuestion as Question<unknown>, 1).parts;
    const values = { why: "Because.", sum: "4" };
    const g = gradeQuestion(parts, values, { why: { score: 0.5, comment: "Too brief." } });
    expect(g.results.why).toEqual({ score: 0.5, feedback: "Too brief." });
    expect(g.score).toBeCloseTo((3 * 0.5 + 1) / 4);
  });

  it("ignores manual grades for auto-graded parts", () => {
    const parts = createVariant(essayQuestion as Question<unknown>, 1).parts;
    const g = gradeQuestion(parts, { why: "x", sum: "5" }, { sum: { score: 1 } });
    expect(g.results.sum.score).toBe(0);
  });

  it("records a teacher grade on an exported file and recomputes the totals", () => {
    const data = buildExport(submitted(), assessment, NOW);
    const parts = createVariant(essayQuestion as Question<unknown>, 1).parts;
    const graded = setManualGrade(data, 0, 0, parts, "why", { score: 1, comment: "Good." });
    const sub = graded.questions[0].submissions[0];
    expect(sub.manualGrades).toEqual({ why: { score: 1, comment: "Good." } });
    expect(sub.results.why.pending).toBeUndefined();
    expect(sub.score).toBe(1);
    expect(graded.questions[0].earned).toBe(8);
    expect(graded.earned).toBe(8);
    // Survives a round trip through the file format.
    expect(parseExport(JSON.stringify(graded)).questions[0].submissions[0].manualGrades).toEqual(sub.manualGrades);
    // Clearing the grade makes it pending again.
    const cleared = setManualGrade(graded, 0, 0, parts, "why", null);
    expect(cleared.questions[0].submissions[0].results.why.pending).toBe(true);
    expect(cleared.earned).toBe(2);
  });

  it("rejects malformed teacher grades on import", () => {
    const data = buildExport(submitted(), assessment, NOW);
    data.questions[0].submissions[0].manualGrades = { why: { score: 2 } };
    expect(() => parseExport(JSON.stringify(data))).toThrow(ImportError);
  });
});
