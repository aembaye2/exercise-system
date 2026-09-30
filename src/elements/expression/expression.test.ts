import { describe, expect, it } from "vitest";
import { createRng } from "../../engine/rng";
import { AuthoringError } from "../../engine/types";
import { exampleExpression, formatExpressionAnswer, formatExpressionCorrect, gradeExpression, validateExpression } from "./gradeExpression";
import { checkExpression, prepareExpression, variablesOf } from "./prepareExpression";
import type { ExpressionPart } from "./types";

const part: ExpressionPart = {
  type: "expression",
  name: "poly",
  correct: "x^2 + 1/2 x + 1",
};

function prepared(seed = 1): ExpressionPart {
  return prepareExpression(part, createRng(seed));
}

describe("expression element", () => {
  it("accepts a valid spec and auto-detects its variable", () => {
    expect(() => checkExpression(part)).not.toThrow();
    expect(variablesOf(part)).toEqual(["x"]);
  });

  it.each<[string, Partial<ExpressionPart>]>([
    ["an empty correct expression", { correct: "" }],
    ["a correct expression that doesn't parse", { correct: "x +* 1" }],
    ["a correct expression with no variables", { correct: "1 + 2" }],
    ["a variable range with min >= max", { variables: { x: [5, 1] } }],
    ["a non-positive samples count", { samples: 0 }],
    ["a negative tolerance", { tolerance: -1 }],
  ])("rejects %s", (_name, override) => {
    expect(() => checkExpression({ ...part, ...override })).toThrow(AuthoringError);
  });

  it("shuffles test points deterministically from the seed, leaving the expression untouched", () => {
    const a = prepareExpression(part, createRng(42));
    expect(a.testPoints).toHaveLength(5);
    expect(a.testPoints![0]).toHaveProperty("x");
    expect(a.correct).toBe(part.correct);
    // Same seed -> same points.
    expect(prepareExpression(part, createRng(42)).testPoints).toEqual(a.testPoints);
  });

  it("requires a non-empty, parseable expression using only the declared variables", () => {
    expect(validateExpression(part, undefined)).toEqual({ valid: false, message: expect.any(String) });
    expect(validateExpression(part, "")).toEqual({ valid: false, message: expect.any(String) });
    expect(validateExpression(part, "x +* 1")).toEqual({ valid: false, message: expect.any(String) });
    expect(validateExpression(part, "x + y")).toEqual({ valid: false, message: expect.any(String) });
    expect(validateExpression(part, "x^2 + 1/2 x + 1")).toEqual({ valid: true });
  });

  it("grades the exact authored form as correct", () => {
    expect(gradeExpression(prepared(), exampleExpression(part))).toEqual({ score: 1 });
  });

  it("grades an algebraically equivalent but textually different form as correct", () => {
    const p = prepared(7);
    expect(gradeExpression(p, "x^2 + .5 x + 1").score).toBe(1);
    expect(gradeExpression(p, "x^2 + 0.5x + 1").score).toBe(1);
    expect(gradeExpression(p, "1 + x^2 + x/2").score).toBe(1);
  });

  it("grades a non-equivalent expression as wrong, without revealing the expected form", () => {
    const p = prepared(7);
    const r = gradeExpression(p, "x^2 + 1/3 x + 1");
    expect(r.score).toBe(0);
    expect(r.feedback).not.toMatch(/1\/2|0\.5/);
  });

  it("formats the student's expression and the correct one as typeset Markdown math", () => {
    expect(formatExpressionAnswer(part, "x^2 + .5 x + 1")).toMatch(/^\$.*\$$/);
    expect(formatExpressionAnswer(part, undefined)).toBe("_(no answer)_");
    expect(formatExpressionCorrect(part)).toMatch(/^\$.*\$$/);
  });
});
