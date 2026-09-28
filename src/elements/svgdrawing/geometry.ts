import type { Pt } from "./types";

export interface Box {
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
}

/** A "nice" step (1, 2 or 5 × 10^k) nearest to `raw`. */
export function niceStep(raw: number): number {
  if (!(raw > 0) || !Number.isFinite(raw)) return 1;
  const exp = Math.floor(Math.log10(raw));
  const base = 10 ** exp;
  const candidates = [1, 2, 5, 10].map((m) => m * base);
  return candidates.reduce((best, c) => (Math.abs(Math.log(c / raw)) < Math.abs(Math.log(best / raw)) ? c : best));
}

export function snapTo(value: number, origin: number, step: number): number {
  if (!(step > 0)) return value;
  // Round away float noise so snapped values print cleanly.
  return Number((origin + Math.round((value - origin) / step) * step).toPrecision(12));
}

export function clamp(x: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, x));
}

// ---------- Monotone cubic interpolation (PCHIP, Fritsch–Carlson) ----------

/**
 * Slopes at each knot for monotone piecewise-cubic Hermite interpolation.
 * The curve passes through every point and never overshoots: where the data
 * is decreasing, the curve is decreasing. Requires strictly increasing x.
 */
export function pchipSlopes(points: Pt[]): number[] {
  const n = points.length;
  if (n < 2) return n === 1 ? [0] : [];
  const h: number[] = [];
  const d: number[] = [];
  for (let k = 0; k < n - 1; k++) {
    h.push(points[k + 1][0] - points[k][0]);
    d.push((points[k + 1][1] - points[k][1]) / h[k]);
  }
  if (n === 2) return [d[0], d[0]];

  const m = new Array<number>(n).fill(0);
  for (let k = 1; k < n - 1; k++) {
    if (d[k - 1] * d[k] <= 0) continue; // local extremum or flat: zero slope keeps monotonicity
    const w1 = 2 * h[k] + h[k - 1];
    const w2 = h[k] + 2 * h[k - 1];
    m[k] = (w1 + w2) / (w1 / d[k - 1] + w2 / d[k]);
  }
  m[0] = endSlope(h[0], h[1], d[0], d[1]);
  m[n - 1] = endSlope(h[n - 2], h[n - 3], d[n - 2], d[n - 3]);
  return m;
}

/** Shape-preserving one-sided three-point end slope (as in SciPy's PchipInterpolator). */
function endSlope(h0: number, h1: number, d0: number, d1: number): number {
  let m = ((2 * h0 + h1) * d0 - h0 * d1) / (h0 + h1);
  if (Math.sign(m) !== Math.sign(d0)) m = 0;
  else if (Math.sign(d0) !== Math.sign(d1) && Math.abs(m) > Math.abs(3 * d0)) m = 3 * d0;
  return m;
}

/** Cubic Bézier segments [P0, C1, C2, P3] equal to the PCHIP curve (exact, for SVG paths). */
export function pchipBeziers(points: Pt[]): [Pt, Pt, Pt, Pt][] {
  const m = pchipSlopes(points);
  const segs: [Pt, Pt, Pt, Pt][] = [];
  for (let k = 0; k < points.length - 1; k++) {
    const [x0, y0] = points[k];
    const [x1, y1] = points[k + 1];
    const h = x1 - x0;
    segs.push([
      [x0, y0],
      [x0 + h / 3, y0 + (m[k] * h) / 3],
      [x1 - h / 3, y1 - (m[k + 1] * h) / 3],
      [x1, y1],
    ]);
  }
  return segs;
}

/** Evaluate the PCHIP curve at x (clamped to the knot range). */
export function pchipEval(points: Pt[], x: number): number {
  const n = points.length;
  if (n === 0) return NaN;
  if (n === 1) return points[0][1];
  const m = pchipSlopes(points);
  const xc = clamp(x, points[0][0], points[n - 1][0]);
  let k = 0;
  while (k < n - 2 && xc > points[k + 1][0]) k++;
  const [x0, y0] = points[k];
  const [x1, y1] = points[k + 1];
  const h = x1 - x0;
  const t = (xc - x0) / h;
  const t2 = t * t;
  const t3 = t2 * t;
  return (
    (2 * t3 - 3 * t2 + 1) * y0 + (t3 - 2 * t2 + t) * h * m[k] + (-2 * t3 + 3 * t2) * y1 + (t3 - t2) * h * m[k + 1]
  );
}

/** Sample y = f(x) as a polyline, e.g. for a reference indifference curve y = k / x. */
export function sampleFunction(f: (x: number) => number, xmin: number, xmax: number, n = 60): Pt[] {
  const pts: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const x = xmin + ((xmax - xmin) * i) / (n - 1);
    const y = f(x);
    if (Number.isFinite(y)) pts.push([x, y]);
  }
  return pts;
}

/** Linear interpolation on a polyline with increasing x; NaN outside its x-range. */
export function polylineYAt(points: Pt[], x: number): number {
  for (let k = 0; k < points.length - 1; k++) {
    const [x0, y0] = points[k];
    const [x1, y1] = points[k + 1];
    if (x >= x0 && x <= x1) return x1 === x0 ? y0 : y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
  }
  return NaN;
}

export function isStrictlyIncreasingX(points: Pt[]): boolean {
  return points.every((p, i) => i === 0 || p[0] > points[i - 1][0]);
}

// ---------- Lines and distances ----------

export function dist(a: Pt, b: Pt): number {
  return Math.hypot(a[0] - b[0], a[1] - b[1]);
}

