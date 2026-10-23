import type { BoundingBox, InitialObjectSpec, Point2D, ToolName, UserDrawing } from "./drawingLogic";

/** A line/segment the student should draw, described by its equation
 * `y = slope * x + yIntercept` instead of by exact points (e.g. a budget line).
 * The student's drawing only has to lie on that line - where along it they
 * put the endpoints doesn't matter. */
export interface SlopeInterceptShape {
  type: "segment" | "line";
  slope: number;
  yIntercept: number;
  /** Allowed relative error for both slope and intercept, as a fraction of the
   * expected value (0.10 = +/-10%). Values smaller than 1 in magnitude are
   * treated as 1, so an expected 0 still gets +/-tolerance instead of needing
   * an exact match. Defaults to `DEFAULT_RELATIVE_TOLERANCE`. */
  tolerance?: number;
  color?: string;
}

/** A vertical line the student should draw at `x` (e.g. an FE line). Any
 * line-like drawing (`LINE_LIKE_TOOLS`) counts if all its points lie within
 * `tolerance` of `x` and it spans at least a tenth of the board's height. */
export interface VerticalShape {
  /** The tool used to draw it as the suggested answer. */
  type: "segment" | "line";
  x: number;
  /** Allowed distance from `x`, as a fraction of the board's width. Default 0.05. */
  tolerance?: number;
  color?: string;
}

/** A line or curve that must pass through a point with a given direction (e.g. a
 * shifted LM curve through the new equilibrium), whatever its exact shape. Any
 * line-like drawing (`LINE_LIKE_TOOLS`) counts if it passes within `tolerance` of
 * `through` and rises ("up") or falls ("down") from its left end to its right end. */
export interface ThroughPointShape {
  /** The tool used to draw it as the suggested answer (a short segment). */
  type: "segment" | "line" | "curve";
  through: Point2D;
  slope: "up" | "down";
  /** Allowed distance from `through`, as a fraction of the board's diagonal. Default 0.05. */
  tolerance?: number;
  color?: string;
}

/** A shape the teacher expects the student to draw: the same shape as
 * `InitialObjectSpec` (tool + exact points), a line/segment given by slope and
 * y-intercept, a vertical line, or a line/curve through a point. */
export type ExpectedShape = InitialObjectSpec | SlopeInterceptShape | VerticalShape | ThroughPointShape;

/** Tools that draw a line or curve, accepted for `VerticalShape` and `ThroughPointShape`. */
export const LINE_LIKE_TOOLS: ToolName[] = ["line", "segment", "curve", "curve5", "scatter"];

export interface GradeOptions {
  /** Allowed positional error for point-based expected shapes, as a percentage of
   * the board's diagonal. Default 5. */
  tolerancePercent?: number;
  /** Match each expected shape with any drawing, not the drawing at its position.
   * Text labels and coordinate markers are ignored, and every other drawing beyond
   * the expected shapes counts against the score. */
  anyOrder?: boolean;
}

export interface ShapeGradeDetail {
  index: number;
  tool: ToolName;
  correct: boolean;
  reason: string;
}

export interface GradeResult {
  total: number;
  correct: number;
  /** Percentage score, 0-100. */
  score: number;
  details: ShapeGradeDetail[];
  /** With `anyOrder`: drawings beyond the expected shapes (labels not counted). */
  extra: number;
}

export const DEFAULT_RELATIVE_TOLERANCE = 0.1;

/** The board used when a question doesn't give a `boundingBox`. */
export const DEFAULT_BOUNDING_BOX: BoundingBox = [-10, 10, -10, 10];

function isSlopeIntercept(shape: ExpectedShape): shape is SlopeInterceptShape {
  return "slope" in shape && "yIntercept" in shape;
}

function isVertical(shape: ExpectedShape): shape is VerticalShape {
  return "x" in shape && typeof shape.x === "number";
}

function isThroughPoint(shape: ExpectedShape): shape is ThroughPointShape {
  return "through" in shape;
}

/**
 * Turns an expected shape into something the board can draw (for showing the
 * suggested answer). Exact-points shapes are returned as-is. A slope-intercept
 * "segment" is drawn as the part of its line inside the first quadrant of the
 * board (0 <= x <= xMax, 0 <= y <= yMax), e.g. a budget line from axis to
 * axis; a slope-intercept "line" is drawn as the infinite line. Returns null
 * if the segment never enters that area.
 */
