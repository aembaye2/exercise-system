import { AuthoringError, type GradeResult, type JsonValue, type ValidationResult } from "../../engine/types";
// Import the pure grader directly, so the logic and its tests don't load the JSXGraph board.
import { DEFAULT_BOUNDING_BOX, gradeDrawing } from "../../components/jsxgraphComponent/canvas/grading";
import type { JsxGraphPart, JsxGraphValue } from "./types";

export function checkJsxGraph(part: JsxGraphPart): void {
  const shapes = part.props?.expectedDrawing;
  if (!Array.isArray(shapes) || shapes.length === 0) {
    throw new AuthoringError(`jsxgraph part "${part.name}" needs props.expectedDrawing with at least one shape.`);
  }
}

/** The drawings held by a value, or [] if it isn't a list of drawn shapes. */
export function readDrawings(value: JsonValue | undefined): JsxGraphValue {
  if (!Array.isArray(value)) return [];
  const shapes = value.every(
    (v) => typeof v === "object" && v !== null && !Array.isArray(v) && typeof v.tool === "string" && Array.isArray(v.points),
  );
  return shapes ? (value as unknown as JsxGraphValue) : [];
}

export function validateJsxGraph(_part: JsxGraphPart, value: JsonValue | undefined): ValidationResult {
  return readDrawings(value).length > 0
    ? { valid: true }
    : { valid: false, message: "Draw your answer on the graph before you submit." };
}

/** The score is the share of expected shapes the student drew correctly. */
export function gradeJsxGraph(part: JsxGraphPart, value: JsonValue | undefined): GradeResult {
  const result = gradeDrawing(part.props.expectedDrawing, readDrawings(value), part.props.boundingBox ?? DEFAULT_BOUNDING_BOX);
  const score = Math.min(1, Math.max(0, result.score / 100));
  // The detailed reasons quote the expected values, so they aren't shown.
  const wrong = result.details.filter((d) => !d.correct).map((d) => `shape ${d.index + 1} (${d.tool})`);
  const feedback =
    `${result.correct} of ${result.total} shapes drawn correctly.` + (wrong.length ? ` Check ${wrong.join(", ")}.` : "");
  return { score, feedback };
}

/**
 * Each shape with its points (2 decimals), e.g. "Drew 2 shapes: segment (0, 8.33) to (10, 0); point (3.2, 5)."
 * Also the answer reported to an LMS, so a teacher can see where the student drew.
 */
export function formatJsxGraphAnswer(_part: JsxGraphPart, value: JsonValue | undefined): string {
  const drawings = readDrawings(value);
  if (drawings.length === 0) return "*(no drawing)*";
  const xy = ([x, y]: [number, number]) => `(${round2(x)}, ${round2(y)})`;
  const shapes = drawings.map((d) => {
    const points = d.points.map(xy).join(d.tool === "segment" ? " to " : ", ");
    const extra = d.text ? ` "${d.text}"` : d.radius !== undefined ? ` radius ${round2(d.radius)}` : "";
    return `${d.tool} ${points}${extra}`.trim();
  });
  return `Drew ${drawings.length} shape${drawings.length === 1 ? "" : "s"}: ${shapes.join("; ")}.`;
}

const round2 = (n: number) => String(Math.round(n * 100) / 100);

/** A number for display: at most 3 decimals, no trailing zeros. */
const round = (n: number) => String(Math.round(n * 1000) / 1000);

function describeShape(shape: Record<string, unknown>): string {
  const { type, slope, yIntercept, points } = shape;
  const kind = String(type);
  if (typeof slope === "number" && typeof yIntercept === "number") {
    return `a ${kind} on the line y = ${round(slope)}x + ${round(yIntercept)}`;
  }
  return Array.isArray(points) ? `a ${kind} through ${JSON.stringify(points)}` : `a ${kind}`;
}

export function formatJsxGraphCorrect(part: JsxGraphPart): string {
  return `Draw ${part.props.expectedDrawing.map((s) => describeShape(s as unknown as Record<string, unknown>)).join("; ")}.`;
}

export function jsxGraphHelpText(): string {
  return "Draw on the graph. Your drawing is checked when you press Grade (or Save).";
}

/** A drawing a perfect student would submit, for tests: exact points on each expected shape. */
export function exampleJsxGraph(part: JsxGraphPart): JsxGraphValue {
  const [xMin, xMax] = part.props.boundingBox ?? DEFAULT_BOUNDING_BOX;
  return part.props.expectedDrawing.map((shape) => {
    if ("slope" in shape) {
      const at = (x: number): [number, number] => [x, shape.slope * x + shape.yIntercept];
      return { tool: shape.type, points: [at(xMin + 1), at(xMax - 1)], color: "#111827" };
    }
    return { tool: shape.type, points: shape.points, color: "#111827" };
  });
}
