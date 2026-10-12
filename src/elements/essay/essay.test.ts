import { describe, expect, it } from "vitest";
import { AuthoringError } from "../../engine/types";
import { checkEssay, countChars, countWords, formatEssayAnswer, formatEssayCorrect, gradeEssay, validateEssay } from "./gradeEssay";
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

  it.each<[string, Partial<EssayPart>]>([
    ["an empty model answer", { modelAnswer: " " }],
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
    expect(gradeEssay()).toEqual({ score: 0, pending: true, feedback: expect.any(String) });
  });

  it("summarizes the answer by word count and reveals the model answer", () => {
    expect(formatEssayAnswer(part, "one two three")).toBe("_essay, 3 words_");
    expect(formatEssayAnswer(part, "")).toBe("_(no answer)_");
    expect(formatEssayCorrect(part)).toBe(part.modelAnswer);
  });
});