export function expectedShapeToDrawable(shape: ExpectedShape, boundingBox: BoundingBox): InitialObjectSpec | null {
  const [xMin, xMax, yMin, yMax] = boundingBox;
  if (isVertical(shape)) {
    return { type: "segment", points: [[shape.x, Math.max(0, yMin)], [shape.x, yMax]], color: shape.color };
  }
  if (isThroughPoint(shape)) {
    // Only marks the point and direction; give `suggestedAnswer` to show the real curve.
    const [px, py] = shape.through;
    const dx = 0.15 * (xMax - xMin);
    const dy = (shape.slope === "up" ? 1 : -1) * 0.15 * (yMax - yMin);
    return { type: "segment", points: [[px - dx, py - dy], [px + dx, py + dy]], color: shape.color };
  }
  if (!isSlopeIntercept(shape)) return shape;
  const { slope, yIntercept, color } = shape;
  const y = (x: number) => slope * x + yIntercept;

  if (shape.type === "line") {
    return { type: "line", points: [[0, yIntercept], [1, y(1)]], color };
  }

  // x-range where 0 <= y <= yMax, intersected with 0 <= x <= xMax.
  let lo = 0;
  let hi = xMax;
  if (slope === 0) {
    if (yIntercept < 0 || yIntercept > yMax) return null;
  } else {
    const xAtY0 = -yIntercept / slope;
    const xAtYMax = (yMax - yIntercept) / slope;
    lo = Math.max(lo, Math.min(xAtY0, xAtYMax));
    hi = Math.min(hi, Math.max(xAtY0, xAtYMax));
  }
  if (lo >= hi) return null;
  return { type: "segment", points: [[lo, y(lo)], [hi, y(hi)]], color };
}

function dist(a: Point2D, b: Point2D) {
  return Math.hypot(a[0] - b[0], a[1] - b[1]);
}

/** Rounds for display in feedback messages, e.g. -0.9876 -> -0.99. */
function fmt(n: number) {
  return String(Math.round(n * 100) / 100);
}

/** Result of comparing one expected shape against the student's drawing at
 * the same position. `reason` is shown to the student when it doesn't match. */
type CompareResult = { ok: true } | { ok: false; reason: string };


// Slope-intercept form: the student's two endpoints define a line, whose slope
// and y-intercept (where the extended line crosses x = 0) are each checked
// against the expected value within a relative tolerance.
function compareSlopeIntercept(expected: SlopeInterceptShape, actual: UserDrawing): CompareResult {
  if (actual.points.length < 2) return { ok: false, reason: "Drawing needs two points." };
  const [[x1, y1], [x2, y2]] = actual.points;
  if (Math.abs(x2 - x1) < 1e-9) {
    return { ok: false, reason: "The line is vertical, so it has no slope or y-intercept." };
  }

  const slope = (y2 - y1) / (x2 - x1);
  const yIntercept = y1 - slope * x1;
  const rel = expected.tolerance ?? DEFAULT_RELATIVE_TOLERANCE;
  const allowed = (target: number) => rel * Math.max(Math.abs(target), 1);

  const problems: string[] = [];
  if (Math.abs(slope - expected.slope) > allowed(expected.slope)) {
    problems.push(`slope is ${fmt(slope)}, expected ${fmt(expected.slope)} (±${fmt(allowed(expected.slope))})`);
  }
  if (Math.abs(yIntercept - expected.yIntercept) > allowed(expected.yIntercept)) {
    problems.push(
      `y-intercept is ${fmt(yIntercept)}, expected ${fmt(expected.yIntercept)} (±${fmt(allowed(expected.yIntercept))})`
    );
  }
  if (problems.length > 0) {
    const text = problems.join("; ");
    return { ok: false, reason: text.charAt(0).toUpperCase() + text.slice(1) + "." };
  }
  return { ok: true };
}

// Exact points: a line/segment is just its two defining points; direction
// doesn't matter, so either point-order counts as a match.
function compareTwoPoints(expectedPoints: Point2D[], actualPoints: Point2D[], tolerance: number): CompareResult {
  if (expectedPoints.length < 2 || actualPoints.length < 2) {
    return { ok: false, reason: "Drawing needs two points." };
  }
  const [e1, e2] = expectedPoints;
  const [a1, a2] = actualPoints;
  const sameOrder = dist(e1, a1) <= tolerance && dist(e2, a2) <= tolerance;
  const swappedOrder = dist(e1, a2) <= tolerance && dist(e2, a1) <= tolerance;
  return sameOrder || swappedOrder ? { ok: true } : { ok: false, reason: "Points do not match within tolerance." };
}

