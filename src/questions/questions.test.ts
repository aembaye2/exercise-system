import { describe, expect, it } from "vitest";
import { exampleConditional } from "../elements/conditionalGrading/gradeConditional";
import { exampleExpression } from "../elements/expression/gradeExpression";
import { exampleJsxGraph } from "../elements/jsxgraph/gradeJsxGraph";
import { exampleMatching } from "../elements/matching/gradeMatching";
import { exampleOrdering } from "../elements/ordering/gradeOrdering";
import { exampleSvgDrawing } from "../elements/svgDrawing/gradeSvgDrawing";
import { exampleTable } from "../elements/table/gradeTable";
import { exampleTrueFalse } from "../elements/trueFalse/gradeTrueFalse";
import { gradeQuestion } from "../engine/gradeQuestion";
import { isManualPart } from "../engine/registry";
import type { AnswerValues, JsonValue, ManualGrades, Part } from "../engine/types";
import { createVariant } from "../engine/variant";
import { assessments } from "../assessments";
import { courseQuestions, getQuestion, questions } from ".";

/** Build the answer a perfect student would type for each part. */
function perfectAnswers(parts: Part[]): AnswerValues {
  const values: AnswerValues = {};
  for (const p of parts) {
    if (p.type === "multiple-choice") values[p.name] = p.options.findIndex((o) => o.correct);
    else if (p.type === "jsxgraph") values[p.name] = exampleJsxGraph(p) as unknown as JsonValue;
    else if (p.type === "svgDrawing") values[p.name] = exampleSvgDrawing(p) as unknown as JsonValue;
    else if (p.type === "table") values[p.name] = exampleTable(p);
    else if (p.type === "matching") values[p.name] = exampleMatching(p);
    else if (p.type === "true-false") values[p.name] = exampleTrueFalse(p);
    else if (p.type === "ordering") values[p.name] = exampleOrdering(p);
    else if (p.type === "expression") values[p.name] = exampleExpression(p);
    else if (p.type === "conditional-grading") values[p.name] = exampleConditional(p);
    else if (p.type === "essay") values[p.name] = p.modelAnswer || "An answer.";
    else values[p.name] = String(p.correct);
  }
  return values;
}

/** Full marks from the teacher for every hand-graded part. */
function fullManualGrades(parts: Part[]): ManualGrades {
  return Object.fromEntries(parts.filter(isManualPart).map((p) => [p.name, { score: 1 }]));
}

describe("question bank", () => {
  it.each(questions.map((q) => [q.id, q] as const))("%s: valid, deterministic and solvable for many seeds", (_id, q) => {
    for (let seed = 0; seed < 200; seed++) {
      const v = createVariant(q, seed);
      expect(createVariant(q, seed)).toEqual(v);
      expect(v.text.length).toBeGreaterThan(0);
      expect(gradeQuestion(v.parts, perfectAnswers(v.parts), fullManualGrades(v.parts)).score).toBe(1);
    }
  });

  it("different seeds produce different variants", () => {
    for (const q of questions) {
      const texts = new Set(Array.from({ length: 30 }, (_, s) => JSON.stringify(createVariant(q, s))));
      expect(texts.size).toBeGreaterThan(1);
    }
  });

  it("the types-of-goods question shows 4 options", () => {
    const v = createVariant(getQuestion("types-of-goods")!, 1);
    const p = v.parts[0];
    expect(p.type === "multiple-choice" && p.options.length).toBe(4);
  });

  it("the market-equilibrium question covers every price-control outcome", () => {
    const answers = new Set<string>();
    for (let seed = 0; seed < 200; seed++) {
      const p = createVariant(getQuestion("market-equilibrium-mixed")!, seed).parts[1];
      if (p.type !== "multiple-choice") throw new Error();
      answers.add(p.options.find((o) => o.correct)!.text.split(":")[0]);
    }
    expect(answers).toEqual(new Set(["A shortage", "A surplus", "No effect"]));
  });

  it("the comparative-advantage question gives the textbook answers for the worksheet's table", () => {
    const q = getQuestion("comparative-advantage-table")!;
    const parts = q.parts({ saOil: 100, saCorn: 25, usOil: 50, usCorn: 100 });
    const correct = Object.fromEntries(
      parts.map((p) => [p.name, p.type === "multiple-choice" ? p.options.find((o) => o.correct)!.text : p.type === "number" ? p.correct : null]),
    );
    expect(correct).toEqual({
      saOil: 0.25,
      saCorn: 4,
      usOil: 2,
      usCorn: 0.5,
      absOil: "Saudi Arabia",
      absCorn: "United States",
      compOil: "Saudi Arabia",
      compCorn: "United States",
    });
  });

  it("the gains-from-trade table gives the worksheet's answers", () => {
    const v = createVariant(getQuestion("gains-from-trade-table")!, 1);
    const p = v.parts[0];
    if (p.type !== "table") throw new Error();
    const answers = p.rows.map((r) => [r.label, r.cells?.map((c) => (typeof c === "object" && c !== null ? c.correct : c))]);
    expect(answers).toEqual([
      ["Without Trade", undefined],
      ["Production", [50, 12.5, 25, 50]],
      ["Consumption", [50, 12.5, 25, 50]],
      ["With Trade", undefined],
      ["Production", [100, 0, 0, 100]],
      ["Trade Action", [-45, 40, 45, -40]],
      ["Consumption", [55, 40, 45, 60]],
      ["Gains from Trade", undefined],
      ["Increase in Consumption", [5, 27.5, 20, 10]],
    ]);
  });
});

