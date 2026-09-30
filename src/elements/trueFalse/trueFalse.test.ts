import { describe, expect, it } from "vitest";
import { AuthoringError } from "../../engine/types";
import {
  answersOf,
  checkTrueFalse,
  exampleTrueFalse,
  formatTrueFalseAnswer,
  gradeTrueFalse,
  validateTrueFalse,
} from "./gradeTrueFalse";
import type { TrueFalsePart } from "./types";

const part: TrueFalsePart = {
  type: "true-false",
  name: "tf",
  statements: [
    { text: "Some bacteria conduct photosynthesis and produce oxygen.", correct: true },
    { text: "Bacteria are always autotrophic.", correct: false },
    { text: "Some bacteria live symbiotically inside host organisms.", correct: true },
  ],
};

describe("true-false element", () => {
  it("accepts a valid spec", () => {
    expect(() => checkTrueFalse(part)).not.toThrow();
  });

  it.each<[string, Partial<TrueFalsePart>]>([
    ["no statements", { statements: [] }],
    ["a statement with empty text", { statements: [{ text: "", correct: true }] }],
    ["a statement with a non-boolean correct value", { statements: [{ text: "x", correct: "true" as never }] }],
    ["an unknown grading mode", { grading: "weighted" as never }],
  ])("rejects %s", (_name, override) => {
    expect(() => checkTrueFalse({ ...part, ...override })).toThrow(AuthoringError);
  });

  it("treats an untouched or malformed value as all unanswered", () => {
    expect(answersOf(part, undefined)).toEqual([null, null, null]);
    expect(answersOf(part, [true, false])).toEqual([null, null, null]);
    expect(answersOf(part, [true, false, "x" as never])).toEqual([true, false, null]);
  });

  it("requires every statement to be answered", () => {
    expect(validateTrueFalse(part, undefined)).toEqual({ valid: false, message: expect.any(String) });
    expect(validateTrueFalse(part, [true, false, null as never])).toEqual({ valid: false, message: expect.any(String) });
    expect(validateTrueFalse(part, [true, false, true])).toEqual({ valid: true });
  });

  it("grades a fully correct submission", () => {
    expect(gradeTrueFalse(part, exampleTrueFalse(part))).toEqual({ score: 1 });
  });

  it("gives partial credit and names the wrong statements without revealing the right answer", () => {
    const r = gradeTrueFalse(part, [true, true, true]); // statement 2 wrong
    expect(r.score).toBeCloseTo(2 / 3);
    expect(r.feedback).toBe("2 of 3 correct. Check statement 2.");
    expect(r.feedback).not.toMatch(/False/);
  });

  it("supports all-or-nothing grading", () => {
    expect(gradeTrueFalse({ ...part, grading: "all-or-nothing" }, [true, true, true]).score).toBe(0);
    expect(gradeTrueFalse({ ...part, grading: "all-or-nothing" }, [true, false, true]).score).toBe(1);
  });

  it("treats an unanswered submission as entirely wrong", () => {
    const r = gradeTrueFalse(part, undefined);
    expect(r.score).toBe(0);
    expect(r.feedback).toBe("0 of 3 correct. Check statements 1, 2, 3.");
  });

  it("formats the student's marks for review", () => {
    expect(formatTrueFalseAnswer(part, [true, false, true])).toBe("1. True; 2. False; 3. True");
    expect(formatTrueFalseAnswer(part, undefined)).toBe("_(no answer)_");
  });
});
