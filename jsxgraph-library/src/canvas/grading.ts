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

/** A shape the teacher expects the student to draw: either the same shape as
 * `InitialObjectSpec` (tool + exact points), or a line/segment given by slope
 * and y-intercept. */
export type ExpectedShape = InitialObjectSpec | SlopeInterceptShape;

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
}

export const DEFAULT_RELATIVE_TOLERANCE = 0.1;

function isSlopeIntercept(shape: ExpectedShape): shape is SlopeInterceptShape {
  return "slope" in shape && "yIntercept" in shape;
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
  if (!isSlopeIntercept(shape)) return shape;
  const { slope, yIntercept, color } = shape;
  const [, xMax, , yMax] = boundingBox;
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

/** Tool-specific comparators: given the expected shape and a candidate
 * (already tool-matched) drawing, plus the board-based point tolerance,
 * decide whether they count as the same shape. Add an entry here to support
 * grading another tool - everything else in `gradeDrawing` is tool-agnostic. */
type Comparator = (expected: ExpectedShape, actual: UserDrawing, pointTolerance: number) => CompareResult;

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

// Color is intentionally never compared - grading only cares about tool + geometry.
const lineComparator: Comparator = (expected, actual, pointTolerance) =>
  isSlopeIntercept(expected)
    ? compareSlopeIntercept(expected, actual)
    : compareTwoPoints(expected.points, actual.points, pointTolerance);

const comparators: Partial<Record<ToolName, Comparator>> = {
  line: lineComparator,
  segment: lineComparator,
};

/**
 * Grades the student's drawing against the teacher's expected drawing, shape
 * by shape, IN ORDER: expected[0] is checked against the student's 1st
 * drawing, expected[1] against the 2nd, and so on.
 *
 * General by design: each expected shape is handed, together with the
 * student's drawing at that same position, to that shape's `tool` comparator
 * in `comparators` to check the geometry within tolerance. A tool with no
 * comparator is reported as not yet gradable instead of failing. Currently
 * "line" and "segment" are implemented, either by exact points or by
 * slope + y-intercept; a drawing's color is never part of the check.
 *
 * @param tolerancePercent Allowed positional error for point-based expected
 * shapes, as a percentage of the board's diagonal size (`boundingBox`).
 * Defaults to 5. Slope-intercept shapes use their own `tolerance` instead.
 */
export function gradeDrawing(
  expected: ExpectedShape[],
  userDrawings: UserDrawing[],
  boundingBox: BoundingBox,
  tolerancePercent = 5
): GradeResult {
  const [xMin, xMax, yMin, yMax] = boundingBox;
  const pointTolerance = (tolerancePercent / 100) * Math.hypot(xMax - xMin, yMax - yMin);

  const details: ShapeGradeDetail[] = [];
  let correct = 0;

  for (let index = 0; index < expected.length; index++) {
    const exp = expected[index];
    const tool = exp.type;
    const drawing = userDrawings[index];
    const comparator = comparators[tool];

    if (!comparator) {
      details.push({
        index,
        tool,
        correct: false,
        reason: `Grading for "${tool}" is not implemented yet.`,
      });
      continue;
    }

    if (!drawing) {
      details.push({
        index,
        tool,
        correct: false,
        reason: `Expected a "${tool}" here, but nothing was drawn at this position.`,
      });
      continue;
    }

    if (drawing.tool !== tool) {
      details.push({
        index,
        tool,
        correct: false,
        reason: `Expected a "${tool}" here, but a "${drawing.tool}" was drawn instead.`,
      });
      continue;
    }

    const result = comparator(exp, drawing, pointTolerance);
    if (!result.ok) {
      details.push({ index, tool, correct: false, reason: result.reason });
      continue;
    }

    correct += 1;
    details.push({ index, tool, correct: true, reason: "Matched." });
  }

  const total = expected.length;
  return {
    total,
    correct,
    score: total === 0 ? 0 : Math.round((correct / total) * 100),
    details,
  };
}
