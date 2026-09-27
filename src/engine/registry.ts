import type { ComponentType } from "react";
import type { GradeResult, JsonValue, Part, PartType, PartTypeMap, Rng, ValidationResult } from "./types";

export interface ElementInputProps<P extends Part = Part> {
  part: P;
  /** DOM id for the input (or input group). */
  id: string;
  /** id of the element that labels this input. */
  labelId: string;
  /** id(s) of help / feedback text describing this input. */
  describedBy?: string;
  value: JsonValue | undefined;
  onChange: (value: JsonValue) => void;
  disabled?: boolean;
  invalid?: boolean;
  /** The question is finished: elements that can show the answer in place (e.g. drawings) may do so. */
  showCorrect?: boolean;
}

export interface ElementDefinition<P extends Part = Part> {
  type: P["type"];
  /** Throw an AuthoringError if the part spec is malformed. */
  check?(part: P): void;
  /**
   * Freeze any randomness in the part (e.g. subsample and shuffle options).
   * Runs once per variant; the result is stored with the variant so that
   * rendering and grading always see the same thing.
   */
  prepare?(part: P, rng: Rng): P;
  /** Is the submitted value well-formed? Invalid input doesn't use an attempt. */
  validate(part: P, value: JsonValue | undefined): ValidationResult;
  /** Pure grading. Only called with values that passed validate(). */
  grade(part: P, value: JsonValue | undefined): GradeResult;
  /** Markdown describing a submitted value (for reviews). */
  formatAnswer(part: P, value: JsonValue | undefined): string;
  /** Markdown describing the correct answer (shown once the question is finished). */
  formatCorrectAnswer(part: P): string;
  /** Optional help text shown under the input. */
  helpText?(part: P): string | undefined;
  Input: ComponentType<ElementInputProps<P>>;
}

const registry = new Map<string, ElementDefinition>();

export function registerElement<T extends PartType>(def: ElementDefinition<PartTypeMap[T]>): void {
  // The registry is keyed by `type`, and getElement() is only ever called with
  // `part.type`, so the part handed to `def` always has the matching shape.
  // TypeScript can't express that correlation, hence the cast.
  registry.set(def.type as string, def as unknown as ElementDefinition);
}

export function getElement(type: string): ElementDefinition {
  const def = registry.get(type);
  if (!def) {
    throw new Error(`Unknown element type "${type}". Did you register it in src/elements/index.ts?`);
  }
  return def;
}

export function hasElement(type: string): boolean {
  return registry.has(type);
}
