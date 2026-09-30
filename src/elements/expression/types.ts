import type { BasePart } from "../../engine/types";

export interface ExpressionPart extends BasePart {
  type: "expression";
  /**
   * The correct expression, in plain math syntax (mathjs): `^` for powers, `*` or
   * a space for multiplication, `/` for division. E.g. "x^2 + 1/2 x + 1" and
   * "x^2 + .5 x + 1" are both valid ways to author (or answer) the same thing.
   */
  correct: string;
  /**
   * Variable names used in `correct`, each with the [min, max] range to sample it
   * from when checking equivalence. Auto-detected from `correct` (every symbol that
   * isn't a mathjs constant/function, e.g. `pi`, `sqrt`) with a default range of
   * [1, 9] if omitted.
   */
  variables?: Record<string, [number, number]>;
  /** How many random points to test for equivalence. Default 5. */
  samples?: number;
  /** Relative tolerance when comparing evaluated values (same meaning as the `number` element's `rtol`). Default 1e-6. */
  tolerance?: number;
  /**
   * The random test points, set by `prepare()`: one object per sample, mapping
   * each variable name to its sampled value. Random per variant.
   */
  testPoints?: Record<string, number>[];
  showHelpText?: boolean; // default true
}

/** The submitted value: the expression exactly as the student typed it. */
export type ExpressionValue = string;

declare module "../../engine/types" {
  interface PartTypeMap {
    expression: ExpressionPart;
  }
}
