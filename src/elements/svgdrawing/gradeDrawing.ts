import { AuthoringError, type GradeResult, type JsonValue, type ValidationResult } from "../../engine/types";
import {
  clipLineToBox,
  distToLine,
  distToPolyline,
  isConvex,
  isSimplePolygon,
  isStrictlyIncreasingX,
  lineXAt,
  lineYAt,
  niceStep,
  overlapRatio,
  polylineYAt,
  area,
  type Box,
} from "./geometry";
import { CURVE_POINTS, type AnswerObject, type DrawingPart, type DrawnObject, type Pt, type Tol, type Tool } from "./types";

export const DRAWING_DEFAULTS = {
  tolFraction: 0.04, // default tolerance: 4% of each axis range
  ticks: 10, // default grid: ~10 steps per axis
  snaps: 40, // default snapping: ~40 steps per axis
  angleTol: 8, // degrees, for parallel shifts (measured as drawn on screen)
  minOverlap: 0.7,
};

// ---------- Axes and tolerances ----------

export interface ResolvedAxis {
  min: number;
  max: number;
  label: string;
  step: number;
  snap: number;
}

export function resolveAxis(axis: DrawingPart["x"]): ResolvedAxis {
  const min = axis.min ?? 0;
  const range = axis.max - min;
  return {
    min,
    max: axis.max,
    label: axis.label ?? "",
    step: axis.step ?? niceStep(range / DRAWING_DEFAULTS.ticks),
    snap: axis.snap ?? niceStep(range / DRAWING_DEFAULTS.snaps),
  };
}

export function plotBox(part: DrawingPart): Box {
  const x = resolveAxis(part.x);
  const y = resolveAxis(part.y);
  return { xmin: x.min, xmax: x.max, ymin: y.min, ymax: y.max };
}

export function resolveTol(part: DrawingPart, answer?: AnswerObject): { x: number; y: number } {
  const tol: Tol | undefined = answer?.tol ?? part.tol;
  if (tol === undefined) {
    const b = plotBox(part);
    return { x: DRAWING_DEFAULTS.tolFraction * (b.xmax - b.xmin), y: DRAWING_DEFAULTS.tolFraction * (b.ymax - b.ymin) };
  }
  return typeof tol === "number" ? { x: tol, y: tol } : tol;
}

/** Scale so the tolerance ellipse becomes the unit circle: "within tolerance" means distance <= 1. */
function scaler(t: { x: number; y: number }) {
  return (p: Pt): Pt => [p[0] / t.x, p[1] / t.y];
}

// ---------- Parsing the submitted drawing ----------

const isNum = (x: unknown): x is number => typeof x === "number" && Number.isFinite(x);
const isPt = (x: unknown): x is Pt => Array.isArray(x) && x.length === 2 && isNum(x[0]) && isNum(x[1]);
const isRecord = (x: unknown): x is Record<string, unknown> => typeof x === "object" && x !== null && !Array.isArray(x);

export type ParsedDrawing = { ok: true; objects: DrawnObject[] } | { ok: false; message: string };

const UNREADABLE = "Your drawing could not be read. Clear it and draw it again.";

