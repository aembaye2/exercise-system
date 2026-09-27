import { describe, expect, it } from "vitest";
import type { JsonValue } from "../../engine/types";
import { defaultObject, moveHandle, normalizeLine, readObjects, snapPoint, translate } from "./editing";
import { sampleFunction } from "./geometry";
import { checkDrawing, exampleDrawing, gradeDrawing, parseDrawing, scoreObject, validateDrawing } from "./gradeDrawing";
import type { AnswerObject, DrawingPart, DrawnObject, Pt } from "./types";

const base = (over: Partial<DrawingPart> = {}): DrawingPart => ({
  type: "drawing",
  name: "g",
  x: { max: 20, snap: 0.5 },
  y: { max: 20, snap: 0.5 },
  tools: [{ type: "point" }],
  answer: [{ type: "point", label: "equilibrium", x: 10, y: 5 }],
  ...over,
});

const json = (objs: DrawnObject[]) => objs as unknown as JsonValue;

describe("validation (does not use an attempt)", () => {
  const part = base();

  it("rejects an empty drawing", () => {
    expect(validateDrawing(part, undefined)).toEqual({ valid: false, message: "Draw your answer on the graph before submitting." });
    expect(validateDrawing(part, []).valid).toBe(false);
  });

  it("rejects malformed values and objects that don't match a tool", () => {
    expect(validateDrawing(part, "hello").valid).toBe(false);
    expect(validateDrawing(part, [{ type: "line", tool: 0, from: [0, 0], to: [1, 1] }]).valid).toBe(false);
    expect(validateDrawing(part, [{ type: "point", tool: 5, x: 1, y: 1 }]).valid).toBe(false);
    expect(validateDrawing(part, [{ type: "point", tool: 0, x: "1", y: 1 }]).valid).toBe(false);
  });

  it("enforces the tool's max count", () => {
    const two = json([
      { type: "point", tool: 0, x: 1, y: 1 },
      { type: "point", tool: 0, x: 2, y: 2 },
    ]);
    expect(validateDrawing(part, two).valid).toBe(false);
    expect(validateDrawing(base({ tools: [{ type: "point", max: 2 }] }), two).valid).toBe(true);
  });

  it("rejects self-crossing shaded areas with a helpful message", () => {
    const p = base({ tools: [{ type: "polygon", vertices: 4, label: "surplus" }], answer: [{ type: "polygon", label: "surplus", points: [[0, 0], [4, 0], [4, 4], [0, 4]] }] });
    const bowTie = json([{ type: "polygon", tool: 0, points: [[0, 0], [4, 4], [4, 0], [0, 4]] }]);
    expect(validateDrawing(p, bowTie)).toEqual({ valid: false, message: "The edges of your surplus cross each other. Move its corners so they don't." });
  });

  it("requires curves with 4 points in left-to-right order", () => {
    const p = base({ tools: [{ type: "curve" }], answer: [{ type: "curve", label: "IC", points: [[1, 10], [10, 1]] }] });
    const ok: Pt[] = [[1, 9], [2, 5], [5, 2], [9, 1]];
    expect(validateDrawing(p, json([{ type: "curve", tool: 0, points: ok }])).valid).toBe(true);
    expect(validateDrawing(p, json([{ type: "curve", tool: 0, points: ok.slice(0, 3) }])).valid).toBe(false);
    expect(validateDrawing(p, json([{ type: "curve", tool: 0, points: [ok[1], ok[0], ok[2], ok[3]] }])).valid).toBe(false);
  });
});

describe("points", () => {
  const part = base();

  it("accepts within the tolerance ellipse (default 4% of each range = 0.8)", () => {
    expect(gradeDrawing(part, json([{ type: "point", tool: 0, x: 10.5, y: 5.5 }])).score).toBe(1);
    expect(gradeDrawing(part, json([{ type: "point", tool: 0, x: 10.7, y: 5.5 }])).score).toBe(0);
  });

  it("uses per-axis tolerances", () => {
    const p = base({ tol: { x: 2, y: 0.25 } });
    expect(gradeDrawing(p, json([{ type: "point", tool: 0, x: 11.5, y: 5 }])).score).toBe(1);
    expect(gradeDrawing(p, json([{ type: "point", tool: 0, x: 10, y: 5.5 }])).score).toBe(0);
  });

  it("names the wrong object in the feedback without giving coordinates", () => {
    const r = gradeDrawing(part, json([{ type: "point", tool: 0, x: 1, y: 1 }]));
    expect(r.feedback).toBe("Your equilibrium is not in the right place.");
  });
});

