import type { BoundingBox, InitialObjectSpec, Point2D, ToolName, UserDrawing } from "../types";
export interface SlopeInterceptShape { type: "segment" | "line"; slope: number; yIntercept: number; tolerance?: number; color?: string; }
export type ExpectedShape = InitialObjectSpec | SlopeInterceptShape;
export interface ShapeGradeDetail { index: number; tool: ToolName; correct: boolean; reason: string; }
export interface GradeResult { total: number; correct: number; score: number; details: ShapeGradeDetail[]; }
export const DEFAULT_RELATIVE_TOLERANCE = .1;
const isSlope = (s: ExpectedShape): s is SlopeInterceptShape => "slope" in s;
const dist = (a: Point2D, b: Point2D) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const fmt = (n: number) => String(Math.round(n * 100) / 100);

export function expectedShapeToDrawable(shape: ExpectedShape, box: BoundingBox): InitialObjectSpec | null {
  if (!isSlope(shape)) return shape;
  const [, xMax, , yMax] = box;
  const y = (x: number) => shape.slope * x + shape.yIntercept;
  if (shape.type === "line") return { type: "line", points: [[0, shape.yIntercept], [1, y(1)]], color: shape.color };
  let lo = 0, hi = xMax;
  if (shape.slope === 0) { if (shape.yIntercept < 0 || shape.yIntercept > yMax) return null; }
  else {
    const a = -shape.yIntercept / shape.slope, b = (yMax - shape.yIntercept) / shape.slope;
    lo = Math.max(lo, Math.min(a, b)); hi = Math.min(hi, Math.max(a, b));
  }
  return lo >= hi ? null : { type: "segment", points: [[lo, y(lo)], [hi, y(hi)]], color: shape.color };
}

export function gradeDrawing(expected: ExpectedShape[], actual: UserDrawing[], box: BoundingBox, tolerancePercent = 5): GradeResult {
  const [x1, x2, y1, y2] = box;
  const ptTol = tolerancePercent / 100 * Math.hypot(x2 - x1, y2 - y1);
  const details: ShapeGradeDetail[] = [];
  let correct = 0;
  expected.forEach((exp, index) => {
    const got = actual[index], tool = exp.type;
    let reason = "Matched.", ok = false;
    if (tool !== "line" && tool !== "segment") reason = `Grading for "${tool}" is not implemented yet.`;
    else if (!got) reason = `Expected a "${tool}" here, but nothing was drawn at this position.`;
    else if (got.tool !== tool) reason = `Expected a "${tool}" here, but a "${got.tool}" was drawn instead.`;
    else if (got.points.length < 2) reason = "Drawing needs two points.";
    else if (isSlope(exp)) {
      const [[ax, ay], [bx, by]] = got.points;
      if (Math.abs(bx - ax) < 1e-9) reason = "The line is vertical, so it has no slope or y-intercept.";
      else {
        const slope = (by - ay) / (bx - ax), intercept = ay - slope * ax, rel = exp.tolerance ?? DEFAULT_RELATIVE_TOLERANCE;
        const allow = (n: number) => rel * Math.max(Math.abs(n), 1), problems: string[] = [];
        if (Math.abs(slope - exp.slope) > allow(exp.slope)) problems.push(`slope is ${fmt(slope)}, expected ${fmt(exp.slope)} (±${fmt(allow(exp.slope))})`);
        if (Math.abs(intercept - exp.yIntercept) > allow(exp.yIntercept)) problems.push(`y-intercept is ${fmt(intercept)}, expected ${fmt(exp.yIntercept)} (±${fmt(allow(exp.yIntercept))})`);
        ok = problems.length === 0; if (!ok) reason = problems.join("; ") + ".";
      }
    } else {
      const [e1, e2] = exp.points, [a1, a2] = got.points;
      ok = (dist(e1, a1) <= ptTol && dist(e2, a2) <= ptTol) || (dist(e1, a2) <= ptTol && dist(e2, a1) <= ptTol);
      if (!ok) reason = "Points do not match within tolerance.";
    }
    if (ok) correct++;
    details.push({ index, tool, correct: ok, reason });
  });
  return { total: expected.length, correct, score: expected.length ? Math.round(correct / expected.length * 100) : 0, details };
}