// A rectangle is drawn by dragging between any two opposite corners, so compare its extent
// (left, right, bottom, top edges), each within `tolerance`.
function compareRectangle(expectedPoints: Point2D[], actualPoints: Point2D[], tolerance: number): CompareResult {
  if (expectedPoints.length < 2 || actualPoints.length < 2) return { ok: false, reason: "Drawing needs two corners." };
  const extent = ([[x1, y1], [x2, y2]]: Point2D[]) => [Math.min(x1, x2), Math.max(x1, x2), Math.min(y1, y2), Math.max(y1, y2)];
  const e = extent(expectedPoints);
  const a = extent(actualPoints);
  return e.every((v, i) => Math.abs(v - a[i]) <= tolerance)
    ? { ok: true }
    : { ok: false, reason: "The rectangle's corners do not match within tolerance." };
}

// A triangle's three corners can be clicked in any order: some ordering must match each
// expected corner within `tolerance`.
function compareTriangle(expectedPoints: Point2D[], actualPoints: Point2D[], tolerance: number): CompareResult {
  if (expectedPoints.length !== 3 || actualPoints.length !== 3) return { ok: false, reason: "Drawing needs three corners." };
  const orders = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
  const ok = orders.some((order) => order.every((j, i) => dist(expectedPoints[i], actualPoints[j]) <= tolerance));
  return ok ? { ok: true } : { ok: false, reason: "The triangle's corners do not match within tolerance." };
}

function compareVertical(expected: VerticalShape, actual: UserDrawing, boundingBox: BoundingBox): CompareResult {
  const [xMin, xMax, yMin, yMax] = boundingBox;
  if (actual.points.length < 2) return { ok: false, reason: "Drawing needs two points." };
  const allowed = (expected.tolerance ?? 0.05) * (xMax - xMin);
  if (actual.points.some(([x]) => Math.abs(x - expected.x) > allowed)) {
    return { ok: false, reason: "Not a vertical line at the right position." };
  }
  const ys = actual.points.map(([, y]) => y);
  if (Math.max(...ys) - Math.min(...ys) < 0.1 * (yMax - yMin)) {
    return { ok: false, reason: "The line is too short." };
  }
  return { ok: true };
}

/** Distance from `p` to the segment a-b (or to the infinite line through them). */
function distanceToSegment(p: Point2D, a: Point2D, b: Point2D, infinite: boolean): number {
  const [dx, dy] = [b[0] - a[0], b[1] - a[1]];
  const len2 = dx * dx + dy * dy;
  if (len2 === 0) return dist(p, a);
  let t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / len2;
  if (!infinite) t = Math.max(0, Math.min(1, t));
  return dist(p, [a[0] + t * dx, a[1] + t * dy]);
}

// The drawing's points joined in order stand in for the drawn path (a curve's
// spline passes through its points, so this is close enough at board scale).
function compareThroughPoint(expected: ThroughPointShape, actual: UserDrawing, boundingBox: BoundingBox): CompareResult {
  const [xMin, xMax, yMin, yMax] = boundingBox;
  const pts = actual.points;
  if (pts.length < 2) return { ok: false, reason: "Drawing needs two points." };
  const allowed = (expected.tolerance ?? 0.05) * Math.hypot(xMax - xMin, yMax - yMin);
  const infinite = actual.tool === "line";
  const near = pts.slice(1).some((b, i) => distanceToSegment(expected.through, pts[i], b, infinite) <= allowed);
  if (!near) return { ok: false, reason: "It does not pass through the right point." };
  const byX = [...pts].sort((a, b) => a[0] - b[0]);
  const [left, right] = [byX[0], byX[byX.length - 1]];
  const rise = right[1] - left[1];
  if (right[0] - left[0] < 1e-9 || (expected.slope === "up" ? rise <= 0 : rise >= 0)) {
    return { ok: false, reason: `It should slope ${expected.slope === "up" ? "upward" : "downward"}.` };
  }
  return { ok: true };
}

// Color is intentionally never compared - grading only cares about tool + geometry.
function compare(expected: ExpectedShape, actual: UserDrawing, pointTolerance: number, boundingBox: BoundingBox): CompareResult {
  if (isVertical(expected) || isThroughPoint(expected)) {
    if (!LINE_LIKE_TOOLS.includes(actual.tool)) {
      return { ok: false, reason: `Expected a line or curve here, but a "${actual.tool}" was drawn instead.` };
    }
    return isVertical(expected)
      ? compareVertical(expected, actual, boundingBox)
      : compareThroughPoint(expected, actual, boundingBox);
  }
  if (actual.tool !== expected.type) {
    return { ok: false, reason: `Expected a "${expected.type}" here, but a "${actual.tool}" was drawn instead.` };
  }
  if (isSlopeIntercept(expected)) return compareSlopeIntercept(expected, actual);
  if (expected.type === "rectangle") return compareRectangle(expected.points, actual.points, pointTolerance);
  if (expected.type === "triangle") return compareTriangle(expected.points, actual.points, pointTolerance);
  return compareTwoPoints(expected.points, actual.points, pointTolerance);
}