describe("lines", () => {
  const exact = base({
    tools: [{ type: "line" }],
    answer: [{ type: "line", label: "new supply curve", from: [0, 4], to: [10, 14] }],
  });

  it("accepts any two points on the right line, however far apart", () => {
    expect(gradeDrawing(exact, json([{ type: "line", tool: 0, from: [2, 6], to: [3, 7] }])).score).toBe(1);
    expect(gradeDrawing(exact, json([{ type: "line", tool: 0, from: [16, 20], to: [4, 8] }])).score).toBe(1);
  });

  it("rejects a parallel line that is too far away, or a rotated one", () => {
    expect(gradeDrawing(exact, json([{ type: "line", tool: 0, from: [0, 6], to: [10, 16] }])).score).toBe(0);
    expect(gradeDrawing(exact, json([{ type: "line", tool: 0, from: [0, 4], to: [10, 20] }])).score).toBe(0);
  });

  const shift = (direction: "up" | "down" | "left" | "right") =>
    base({
      tools: [{ type: "line" }],
      answer: [{ type: "line", label: "new demand curve", shiftOf: { from: [0, 14], to: [14, 0] }, direction }],
    });
  const moved = (dx: number, dy: number): JsonValue =>
    json([{ type: "line", tool: 0, from: [0 + dx, 14 + dy], to: [14 + dx, 0 + dy] }]);

  it("grades shifts by direction only", () => {
    expect(gradeDrawing(shift("right"), moved(3, 0)).score).toBe(1);
    expect(gradeDrawing(shift("right"), moved(8, 0)).score).toBe(1);
    expect(gradeDrawing(shift("right"), moved(0, 2)).score).toBe(1); // up = right for a downward line
    expect(gradeDrawing(shift("left"), moved(3, 0)).score).toBe(0);
    expect(gradeDrawing(shift("up"), moved(0, 2)).score).toBe(1);
    expect(gradeDrawing(shift("down"), moved(0, 2)).score).toBe(0);
  });

  it("requires the shift to be larger than the tolerance and parallel", () => {
    expect(gradeDrawing(shift("right"), moved(0.3, 0))).toEqual({
      score: 0,
      feedback: "Your new demand curve hasn't moved far enough from the original line.",
    });
    const rotated = json([{ type: "line", tool: 0, from: [0, 18], to: [9, 0] }]); // ~18° steeper
    expect(gradeDrawing(shift("right"), rotated).feedback).toMatch(/parallel/);
  });
});

describe("polygons", () => {
  const part = base({
    tools: [{ type: "polygon" }],
    answer: [{ type: "polygon", label: "deadweight loss", points: [[10, 10], [10, 4], [14, 7]] }],
  });

  it("uses the overlap ratio", () => {
    expect(gradeDrawing(part, json([{ type: "polygon", tool: 0, points: [[10, 10], [10, 4], [14, 7]] }])).score).toBe(1);
    expect(gradeDrawing(part, json([{ type: "polygon", tool: 0, points: [[10, 10], [10, 4.5], [13.5, 7]] }])).score).toBe(1);
    expect(gradeDrawing(part, json([{ type: "polygon", tool: 0, points: [[2, 2], [2, 4], [4, 3]] }])).feedback).toBe(
      "Your deadweight loss doesn't cover the right area.",
    );
  });
});

