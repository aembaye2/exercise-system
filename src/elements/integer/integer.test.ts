import { describe, expect, it } from "vitest";
import { checkInteger, gradeInteger, parseInteger, validateInteger } from "./gradeInteger";
import type { IntegerPart } from "./types";

const part = (correct: number): IntegerPart => ({ type: "integer", name: "n", correct });

describe("parseInteger", () => {
  it.each(["42", "-7", "+3", "0", "  12 ", "007", "123456789012345678901234567890"])("accepts %j", (s) => {
    expect(parseInteger(s).ok).toBe(true);
  });

  it.each(["", " ", "3.0", "1e2", "1.5", "0x1F", "1,000", "- 3", "3-", "abc", "NaN", "Infinity", "2/3"])(
    "rejects %j",
    (s) => {
      expect(parseInteger(s).ok).toBe(false);
    },
  );

  it("rejects non-strings", () => {
    expect(parseInteger(undefined).ok).toBe(false);
    expect(parseInteger(5).ok).toBe(false);
  });
});

describe("grading", () => {
  it("is exact equality", () => {
    expect(gradeInteger(part(7), "7").score).toBe(1);
    expect(gradeInteger(part(7), "+7").score).toBe(1);
    expect(gradeInteger(part(7), "007").score).toBe(1);
    expect(gradeInteger(part(-3), "-3").score).toBe(1);
    expect(gradeInteger(part(0), "-0").score).toBe(1);
    expect(gradeInteger(part(7), "8").score).toBe(0);
    expect(gradeInteger(part(7), "-7").score).toBe(0);
  });

  it("does not lose precision on huge inputs", () => {
    expect(gradeInteger(part(9007199254740991), "9007199254740992").score).toBe(0);
    expect(gradeInteger(part(9007199254740991), "9007199254740991").score).toBe(1);
  });

  it("invalid format fails validation", () => {
    expect(validateInteger(part(3), "3.0")).toMatchObject({ valid: false });
    expect(validateInteger(part(3), "")).toEqual({ valid: false, message: "Please enter an integer" });
  });
});

describe("checkInteger", () => {
  it("requires an integer correct answer", () => {
    expect(() => checkInteger(part(2.5))).toThrow(/integer/);
    expect(() => checkInteger(part(NaN))).toThrow();
    expect(() => checkInteger(part(4))).not.toThrow();
  });
});
