import type { GradeResult, JsonValue, ValidationResult } from "../../engine/types";
import type { MultipleChoicePart } from "./types";

/** The stored value is the index of the chosen option in the prepared option list. */
export function selectedIndex(part: MultipleChoicePart, value: JsonValue | undefined): number | null {
  if (typeof value !== "number" || !Number.isInteger(value)) return null;
  return value >= 0 && value < part.options.length ? value : null;
}

export function validateMultipleChoice(part: MultipleChoicePart, value: JsonValue | undefined): ValidationResult {
  return selectedIndex(part, value) === null ? { valid: false, message: "Please select an option" } : { valid: true };
}

export function gradeMultipleChoice(part: MultipleChoicePart, value: JsonValue | undefined): GradeResult {
  const i = selectedIndex(part, value);
  if (i === null) return { score: 0 };
  const option = part.options[i];
  const result: GradeResult = { score: option.correct ? 1 : 0 };
  if (option.feedback) result.feedback = option.feedback;
  return result;
}

/** "Graph A", "Graph B", ... for the option at display index `i`. */
export function graphName(i: number): string {
  return `Graph ${String.fromCharCode(65 + i)}`;
}

/** An option as named in reviews: its text, prefixed with "Graph B: " for a graph option. */
function describeOption(part: MultipleChoicePart, i: number): string {
  const o = part.options[i];
  return o.graph ? `${graphName(i)}: ${o.text}` : o.text;
}

export function formatMultipleChoiceAnswer(part: MultipleChoicePart, value: JsonValue | undefined): string {
  const i = selectedIndex(part, value);
  return i === null ? "_(no answer)_" : describeOption(part, i);
}

export function formatMultipleChoiceCorrect(part: MultipleChoicePart): string {
  const i = part.options.findIndex((o) => o.correct);
  return i < 0 ? "" : describeOption(part, i);
}
