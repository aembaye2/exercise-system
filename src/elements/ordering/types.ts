import type { BasePart } from "../../engine/types";

export interface OrderingPart extends BasePart {
  type: "ordering";
  /** The correct sequence, authored in order. At least two items. Markdown + LaTeX. */
  items: string[];
  /** How the boxes are laid out for the student. Author's choice; default "vertical". */
  layout?: "vertical" | "horizontal";
  /** Show a directional arrow between boxes (pointing down for vertical, right for horizontal). Default true. */
  showArrows?: boolean;
  /**
   * The starting order, as indices into `items`. Set by `prepare()`: random per
   * variant, so the boxes start shuffled instead of already in the correct order.
   */
  startOrder?: number[];
  /** "partial" (default): score = fraction of boxes in their correct position. "all-or-nothing": 1 only if the whole sequence is correct. */
  grading?: "partial" | "all-or-nothing";
  showHelpText?: boolean; // default true
}

/** The submitted value: the boxes' current order, as indices into `items`. */
export type OrderingValue = number[];

declare module "../../engine/types" {
  interface PartTypeMap {
    ordering: OrderingPart;
  }
}