/** Structural check of a submitted value against the part's tools. */
export function parseDrawing(part: DrawingPart, value: JsonValue | undefined): ParsedDrawing {
  if (value === undefined || value === null || (Array.isArray(value) && value.length === 0)) {
    return { ok: false, message: "Draw your answer on the graph before submitting." };
  }
  if (!Array.isArray(value)) return { ok: false, message: UNREADABLE };
  const counts = new Map<number, number>();
  const objects: DrawnObject[] = [];
  for (const raw of value) {
    if (!isRecord(raw) || !Number.isInteger(raw.tool)) return { ok: false, message: UNREADABLE };
    const toolIndex = raw.tool as number;
    const tool = part.tools[toolIndex];
    if (!tool || tool.type !== raw.type) return { ok: false, message: UNREADABLE };
    counts.set(toolIndex, (counts.get(toolIndex) ?? 0) + 1);
    if ((counts.get(toolIndex) ?? 0) > (tool.max ?? 1)) return { ok: false, message: UNREADABLE };

    switch (tool.type) {
      case "point":
        if (!isNum(raw.x) || !isNum(raw.y)) return { ok: false, message: UNREADABLE };
        objects.push({ type: "point", tool: toolIndex, x: raw.x, y: raw.y });
        break;
      case "line":
        if (!isPt(raw.from) || !isPt(raw.to)) return { ok: false, message: UNREADABLE };
        if (raw.from[0] === raw.to[0] && raw.from[1] === raw.to[1]) {
          return { ok: false, message: `The two handles of your ${toolLabel(tool)} are on top of each other. Move one of them.` };
        }
        objects.push({ type: "line", tool: toolIndex, from: raw.from, to: raw.to });
        break;
      case "polygon": {
        const pts = raw.points;
        if (!Array.isArray(pts) || pts.length < 3 || !pts.every(isPt)) return { ok: false, message: UNREADABLE };
        if (!isSimplePolygon(pts)) {
          return { ok: false, message: `The edges of your ${toolLabel(tool)} cross each other. Move its corners so they don't.` };
        }
        if (area(pts) === 0) return { ok: false, message: `Your ${toolLabel(tool)} has no area. Spread its corners apart.` };
        objects.push({ type: "polygon", tool: toolIndex, points: pts });
        break;
      }
      case "curve": {
        const pts = raw.points;
        if (!Array.isArray(pts) || pts.length !== CURVE_POINTS || !pts.every(isPt)) return { ok: false, message: UNREADABLE };
        if (!isStrictlyIncreasingX(pts)) return { ok: false, message: UNREADABLE };
        objects.push({ type: "curve", tool: toolIndex, points: pts });
        break;
      }
    }
  }
  return { ok: true, objects };
}

export function toolLabel(tool: Tool): string {
  if (tool.label) return tool.label;
  return { point: "point", line: "line", polygon: "shaded area", curve: "curve" }[tool.type];
}

// ---------- Authoring checks ----------

