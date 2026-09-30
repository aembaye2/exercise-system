import { describe, expect, it } from "vitest";
import { createRng } from "../../engine/rng";
import { AuthoringError } from "../../engine/types";
import {
  arrangementOf,
  defaultOrder,
  exampleMatching,
  formatMatchingAnswer,
  gradeMatching,
  validateMatching,
} from "./gradeMatching";
import { checkMatching, prepareMatching } from "./prepareMatching";
import type { MatchingPart } from "./types";

const part: MatchingPart = {
  type: "matching",
  name: "m",
  pairs: [
    { left: "Scarcity", right: "Unlimited wants, limited resources" },
    { left: "Opportunity cost", right: "Value of the next best alternative given up" },
    { left: "Equilibrium price", right: "Quantity supplied equals quantity demanded" },
    { left: "Elastic demand", right: "Quantity responds a lot to price" },
  ],
};

describe("matching element", () => {
  it("accepts a valid spec", () => {
    expect(() => checkMatching(part)).not.toThrow();
  });

  it.each<[string, Partial<MatchingPart>]>([
    ["fewer than two pairs", { pairs: [part.pairs[0]] }],
    ["a pair with empty text", { pairs: [{ left: "", right: "x" }, part.pairs[1]] }],
    ["an unknown grading mode", { grading: "weighted" as never }],
    ["a rightOrder that isn't a permutation", { rightOrder: [0, 1, 2] }],
  ])("rejects %s", (_name, override) => {
    expect(() => checkMatching({ ...part, ...override })).toThrow(AuthoringError);
  });

  it("shuffles the right column deterministically from the seed, leaving pairs untouched", () => {
    const rng = createRng(42);
    const prepared = prepareMatching(part, rng);
    expect(prepared.rightOrder).toHaveLength(part.pairs.length);
    expect([...prepared.rightOrder!].sort()).toEqual([0, 1, 2, 3]);
    expect(prepared.pairs).toEqual(part.pairs);
    // Same seed -> same shuffle.
    expect(prepareMatching(part, createRng(42)).rightOrder).toEqual(prepared.rightOrder);
  });

  it("defaults the arrangement to rightOrder, or identity order if never prepared", () => {
    expect(defaultOrder(part)).toEqual([0, 1, 2, 3]);
    const prepared = prepareMatching(part, createRng(1));
    expect(defaultOrder(prepared)).toEqual(prepared.rightOrder);
  });

  it("treats an untouched or malformed value as the default arrangement, but is never invalid", () => {
    expect(validateMatching(part, undefined)).toEqual({ valid: true });
    expect(validateMatching(part, [0, 1, 2, 3])).toEqual({ valid: true });
    expect(validateMatching(part, [0, 1, 2])).toEqual({ valid: false, message: expect.any(String) });
    expect(validateMatching(part, [0, 1, 1, 3])).toEqual({ valid: false, message: expect.any(String) });
    expect(arrangementOf(part, [0, 1, 2])).toEqual(defaultOrder(part));
  });

  it("grades a fully correct arrangement (identity order)", () => {
    expect(gradeMatching(part, exampleMatching(part))).toEqual({ score: 1 });
  });

  it("gives partial credit and names the wrong rows without revealing the correct match", () => {
    // Row 0 and 2 correct; rows 1 and 3 swapped.
    const r = gradeMatching(part, [0, 3, 2, 1]);
    expect(r.score).toBe(0.5);
    expect(r.feedback).toBe("2 of 4 correct. Check items 2, 4.");
    expect(r.feedback).not.toMatch(/Elastic demand/);
  });

  it("supports all-or-nothing grading", () => {
    expect(gradeMatching({ ...part, grading: "all-or-nothing" }, [0, 3, 2, 1]).score).toBe(0);
    expect(gradeMatching({ ...part, grading: "all-or-nothing" }, [0, 1, 2, 3]).score).toBe(1);
  });

  it("grades an untouched submission against the shuffled starting arrangement", () => {
    const prepared = prepareMatching(part, createRng(7));
    expect(gradeMatching(prepared, undefined)).toEqual(gradeMatching(prepared, prepared.rightOrder));
  });

  it("formats the student's current matches for review", () => {
    expect(formatMatchingAnswer(part, [1, 0, 2, 3])).toBe(
      "1 – Value of the next best alternative given up; 2 – Unlimited wants, limited resources; " +
        "3 – Quantity supplied equals quantity demanded; 4 – Quantity responds a lot to price",
    );
  });
});
