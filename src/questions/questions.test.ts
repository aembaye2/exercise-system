import { describe, expect, it } from "vitest";
import { snapPoint } from "../elements/svgdrawing/editing";
import { exampleDrawing } from "../elements/svgdrawing/gradeDrawing";
import type { DrawnObject } from "../elements/svgdrawing/types";
import { exampleJsxGraph } from "../elements/jsxgraph/gradeJsxGraph";
import { exampleTable } from "../elements/table/gradeTable";
import { gradeQuestion } from "../engine/gradeQuestion";
import type { AnswerValues, JsonValue, Part } from "../engine/types";
import { createVariant } from "../engine/variant";
import { assessments } from "../assessments";
import { getQuestion, questions } from ".";

/** Build the answer a perfect student would type for each part. */
function perfectAnswers(parts: Part[]): AnswerValues {
  const values: AnswerValues = {};
  for (const p of parts) {
    if (p.type === "multiple-choice") values[p.name] = p.options.findIndex((o) => o.correct);
    else if (p.type === "svgdrawing") values[p.name] = exampleDrawing(p) as unknown as JsonValue;
    else if (p.type === "jsxgraph") values[p.name] = exampleJsxGraph(p) as unknown as JsonValue;
    else if (p.type === "table") values[p.name] = exampleTable(p);
    else values[p.name] = String(p.correct);
  }
  return values;
}

describe("question bank", () => {
  it.each(questions.map((q) => [q.id, q] as const))("%s: valid, deterministic and solvable for many seeds", (_id, q) => {
    for (let seed = 0; seed < 200; seed++) {
      const v = createVariant(q, seed);
      expect(createVariant(q, seed)).toEqual(v);
      expect(v.text.length).toBeGreaterThan(0);
      expect(gradeQuestion(v.parts, perfectAnswers(v.parts)).score).toBe(1);
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

  it("the sig-fig question accepts a 3 s.f. answer", () => {
    const v = createVariant(getQuestion("present-value-sigfig")!, 7);
    const p = v.parts[0];
    if (p.type !== "number") throw new Error();
    const answer = p.correct.toPrecision(3);
    expect(gradeQuestion(v.parts, { PV: answer }).score).toBe(1);
    expect(gradeQuestion(v.parts, { PV: (p.correct * 1.02).toPrecision(3) }).score).toBe(0);
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

describe("drawing questions", () => {
  // Students can only place points on the snap grid (lines are moved by whole
  // snap steps from a copy, so they stay exact). The correct drawing, snapped,
  // must still earn full marks, or the tolerances are too tight to reach.
  const snapped = (part: Extract<Part, { type: "svgdrawing" }>, obj: DrawnObject): DrawnObject => {
    switch (obj.type) {
      case "point": {
        const [x, y] = snapPoint(part, [obj.x, obj.y]);
        return { ...obj, x, y };
      }
      case "polygon":
      case "curve":
        return { ...obj, points: obj.points.map((p) => snapPoint(part, p)) };
      case "line":
        return obj;
    }
  };

  it.each(questions.map((q) => [q.id, q] as const))("%s: a grid-snapped correct drawing still scores 100%%", (_id, q) => {
    for (let seed = 0; seed < 200; seed++) {
      for (const p of createVariant(q, seed).parts) {
        if (p.type !== "svgdrawing") continue;
        const value = exampleDrawing(p).map((o) => snapped(p, o)) as unknown as JsonValue;
        expect(gradeQuestion([p], { [p.name]: value }).score, `seed ${seed}`).toBe(1);
      }
    }
  });
});

describe("assessments", () => {
  it("reference only existing questions", () => {
    for (const a of assessments) {
      for (const ref of a.questions) expect(getQuestion(ref.questionId), ref.questionId).toBeDefined();
    }
  });

  it("the exercises together include every question; the first exam has 3", () => {
    const inExercise = assessments.filter((a) => a.mode === "exercise").flatMap((a) => a.questions.map((q) => q.questionId));
    expect(new Set(inExercise)).toEqual(new Set(questions.map((q) => q.id)));
    expect(assessments.find((a) => a.mode === "exam")!.questions).toHaveLength(3);
  });
});
