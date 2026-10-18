import { describe, expect, it } from "vitest";
import { gradeQuestion } from "../../engine/gradeQuestion";
import { createRng } from "../../engine/rng";
import { AuthoringError } from "../../engine/types";
import "../index";
import {
  checkConditional,
  exampleConditional,
  formatConditionalAnswer,
  formatConditionalCorrect,
  gradeConditional,
  gradeSteps,
  prepareConditional,
  validateConditional,
} from "./gradeConditional";
import type { ConditionalGradingPart } from "./types";

// f(x) = -1/2 x^2 + 2x + 1: f'(x) = -x + 2, maximum at x = 2, f(2) = 3.
const spec: ConditionalGradingPart = {
  type: "conditional-grading",
  name: "steps",
  steps: [
    { name: "a", kind: "expression", correct: "-x + 2" },
    { name: "b", kind: "number", correct: "-a(0) / (a(1) - a(0))" },
    { name: "c", kind: "number", correct: "-1/2 * b^2 + 2 * b + 1" },
  ],
};
const part = prepareConditional(spec, createRng(1));

describe("conditional-grading element", () => {
  it("accepts a valid spec and samples test points for the expression step", () => {
    expect(() => checkConditional(spec)).not.toThrow();
    expect(part.testPoints).toHaveLength(5);
    expect(part.testPoints![0]).toHaveProperty("x");
    expect(prepareConditional(spec, createRng(1))).toEqual(part);
  });

  it.each<[string, Partial<ConditionalGradingPart>]>([
    ["no steps", { steps: [] }],
    ["a formula using a later step", { steps: [{ name: "a", kind: "number", correct: "b + 1" }, { name: "b", kind: "number", correct: "2" }] }],
    ["a duplicate step name", { steps: [{ name: "a", kind: "number", correct: "1" }, { name: "a", kind: "number", correct: "2" }] }],
    ["a step named like a mathjs constant", { steps: [{ name: "e", kind: "number", correct: "1" }] }],
    ["a number step called like a function", { steps: [{ name: "a", kind: "number", correct: "1" }, { name: "b", kind: "number", correct: "a(1)" }] }],
    ["an expression step without a variable", { steps: [{ name: "a", kind: "expression", correct: "3" }] }],
    ["carryForwardCredit above 1", { carryForwardCredit: 2 }],
  ])("rejects %s", (_name, override) => {
    expect(() => checkConditional({ ...spec, ...override })).toThrow(AuthoringError);
  });

  it("needs every step answered in a valid format", () => {
    expect(validateConditional(part, undefined).valid).toBe(false);
    expect(validateConditional(part, { a: "-x + 2", b: "2" })).toEqual({ valid: false, message: expect.stringMatching(/^c\)/) });
    expect(validateConditional(part, { a: "-x + y", b: "2", c: "3" }).valid).toBe(false);
    expect(validateConditional(part, { a: "-x + 2", b: "two", c: "3" }).valid).toBe(false);
    expect(validateConditional(part, { a: "2 - x", b: "2", c: "3" })).toEqual({ valid: true });
  });

  it("gives full marks for the correct chain, in any equivalent form", () => {
    expect(gradeConditional(part, exampleConditional(part)).score).toBe(1);
    expect(gradeConditional(part, { a: "2 - x", b: "2.0", c: "3" }).score).toBe(1);
  });

  it("carries an early error forward: later steps built on it still get credit", () => {
    // Wrong derivative (forgot the 2): -1/2 x + 2 is zero at x = 4, and f(4) = 1.
    const value = { a: "-.5x + 2", b: "4", c: "1" };
    expect(gradeSteps(part, value)).toEqual(["wrong", "carried-forward", "carried-forward"]);
    const r = gradeConditional(part, value);
    expect(r.score).toBeCloseTo(2 / 3);
    expect(r.feedback).toMatch(/follows from your earlier answers/);
  });

  it("still accepts the right later answer after a wrong earlier one", () => {
    expect(gradeSteps(part, { a: "-.5x + 2", b: "2", c: "3" })).toEqual(["wrong", "correct", "correct"]);
  });

  it("gives no credit to a later step that's wrong either way", () => {
    expect(gradeSteps(part, { a: "-.5x + 2", b: "4", c: "7" })).toEqual(["wrong", "carried-forward", "wrong"]);
    expect(gradeSteps(part, { a: "-x + 2", b: "5", c: "9" })).toEqual(["correct", "wrong", "wrong"]);
    // f(5) = -1.5: right for the student's (wrong) q*.
    expect(gradeSteps(part, { a: "-x + 2", b: "5", c: "-1.5" })).toEqual(["correct", "wrong", "carried-forward"]);
  });

  it("handles an earlier answer that makes the formula undefined (a constant derivative)", () => {
    expect(gradeSteps(part, { a: "x - x + 3", b: "2", c: "1" })).toEqual(["wrong", "correct", "wrong"]);
  });

  it("scales carried-forward credit with carryForwardCredit and step weights", () => {
    const half = { ...part, carryForwardCredit: 0.5 };
    expect(gradeConditional(half, { a: "-.5x + 2", b: "4", c: "1" }).score).toBeCloseTo(1 / 3);
    const weighted: ConditionalGradingPart = { ...part, steps: part.steps.map((s, i) => ({ ...s, weight: i === 0 ? 2 : 1 })) };
    expect(gradeConditional(weighted, { a: "-.5x + 2", b: "4", c: "1" }).score).toBeCloseTo(2 / 4);
  });

  it("formats the student's answers and the correct ones", () => {
    expect(formatConditionalAnswer(part, { a: "-x + 2", b: "2" })).toMatch(/^a\) \$.*\$; b\) `2`; c\) _\(no answer\)_$/);
    expect(formatConditionalCorrect(part)).toMatch(/^a\) \$.*\$; b\) 2; c\) 3$/);
  });

  it("grades through gradeQuestion like any other part", () => {
    expect(gradeQuestion([part], { steps: { a: "-.5x + 2", b: "4", c: "1" } }).score).toBeCloseTo(2 / 3);
  });
});
