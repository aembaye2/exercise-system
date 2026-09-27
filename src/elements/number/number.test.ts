import { describe, expect, it } from "vitest";
import {
  checkNumber,
  compareNumbers,
  formatCorrectNumber,
  gradeNumber,
  parseNumber,
  roundToDecimals,
  roundToSigFigs,
  validateNumber,
} from "./gradeNumber";
import type { NumberPart } from "./types";

const part = (over: Partial<NumberPart> = {}): NumberPart => ({ type: "number", name: "x", correct: 10, ...over });

describe("parseNumber", () => {
  it.each([
    ["3.2", 3.2],
    ["-0.5", -0.5],
    ["+7", 7],
    ["1e-3", 0.001],
    ["4.5E6", 4.5e6],
    ["  42  ", 42],
    [".5", 0.5],
    ["5.", 5],
    ["-2.5e+2", -250],
    ["0", 0],
    ["-0", -0],
  ])("accepts %j", (input, expected) => {
    const r = parseNumber(input);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value).toBe(expected);
  });

  it.each([
    [""],
    ["   "],
    ["NaN"],
    ["Infinity"],
    ["-Infinity"],
    ["1,000"],
    ["1,5"],
    ["2/3"],
    ["1+1"],
    ["e5"],
    ["1e"],
    ["."],
    ["0x10"],
    ["1_000"],
    ["3 4"],
    ["--3"],
    ["abc"],
    ["1e999"],
  ])("rejects %j", (input) => {
    expect(parseNumber(input).ok).toBe(false);
  });

  it("rejects non-string values", () => {
    expect(parseNumber(undefined).ok).toBe(false);
    expect(parseNumber(null).ok).toBe(false);
    expect(parseNumber(3).ok).toBe(false);
  });
});

describe("relabs", () => {
  it("accepts within rtol and rejects outside", () => {
    const p = part({ correct: 100, rtol: 0.01 });
    expect(compareNumbers(100.9, 100, p)).toBe(true);
    expect(compareNumbers(101, 100, p)).toBe(true);
    expect(compareNumbers(101.1, 100, p)).toBe(false);
    expect(compareNumbers(98.95, 100, p)).toBe(false);
  });

  it("handles negative values symmetrically", () => {
    const p = part({ correct: -50, rtol: 0.02 });
    expect(compareNumbers(-51, -50, p)).toBe(true);
    expect(compareNumbers(-49, -50, p)).toBe(true);
    expect(compareNumbers(-51.1, -50, p)).toBe(false);
    expect(compareNumbers(50, -50, p)).toBe(false);
  });

  it("uses atol near zero", () => {
    expect(compareNumbers(1e-9, 0, part({ correct: 0 }))).toBe(true);
    expect(compareNumbers(1e-7, 0, part({ correct: 0 }))).toBe(false);
    expect(compareNumbers(0.004, 0, part({ correct: 0, atol: 0.005 }))).toBe(true);
    expect(compareNumbers(-0.004, 0, part({ correct: 0, atol: 0.005 }))).toBe(true);
    expect(compareNumbers(0.006, 0, part({ correct: 0, atol: 0.005 }))).toBe(false);
  });

  it("uses defaults rtol=1e-2 atol=1e-8", () => {
    expect(compareNumbers(10.1, 10, part())).toBe(true);
    expect(compareNumbers(10.11, 10, part())).toBe(false);
  });
});

