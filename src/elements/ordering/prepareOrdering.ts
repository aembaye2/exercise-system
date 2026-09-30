import { AuthoringError, type Rng } from "../../engine/types";
import type { OrderingPart } from "./types";

/** Throws AuthoringError for malformed ordering specs. */
export function checkOrdering(part: OrderingPart): void {
  if (!Array.isArray(part.items) || part.items.length < 2) {
    throw new AuthoringError("ordering needs at least two items.");
  }
  part.items.forEach((item, i) => {
    if (!item?.trim()) throw new AuthoringError(`ordering item ${i + 1} needs non-empty text.`);
  });
  if (part.layout !== undefined && part.layout !== "vertical" && part.layout !== "horizontal") {
    throw new AuthoringError(`unknown layout "${String(part.layout)}".`);
  }
  if (part.grading !== undefined && part.grading !== "partial" && part.grading !== "all-or-nothing") {
    throw new AuthoringError(`unknown grading "${String(part.grading)}".`);
  }
  if (part.startOrder !== undefined) {
    const n = part.items.length;
    const sorted = [...part.startOrder].sort((a, b) => a - b);
    if (sorted.length !== n || sorted.some((v, i) => v !== i)) {
      throw new AuthoringError(`startOrder must be a permutation of 0..${n - 1}.`);
    }
  }
}

/** Shuffle the boxes' starting order for one variant. The correct order is always the authored order. */
export function prepareOrdering(part: OrderingPart, rng: Rng): OrderingPart {
  checkOrdering(part);
  const identity = part.items.map((_, i) => i);
  return { ...part, startOrder: rng.shuffle(identity) };
}
