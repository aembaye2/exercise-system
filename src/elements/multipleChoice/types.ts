import type { BasePart } from "../../engine/types";

export interface MultipleChoiceOption {
  text: string; // Markdown + LaTeX (plain text in dropdown display)
  correct?: boolean;
  feedback?: string;
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
