import type { BasePart } from "../../engine/types";

/** One row of the true/false table. */
export interface TrueFalseStatement {
  text: string; // Markdown + LaTeX
  correct: boolean;
}

export interface TrueFalsePart extends BasePart {
  type: "true-false";
  /** At least one statement, each independently marked True or False. */
  statements: TrueFalseStatement[];
  /** "partial" (default): score = fraction of statements correctly marked. "all-or-nothing": 1 only if every statement is correct. */
  grading?: "partial" | "all-or-nothing";
  showHelpText?: boolean; // default true
}

/** The submitted value: one entry per statement; `null` means not yet answered. */
export type TrueFalseValue = (boolean | null)[];

declare module "../../engine/types" {
  interface PartTypeMap {
    "true-false": TrueFalsePart;
  }
}
