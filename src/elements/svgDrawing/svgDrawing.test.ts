import { describe, expect, it } from "vitest";
import { AuthoringError, type JsonValue } from "../../engine/types";
import { checkSvgDrawing, exampleSvgDrawing, gradeSvgDrawing, readDrawings, validateSvgDrawing } from "./gradeSvgDrawing";
import type { SvgDrawingPart } from "./types";

const part: SvgDrawingPart = {
  type: "svgDrawing",
  name: "g",
  props: { boundingBox: [-1, 11, -1, 11], expectedDrawing: [{ type: "segment", slope: -1, yIntercept: 8 }] },
};

const perfect = exampleSvgDrawing(part) as unknown as JsonValue;

describe("svgDrawing element", () => {
  it("needs an expectedDrawing", () => {
    expect(() => checkSvgDrawing(part)).not.toThrow();
    expect(() => checkSvgDrawing({ ...part, props: { expectedDrawing: [] } })).toThrow(AuthoringError);
  });

  it("rejects a submission with no drawing", () => {
    expect(validateSvgDrawing(part, undefined).valid).toBe(false);
    expect(validateSvgDrawing(part, null).valid).toBe(false);
    expect(validateSvgDrawing(part, []).valid).toBe(false);
    expect(validateSvgDrawing(part, [{ nonsense: 1 }]).valid).toBe(false);
    expect(validateSvgDrawing(part, perfect).valid).toBe(true);
  });

  it("reads only well-formed drawings", () => {
    expect(readDrawings("x")).toEqual([]);
    expect(readDrawings(perfect)).toHaveLength(1);
  });

  it("grades the drawing itself when submitted", () => {
    expect(gradeSvgDrawing(part, perfect).score).toBe(1);
    // Parallel to the answer but shifted: wrong intercept.
    const shifted = [{ tool: "segment", points: [[1, 5], [6, 0]], color: "#111827" }];
    const result = gradeSvgDrawing(part, shifted);
    expect(result.score).toBe(0);
    expect(result.feedback).toContain("0 of 1");
    // The feedback doesn't reveal the expected values.
    expect(result.feedback).not.toMatch(/expected|8/);
  });

  it("scores 0 when nothing was drawn", () => {
    expect(gradeSvgDrawing(part, undefined).score).toBe(0);
  });
});
