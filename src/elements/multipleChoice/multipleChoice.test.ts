import { describe, expect, it } from "vitest";
import { createRng } from "../../engine/rng";
import { gradeQuestion } from "../../engine/gradeQuestion";
import { createVariant } from "../../engine/variant";
import type { Question } from "../../engine/types";
import { checkMultipleChoice, prepareMultipleChoice } from "./prepareMultipleChoice";
import { gradeMultipleChoice, validateMultipleChoice } from "./gradeMultipleChoice";
import { toPlainText } from "./MultipleChoiceInput";
import type { MultipleChoicePart } from "./types";

const pool: MultipleChoicePart = {
  type: "multiple-choice",
  name: "mc",
  options: [
    { text: "right", correct: true, feedback: "Nice!" },
    { text: "d1", feedback: "Not quite." },
    { text: "d2" },
    { text: "d3" },
    { text: "d4" },
    { text: "d5" },
    { text: "d6" },
  ],
};

describe("checkMultipleChoice", () => {
  it("requires exactly one correct option", () => {
    expect(() => checkMultipleChoice({ ...pool, options: [{ text: "a" }, { text: "b" }] })).toThrow(/exactly one/);
    expect(() =>
      checkMultipleChoice({ ...pool, options: [{ text: "a", correct: true }, { text: "b", correct: true }] }),
    ).toThrow(/exactly one correct option \(found 2\)/);
  });

  it("rejects duplicate option texts", () => {
    expect(() => checkMultipleChoice({ ...pool, options: [{ text: "a", correct: true }, { text: "a" }] })).toThrow(
      /duplicate/,
    );
  });

  it("rejects an out-of-range numberAnswers", () => {
    expect(() => checkMultipleChoice({ ...pool, numberAnswers: 0 })).toThrow(/numberAnswers/);
    expect(() => checkMultipleChoice({ ...pool, numberAnswers: 8 })).toThrow(/numberAnswers/);
    expect(() => checkMultipleChoice({ ...pool, numberAnswers: 2.5 })).toThrow(/numberAnswers/);
  });
});

describe("prepareMultipleChoice", () => {
  it("subsample always includes the correct answer", () => {
    for (let seed = 0; seed < 300; seed++) {
      const p = prepareMultipleChoice({ ...pool, numberAnswers: 4 }, createRng(seed));
      expect(p.options).toHaveLength(4);
      expect(p.options.filter((o) => o.correct)).toHaveLength(1);
      expect(p.options.find((o) => o.correct)?.text).toBe("right");
      expect(new Set(p.options.map((o) => o.text)).size).toBe(4);
      expect(p.numberAnswers).toBeUndefined();
    }
  });

  it("is deterministic for the same seed", () => {
    const a = prepareMultipleChoice({ ...pool, numberAnswers: 4 }, createRng(1234));
    const b = prepareMultipleChoice({ ...pool, numberAnswers: 4 }, createRng(1234));
    expect(a).toEqual(b);
  });

  it("shuffles across seeds and every option eventually appears in every slot", () => {
    const firstTexts = new Set<string>();
    for (let seed = 0; seed < 200; seed++) {
      firstTexts.add(prepareMultipleChoice(pool, createRng(seed)).options[0].text);
    }
    expect(firstTexts.size).toBe(pool.options.length);
  });

  it("keeps authored order when order is fixed", () => {
    const p = prepareMultipleChoice({ ...pool, order: "fixed" }, createRng(9));
    expect(p.options.map((o) => o.text)).toEqual(pool.options.map((o) => o.text));
    const sub = prepareMultipleChoice({ ...pool, order: "fixed", numberAnswers: 3 }, createRng(9));
    const idx = sub.options.map((o) => pool.options.findIndex((x) => x.text === o.text));
    expect(idx).toEqual([...idx].sort((a, b) => a - b));
  });

  it("does not mutate the authored part", () => {
    const copy = structuredClone(pool);
    prepareMultipleChoice({ ...pool, numberAnswers: 3 }, createRng(5));
    expect(pool).toEqual(copy);
  });
});

describe("grading", () => {
  const prepared = prepareMultipleChoice(pool, createRng(77));
  const correctIndex = prepared.options.findIndex((o) => o.correct);
  const wrongIndex = prepared.options.findIndex((o) => o.text === "d1");

  it("validates that an option is selected", () => {
    expect(validateMultipleChoice(prepared, undefined)).toEqual({ valid: false, message: "Please select an option" });
    expect(validateMultipleChoice(prepared, null).valid).toBe(false);
    expect(validateMultipleChoice(prepared, "0").valid).toBe(false);
    expect(validateMultipleChoice(prepared, -1).valid).toBe(false);
    expect(validateMultipleChoice(prepared, prepared.options.length).valid).toBe(false);
    expect(validateMultipleChoice(prepared, 0).valid).toBe(true);
  });

  it("scores 1 for the correct option with its feedback", () => {
    expect(gradeMultipleChoice(prepared, correctIndex)).toEqual({ score: 1, feedback: "Nice!" });
  });

  it("scores 0 for a distractor with its feedback", () => {
    expect(gradeMultipleChoice(prepared, wrongIndex)).toEqual({ score: 0, feedback: "Not quite." });
    const plain = prepared.options.findIndex((o) => o.text === "d2");
    expect(gradeMultipleChoice(prepared, plain)).toEqual({ score: 0 });
  });
});

describe("through the engine", () => {
  const q: Question<{ k: number }> = {
    id: "mc-q",
    title: "MC",
    generate: (rng) => ({ k: rng.int(1, 5) }),
    render: ({ k }) => `k = ${k}`,
    parts: () => [{ ...pool, numberAnswers: 4 }],
  };

  it("same seed gives the same option order and correct answer", () => {
    const a = createVariant(q as Question<unknown>, 42);
    const b = createVariant(q as Question<unknown>, 42);
    expect(a.parts).toEqual(b.parts);
  });

  it("grades via gradeQuestion", () => {
    const v = createVariant(q as Question<unknown>, 42);
    const part = v.parts[0] as MultipleChoicePart;
    const ci = part.options.findIndex((o) => o.correct);
    expect(gradeQuestion(v.parts, {}).valid).toBe(false);
    expect(gradeQuestion(v.parts, { mc: ci }).score).toBe(1);
    expect(gradeQuestion(v.parts, { mc: (ci + 1) % 4 }).score).toBe(0);
  });
});

describe("toPlainText", () => {
  it("strips Markdown and math delimiters for dropdown options", () => {
    expect(toPlainText("$x^2$ and **bold**")).toBe("x^2 and bold");
  });
});