describe("4-point curves: only the two MIDDLE points are graded", () => {
  const k = 25;
  const ref = sampleFunction((x) => k / x, 1.25, 20, 80);
  const part = (ans: Partial<Extract<AnswerObject, { type: "curve" }>> = {}) =>
    base({
      tools: [{ type: "curve" }],
      answer: [{ type: "curve", label: "indifference curve", points: ref, ...ans }],
    });
  const curve = (pts: Pt[]) => json([{ type: "curve", tool: 0, points: pts }]);

  it("gives full marks when both middle points are on the curve", () => {
    expect(gradeDrawing(part(), curve([[2, 12.5], [5, 5], [10, 2.5], [18, k / 18]])).score).toBe(1);
  });

  it("ignores the end points completely", () => {
    // Wild end points, perfect middle points: still full marks.
    expect(gradeDrawing(part(), curve([[0.5, 1], [5, 5], [10, 2.5], [20, 19]])).score).toBe(1);
  });

  it("perfect end points don't rescue wrong middle points", () => {
    const r = gradeDrawing(part(), curve([[2, 12.5], [5, 9], [10, 7], [18, k / 18]]));
    expect(r.score).toBe(0);
    expect(r.feedback).toBe("The two middle points of your indifference curve are not in the right place.");
  });

  it("gives half marks when one middle point is off", () => {
    expect(gradeDrawing(part(), curve([[2, 12.5], [5, 5], [10, 7], [18, k / 18]])).score).toBe(0.5);
  });

  it("checks `through` against the middle points only", () => {
    const p = part({ through: [5, 5] });
    expect(gradeDrawing(p, curve([[2, 12.5], [5, 5], [10, 2.5], [18, k / 18]])).score).toBe(1);
    expect(gradeDrawing(p, curve([[2, 12.5], [4, 6.25], [10, 2.5], [18, k / 18]])).score).toBeCloseTo(2 / 3);
    // An end point at the target bundle doesn't count.
    expect(gradeDrawing(p, curve([[5, 5], [6, 25 / 6], [10, 2.5], [18, k / 18]])).score).toBeCloseTo(2 / 3);
  });

  it("supports above / below (e.g. a higher indifference curve)", () => {
    const above = part({ relation: "above" });
    expect(gradeDrawing(above, curve([[2, 15], [5, 8], [10, 5], [18, 3]])).score).toBe(1);
    expect(gradeDrawing(above, curve([[2, 15], [5, 5], [10, 2.5], [18, 3]])).score).toBe(0);
    expect(gradeDrawing(part({ relation: "below" }), curve([[2, 8], [5, 3], [10, 1], [18, 0.5]])).score).toBe(1);
  });
});

describe("matching several objects", () => {
  const part = base({
    tools: [
      { type: "point", label: "equilibrium", max: 2 },
      { type: "line", label: "supply curve" },
    ],
    answer: [
      { type: "point", label: "old equilibrium", x: 10, y: 5 },
      { type: "point", label: "new equilibrium", x: 8, y: 7, weight: 2 },
      { type: "line", label: "supply curve", from: [0, 2], to: [10, 12] },
    ],
  });

  it("matches objects in any order", () => {
    const drawn = json([
      { type: "line", tool: 1, from: [0, 2], to: [10, 12] },
      { type: "point", tool: 0, x: 8, y: 7 },
      { type: "point", tool: 0, x: 10, y: 5 },
    ]);
    expect(gradeDrawing(part, drawn)).toEqual({ score: 1, feedback: undefined });
  });

  it("gives weighted partial credit and names what's missing", () => {
    const drawn = json([{ type: "point", tool: 0, x: 8, y: 7 }]);
    const r = gradeDrawing(part, drawn);
    expect(r.score).toBeCloseTo(2 / 4);
    expect(r.feedback).toBe("You haven't drawn the old equilibrium. You haven't drawn the supply curve.");
  });

  it("penalises extra objects", () => {
    const p = base({ tools: [{ type: "point", max: 3 }] });
    const drawn = json([
      { type: "point", tool: 0, x: 10, y: 5 },
      { type: "point", tool: 0, x: 1, y: 1 },
    ]);
    const r = gradeDrawing(p, drawn);
    expect(r.score).toBeCloseTo(1 / 2);
    expect(r.feedback).toBe("You drew 1 extra object, which lowers your score.");
  });
});

describe("checkDrawing (authoring errors)", () => {
  it("accepts a valid part", () => {
    expect(() => checkDrawing(base())).not.toThrow();
  });

  it.each([
    ["bad axis", { x: { min: 5, max: 5 } }, /x axis/],
    ["no tools", { tools: [] }, /at least one tool/],
    ["no answers", { answer: [] }, /at least one answer/],
    ["answer without tool", { answer: [{ type: "line", label: "L", from: [0, 0], to: [1, 1] }] }, /tools allow only 0/],
    ["too many answers for the tool", { answer: [{ type: "point", label: "A", x: 1, y: 1 }, { type: "point", label: "B", x: 2, y: 2 }] }, /tools allow only 1/],
    ["bad copyOf", { tools: [{ type: "line", copyOf: "nope" }] }, /copyOf/],
    ["concave polygon answer", { tools: [{ type: "polygon" }], answer: [{ type: "polygon", label: "P", points: [[0, 0], [4, 0], [1, 1], [0, 4]] }] }, /convex/],
    ["unsorted curve answer", { tools: [{ type: "curve" }], answer: [{ type: "curve", label: "C", points: [[5, 1], [1, 5]] }] }, /increasing x/],
    ["snap coarser than the tolerance", { x: { max: 20, snap: 5 } }, /snap step is too coarse/],
    ["bad tolerance", { tol: -1 }, /tol must be > 0/],
  ] as const)("rejects %s", (_name, over, message) => {
    expect(() => checkDrawing(base(over as Partial<DrawingPart>))).toThrow(message);
  });
});