export function checkDrawing(part: DrawingPart): void {
  for (const [name, axis] of [["x", part.x], ["y", part.y]] as const) {
    if (!axis || !isNum(axis.max) || !isNum(axis.min ?? 0) || !(axis.max > (axis.min ?? 0))) {
      throw new AuthoringError(`${name} axis needs finite min < max.`);
    }
    if (axis.step !== undefined && !(axis.step > 0)) throw new AuthoringError(`${name} axis step must be > 0.`);
    if (axis.snap !== undefined && !(axis.snap >= 0)) throw new AuthoringError(`${name} axis snap must be >= 0.`);
  }
  if (part.tol !== undefined) checkTol(part.tol, "tol");

  const ids = new Set<string>();
  for (const obj of part.initial ?? []) {
    if (obj.id !== undefined) {
      if (ids.has(obj.id)) throw new AuthoringError(`duplicate initial object id "${obj.id}".`);
      ids.add(obj.id);
    }
  }

  if (!Array.isArray(part.tools) || part.tools.length === 0) throw new AuthoringError("a drawing part needs at least one tool.");
  part.tools.forEach((tool, i) => {
    const where = `tool ${i + 1} (${tool.type})`;
    if (tool.max !== undefined && !(Number.isInteger(tool.max) && tool.max >= 1)) {
      throw new AuthoringError(`${where}: max must be an integer >= 1.`);
    }
    if (tool.type === "line" && tool.copyOf !== undefined) {
      const src = (part.initial ?? []).find((o) => o.id === tool.copyOf);
      if (!src || src.type !== "line") throw new AuthoringError(`${where}: copyOf "${tool.copyOf}" is not an initial line id.`);
    }
    if (tool.type === "polygon" && tool.vertices !== undefined && !(Number.isInteger(tool.vertices) && tool.vertices >= 3)) {
      throw new AuthoringError(`${where}: vertices must be an integer >= 3.`);
    }
    if (tool.type === "curve" && tool.start !== undefined) {
      if (tool.start.length !== CURVE_POINTS || !tool.start.every(isPt) || !isStrictlyIncreasingX(tool.start)) {
        throw new AuthoringError(`${where}: start needs ${CURVE_POINTS} points with strictly increasing x.`);
      }
    }
  });

  if (!Array.isArray(part.answer) || part.answer.length === 0) throw new AuthoringError("a drawing part needs at least one answer object.");
  const x = resolveAxis(part.x);
  const y = resolveAxis(part.y);
  for (const ans of part.answer) {
    const where = `answer "${ans.label}"`;
    if (!ans.label) throw new AuthoringError("every answer object needs a label (used in feedback).");
    if (ans.weight !== undefined && !(ans.weight >= 0)) throw new AuthoringError(`${where}: weight must be >= 0.`);
    if (ans.tol !== undefined) checkTol(ans.tol, `${where}: tol`);
    const t = resolveTol(part, ans);
    // A point snapped to the grid can be up to half a snap step off on each axis.
    if (Math.hypot(x.snap / 2 / t.x, y.snap / 2 / t.y) >= 1) {
      throw new AuthoringError(`${where}: the snap step is too coarse for its tolerance. Lower axis snap or raise tol.`);
    }
    switch (ans.type) {
      case "point":
        if (!isNum(ans.x) || !isNum(ans.y)) throw new AuthoringError(`${where}: point needs finite x and y.`);
        break;
      case "line":
        if ("shiftOf" in ans) {
          const { from, to } = ans.shiftOf;
          if (!isPt(from) || !isPt(to) || (from[0] === to[0] && from[1] === to[1])) {
            throw new AuthoringError(`${where}: shiftOf needs two different points.`);
          }
          if (!["up", "down", "left", "right"].includes(ans.direction)) throw new AuthoringError(`${where}: unknown direction.`);
          if ((ans.direction === "up" || ans.direction === "down") && from[0] === to[0]) {
            throw new AuthoringError(`${where}: a vertical line can't shift up or down.`);
          }
          if ((ans.direction === "left" || ans.direction === "right") && from[1] === to[1]) {
            throw new AuthoringError(`${where}: a horizontal line can't shift left or right.`);
          }
        } else if (!isPt(ans.from) || !isPt(ans.to) || (ans.from[0] === ans.to[0] && ans.from[1] === ans.to[1])) {
          throw new AuthoringError(`${where}: line needs two different points.`);
        }
        break;
      case "polygon":
        if (!Array.isArray(ans.points) || !ans.points.every(isPt) || !isConvex(ans.points)) {
          throw new AuthoringError(`${where}: polygon answers must be convex with at least 3 corners.`);
        }
        if (ans.minOverlap !== undefined && !(ans.minOverlap > 0 && ans.minOverlap <= 1)) {
          throw new AuthoringError(`${where}: minOverlap must be in (0, 1].`);
        }
        break;
      case "curve":
        if (!Array.isArray(ans.points) || ans.points.length < 2 || !ans.points.every(isPt) || !isStrictlyIncreasingX(ans.points)) {
          throw new AuthoringError(`${where}: curve needs at least 2 reference points with strictly increasing x.`);
        }
        if (ans.through !== undefined && !isPt(ans.through)) throw new AuthoringError(`${where}: through must be a point.`);
        break;
    }
  }

  // Every answer needs a tool that can draw it, with enough capacity.
  for (const type of ["point", "line", "polygon", "curve"] as const) {
    const needed = part.answer.filter((a) => a.type === type).length;
    const available = part.tools.filter((t) => t.type === type).reduce((n, t) => n + (t.max ?? 1), 0);
    if (needed > available) throw new AuthoringError(`the answer has ${needed} ${type}(s) but the tools allow only ${available}.`);
  }
}

function checkTol(tol: Tol, where: string): void {
  const ok = typeof tol === "number" ? tol > 0 : isRecord(tol) && tol.x > 0 && tol.y > 0;
  if (!ok) throw new AuthoringError(`${where} must be > 0.`);
}

// ---------- Grading ----------

interface ObjectScore {
  score: number; // 0..1
  message?: string; // shown when score < 1
}

