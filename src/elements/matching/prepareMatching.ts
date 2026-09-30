import { AuthoringError, type Rng } from "../../engine/types";
import type { MatchingPart } from "./types";

/** Throws AuthoringError for malformed matching specs. */
export function checkMatching(part: MatchingPart): void {
  if (!Array.isArray(part.pairs) || part.pairs.length < 2) {
    throw new AuthoringError("matching needs at least two pairs.");
  }
  for (const [i, p] of part.pairs.entries()) {
    if (!p.left?.trim() || !p.right?.trim()) {
      throw new AuthoringError(`matching pair ${i + 1} needs non-empty "left" and "right" text.`);
    }
  }
  if (part.grading !== undefined && part.grading !== "partial" && part.grading !== "all-or-nothing") {
    throw new AuthoringError(`unknown grading "${String(part.grading)}".`);
  }
  if (part.rightOrder !== undefined) {
    const n = part.pairs.length;
    const sorted = [...part.rightOrder].sort((a, b) => a - b);
    if (sorted.length !== n || sorted.some((v, i) => v !== i)) {
      throw new AuthoringError(`rightOrder must be a permutation of 0..${n - 1}.`);
    }
  }
}

/**
 * Shuffle the right column's initial row order for one variant. The left column keeps
 * the authored (fixed) order; only `rightOrder` is randomized.
 */
export function prepareMatching(part: MatchingPart, rng: Rng): MatchingPart {
  checkMatching(part);
  const identity = part.pairs.map((_, i) => i);
  return { ...part, rightOrder: rng.shuffle(identity) };
}