describe("course questions (exams/)", () => {
  it.each(courseQuestions.map((q) => [q.id, q] as const))("%s: valid and solvable", (_id, q) => {
    for (let seed = 0; seed < 20; seed++) {
      const v = createVariant(q, seed);
      expect(v.text.length).toBeGreaterThan(0);
      expect(gradeQuestion(v.parts, perfectAnswers(v.parts), fullManualGrades(v.parts)).score).toBe(1);
    }
  });

  it("exam 2 question 26 carries the student's own saving forward", () => {
    const q = getQuestion("exam2-q26-goods-market-interest-rate")!;
    const gs = new Set<number>();
    for (let seed = 0; seed < 100; seed++) {
      const v = createVariant(q, seed);
      const G = (v.params as { G: number }).G;
      gs.add(G);
      const r = G / 100;
      const I = 1000 - 50 * r;
      expect(r).toBeGreaterThan(0);
      expect(I).toBeGreaterThan(0);
      const grade = (a: string, b: string, c: string) => gradeQuestion(v.parts, { steps: { a, b, c } }).score;
      expect(grade(`${1000 - G} + 50r`, String(r), String(I))).toBe(1);
      // Saving without G: S = 1,000 + 50r, so r* = 0% and I* = 1,000. Only (a) is wrong.
      expect(grade("1000 + 50r", "0", "1000")).toBeCloseTo(2 / 3);
      expect(grade("1000 + 50r", String(r), String(I))).toBeCloseTo(2 / 3);
      expect(grade("1000 + 50r", "77", "8")).toBe(0);
    }
    expect([...gs].sort((x, y) => x - y)).toEqual([600, 800, 1000, 1200, 1400]);
  });

  it("micro exam 2 question 20 carries the student's own AVC, ATC and q* forward", () => {
    const v = createVariant(getQuestion("micro-exam2-q20-cost-curves-profit")!, 0);
    const grade = (steps: Record<string, string>) => gradeQuestion(v.parts, { steps }).score;
    // P = 32: q* = sqrt(9) = 3, profit = 32 * 3 - (27 + 15 + 2000) = -1,946.
    const right = { a: "q^2 + 5", b: "q^2 + 5 + 2000/q", c: "0", minAvc: "5", d: "3", profit: "-1946" };
    expect(grade(right)).toBe(1);
    // The old price P = 13 (q* ~ 1.63) is wrong now.
    expect(grade({ ...right, d: "1.63", profit: "-1991.29" })).toBeLessThan(1);
    // ATC without the fixed cost: only (b) is wrong, profit (32 - (q^2 + 5)) q = 54 follows from it.
    expect(grade({ ...right, b: "q^2 + 5", profit: "54" })).toBeCloseTo(5 / 6);
    // A wrong q* in (d): profit is graded at the student's q.
    expect(grade({ ...right, d: "2", profit: String((32 - (4 + 5 + 1000)) * 2) })).toBeCloseTo(5 / 6);
    expect(grade({ ...right, minAvc: "6" })).toBeCloseTo(5 / 6);
  });

  it("micro exam 2 question 18: the free-hand drawing and the essay wait for the teacher's grade", () => {
    const v = createVariant(getQuestion("micro-exam2-q18-optimal-output-mc-avc")!, 0);
    expect(v.parts.every(isManualPart)).toBe(true);
    const curve = [{ tool: "curve", points: [[1, 9], [4, 4], [8, 6], [11, 14]], color: "#000" }];
    const values = { diagram: curve, why: "MC is rising at q2." };
    const pending = gradeQuestion(v.parts, values);
    expect(pending.results.diagram).toMatchObject({ score: 0, pending: true });
    expect(pending.results.why.pending).toBe(true);
    // Weights 2 (drawing) and 1 (essay).
    expect(gradeQuestion(v.parts, values, { diagram: { score: 1 }, why: { score: 0.5 } }).score).toBeCloseTo(5 / 6);
    // An empty board is still invalid (no attempt used).
    expect(gradeQuestion(v.parts, { diagram: [], why: "x" }).valid).toBe(false);
  });

  it("micro exam 2 question 19: MR, the profit rectangle and the DWL triangle", () => {
    const diagram = createVariant(getQuestion("micro-exam2-q19-monopoly-profit-dwl")!, 0).parts[0];
    const shape = (tool: string, ...points: number[][]) => ({ tool, points, color: "#000" });
    const mr = shape("segment", [0, 121], [59, 2]);
    const profit = shape("rectangle", [40, 80], [0, 40]); // dragged from the top-right corner
    const dwl = shape("triangle", [80, 40], [40, 80], [40, 40]);
    const label = { tool: "text", points: [[10, 60]], text: "Profit", color: "#000" };
    const grade = (...drawings: object[]) => gradeQuestion([diagram], { diagram: drawings as JsonValue }).score;
    expect(grade(mr, profit, dwl, label)).toBe(1);
    // Common mistakes: MR drawn parallel to demand; profit up to the competitive output; DWL
    // between demand and MR instead of demand and MC.
    expect(grade(shape("segment", [0, 120], [120, 0]), profit, dwl)).toBeCloseTo(2 / 3);
    expect(grade(mr, shape("rectangle", [0, 40], [80, 80]), dwl)).toBeCloseTo(2 / 3);
    expect(grade(mr, profit, shape("triangle", [40, 80], [40, 40], [60, 0]))).toBeCloseTo(2 / 3);
  });
});

describe("assessments", () => {
  it("reference only existing questions", () => {
    for (const a of assessments) {
      for (const ref of a.questions) expect(getQuestion(ref.questionId), ref.questionId).toBeDefined();
    }
  });

  it("the demo assessment ex1 includes every demo question", () => {
    const inDemo = assessments.find((a) => a.id === "ex1")!.questions.map((q) => q.questionId);
    expect(new Set(inDemo)).toEqual(new Set(questions.map((q) => q.id)));
  });
});
