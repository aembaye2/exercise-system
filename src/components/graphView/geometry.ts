import { AuthoringError } from "../../engine/types";
import { evaluateAt, parseExpression } from "../../elements/expression/mathUtils";
import type { GraphShape, GraphSpec, Point } from "./types";

/** SVG canvas size (viewBox units) and the margins around the plot area. */
export const CANVAS = { width: 260, height: 220, left: 30, right: 24, top: 16, bottom: 28 };

const FUNCTION_SAMPLES = 120;

export interface Scales {
  x(v: number): number;
  y(v: number): number;
  plot: { x: number; y: number; width: number; height: number };
}

export function bounds(spec: GraphSpec) {
  return { xMin: spec.xMin ?? 0, xMax: spec.xMax, yMin: spec.yMin ?? 0, yMax: spec.yMax };
}

/** Maps graph coordinates to SVG coordinates (y grows downward in SVG). */
export function scales(spec: GraphSpec): Scales {
  const { xMin, xMax, yMin, yMax } = bounds(spec);
  const width = CANVAS.width - CANVAS.left - CANVAS.right;
  const height = CANVAS.height - CANVAS.top - CANVAS.bottom;
  return {
    x: (v) => CANVAS.left + ((v - xMin) / (xMax - xMin)) * width,
    y: (v) => CANVAS.top + ((yMax - v) / (yMax - yMin)) * height,
    plot: { x: CANVAS.left, y: CANVAS.top, width, height },
  };
}

/**
 * Points along y = fn(x), split into runs where it's defined. Values far outside the y range
 * are clamped (the plot area clips them), so a steep curve doesn't produce huge coordinates.
 */
export function functionRuns(spec: GraphSpec, shape: Extract<GraphShape, { type: "function" }>): Point[][] {
  const { xMin, xMax, yMin, yMax } = bounds(spec);
  const parsed = parseExpression(shape.fn);
  if (!parsed.ok) return [];
  const [a, b] = shape.domain ?? [xMin, xMax];
  const span = yMax - yMin;
  const runs: Point[][] = [];
  let run: Point[] = [];
  for (let i = 0; i <= FUNCTION_SAMPLES; i++) {
    const x = a + ((b - a) * i) / FUNCTION_SAMPLES;
    const r = evaluateAt(parsed.node, { x });
    if (r.ok) {
      run.push([x, Math.min(yMax + span, Math.max(yMin - span, r.value))]);
    } else if (run.length > 0) {
      runs.push(run);
      run = [];
    }
  }
  if (run.length > 0) runs.push(run);
  return runs.filter((r) => r.length > 1);
}

/** The two back corners of an arrowhead at `to`, `size` long, in SVG coordinates. */
export function arrowHead(from: Point, to: Point, size = 8): [Point, Point] {
  const angle = Math.atan2(to[1] - from[1], to[0] - from[0]);
  const spread = Math.PI / 7;
  return [
    [to[0] - size * Math.cos(angle - spread), to[1] - size * Math.sin(angle - spread)],
    [to[0] - size * Math.cos(angle + spread), to[1] - size * Math.sin(angle + spread)],
  ];
}

export function centroid(points: Point[]): Point {
  const n = points.length || 1;
  return [points.reduce((s, p) => s + p[0], 0) / n, points.reduce((s, p) => s + p[1], 0) / n];
}

function isPoint(p: unknown): p is Point {
  return Array.isArray(p) && p.length === 2 && p.every((v) => typeof v === "number" && Number.isFinite(v));
}

const COLORS = new Set(["blue", "red", "green", "orange", "purple", "gray"]);

/** Throws AuthoringError for a malformed graph. */
export function checkGraph(spec: GraphSpec): void {
  const { xMin, xMax, yMin, yMax } = bounds(spec);
  if (![xMin, xMax, yMin, yMax].every(Number.isFinite) || !(xMin < xMax) || !(yMin < yMax)) {
    throw new AuthoringError("graph needs finite bounds with xMin < xMax and yMin < yMax.");
  }
  if (!Array.isArray(spec.shapes)) throw new AuthoringError("graph needs a shapes array.");
  spec.shapes.forEach((shape, i) => {
    const where = `graph shape ${i + 1} (${String(shape.type)})`;
    if (shape.color !== undefined && !COLORS.has(shape.color)) throw new AuthoringError(`${where}: unknown color "${shape.color}".`);
    switch (shape.type) {
      case "segment":
      case "arrow":
        if (!isPoint(shape.from) || !isPoint(shape.to)) throw new AuthoringError(`${where} needs from and to as [x, y].`);
        return;
      case "point":
      case "text":
        if (!isPoint(shape.at)) throw new AuthoringError(`${where} needs at as [x, y].`);
        return;
      case "polygon":
        if (!Array.isArray(shape.points) || shape.points.length < 3 || !shape.points.every(isPoint)) {
          throw new AuthoringError(`${where} needs at least 3 points as [x, y].`);
        }
        return;
      case "function": {
        const p = typeof shape.fn === "string" ? parseExpression(shape.fn) : undefined;
        if (!p?.ok) throw new AuthoringError(`${where}: fn doesn't parse.`);
        if (shape.domain !== undefined && !(isPoint(shape.domain) && shape.domain[0] < shape.domain[1])) {
          throw new AuthoringError(`${where}: domain must be [min, max] with min < max.`);
        }
        if (functionRuns(spec, shape).length === 0) throw new AuthoringError(`${where}: fn isn't defined anywhere on its domain (it may only use x).`);
        return;
      }
      default:
        throw new AuthoringError(`${where}: unknown shape type.`);
    }
  });
}
