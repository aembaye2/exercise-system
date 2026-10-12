import { describe, expect, it } from "vitest";
import { AuthoringError, type JsonValue } from "../../engine/types";
import { checkJsxGraph, exampleJsxGraph, formatJsxGraphAnswer, gradeJsxGraph, readDrawings, validateJsxGraph } from "./gradeJsxGraph";
import type { JsxGraphPart } from "./types";

const part: JsxGraphPart = {
  type: "jsxgraph",
  name: "g",
  props: { boundingBox: [-1, 11, -1, 11], expectedDrawing: [{ type: "segment", slope: -1, yIntercept: 8 }] },
};

const perfect = exampleJsxGraph(part) as unknown as JsonValue;

describe("jsxgraph element", () => {
  it("needs an expectedDrawing", () => {
    expect(() => checkJsxGraph(part)).not.toThrow();
    expect(() => checkJsxGraph({ ...part, props: { expectedDrawing: [] } })).toThrow(AuthoringError);
  });

  it("rejects a submission with no drawing", () => {
    expect(validateJsxGraph(part, undefined).valid).toBe(false);
    expect(validateJsxGraph(part, null).valid).toBe(false);
    expect(validateJsxGraph(part, []).valid).toBe(false);
    expect(validateJsxGraph(part, [{ nonsense: 1 }]).valid).toBe(false);
    expect(validateJsxGraph(part, perfect).valid).toBe(true);
  });

  it("reads only well-formed drawings", () => {
    expect(readDrawings("x")).toEqual([]);
    expect(readDrawings(perfect)).toHaveLength(1);
  });

  it("grades the drawing itself when submitted", () => {
    expect(gradeJsxGraph(part, perfect).score).toBe(1);
    // Parallel to the answer but shifted: wrong intercept.
    const shifted = [{ tool: "segment", points: [[1, 5], [6, 0]], color: "#111827" }];
    const result = gradeJsxGraph(part, shifted);
    expect(result.score).toBe(0);
    expect(result.feedback).toContain("0 of 1");
    // The feedback doesn't reveal the expected values.
    expect(result.feedback).not.toMatch(/expected|8/);
  });

  it("scores 0 when nothing was drawn", () => {
    expect(gradeJsxGraph(part, undefined).score).toBe(0);
  });
});

describe("formatJsxGraphAnswer", () => {
  it("lists each shape with its points rounded to 2 decimals", () => {
    const value = [
      { tool: "segment", points: [[0, 8.33333], [10.004, 0]], color: "#111827" },
      { tool: "point", points: [[3.2, 5]], color: "#111827" },
      { tool: "text", points: [[1, 2]], color: "#111827", text: "PPF" },
    ] as unknown as JsonValue;
    expect(formatJsxGraphAnswer(part, value)).toBe('Drew 3 shapes: segment (0, 8.33) to (10, 0); point (3.2, 5); text (1, 2) "PPF".');
    expect(formatJsxGraphAnswer(part, [])).toBe("*(no drawing)*");
  });
});