describe("exampleDrawing", () => {
  it("earns full marks for every answer kind", () => {
    const part = base({
      tools: [
        { type: "point" },
        { type: "line", max: 2 },
        { type: "polygon" },
        { type: "curve" },
      ],
      answer: [
        { type: "point", label: "E", x: 3, y: 4 },
        { type: "line", label: "S2", from: [0, 5], to: [10, 15] },
        { type: "line", label: "D2", shiftOf: { from: [0, 14], to: [14, 0] }, direction: "left" },
        { type: "polygon", label: "DWL", points: [[10, 10], [10, 4], [14, 7]] },
        { type: "curve", label: "IC", points: sampleFunction((x) => 25 / x, 1.25, 20), through: [5, 5] },
      ],
    });
    const value = json(exampleDrawing(part));
    expect(validateDrawing(part, value).valid).toBe(true);
    expect(gradeDrawing(part, value).score).toBe(1);
  });
});

describe("editing", () => {
  const part = base({
    initial: [{ type: "line", id: "S1", from: [0, 2], to: [20, 22] }],
    tools: [{ type: "line", copyOf: "S1" }, { type: "curve" }, { type: "polygon", vertices: 4 }, { type: "point" }],
  });

  it("snaps and clamps points to the plot", () => {
    expect(snapPoint(part, [3.3, 7.8])).toEqual([3.5, 8]);
    expect(snapPoint(part, [-4, 25])).toEqual([0, 20]);
  });

  it("starts a copied line on top of the original, with handles inside the plot", () => {
    const line = defaultObject(part, 0, []);
    if (line.type !== "line") throw new Error();
    expect(scoreObject(part, { type: "line", label: "S", from: [0, 2], to: [20, 22] }, line).score).toBe(1);
    for (const p of [line.from, line.to]) {
      expect(p[0]).toBeGreaterThanOrEqual(0);
      expect(p[1]).toBeLessThanOrEqual(20);
    }
  });

  it("creates valid default objects for every tool", () => {
    const objs = part.tools.map((_, i) => defaultObject(part, i, []));
    expect(validateDrawing(part, json(objs)).valid).toBe(true);
  });

  it("keeps curve points in left-to-right order while dragging", () => {
    const c = defaultObject(part, 1, []);
    if (c.type !== "curve") throw new Error();
    const dragged = moveHandle(part, c, 1, [c.points[2][0] + 5, 10]);
    if (dragged.type !== "curve") throw new Error();
    expect(dragged.points[1][0]).toBeLessThan(dragged.points[2][0]);
    expect(parseDrawing(part, json([dragged])).ok).toBe(true);
  });

  it("won't put both line handles on the same spot", () => {
    const line: DrawnObject = { type: "line", tool: 0, from: [2, 2], to: [4, 4] };
    expect(moveHandle(part, line, 1, [2, 2])).toBe(line);
  });

  it("translates lines by snapped steps and keeps them on the plot", () => {
    const line: DrawnObject = { type: "line", tool: 0, from: [4, 6], to: [16, 18] };
    const moved = translate(part, line, [0, 2.2]);
    if (moved.type !== "line") throw new Error();
    // Same slope, shifted up by exactly 2 (the snapped delta).
    expect(scoreObject(part, { type: "line", label: "L", from: [0, 4], to: [10, 14] }, moved).score).toBe(1);
    expect(translate(part, line, [0, 100])).toBe(line); // would leave the plot
  });

  it("clamps polygon translation to the plot", () => {
    const sq: DrawnObject = { type: "polygon", tool: 2, points: [[16, 16], [18, 16], [18, 18], [16, 18]] };
    const moved = translate(part, sq, [10, 10]);
    if (moved.type !== "polygon") throw new Error();
    expect(Math.max(...moved.points.map((p) => p[0]))).toBe(20);
  });

  it("normalizes line handles to the visible part", () => {
    const [a, b] = normalizeLine(part, [0, 2], [20, 22])!;
    expect(a[1]).toBeGreaterThanOrEqual(2);
    expect(b[1]).toBeLessThanOrEqual(20);
  });

  it("reads leniently for display", () => {
    expect(readObjects(part, [{ type: "point", tool: 3, x: 1, y: 2 }, { junk: true }, null])).toHaveLength(1);
    expect(readObjects(part, "nope")).toEqual([]);
  });
});
