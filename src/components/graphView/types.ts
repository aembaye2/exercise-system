/**
 * A static graph (display only, no interaction), as plain JSON so it can be built from a
 * variant's parameters, saved and exported. Rendered as SVG by `GraphView`. Labels are
 * plain text (SVG can't typeset LaTeX): use Unicode for subscripts and symbols, e.g. "D₁", "P*".
 */
export interface GraphSpec {
  xMin?: number; // default 0
  xMax: number;
  yMin?: number; // default 0
  yMax: number;
  xLabel?: string; // shown at the right end of the x axis, e.g. "Q"
  yLabel?: string; // shown at the top of the y axis, e.g. "P"
  xTicks?: number[]; // labelled tick marks on the x axis
  yTicks?: number[];
  shapes: GraphShape[];
}

export type Point = [number, number];

/** A small fixed palette, readable in light and dark mode. Default: the text color. */
export type GraphColor = "blue" | "red" | "green" | "orange" | "purple" | "gray";

interface ShapeStyle {
  color?: GraphColor;
  label?: string;
}

export type GraphShape =
  /** A straight line from `from` to `to`; the label goes at the `to` end. */
  | ({ type: "segment"; from: Point; to: Point; dashed?: boolean } & ShapeStyle)
  /** y = fn(x), a mathjs expression in x, over `domain` (default the whole x range); label at the right end. */
  | ({ type: "function"; fn: string; domain?: [number, number]; dashed?: boolean } & ShapeStyle)
  /** A dot; `guides` draws dashed lines from it to both axes. */
  | ({ type: "point"; at: Point; guides?: boolean } & ShapeStyle)
  /** A shaded area (e.g. consumer surplus, deadweight loss); label at its center. */
  | ({ type: "polygon"; points: Point[] } & ShapeStyle)
  /** An arrow from `from` to `to` (e.g. to show a shift). */
  | ({ type: "arrow"; from: Point; to: Point } & ShapeStyle)
  /** Free text centred at `at`. */
  | { type: "text"; at: Point; text: string; color?: GraphColor };
