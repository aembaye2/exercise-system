import { beforeAll, describe, expect, it } from "vitest";
import { gradeQuestion, weightedScore } from "./gradeQuestion";
import { registerElement } from "./registry";
import { checkParts, createVariant } from "./variant";
import { AuthoringError, type AnyQuestion, type JsonValue, type Part, type Rng } from "./types";

// A minimal test-only element: the answer is a string that must equal `correct`.
interface EchoPart {
  type: "test-echo";
  name: string;
  weight?: number;
  correct: string;
}

const echo = {
  type: "test-echo",
  check(part: EchoPart) {
    if (!part.correct) throw new AuthoringError("missing correct");
  },
  prepare(part: EchoPart, rng: Rng) {
    return { ...part, correct: part.correct, shuffled: rng.shuffle([1, 2, 3]) } as EchoPart;
  },
  validate(_part: EchoPart, value: JsonValue | undefined) {
    return typeof value === "string" && value.length > 0
      ? { valid: true }
      : { valid: false, message: "Enter something" };
  },
  grade(part: EchoPart, value: JsonValue | undefined) {
    return { score: value === part.correct ? 1 : 0 };
  },
  formatAnswer: (_p: EchoPart, v: JsonValue | undefined) => String(v),
  formatCorrectAnswer: (p: EchoPart) => p.correct,
  Input: () => null,
};

// EchoPart isn't part of the app's PartTypeMap, so the test casts at the boundary.
const parts = (defs: EchoPart[]) => defs as unknown as Part[];

beforeAll(() => {
  registerElement(echo as never);
});

describe("gradeQuestion", () => {
  const ps = parts([
    { type: "test-echo", name: "a", correct: "x", weight: 3 },
    { type: "test-echo", name: "b", correct: "y", weight: 1 },
  ]);

  it("does not grade when any part is invalid", () => {
    const g = gradeQuestion(ps, { a: "x" });
    expect(g.valid).toBe(false);
    expect(g.validation.b).toEqual({ valid: false, message: "Enter something" });
    expect(g.validation.a.valid).toBe(true);
    expect(g.results).toEqual({});
    expect(g.score).toBe(0);
  });

  it("computes a weighted average of part scores", () => {
    expect(gradeQuestion(ps, { a: "x", b: "y" }).score).toBe(1);
    expect(gradeQuestion(ps, { a: "x", b: "no" }).score).toBe(0.75);
    expect(gradeQuestion(ps, { a: "no", b: "y" }).score).toBe(0.25);
    expect(gradeQuestion(ps, { a: "no", b: "no" }).score).toBe(0);
  });

  it("weightedScore defaults weight to 1 and clamps scores", () => {
    const p2 = parts([
      { type: "test-echo", name: "a", correct: "x" },
      { type: "test-echo", name: "b", correct: "x" },
    ]);
    expect(weightedScore(p2, { a: { score: 2 }, b: { score: 0 } })).toBe(0.5);
  });
});

describe("checkParts / createVariant", () => {
  it("rejects duplicate part names and zero total weight", () => {
    expect(() =>
      checkParts("q", parts([
        { type: "test-echo", name: "a", correct: "x" },
        { type: "test-echo", name: "a", correct: "x" },
      ])),
    ).toThrow(/duplicate part name/);
    expect(() => checkParts("q", parts([{ type: "test-echo", name: "a", correct: "x", weight: 0 }]))).toThrow(
      /total part weight/,
    );
  });

  it("wraps element authoring errors with question and part", () => {
    expect(() => checkParts("q1", parts([{ type: "test-echo", name: "p", correct: "" }]))).toThrow(
      'Question "q1", part "p": missing correct',
    );
  });

  it("is deterministic for a given seed", () => {
    const q: AnyQuestion = {
      id: "q",
      title: "Q",
      generate: (rng) => ({ n: rng.int(1, 1000) }),
      render: (p) => `n = ${(p as { n: number }).n}`,
      parts: (p) => parts([{ type: "test-echo", name: "a", correct: String((p as { n: number }).n) }]),
    };
    const v1 = createVariant(q, 555);
    const v2 = createVariant(q, 555);
    expect(v1).toEqual(v2);
    const v3 = createVariant(q, 556);
    expect(v3.text).not.toBe(v1.text);
  });

  it("throws for unknown element types", () => {
    expect(() => checkParts("q", [{ type: "nope", name: "a" } as unknown as Part])).toThrow(/Unknown element type/);
  });
});