/** Score one drawn object against one answer object of the same type. Pure. */
export function scoreObject(part: DrawingPart, ans: AnswerObject, obj: DrawnObject): ObjectScore {
  const t = resolveTol(part, ans);
  const s = scaler(t);
  const box = plotBox(part);
  const wrongPlace = { score: 0, message: `Your ${ans.label} is not in the right place.` };

  if (ans.type === "point" && obj.type === "point") {
    const d = Math.hypot((obj.x - ans.x) / t.x, (obj.y - ans.y) / t.y);
    return d <= 1 ? { score: 1 } : wrongPlace;
  }

  if (ans.type === "line" && obj.type === "line") {
    if ("shiftOf" in ans) return scoreShift(part, ans, obj, t);
    // Both ends of the visible reference line must lie on the drawn (infinite) line.
    const [a, b] = clipLineToBox(ans.from, ans.to, box) ?? [ans.from, ans.to];
    const ok = [a, b].every((p) => distToLine(s(p), s(obj.from), s(obj.to)) <= 1);
    return ok ? { score: 1 } : wrongPlace;
  }

  if (ans.type === "polygon" && obj.type === "polygon") {
    const ratio = overlapRatio(obj.points, ans.points);
    return ratio >= (ans.minOverlap ?? DRAWING_DEFAULTS.minOverlap)
      ? { score: 1 }
      : { score: 0, message: `Your ${ans.label} doesn't cover the right area.` };
  }

  if (ans.type === "curve" && obj.type === "curve") {
    // Only the two middle points are graded; the end points just shape the tails.
    const middle = obj.points.slice(1, CURVE_POINTS - 1);
    const relation = ans.relation ?? "on";
    const ref = ans.points.map(s);
    let passed = 0;
    let total = 0;
    for (const p of middle) {
      total++;
      if (relation === "on") {
        if (distToPolyline(s(p), ref) <= 1) passed++;
      } else {
        const gap = p[1] - polylineYAt(ans.points, p[0]);
        if (relation === "above" ? gap > t.y : gap < -t.y) passed++;
      }
    }
    const messages: string[] = [];
    if (passed < total) messages.push(`The two middle points of your ${ans.label} are not in the right place.`);
    if (ans.through) {
      total++;
      const target = s(ans.through);
      if (middle.some((p) => Math.hypot(s(p)[0] - target[0], s(p)[1] - target[1]) <= 1)) passed++;
      else messages.push(`Your ${ans.label} doesn't pass through the right point with one of its middle points.`);
    }
    return { score: passed / total, message: messages.join(" ") || undefined };
  }

  return { score: 0 };
}

function scoreShift(
  part: DrawingPart,
  ans: Extract<AnswerObject, { shiftOf: unknown }>,
  obj: Extract<DrawnObject, { type: "line" }>,
  t: { x: number; y: number },
): ObjectScore {
  const box = plotBox(part);
  const rx = box.xmax - box.xmin;
  const ry = box.ymax - box.ymin;
  const { from, to } = ans.shiftOf;
  // Compare directions as they look on screen (each axis scaled to the plot size).
  const u: Pt = [(to[0] - from[0]) / rx, (to[1] - from[1]) / ry];
  const v: Pt = [(obj.to[0] - obj.from[0]) / rx, (obj.to[1] - obj.from[1]) / ry];
  const cos = Math.abs(u[0] * v[0] + u[1] * v[1]) / (Math.hypot(...u) * Math.hypot(...v));
  const angle = (Math.acos(Math.min(1, cos)) * 180) / Math.PI;
  if (angle > (ans.angleTol ?? DRAWING_DEFAULTS.angleTol)) {
    return { score: 0, message: `Your ${ans.label} should be parallel to the original line: shift it, don't rotate it.` };
  }

  const [a, b] = clipLineToBox(from, to, box) ?? [from, to];
  let offset: number;
  let tol: number;
  if (ans.direction === "up" || ans.direction === "down") {
    const xm = (a[0] + b[0]) / 2;
    offset = lineYAt(obj.from, obj.to, xm) - lineYAt(from, to, xm);
    tol = t.y;
  } else {
    const ym = (a[1] + b[1]) / 2;
    offset = lineXAt(obj.from, obj.to, ym) - lineXAt(from, to, ym);
    tol = t.x;
  }
  if (!Number.isFinite(offset)) return { score: 0, message: `Your ${ans.label} is not shifted the right way.` };
  if (Math.abs(offset) <= tol) return { score: 0, message: `Your ${ans.label} hasn't moved far enough from the original line.` };
  const positive = ans.direction === "up" || ans.direction === "right";
  return (offset > 0) === positive ? { score: 1 } : { score: 0, message: `Your ${ans.label} is not shifted the right way.` };
}

