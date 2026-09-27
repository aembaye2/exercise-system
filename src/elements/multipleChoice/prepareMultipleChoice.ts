import { AuthoringError, type Rng } from "../../engine/types";
import type { MultipleChoicePart } from "./types";

/** Throws AuthoringError for malformed multiple-choice specs. */
export function checkMultipleChoice(part: MultipleChoicePart): void {
  if (!Array.isArray(part.options) || part.options.length === 0) {
    throw new AuthoringError("multiple-choice needs at least one option.");
  }
  const correctCount = part.options.filter((o) => o.correct === true).length;
  if (correctCount !== 1) {
    throw new AuthoringError(`multiple-choice needs exactly one correct option (found ${correctCount}).`);
  }
  const seen = new Set<string>();
  for (const o of part.options) {
    const key = o.text.trim();
    if (!key) throw new AuthoringError("multiple-choice option text must not be empty.");
    if (seen.has(key)) throw new AuthoringError(`duplicate option text "${o.text}".`);
    seen.add(key);
  }
  if (part.numberAnswers !== undefined) {
    const n = part.numberAnswers;
    if (!Number.isInteger(n) || n < 1 || n > part.options.length) {
      throw new AuthoringError(`numberAnswers must be an integer from 1 to ${part.options.length} (got ${n}).`);
    }
  }
}

/**
 * Subsample and shuffle the options for one variant. The result has exactly the
 * options that will be shown, in display order, and no `numberAnswers`.
 */
export function prepareMultipleChoice(part: MultipleChoicePart, rng: Rng): MultipleChoicePart {
  checkMultipleChoice(part);
  let selected = part.options;
  if (part.numberAnswers !== undefined) {
    const correct = part.options.find((o) => o.correct)!;
    const distractors = part.options.filter((o) => !o.correct);
    const keep = new Set([correct, ...rng.sample(distractors, part.numberAnswers - 1)]);
    // Preserve authored order here; shuffling (if any) happens below.
    selected = part.options.filter((o) => keep.has(o));
  }
  const ordered = (part.order ?? "random") === "fixed" ? selected : rng.shuffle(selected);
  const { numberAnswers: _dropped, ...rest } = part;
  return { ...rest, options: ordered.map((o) => ({ ...o })) };
}
