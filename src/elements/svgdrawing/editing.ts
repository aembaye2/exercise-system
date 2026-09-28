// Pure editing operations used by the drawing editor (no React, easy to test).
import { clamp, clipLineToBox, snapTo, type Box } from "./geometry";
import { plotBox, resolveAxis } from "./gradeDrawing";
import { CURVE_POINTS, type DrawingPart, type DrawnObject, type Pt } from "./types";

interface Grid {
  box: Box;
  snapX: number;
  snapY: number;
}

export function gridOf(part: DrawingPart): Grid {
  return { box: plotBox(part), snapX: resolveAxis(part.x).snap, snapY: resolveAxis(part.y).snap };
}

/** Clamp to the plot, snap to the grid, and clamp again (the box edge may be off-grid). */
export function snapPoint(part: DrawingPart, p: Pt): Pt {
  const { box, snapX, snapY } = gridOf(part);
  const x = clamp(snapTo(clamp(p[0], box.xmin, box.xmax), box.xmin, snapX), box.xmin, box.xmax);
  const y = clamp(snapTo(clamp(p[1], box.ymin, box.ymax), box.ymin, snapY), box.ymin, box.ymax);
  return [x, y];
}

/** Keyboard step per axis (the snap step, or 1% of the range without snapping). */
export function keyStep(part: DrawingPart): { x: number; y: number } {
  const { box, snapX, snapY } = gridOf(part);
  return { x: snapX || (box.xmax - box.xmin) / 100, y: snapY || (box.ymax - box.ymin) / 100 };
}

/** Put a line's two handles at 20% and 80% of its visible part, so both stay grabbable. */
export function normalizeLine(part: DrawingPart, from: Pt, to: Pt): [Pt, Pt] | null {
  const seg = clipLineToBox(from, to, plotBox(part));
  if (!seg) return null;
  const [a, b] = seg;
  const at = (t: number): Pt => [round(a[0] + t * (b[0] - a[0])), round(a[1] + t * (b[1] - a[1]))];
  return [at(0.2), at(0.8)];
}

const round = (x: number) => Number(x.toPrecision(12));

/** A new object for tool `toolIndex`, placed in a sensible default position. */
export function defaultObject(part: DrawingPart, toolIndex: number, existing: DrawnObject[]): DrawnObject {
  const tool = part.tools[toolIndex];
  const { box } = gridOf(part);
  const rx = box.xmax - box.xmin;
  const ry = box.ymax - box.ymin;
  // Stagger repeated objects of the same tool so they don't sit on top of each other.
  const k = existing.filter((o) => o.tool === toolIndex).length;
  const at = (fx: number, fy: number): Pt => snapPoint(part, [box.xmin + (fx + 0.06 * k) * rx, box.ymin + (fy - 0.06 * k) * ry]);

  switch (tool.type) {
    case "point": {
      const [x, y] = at(0.5, 0.5);
      return { type: "point", tool: toolIndex, x, y };
    }
    case "line": {
      const src = tool.copyOf ? (part.initial ?? []).find((o) => o.id === tool.copyOf) : undefined;
      if (src && src.type === "line") {
        const n = normalizeLine(part, src.from, src.to);
        if (n) return { type: "line", tool: toolIndex, from: n[0], to: n[1] };
      }
      return { type: "line", tool: toolIndex, from: at(0.25, 0.25), to: at(0.75, 0.75) };
    }
    case "polygon": {
      const n = tool.vertices ?? 3;
      const offset = n === 4 ? Math.PI / 4 : Math.PI / 2;
      const points = Array.from({ length: n }, (_, i) => {
        const angle = offset + (2 * Math.PI * i) / n;
        return at(0.5 + 0.18 * Math.cos(angle), 0.5 + 0.18 * Math.sin(angle));
      });
      return { type: "polygon", tool: toolIndex, points };
    }
    case "curve": {
      const start: Pt[] =
        tool.start ??
        ([
          [0.12, 0.85],
          [0.3, 0.45],
          [0.55, 0.27],
          [0.88, 0.15],
        ] as Pt[]).map(([fx, fy]) => at(fx, fy));
      return { type: "curve", tool: toolIndex, points: start.map((p) => [...p] as Pt) };
    }
  }
}

