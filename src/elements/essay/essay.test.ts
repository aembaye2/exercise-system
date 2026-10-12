import { describe, expect, it } from "vitest";
import { AuthoringError } from "../../engine/types";
import { checkEssay, countChars, essayHelpText, countWords, formatEssayAnswer, formatEssayCorrect, gradeEssay, validateEssay } from "./gradeEssay";
import type { EssayPart } from "./types";

const part: EssayPart = {
  type: "essay",
  name: "essay",
  modelAnswer: "A price ceiling below equilibrium causes a **shortage**.",
  maxWords: 5,
  maxChars: 30,
  minWords: 2,
};

describe("essay element", () => {
  it("accepts a valid spec", () => {
    expect(() => checkEssay(part)).not.toThrow();
    expect(() => checkEssay({ type: "essay", name: "e", modelAnswer: "x" })).not.toThrow();
  });

  it("accepts a missing or empty model answer (nothing is revealed)", () => {
    expect(() => checkEssay({ type: "essay", name: "e" })).not.toThrow();
    expect(() => checkEssay({ ...part, modelAnswer: "" })).not.toThrow();
    expect(formatEssayCorrect({ type: "essay", name: "e" })).toBe("");
    expect(formatEssayCorrect({ ...part, modelAnswer: "  " })).toBe("");
  });

  it.each<[string, Partial<EssayPart>]>([
    ["a non-string model answer", { modelAnswer: 5 as unknown as string }],
    ["a non-integer word limit", { maxWords: 2.5 }],
    ["a zero character limit", { maxChars: 0 }],
    ["minWords above maxWords", { minWords: 9 }],
  ])("rejects %s", (_name, override) => {
    expect(() => checkEssay({ ...part, ...override })).toThrow(AuthoringError);
  });

  it("counts words and characters, ignoring surrounding whitespace", () => {
    expect(countWords("  one two\n\nthree  ")).toBe(3);
    expect(countWords("   ")).toBe(0);
    expect(countChars("  ab c  ")).toBe(4);
  });

  it("treats empty, too long and too short answers as invalid (no attempt used)", () => {
    expect(validateEssay(part, undefined).valid).toBe(false);
    expect(validateEssay(part, "   ").valid).toBe(false);
    expect(validateEssay(part, "one two three four five six")).toEqual({ valid: false, message: expect.stringMatching(/6 words \(limit 5\)/) });
    expect(validateEssay(part, "abcdefghijklmnop qrstuvwxyz0123456789")).toEqual({
      valid: false,
      message: expect.stringMatching(/characters \(limit 30\)/),
    });
    expect(validateEssay(part, "one")).toEqual({ valid: false, message: expect.stringMatching(/at least 2/) });
    expect(validateEssay(part, "a shortage $x^2$")).toEqual({ valid: true });
  });

  it("grades as pending until the teacher grades it", () => {
    expect(gradeEssay(part)).toEqual({ score: 0, pending: true, feedback: expect.stringMatching(/model answer below/) });
    expect(gradeEssay({ type: "essay", name: "e" }).feedback).not.toMatch(/model answer/);
  });

  it("mentions the equation button only when it is shown", () => {
    expect(essayHelpText(part)).toMatch(/Insert equation/);
    expect(essayHelpText({ ...part, equationEditor: false })).not.toMatch(/Insert equation/);
    expect(essayHelpText({ ...part, equationEditor: false })).toMatch(/^Type math between dollar signs/);
  });

  it("summarizes the answer by word count and reveals the model answer", () => {
    expect(formatEssayAnswer(part, "one two three")).toBe("_essay, 3 words_");
    expect(formatEssayAnswer(part, "")).toBe("_(no answer)_");
    expect(formatEssayCorrect(part)).toBe(part.modelAnswer);
  });
});
