import type { BasePart } from "../../engine/types";

/** A point in graph (data) units: [x, y]. */
export type Pt = [number, number];

/** Tolerance in graph units. A number applies to both axes. */
export type Tol = number | { x: number; y: number };

export interface Axis {
  min?: number; // default 0
  max: number;
  label?: string; // plain text, e.g. "Quantity"
  step?: number; // grid / tick spacing; default: a "nice" step giving ~10 ticks
  snap?: number; // drag snapping step; default: a "nice" step giving ~40 steps
}

/** Fixed objects drawn on the graph when the question opens. Not graded, not movable. */
export type InitialObject =
  | { type: "point"; id?: string; x: number; y: number; label?: string }
  | { type: "line"; id?: string; from: Pt; to: Pt; label?: string; dashed?: boolean }
  | { type: "polygon"; id?: string; points: Pt[]; label?: string }
  | { type: "curve"; id?: string; points: Pt[]; label?: string; dashed?: boolean };

interface ToolBase {
  /** Names the object in buttons and screen-reader text, e.g. "new supply curve". */
  label?: string;
  /** Short tag drawn on the graph next to the object, e.g. "S₂". */
  tag?: string;
  /** How many of these the student may add. Default 1. */
  max?: number;
}

/** What the student may add. */
export type Tool =
  | (ToolBase & { type: "point" })
  | (ToolBase & { type: "line"; copyOf?: string }) // start as a copy of an initial line (by id)
  | (ToolBase & { type: "polygon"; vertices?: number }) // default 3
  | (ToolBase & { type: "curve"; start?: Pt[] }); // CURVE_POINTS points, x strictly increasing

export type ShiftDirection = "up" | "down" | "left" | "right";

interface AnswerBase {
  /** Names the object in feedback, e.g. "new supply curve". */
  label: string;
  weight?: number; // default 1
  tol?: Tol; // default: the part's tol
}

/** The expected drawing. Each answer object is matched to one drawn object of the same type. */
export type AnswerObject =
  | (AnswerBase & { type: "point"; x: number; y: number })
  /** The drawn line must lie on this (infinite) line. */
  | (AnswerBase & { type: "line"; from: Pt; to: Pt })
  /** The drawn line must be parallel to `shiftOf` and shifted in `direction`, by any amount. */
  | (AnswerBase & { type: "line"; shiftOf: { from: Pt; to: Pt }; direction: ShiftDirection; angleTol?: number })
  /** The drawn area must overlap this convex polygon by at least `minOverlap` (intersection / union). */
  | (AnswerBase & { type: "polygon"; points: Pt[]; minOverlap?: number })
  /**
   * A 4-point curve. Only the two MIDDLE points are graded; the end points just shape the tails.
   * `points` is the reference curve as a polyline with increasing x (see `sampleFunction`).
   */
  | (AnswerBase & { type: "curve"; points: Pt[]; relation?: "on" | "above" | "below"; through?: Pt });

export interface DrawingPart extends BasePart {
  type: "drawing";
  x: Axis;
  y: Axis;
  initial?: InitialObject[];
  tools: Tool[];
  answer: AnswerObject[];
  /** Default tolerance for answers. Default: 4% of each axis range. */
  tol?: Tol;
  showHelpText?: boolean; // default true
}

/** What the student drew (the submitted value). `tool` is the index into `part.tools`. */
export type DrawnObject =
  | { type: "point"; tool: number; x: number; y: number }
  | { type: "line"; tool: number; from: Pt; to: Pt }
  | { type: "polygon"; tool: number; points: Pt[] }
  | { type: "curve"; tool: number; points: Pt[] };

export const CURVE_POINTS = 4;

declare module "../../engine/types" {
  interface PartTypeMap {
    drawing: DrawingPart;
  }
}