/** Tools whose exact-points/slope-intercept shapes can be graded. */
const GRADABLE_TOOLS: ToolName[] = ["line", "segment", "rectangle", "triangle"];

function gradable(shape: ExpectedShape): boolean {
  return isVertical(shape) || isThroughPoint(shape) || GRADABLE_TOOLS.includes(shape.type);
}

/** Largest matching of expected shapes to distinct drawings (`ok[i][j]`: shape i matches drawing j). */
function bestMatching(ok: boolean[][], drawings: number): (number | null)[] {
  let best: (number | null)[] = ok.map(() => null);
  let bestCount = -1;
  const used = new Array<boolean>(drawings).fill(false);
  const current: (number | null)[] = [];
  const search = (i: number, count: number) => {
    if (count + (ok.length - i) <= bestCount) return;
    if (i === ok.length) {
      bestCount = count;
      best = [...current];
      return;
    }
    for (let j = 0; j < drawings; j++) {
      if (ok[i][j] && !used[j]) {
        used[j] = true;
        current.push(j);
        search(i + 1, count + 1);
        current.pop();
        used[j] = false;
      }
    }
    current.push(null);
    search(i + 1, count);
    current.pop();
  };
  search(0, 0);
  return best;
}

/**
 * Grades the student's drawing against the teacher's expected drawing, shape
 * by shape. By default IN ORDER: expected[0] is checked against the student's
 * 1st drawing, expected[1] against the 2nd, and so on. With `anyOrder`, each
 * expected shape is matched with any one drawing (the best overall matching),
 * text labels and coordinate markers are ignored, and extra drawings lower the
 * score (it is correct / max(expected, drawings)).
 *
 * Supported: "line" and "segment" by exact points or slope + y-intercept,
 * "rectangle" (two opposite corners, either diagonal) and "triangle" (three
 * corners, any order) by exact points, and
 * vertical lines and lines/curves through a point (`VerticalShape`,
 * `ThroughPointShape`, drawn with any of `LINE_LIKE_TOOLS`). Another expected
 * tool is reported as not yet gradable instead of failing. A drawing's color is
 * never part of the check. Slope-intercept, vertical and through-point shapes
 * use their own `tolerance`; exact points use `tolerancePercent`.
 */
export function gradeDrawing(
  expected: ExpectedShape[],
  userDrawings: UserDrawing[],
  boundingBox: BoundingBox,
  { tolerancePercent = 5, anyOrder = false }: GradeOptions = {}
): GradeResult {
  const [xMin, xMax, yMin, yMax] = boundingBox;
  const pointTolerance = (tolerancePercent / 100) * Math.hypot(xMax - xMin, yMax - yMin);
  const total = expected.length;
  const notGradable = (index: number, tool: ToolName): ShapeGradeDetail => ({
    index,
    tool,
    correct: false,
    reason: `Grading for "${tool}" is not implemented yet.`,
  });
  const result = (details: ShapeGradeDetail[], denominator: number, extra: number): GradeResult => {
    const correct = details.filter((d) => d.correct).length;
    return { total, correct, score: denominator === 0 ? 0 : Math.round((correct / denominator) * 100), details, extra };
  };

  if (anyOrder) {
    const drawings = userDrawings.filter((d) => d.tool !== "text" && d.tool !== "coordinate");
    const ok = expected.map((exp) => drawings.map((d) => gradable(exp) && compare(exp, d, pointTolerance, boundingBox).ok));
    const match = bestMatching(ok, drawings.length);
    const details = expected.map((exp, index): ShapeGradeDetail => {
      const tool = exp.type;
      if (!gradable(exp)) return notGradable(index, tool);
      return match[index] === null
        ? { index, tool, correct: false, reason: "No drawing matches this shape." }
        : { index, tool, correct: true, reason: "Matched." };
    });
    return result(details, Math.max(total, drawings.length), Math.max(0, drawings.length - total));
  }

  const details = expected.map((exp, index): ShapeGradeDetail => {
    const tool = exp.type;
    const drawing = userDrawings[index];
    if (!gradable(exp)) return notGradable(index, tool);
    if (!drawing) {
      return { index, tool, correct: false, reason: `Expected a "${tool}" here, but nothing was drawn at this position.` };
    }
    const r = compare(exp, drawing, pointTolerance, boundingBox);
    return r.ok ? { index, tool, correct: true, reason: "Matched." } : { index, tool, correct: false, reason: r.reason };
  });
  return result(details, total, 0);
}
