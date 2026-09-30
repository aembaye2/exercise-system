import { describe, expect, it } from "vitest";
import { createRng } from "../../engine/rng";
import { AuthoringError } from "../../engine/types";
import {
  arrangementOf,
  defaultOrder,
  exampleOrdering,
  formatOrderingAnswer,
  gradeOrdering,
  validateOrdering,
} from "./gradeOrdering";
import { checkOrdering, prepareOrdering } from "./prepareOrdering";
import type { OrderingPart } from "./types";

const part: OrderingPart = {
  type: "ordering",
  name: "chain",
  items: ["Income increases", "Demand shifts right", "Price increases"],
};

describe("ordering element", () => {
  it("accepts a valid spec", () => {
    expect(() => checkOrdering(part)).not.toThrow();
  });

  it.each<[string, Partial<OrderingPart>]>([
    ["fewer than two items", { items: [part.items[0]] }],
    ["an item with empty text", { items: ["", part.items[1]] }],
    ["an unknown layout", { layout: "diagonal" as never }],
    ["an unknown grading mode", { grading: "weighted" as never }],
    ["a startOrder that isn't a permutation", { startOrder: [0, 1] }],
  ])("rejects %s", (_name, override) => {
    expect(() => checkOrdering({ ...part, ...override })).toThrow(AuthoringError);
  });

  it("shuffles the starting order deterministically from the seed, leaving items untouched", () => {
    const rng = createRng(42);
    const prepared = prepareOrdering(part, rng);
    expect(prepared.startOrder).toHaveLength(part.items.length);
    expect([...prepared.startOrder!].sort()).toEqual([0, 1, 2]);
    expect(prepared.items).toEqual(part.items);
    // Same seed -> same shuffle.
    expect(prepareOrdering(part, createRng(42)).startOrder).toEqual(prepared.startOrder);
  });

  it("defaults the arrangement to startOrder, or identity order if never prepared", () => {
    expect(defaultOrder(part)).toEqual([0, 1, 2]);
    const prepared = prepareOrdering(part, createRng(1));
    expect(defaultOrder(prepared)).toEqual(prepared.startOrder);
  });

  it("treats an untouched or malformed value as the default arrangement, but is never invalid", () => {
    expect(validateOrdering(part, undefined)).toEqual({ valid: true });
    expect(validateOrdering(part, [0, 1, 2])).toEqual({ valid: true });
    expect(validateOrdering(part, [0, 1])).toEqual({ valid: false, message: expect.any(String) });
    expect(validateOrdering(part, [0, 1, 1])).toEqual({ valid: false, message: expect.any(String) });
    expect(arrangementOf(part, [0, 1])).toEqual(defaultOrder(part));
  });

  it("grades a fully correct arrangement (identity order)", () => {
    expect(gradeOrdering(part, exampleOrdering(part))).toEqual({ score: 1 });
  });

  it("gives partial credit and names the wrong positions without revealing the correct sequence", () => {
    // Position 0 correct; positions 1 and 2 swapped.
    const r = gradeOrdering(part, [0, 2, 1]);
    expect(r.score).toBeCloseTo(1 / 3);
    expect(r.feedback).toBe("1 of 3 correct. Check positions 2, 3.");
    expect(r.feedback).not.toMatch(/Price increases/);
  });

  it("supports all-or-nothing grading", () => {
    expect(gradeOrdering({ ...part, grading: "all-or-nothing" }, [0, 2, 1]).score).toBe(0);
    expect(gradeOrdering({ ...part, grading: "all-or-nothing" }, [0, 1, 2]).score).toBe(1);
  });

  it("grades an untouched submission against the shuffled starting arrangement", () => {
    const prepared = prepareOrdering(part, createRng(7));
    expect(gradeOrdering(prepared, undefined)).toEqual(gradeOrdering(prepared, prepared.startOrder));
  });

  it("formats the student's current sequence for review", () => {
    expect(formatOrderingAnswer(part, [1, 0, 2])).toBe("1. Demand shifts right; 2. Income increases; 3. Price increases");
  });
});
