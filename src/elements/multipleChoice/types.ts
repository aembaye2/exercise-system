import type { GraphSpec } from "../../components/graphView/types";
import type { BasePart } from "../../engine/types";

export interface MultipleChoiceOption {
  /**
   * Markdown + LaTeX (plain text in dropdown display). For an option with a `graph`, it isn't
   * shown: it describes the graph to screen readers and names the option in reviews and the LMS.
   */
  text: string;
  correct?: boolean;
  feedback?: string;
  /** Show this option as a graph (labelled "Graph A", "Graph B", ... in display order). Radio display only. */
  graph?: GraphSpec;
}

export interface MultipleChoicePart extends BasePart {
  type: "multiple-choice";
  options: MultipleChoiceOption[];
  numberAnswers?: number; // show this many options (1 correct + distractors)
  order?: "random" | "fixed"; // default "random"
  display?: "radio" | "dropdown"; // default "radio"
}

declare module "../../engine/types" {
  interface PartTypeMap {
    "multiple-choice": MultipleChoicePart;
  }
}
