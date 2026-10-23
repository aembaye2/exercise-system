import { describe, expect, it } from "vitest";
import type { BoundingBox, Point2D, ToolName, UserDrawing } from "./drawingLogic";
import { expectedShapeToDrawable, gradeDrawing, type ExpectedShape } from "./grading";

const box: BoundingBox = [-0.5, 10, -0.5, 10];
const draw = (tool: ToolName, ...points: Point2D[]): UserDrawing => ({ tool, points, color: "#000" });

// The IS-LM-FE supply-shock question: FE1 at Y = 6, LM1 upward through E1 = (6, 3.5).
const shiftAnswer: ExpectedShape[] = [
  { type: "segment", x: 6, tolerance: 0.04 },
  { type: "curve", through: [6, 3.5], slope: "up", tolerance: 0.04 },
];
const fe1 = draw("segment", [6.1, 0.2], [5.95, 9]);
const lm1 = draw("curve", [3.5, 1], [6, 3.5], [8.5, 7]);
const score = (drawings: UserDrawing[], anyOrder = true) => gradeDrawing(shiftAnswer, drawings, box, { anyOrder }).score;

describe("gradeDrawing: vertical and through-point shapes", () => {
  it("accepts FE1 and LM1 in either order, drawn with any line-like tool", () => {
    expect(score([fe1, lm1])).toBe(100);
    expect(score([lm1, fe1])).toBe(100);
    expect(score([draw("line", [6, 2], [6, 5]), draw("segment", [5, 2.5], [7, 4.6])])).toBe(100);
    // The 5-point curve counts as line-like too.
    expect(score([fe1, draw("curve5", [3, 0.5], [4.5, 2], [6, 3.5], [7.5, 5.5], [8.5, 7])])).toBe(100);
  });

  it("ignores text labels in any order, but extra shapes lower the score", () => {
    const label = { ...draw("text", [6.1, 9.5]), text: "FE1" };
    expect(score([label, lm1, label, fe1])).toBe(100);
    const result = gradeDrawing(shiftAnswer, [fe1, lm1, draw("segment", [1, 1], [2, 2])], box, { anyOrder: true });
    expect(result).toMatchObject({ correct: 2, extra: 1, score: 67 });
  });

  it("rejects FE shifted the wrong way or not vertical", () => {
    expect(score([draw("segment", [2, 0], [2, 9]), lm1])).toBe(50);
    expect(score([draw("segment", [5, 0], [7, 9]), lm1])).toBe(50);
    expect(score([draw("segment", [6, 3], [6, 3.4]), lm1])).toBe(50); // too short
  });

  it("rejects an LM that misses the new equilibrium or slopes down", () => {
    // LM shifted left (up) instead: through (3, 5).
    expect(score([fe1, draw("curve", [1, 2], [3, 5], [5, 8.5])])).toBe(50);
    // Through E1 but downward (an IS shift).
    expect(score([fe1, draw("curve", [3, 7], [6, 3.5], [8, 2])])).toBe(50);
  });

  it("in order (the default), compares by position", () => {
    expect(score([fe1, lm1], false)).toBe(100);
    expect(score([lm1, fe1], false)).toBe(0);
  });

  it("draws the expected shapes for the answer overlay", () => {
    expect(expectedShapeToDrawable(shiftAnswer[0], box)).toMatchObject({ type: "segment", points: [[6, 0], [6, 10]] });
    const lm = expectedShapeToDrawable(shiftAnswer[1], box)!;
    expect(lm.points[0][1]).toBeLessThan(lm.points[1][1]);
  });
});

describe("gradeDrawing: existing slope-intercept shapes", () => {
  it("still grades a budget line", () => {
    const expected: ExpectedShape[] = [{ type: "segment", slope: -1, yIntercept: 8 }];
    expect(gradeDrawing(expected, [draw("segment", [0, 8], [8, 0])], box).score).toBe(100);
    expect(gradeDrawing(expected, [draw("segment", [0, 6], [6, 0])], box).score).toBe(0);
  });
});

describe("gradeDrawing: rectangles and triangles by their corners", () => {
  // Monopoly: profit rectangle (0, 4)-(4, 8) and DWL triangle (4, 8), (4, 4), (8, 4) on a 10 x 10 board.
  const area: ExpectedShape[] = [
    { type: "rectangle", points: [[0, 4], [4, 8]] },
    { type: "triangle", points: [[4, 8], [4, 4], [8, 4]] },
  ];
  const grade = (drawings: UserDrawing[]) => gradeDrawing(area, drawings, box, { anyOrder: true }).score;

  it("accepts a rectangle dragged along either diagonal and a triangle clicked in any order", () => {
    expect(grade([draw("rectangle", [0, 4], [4, 8]), draw("triangle", [4, 8], [4, 4], [8, 4])])).toBe(100);
    expect(grade([draw("triangle", [8.2, 4], [4, 7.9], [4.1, 4]), draw("rectangle", [4, 4], [0.1, 8])])).toBe(100);
    expect(grade([draw("rectangle", [0, 8], [4, 4]), draw("triangle", [4, 4], [8, 4], [4, 8])])).toBe(100);
  });

  it("rejects corners in the wrong place or the wrong shape", () => {
    expect(grade([draw("rectangle", [0, 4], [8, 8]), draw("triangle", [4, 8], [4, 4], [8, 4])])).toBe(50);
    expect(grade([draw("rectangle", [0, 4], [4, 8]), draw("triangle", [4, 8], [8, 8], [8, 4])])).toBe(50);
    expect(grade([draw("polygon", [0, 4], [4, 4], [4, 8], [0, 8]), draw("triangle", [4, 8], [4, 4], [8, 4])])).toBe(50);
  });
});
