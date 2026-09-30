import type { BasePart } from "../../engine/types";

/** One correct correspondence: `left` (fixed, numbered column) matches `right` (lettered, reorderable column). */
export interface MatchingPair {
  left: string; // Markdown + LaTeX
  right: string; // Markdown + LaTeX
}

export interface MatchingPart extends BasePart {
  type: "matching";
  /** pairs[i].left is the correct match for pairs[i].right. At least two pairs. */
  pairs: MatchingPair[];
  /**
   * The right column's initial row order, as indices into `pairs`. Set by `prepare()`:
   * random per variant, so the right column starts shuffled while the left column stays
   * in authored (fixed) order.
   */
  rightOrder?: number[];
  /** "partial" (default): score = fraction of rows correctly matched. "all-or-nothing": 1 only if every row is correct. */
  grading?: "partial" | "all-or-nothing";
  showHelpText?: boolean; // default true
}

/** The submitted value: the right column's current row order, as indices into `pairs`. */
export type MatchingValue = number[];

declare module "../../engine/types" {
  interface PartTypeMap {
    matching: MatchingPart;
  }
}
