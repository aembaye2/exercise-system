import { getElement } from "./registry";
import { createRng, deriveSeed } from "./rng";
import { AuthoringError, type AnyQuestion, type Part } from "./types";

export interface Variant {
  questionId: string;
  seed: number;
  params: unknown;
  text: string;
  /** Parts after element preparation (e.g. MC options subsampled and shuffled). */
  parts: Part[];
}

/** Validate the part specs of a question. Throws AuthoringError. */
export function checkParts(questionId: string, parts: Part[]): void {
  if (parts.length === 0) throw new AuthoringError(`Question "${questionId}" has no parts.`);
  const names = new Set<string>();
  let totalWeight = 0;
  for (const part of parts) {
    if (!part.name) throw new AuthoringError(`Question "${questionId}": every part needs a name.`);
    const where = `Question "${questionId}", part "${part.name}"`;
    if (names.has(part.name)) throw new AuthoringError(`${where}: duplicate part name.`);
    names.add(part.name);
    const weight = part.weight ?? 1;
    if (!Number.isFinite(weight) || weight < 0) throw new AuthoringError(`${where}: weight must be >= 0.`);
    totalWeight += weight;
    try {
      getElement(part.type).check?.(part);
    } catch (err) {
      if (err instanceof AuthoringError) throw new AuthoringError(`${where}: ${err.message}`);
      throw err;
    }
  }
  if (totalWeight <= 0) {
    throw new AuthoringError(`Question "${questionId}": total part weight must be > 0.`);
  }
}

/**
 * Build a variant deterministically from `{ question, seed }`:
 * generate -> render -> parts -> prepare each part.
 */
export function createVariant(question: AnyQuestion, seed: number): Variant {
  const rng = createRng(seed);
  const params = question.generate(rng);
  const text = question.render(params);
  const rawParts = question.parts(params);
  checkParts(question.id, rawParts);
  const parts = rawParts.map((part) => {
    const el = getElement(part.type);
    // Each part gets its own RNG stream, so adding a part doesn't reshuffle the others.
    return el.prepare ? el.prepare(part, createRng(deriveSeed(seed, `part:${part.name}`))) : part;
  });
  return { questionId: question.id, seed, params, text, parts };
}