describe("sigfig", () => {
  it("rounds to significant figures", () => {
    expect(roundToSigFigs(123456, 3)).toBe(123000);
    expect(roundToSigFigs(0.00123456, 2)).toBe(0.0012);
    expect(roundToSigFigs(-9.876, 2)).toBe(-9.9);
    expect(roundToSigFigs(0, 3)).toBe(0);
  });

  it("compares after rounding both values", () => {
    const p = part({ correct: 3.14159, comparison: "sigfig", digits: 3 });
    expect(compareNumbers(3.14, 3.14159, p)).toBe(true);
    expect(compareNumbers(3.141, 3.14159, p)).toBe(true);
    expect(compareNumbers(3.15, 3.14159, p)).toBe(false);
    expect(compareNumbers(3.1, 3.14159, p)).toBe(false);
  });

  it("handles negative values and values near zero", () => {
    const neg = part({ correct: -0.0045678, comparison: "sigfig", digits: 2 });
    expect(compareNumbers(-0.0046, -0.0045678, neg)).toBe(true);
    expect(compareNumbers(-0.0045, -0.0045678, neg)).toBe(false);
    expect(compareNumbers(0.0046, -0.0045678, neg)).toBe(false);
    const tiny = part({ correct: 1.234e-12, comparison: "sigfig", digits: 3 });
    expect(compareNumbers(1.23e-12, 1.234e-12, tiny)).toBe(true);
    expect(compareNumbers(0, 1.234e-12, tiny)).toBe(false);
    const zero = part({ correct: 0, comparison: "sigfig", digits: 2 });
    expect(compareNumbers(0, 0, zero)).toBe(true);
    expect(compareNumbers(-0, 0, zero)).toBe(true);
  });

  it("handles large numbers", () => {
    const p = part({ correct: 6.02214e23, comparison: "sigfig", digits: 3 });
    expect(compareNumbers(6.02e23, 6.02214e23, p)).toBe(true);
    expect(compareNumbers(6.03e23, 6.02214e23, p)).toBe(false);
  });
});

describe("decdig", () => {
  it("rounds to decimal places", () => {
    expect(roundToDecimals(2.71828, 2)).toBe(2.72);
    expect(roundToDecimals(-2.71828, 1)).toBe(-2.7);
    expect(roundToDecimals(5.5, 0)).toBe(6);
  });

  it("compares after rounding both values", () => {
    const p = part({ correct: 2.71828, comparison: "decdig", digits: 2 });
    expect(compareNumbers(2.72, 2.71828, p)).toBe(true);
    expect(compareNumbers(2.718, 2.71828, p)).toBe(true);
    expect(compareNumbers(2.71, 2.71828, p)).toBe(false);
  });

  it("handles negative values and values near zero", () => {
    const neg = part({ correct: -1.2345, comparison: "decdig", digits: 2 });
    expect(compareNumbers(-1.23, -1.2345, neg)).toBe(true);
    expect(compareNumbers(1.23, -1.2345, neg)).toBe(false);
    const nearZero = part({ correct: 0.004, comparison: "decdig", digits: 2 });
    expect(compareNumbers(0, 0.004, nearZero)).toBe(true);
    expect(compareNumbers(-0.001, 0.004, nearZero)).toBe(true);
    expect(compareNumbers(0.01, 0.004, nearZero)).toBe(false);
  });
});

describe("validate / grade", () => {
  it("validation messages for bad input", () => {
    expect(validateNumber(part(), "")).toEqual({ valid: false, message: "Please enter a number" });
    expect(validateNumber(part(), "2/3").valid).toBe(false);
    expect(validateNumber(part(), "10").valid).toBe(true);
  });

  it("grades without revealing the correct value", () => {
    expect(gradeNumber(part({ correct: 12.5 }), "12.5")).toEqual({ score: 1 });
    const wrong = gradeNumber(part({ correct: 12.5 }), "3");
    expect(wrong.score).toBe(0);
    expect(wrong.feedback ?? "").not.toContain("12.5");
  });
});

describe("checkNumber", () => {
  it("rejects bad authoring", () => {
    expect(() => checkNumber(part({ correct: NaN }))).toThrow(/finite/);
    expect(() => checkNumber(part({ rtol: -1 }))).toThrow(/rtol/);
    expect(() => checkNumber(part({ comparison: "sigfig", digits: 0 }))).toThrow(/digits/);
    expect(() => checkNumber(part({ comparison: "decdig", digits: 0 }))).not.toThrow();
  });
});

describe("formatCorrectNumber", () => {
  it("formats per comparison mode", () => {
    expect(formatCorrectNumber(part({ correct: 0.1 + 0.2 }))).toBe("0.3");
    expect(formatCorrectNumber(part({ correct: 3.14159, comparison: "sigfig", digits: 3 }))).toBe("3.14");
    expect(formatCorrectNumber(part({ correct: 2.5, comparison: "decdig", digits: 2 }))).toBe("2.50");
  });
});
