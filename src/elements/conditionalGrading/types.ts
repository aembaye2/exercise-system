import type { BasePart } from "../../engine/types";

interface StepBase {
  /**
   * Unique within the part. Later steps' `correct` formulas refer to this step's answer by
   * this name, so it must be a plain identifier (letters, digits, `_`) that isn't a mathjs
   * constant or function (not `e`, `pi`, `sqrt`, ...). E.g. "a", "b", "c".
   */
  name: string;
  label?: string; // Markdown + LaTeX, shown before the box
  suffix?: string; // Markdown + LaTeX, shown after the box
  /** Grey hint text in the empty box, e.g. "e.g. 2q + 3". Default "e.g. -2x + 3" for expression steps, none for number steps; "" shows none. */
  placeholder?: string;
  weight?: number; // share of the part's score, default 1
  /**
   * The correct answer as a mathjs formula. It may use the answers to *earlier* steps by
   * name: a number step is a number (`b`), an expression step is a function of its
   * variables (`a(0)`, `a(x)`). When grading, the formula is evaluated twice: with the
   * correct earlier answers, and with the student's own earlier answers (error carried
   * forward). Matching either gets the step's credit.
   */
  correct: string;
}

export interface ConditionalNumberStep extends StepBase {
  kind: "number";
  rtol?: number; // default 1e-2, as for the number element
  atol?: number; // default 1e-8
}

export interface ConditionalExpressionStep extends StepBase {
  kind: "expression";
  /**
   * The step's variables, each with the [min, max] range to sample it from when checking
   * equivalence. Auto-detected from `correct` (minus earlier step names) with range [1, 9]
   * if omitted.
   */
  variables?: Record<string, [number, number]>;
  tolerance?: number; // relative, default 1e-6
}

export type ConditionalStep = ConditionalNumberStep | ConditionalExpressionStep;

export interface ConditionalGradingPart extends BasePart {
  type: "conditional-grading";
  /** In order: a step's `correct` may only use the steps before it. */
  steps: ConditionalStep[];
  /** Credit (0..1) for a step that's only right given the student's wrong earlier answers. Default 1. */
  carryForwardCredit?: number;
  /** Samples per variable for expression steps. Default 5. */
  samples?: number;
  /** Random test points for the expression steps, set by `prepare()` (one object per sample). */
  testPoints?: Record<string, number>[];
  showHelpText?: boolean; // default true
}

/** The submitted value: what the student typed for each step, by step name. */
export type ConditionalGradingValue = Record<string, string>;

declare module "../../engine/types" {
  interface PartTypeMap {
    "conditional-grading": ConditionalGradingPart;
  }
}
