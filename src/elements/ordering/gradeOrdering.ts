import type { GradeResult, JsonValue, ValidationResult } from "../../engine/types";
import type { OrderingPart, OrderingValue } from "./types";

/** The boxes' order before the student drags anything. */
export function defaultOrder(part: OrderingPart): number[] {
  return part.startOrder ?? part.items.map((_, i) => i);
}

function isPermutation(value: unknown, n: number): value is OrderingValue {
  if (!Array.isArray(value) || value.length !== n) return false;
  const seen = new Set<number>();
  for (const v of value) {
    if (typeof v !== "number" || !Number.isInteger(v) || v < 0 || v >= n || seen.has(v)) return false;
    seen.add(v);
  }
  return true;
}

/**
 * The boxes' current order: the submitted value if it's a valid permutation of the
 * item indices, otherwise the un-dragged default. There's always a complete
 * arrangement to grade, since dragging starts from a full (if shuffled) sequence.
 */
export function arrangementOf(part: OrderingPart, value: JsonValue | undefined): OrderingValue {
  return isPermutation(value, part.items.length) ? value : defaultOrder(part);
}

export function validateOrdering(part: OrderingPart, value: JsonValue | undefined): ValidationResult {
  if (value === undefined || isPermutation(value, part.items.length)) return { valid: true };
  return { valid: false, message: "Please arrange every item." };
}

/** Feedback names the wrong positions but never reveals the correct sequence. */
export function gradeOrdering(part: OrderingPart, value: JsonValue | undefined): GradeResult {
  const arrangement = arrangementOf(part, value);
  const n = part.items.length;
  const wrongPositions = arrangement.flatMap((itemIndex, position) => (itemIndex === position ? [] : [position + 1]));
  const correctCount = n - wrongPositions.length;
  const score = part.grading === "all-or-nothing" ? (wrongPositions.length === 0 ? 1 : 0) : correctCount / n;
  if (wrongPositions.length === 0) return { score };
  return {
    score,
    feedback: `${correctCount} of ${n} correct. Check position${wrongPositions.length > 1 ? "s" : ""} ${wrongPositions.join(", ")}.`,
  };
}

/** Review summary: the student's current sequence. */
export function formatOrderingAnswer(part: OrderingPart, value: JsonValue | undefined): string {
  const arrangement = arrangementOf(part, value);
  return arrangement.map((itemIndex, position) => `${position + 1}. ${part.items[itemIndex]}`).join("; ");
}

export function formatOrderingCorrect(): string {
  return "shown in green, in place.";
}

export function orderingHelpText(part: OrderingPart): string | undefined {
  if (part.showHelpText === false) return undefined;
  return "Drag the boxes (or use the arrow buttons) into the correct order.";
}

/** A fully correct answer (for tests and examples). */
export function exampleOrdering(part: OrderingPart): OrderingValue {
  return part.items.map((_, i) => i);
}
