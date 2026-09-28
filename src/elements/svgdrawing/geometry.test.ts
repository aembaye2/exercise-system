import { describe, expect, it } from "vitest";
import {
  area,
  clipLineToBox,
  clipPolygon,
  distToLine,
  distToPolyline,
  isConvex,
  isSimplePolygon,
  niceStep,
  overlapRatio,
  pchipBeziers,
  pchipEval,
  pchipSlopes,
  polylineYAt,
  sampleFunction,
  snapTo,
} from "./geometry";
import type { Pt } from "./types";

const box = { xmin: 0, xmax: 10, ymin: 0, ymax: 10 };

describe("niceStep / snapTo", () => {
  it("picks 1-2-5 steps", () => {
    expect(niceStep(0.75)).toBe(1);
    expect(niceStep(3)).toBe(2);
    expect(niceStep(4)).toBe(5);
    expect(niceStep(0.5)).toBe(0.5);
    expect(niceStep(0.012)).toBe(0.01);
  });

  it("snaps relative to the origin without float noise", () => {
    expect(snapTo(3.26, 0, 0.5)).toBe(3.5);
    expect(snapTo(0.1 + 0.2, 0, 0.1)).toBe(0.3);
    expect(snapTo(6.9, 1, 4)).toBe(5);
    expect(snapTo(7, 1, 4)).toBe(9); // exactly halfway rounds up
    expect(snapTo(3.3, 0, 0)).toBe(3.3);
  });
});

describe("PCHIP", () => {
  const convex: Pt[] = [
    [1, 9],
    [3, 4],
    [6, 2],
    [9, 1],
  ];

  it("passes through every point", () => {
    for (const [x, y] of convex) expect(pchipEval(convex, x)).toBeCloseTo(y, 12);
  });

  it("never overshoots: decreasing data gives a decreasing curve", () => {
    let prev = Infinity;
    for (let x = 1; x <= 9; x += 0.01) {
      const y = pchipEval(convex, x);
      expect(y).toBeLessThanOrEqual(prev + 1e-12);
      expect(y).toBeGreaterThanOrEqual(1 - 1e-12);
      expect(y).toBeLessThanOrEqual(9 + 1e-12);
      prev = y;
    }
  });

  it("uses zero slope at a local extremum", () => {
    const bump: Pt[] = [
      [0, 0],
      [1, 5],
      [2, 0],
    ];
    expect(pchipSlopes(bump)[1]).toBe(0);
    for (let x = 0; x <= 2; x += 0.01) expect(pchipEval(bump, x)).toBeLessThanOrEqual(5 + 1e-12);
  });

  it("the Bézier segments match the interpolant", () => {
    const segs = pchipBeziers(convex);
    expect(segs).toHaveLength(3);
    for (const [p0, c1, c2, p3] of segs) {
      // Bézier at t = 0.5 must equal the Hermite curve at the same x (x is linear in t).
      const mid = (a: number, b: number, c: number, d: number) => (a + 3 * b + 3 * c + d) / 8;
      const x = mid(p0[0], c1[0], c2[0], p3[0]);
      const y = mid(p0[1], c1[1], c2[1], p3[1]);
      expect(pchipEval(convex, x)).toBeCloseTo(y, 10);
    }
  });

  it("is linear for two points", () => {
    expect(pchipEval([[0, 0], [2, 4]], 1)).toBeCloseTo(2);
  });
});

describe("polylines and lines", () => {
  it("samples functions and interpolates", () => {
    const pts = sampleFunction((x) => 10 / x, 1, 10, 10);
    expect(pts).toHaveLength(10);
    expect(polylineYAt(pts, 1)).toBeCloseTo(10);
    expect(polylineYAt(pts, 0.5)).toBeNaN();
  });

  it("measures distances", () => {
    expect(distToLine([0, 1], [0, 0], [5, 0])).toBe(1);
    expect(distToLine([100, 1], [0, 0], [5, 0])).toBe(1); // infinite line
    expect(distToPolyline([6, 1], [[0, 0], [5, 0]])).toBeCloseTo(Math.SQRT2);
  });

  it("clips an infinite line to the box", () => {
    const seg = clipLineToBox([0, 0], [1, 1], box)!;
    expect(seg[0]).toEqual([0, 0]);
    expect(seg[1]).toEqual([10, 10]);
    const steep = clipLineToBox([0, 20], [1, 18], box)!;
    expect(steep[0][1]).toBeCloseTo(10);
    expect(steep[1][1]).toBeCloseTo(0);
    expect(clipLineToBox([0, 20], [1, 20], box)).toBeNull();
  });
});

describe("polygons", () => {
  const square: Pt[] = [
    [0, 0],
    [4, 0],
    [4, 4],
    [0, 4],
  ];

  it("computes area, convexity and simplicity", () => {
    expect(area(square)).toBe(16);
    expect(isConvex(square)).toBe(true);
    expect(isConvex([[0, 0], [4, 0], [1, 1], [0, 4]])).toBe(false);
    expect(isSimplePolygon(square)).toBe(true);
    expect(isSimplePolygon([[0, 0], [4, 4], [4, 0], [0, 4]])).toBe(false); // bow tie
  });

  it("clips and measures overlap", () => {
    const shifted = square.map(([x, y]) => [x + 2, y] as Pt);
    expect(area(clipPolygon(shifted, square))).toBeCloseTo(8);
    expect(overlapRatio(shifted, square)).toBeCloseTo(8 / 24);
    expect(overlapRatio(square, square)).toBeCloseTo(1);
    expect(overlapRatio(square.map(([x, y]) => [x + 10, y] as Pt), square)).toBe(0);
  });

  it("works whichever way the clip polygon winds", () => {
    const tri: Pt[] = [
      [0, 0],
      [4, 0],
      [0, 4],
    ];
    expect(overlapRatio(square, tri)).toBeCloseTo(overlapRatio(square, [...tri].reverse()));
  });
});