interface Matching {
  score: number;
  assigned: (number | null)[]; // answer index -> drawn object index
  objectScores: (ObjectScore | null)[];
}

/**
 * Match answer objects to drawn objects (same type, each used once) to maximise
 *   sum(weight * objectScore) / (sum(weight) + extras * averageWeight)
 * where `extras` are drawn objects matched to no answer. Drawings are small,
 * so an exhaustive search is fine.
 */
export function matchDrawing(part: DrawingPart, objects: DrawnObject[]): Matching {
  const answers = part.answer;
  const weights = answers.map((a) => a.weight ?? 1);
  const totalWeight = weights.reduce((s, w) => s + w, 0);
  const avgWeight = totalWeight / answers.length || 1;
  const table = answers.map((ans) => objects.map((obj) => (obj.type === ans.type ? scoreObject(part, ans, obj) : null)));

  let best: Matching = { score: -1, assigned: [], objectScores: [] };
  const assigned: (number | null)[] = [];
  const used = new Set<number>();

  const search = (i: number, earned: number) => {
    if (i === answers.length) {
      const extras = objects.length - used.size;
      const denom = totalWeight + extras * avgWeight;
      const score = denom > 0 ? earned / denom : 0;
      if (score > best.score + 1e-12) {
        best = { score, assigned: [...assigned], objectScores: assigned.map((j, k) => (j === null ? null : table[k][j])) };
      }
      return;
    }
    for (let j = 0; j < objects.length; j++) {
      const cell = table[i][j];
      if (!cell || used.has(j)) continue;
      used.add(j);
      assigned.push(j);
      search(i + 1, earned + weights[i] * cell.score);
      assigned.pop();
      used.delete(j);
    }
    assigned.push(null);
    search(i + 1, earned);
    assigned.pop();
  };
  search(0, 0);
  return { ...best, score: Math.max(0, best.score) };
}

export function validateDrawing(part: DrawingPart, value: JsonValue | undefined): ValidationResult {
  const p = parseDrawing(part, value);
  return p.ok ? { valid: true } : { valid: false, message: p.message };
}

export function gradeDrawing(part: DrawingPart, value: JsonValue | undefined): GradeResult {
  const p = parseDrawing(part, value);
  if (!p.ok) return { score: 0 };
  const m = matchDrawing(part, p.objects);
  const messages: string[] = [];
  part.answer.forEach((ans, i) => {
    const os = m.objectScores[i];
    if (!os) messages.push(`You haven't drawn the ${ans.label}.`);
    else if (os.score < 1 && os.message) messages.push(os.message);
  });
  const extras = p.objects.length - m.assigned.filter((j) => j !== null).length;
  if (extras > 0) messages.push(`You drew ${extras} extra object${extras === 1 ? "" : "s"}, which lowers your score.`);
  return { score: m.score, feedback: messages.join(" ") || undefined };
}

// ---------- Example (correct) drawing ----------

/**
 * One drawing that earns full marks. Shown in green once the question is finished,
 * and used by the tests to check that every question is solvable.
 */