/** Distance from p to the infinite line through a and b. */
export function distToLine(p: Pt, a: Pt, b: Pt): number {
  const len = dist(a, b);
  if (len === 0) return dist(p, a);
  return Math.abs((b[0] - a[0]) * (a[1] - p[1]) - (a[0] - p[0]) * (b[1] - a[1])) / len;
}

/** Distance from p to the segment ab. */
export function distToSegment(p: Pt, a: Pt, b: Pt): number {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len2 = dx * dx + dy * dy;
  if (len2 === 0) return dist(p, a);
  const t = clamp(((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / len2, 0, 1);
  return dist(p, [a[0] + t * dx, a[1] + t * dy]);
}

export function distToPolyline(p: Pt, points: Pt[]): number {
  if (points.length === 1) return dist(p, points[0]);
  let best = Infinity;
  for (let k = 0; k < points.length - 1; k++) best = Math.min(best, distToSegment(p, points[k], points[k + 1]));
  return best;
}

/** The part of the infinite line through a and b that lies inside the box, or null. */
export function clipLineToBox(a: Pt, b: Pt, box: Box): [Pt, Pt] | null {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  if (dx === 0 && dy === 0) return null;
  let t0 = -Infinity;
  let t1 = Infinity;
  const edges: [number, number][] = [
    [-dx, a[0] - box.xmin],
    [dx, box.xmax - a[0]],
    [-dy, a[1] - box.ymin],
    [dy, box.ymax - a[1]],
  ];
  for (const [p, q] of edges) {
    if (p === 0) {
      if (q < 0) return null;
    } else {
      const r = q / p;
      if (p < 0) t0 = Math.max(t0, r);
      else t1 = Math.min(t1, r);
    }
  }
  if (t0 > t1) return null;
  return [
    [a[0] + t0 * dx, a[1] + t0 * dy],
    [a[0] + t1 * dx, a[1] + t1 * dy],
  ];
}

/** y on the infinite line through a, b at x (NaN for vertical lines). */
export function lineYAt(a: Pt, b: Pt, x: number): number {
  if (b[0] === a[0]) return NaN;
  return a[1] + ((b[1] - a[1]) * (x - a[0])) / (b[0] - a[0]);
}

/** x on the infinite line through a, b at y (NaN for horizontal lines). */
export function lineXAt(a: Pt, b: Pt, y: number): number {
  if (b[1] === a[1]) return NaN;
  return a[0] + ((b[0] - a[0]) * (y - a[1])) / (b[1] - a[1]);
}

// ---------- Polygons ----------

/** Signed area (positive when counter-clockwise). */
export function signedArea(points: Pt[]): number {
  let s = 0;
  for (let i = 0; i < points.length; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[(i + 1) % points.length];
    s += x0 * y1 - x1 * y0;
  }
  return s / 2;
}

export function area(points: Pt[]): number {
  return Math.abs(signedArea(points));
}

function cross(o: Pt, a: Pt, b: Pt): number {
  return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
}

export function isConvex(points: Pt[]): boolean {
  const n = points.length;
  if (n < 3) return false;
  let sign = 0;
  for (let i = 0; i < n; i++) {
    const c = cross(points[i], points[(i + 1) % n], points[(i + 2) % n]);
    if (Math.abs(c) < 1e-12) continue;
    if (sign === 0) sign = Math.sign(c);
    else if (Math.sign(c) !== sign) return false;
  }
  return sign !== 0;
}

function segmentsCross(a: Pt, b: Pt, c: Pt, d: Pt): boolean {
  const d1 = cross(c, d, a);
  const d2 = cross(c, d, b);
  const d3 = cross(a, b, c);
  const d4 = cross(a, b, d);
  return ((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) && ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0));
}

/** True if no two non-adjacent edges cross. */
export function isSimplePolygon(points: Pt[]): boolean {
  const n = points.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (j === i + 1 || (i === 0 && j === n - 1)) continue; // adjacent edges share a vertex
      if (segmentsCross(points[i], points[(i + 1) % n], points[j], points[(j + 1) % n])) return false;
    }
  }
  return true;
}

/** Sutherland–Hodgman: clip any simple polygon by a CONVEX polygon. */
export function clipPolygon(subject: Pt[], convexClip: Pt[]): Pt[] {
  const orient = Math.sign(signedArea(convexClip)) || 1;
  const inside = (p: Pt, a: Pt, b: Pt) => orient * cross(a, b, p) >= 0;
  let output = subject;
  for (let i = 0; i < convexClip.length && output.length > 0; i++) {
    const a = convexClip[i];
    const b = convexClip[(i + 1) % convexClip.length];
    const input = output;
    output = [];
    for (let j = 0; j < input.length; j++) {
      const cur = input[j];
      const prev = input[(j + input.length - 1) % input.length];
      const curIn = inside(cur, a, b);
      const prevIn = inside(prev, a, b);
      if (curIn) {
        if (!prevIn) output.push(intersect(prev, cur, a, b));
        output.push(cur);
      } else if (prevIn) {
        output.push(intersect(prev, cur, a, b));
      }
    }
  }
  return output;
}

function intersect(p: Pt, q: Pt, a: Pt, b: Pt): Pt {
  const d1 = cross(a, b, p);
  const d2 = cross(a, b, q);
  const t = d1 / (d1 - d2);
  return [p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])];
}

/** Intersection over union of a simple polygon and a convex polygon (0..1). */
export function overlapRatio(subject: Pt[], convexRef: Pt[]): number {
  const inter = area(clipPolygon(subject, convexRef));
  const union = area(subject) + area(convexRef) - inter;
  return union > 0 ? inter / union : 0;
}
