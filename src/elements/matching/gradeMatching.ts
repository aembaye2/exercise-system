import type { GradeResult, JsonValue, ValidationResult } from "../../engine/types";
import type { MatchingPart, MatchingValue } from "./types";

/** The right column's order before the student drags anything. */
export function defaultOrder(part: MatchingPart): number[] {
  return part.rightOrder ?? part.pairs.map((_, i) => i);
}

function isPermutation(value: unknown, n: number): value is MatchingValue {
  if (!Array.isArray(value) || value.length !== n) return false;
  const seen = new Set<number>();
  for (const v of value) {
    if (typeof v !== "number" || !Number.isInteger(v) || v < 0 || v >= n || seen.has(v)) return false;
    seen.add(v);
  }
  return true;
}

/**
 * The right column's current row order: the submitted value if it's a valid permutation
 * of the pair indices, otherwise the un-dragged default. There's always a complete
 * arrangement to grade, since dragging starts from a full (if shuffled) column.
 */
export function arrangementOf(part: MatchingPart, value: JsonValue | undefined): MatchingValue {
  return isPermutation(value, part.pairs.length) ? value : defaultOrder(part);
}

export function validateMatching(part: MatchingPart, value: JsonValue | undefined): ValidationResult {
  if (value === undefined || isPermutation(value, part.pairs.length)) return { valid: true };
  return { valid: false, message: "Please arrange every item in the right column." };
}

/** Feedback names the wrong rows by number but never reveals the correct match. */
export function gradeMatching(part: MatchingPart, value: JsonValue | undefined): GradeResult {
  const arrangement = arrangementOf(part, value);
  const n = part.pairs.length;
  const wrongRows = arrangement.flatMap((pairIndex, row) => (pairIndex === row ? [] : [row + 1]));
  const correctCount = n - wrongRows.length;
  const score = part.grading === "all-or-nothing" ? (wrongRows.length === 0 ? 1 : 0) : correctCount / n;
  if (wrongRows.length === 0) return { score };
  return {
    score,
    feedback: `${correctCount} of ${n} correct. Check item${wrongRows.length > 1 ? "s" : ""} ${wrongRows.join(", ")}.`,
  };
}

/** Review summary: what the student had matched to each numbered item. */
export function formatMatchingAnswer(part: MatchingPart, value: JsonValue | undefined): string {
  const arrangement = arrangementOf(part, value);
  return arrangement.map((pairIndex, row) => `${row + 1} – ${part.pairs[pairIndex].right}`).join("; ");
}

export function formatMatchingCorrect(): string {
  return "shown in green, in place.";
}

export function matchingHelpText(part: MatchingPart): string | undefined {
  if (part.showHelpText === false) return undefined;
  return "Drag the right-hand items (or use the up/down buttons) to match each numbered item on the left.";
}

/** A fully correct answer (for tests and examples). */
export function exampleMatching(part: MatchingPart): MatchingValue {
  return part.pairs.map((_, i) => i);
}