export function exampleDrawing(part: DrawingPart): DrawnObject[] {
  const remaining = part.tools.map((t) => t.max ?? 1);
  const box = plotBox(part);
  const out: DrawnObject[] = [];

  const takeTool = (type: Tool["type"], prefer?: (t: Tool) => boolean): number => {
    const order = part.tools.map((_, i) => i).filter((i) => part.tools[i].type === type && remaining[i] > 0);
    const i = order.find((k) => prefer?.(part.tools[k])) ?? order[0];
    if (i === undefined) return -1;
    remaining[i]--;
    return i;
  };

  for (const ans of part.answer) {
    const t = resolveTol(part, ans);
    switch (ans.type) {
      case "point": {
        const tool = takeTool("point");
        if (tool >= 0) out.push({ type: "point", tool, x: ans.x, y: ans.y });
        break;
      }
      case "line": {
        const tool = takeTool("line", (tl) => tl.type === "line" && tl.copyOf !== undefined);
        if (tool < 0) break;
        if ("shiftOf" in ans) {
          const d = { up: [0, 3 * t.y], down: [0, -3 * t.y], left: [-3 * t.x, 0], right: [3 * t.x, 0] }[ans.direction];
          const move = (p: Pt): Pt => [p[0] + d[0], p[1] + d[1]];
          out.push({ type: "line", tool, from: move(ans.shiftOf.from), to: move(ans.shiftOf.to) });
        } else {
          out.push({ type: "line", tool, from: ans.from, to: ans.to });
        }
        break;
      }
      case "polygon": {
        const tool = takeTool("polygon");
        if (tool >= 0) out.push({ type: "polygon", tool, points: ans.points.map((p) => [...p] as Pt) });
        break;
      }
      case "curve": {
        const tool = takeTool("curve");
        if (tool < 0) break;
        const ref = ans.points;
        const xl = ref[0][0];
        const xr = ref[ref.length - 1][0];
        const w = xr - xl;
        const shift = ans.relation === "above" ? 3 * t.y : ans.relation === "below" ? -3 * t.y : 0;
        const yAt = (x: number) => polylineYAt(ref, Math.min(xr, Math.max(xl, x))) + shift;
        let m1x = ans.through ? ans.through[0] : xl + 0.35 * w;
        let m2x = m1x + 0.2 * w <= xr ? m1x + 0.2 * w : m1x - 0.2 * w;
        if (m2x < m1x) [m1x, m2x] = [m2x, m1x];
        const mid = (x: number): Pt => (ans.through && x === ans.through[0] ? [...ans.through] : [x, yAt(x)]);
        const spread = 0.2 * w || 0.1 * (box.xmax - box.xmin);
        out.push({
          type: "curve",
          tool,
          points: [[m1x - spread, yAt(m1x - spread)], mid(m1x), mid(m2x), [m2x + spread, yAt(m2x + spread)]],
        });
        break;
      }
    }
  }
  return out;
}

// ---------- Formatting ----------

export function fmt(x: number): string {
  return String(Number(x.toPrecision(4)));
}

const fmtPt = (p: Pt) => `(${fmt(p[0])}, ${fmt(p[1])})`;

export function describeObject(part: DrawingPart, obj: DrawnObject): string {
  const label = toolLabel(part.tools[obj.tool] ?? { type: obj.type });
  switch (obj.type) {
    case "point":
      return `${label} at ${fmtPt([obj.x, obj.y])}`;
    case "line":
      return `${label} through ${fmtPt(obj.from)} and ${fmtPt(obj.to)}`;
    case "polygon":
      return `${label} with corners ${obj.points.map(fmtPt).join(", ")}`;
    case "curve":
      return `${label} through ${obj.points.map(fmtPt).join(", ")}`;
  }
}

export function formatDrawingAnswer(part: DrawingPart, value: JsonValue | undefined): string {
  const p = parseDrawing(part, value);
  if (!p.ok) return Array.isArray(value) && value.length > 0 ? "_(unreadable drawing)_" : "_(nothing drawn)_";
  return p.objects.map((o) => describeObject(part, o)).join("; ");
}

export function formatDrawingCorrect(part: DrawingPart): string {
  const shifts = part.answer.filter((a) => a.type === "line" && "shiftOf" in a);
  const note = shifts.length > 0 ? " Any parallel shift in the right direction is accepted." : "";
  return `shown in green on the graph (${part.answer.map((a) => a.label).join(", ")}).${note}`;
}

export function drawingHelpText(part: DrawingPart): string | undefined {
  if (part.showHelpText === false) return undefined;
  const base = "Add objects with the buttons, then drag their round handles. You can also Tab to a handle and move it with the arrow keys (Shift + arrow for bigger steps; Delete removes the object).";
  const curve = part.tools.some((t) => t.type === "curve")
    ? " A curve has 4 points: only the two middle points are graded; the end points just shape its tails."
    : "";
  const line = part.tools.some((t) => t.type === "line") ? " Drag a line's square handle to move it without turning it." : "";
  return base + line + curve;
}