/** The draggable points of an object, in order. */
export function handlesOf(obj: DrawnObject): Pt[] {
  switch (obj.type) {
    case "point":
      return [[obj.x, obj.y]];
    case "line":
      return [obj.from, obj.to];
    case "polygon":
    case "curve":
      return obj.points;
  }
}

/** Move handle `h` of `obj` to `p` (snapped). Returns `obj` unchanged if the move isn't allowed. */
export function moveHandle(part: DrawingPart, obj: DrawnObject, h: number, p: Pt): DrawnObject {
  const q = snapPoint(part, p);
  switch (obj.type) {
    case "point":
      return { ...obj, x: q[0], y: q[1] };
    case "line": {
      const other = h === 0 ? obj.to : obj.from;
      if (other[0] === q[0] && other[1] === q[1]) return obj;
      return h === 0 ? { ...obj, from: q } : { ...obj, to: q };
    }
    case "polygon": {
      const points = obj.points.map((pt, i) => (i === h ? q : pt));
      return { ...obj, points };
    }
    case "curve": {
      // Keep x strictly increasing: a handle can't pass its neighbours.
      const { box, snapX } = gridOf(part);
      const gap = snapX || (box.xmax - box.xmin) / 100;
      const lo = h > 0 ? obj.points[h - 1][0] + gap : box.xmin;
      const hi = h < CURVE_POINTS - 1 ? obj.points[h + 1][0] - gap : box.xmax;
      if (lo > hi) return obj;
      const points = obj.points.map((pt, i) => (i === h ? ([clamp(q[0], lo, hi), q[1]] as Pt) : pt));
      return { ...obj, points };
    }
  }
}

/** Move a whole object by `delta` (snapped), keeping it on the plot. */
export function translate(part: DrawingPart, obj: DrawnObject, delta: Pt): DrawnObject {
  const { box, snapX, snapY } = gridOf(part);
  let dx = snapX ? Math.round(delta[0] / snapX) * snapX : delta[0];
  let dy = snapY ? Math.round(delta[1] / snapY) * snapY : delta[1];
  const shift = (p: Pt): Pt => [round(p[0] + dx), round(p[1] + dy)];

  if (obj.type === "line") {
    // A line is infinite: only require that it still crosses the plot.
    const n = normalizeLine(part, shift(obj.from), shift(obj.to));
    return n ? { ...obj, from: n[0], to: n[1] } : obj;
  }
  const pts = handlesOf(obj);
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  dx = clamp(dx, box.xmin - Math.min(...xs), box.xmax - Math.max(...xs));
  dy = clamp(dy, box.ymin - Math.min(...ys), box.ymax - Math.max(...ys));
  switch (obj.type) {
    case "point":
      return { ...obj, x: round(obj.x + dx), y: round(obj.y + dy) };
    case "polygon":
    case "curve":
      return { ...obj, points: obj.points.map(shift) };
  }
}

/** Lenient reader for display: keeps every structurally usable object (validation happens on submit). */
export function readObjects(part: DrawingPart, value: unknown): DrawnObject[] {
  if (!Array.isArray(value)) return [];
  const isPt = (x: unknown): x is Pt => Array.isArray(x) && x.length === 2 && x.every((n) => typeof n === "number" && Number.isFinite(n));
  return value.filter((o): o is DrawnObject => {
    if (typeof o !== "object" || o === null || !Number.isInteger(o.tool) || part.tools[o.tool]?.type !== o.type) return false;
    switch (o.type) {
      case "point":
        return Number.isFinite(o.x) && Number.isFinite(o.y);
      case "line":
        return isPt(o.from) && isPt(o.to);
      case "polygon":
      case "curve":
        return Array.isArray(o.points) && o.points.length >= 2 && o.points.every(isPt);
      default:
        return false;
    }
  });
}
