// Small builders shared by the Sample Exam 2 questions. Every question here is fixed
// (no random parameters), so `generate` returns an empty object.

export const noParams = () => ({});

/**
 * A radio multiple-choice part. `correct` is the index of the correct option in `options`.
 * Options are shuffled unless `order: "fixed"` is passed in `extra` (needed for
 * "All of these" / "None of these" options).
 */
export function mc(name, label, options, correct, extra = {}) {
  return {
    type: "multiple-choice",
    name,
    label,
    options: options.map((text, i) => ({ text, correct: i === correct })),
    ...extra,
  };
}

/** A dropdown part with fixed option order, e.g. Increase / Decrease / Remain unchanged. */
export function dropdown(name, label, options, correctText) {
  if (!options.includes(correctText)) throw new Error(`${name}: "${correctText}" is not an option.`);
  return {
    type: "multiple-choice",
    name,
    label,
    display: "dropdown",
    order: "fixed",
    options: options.map((text) => ({ text, correct: text === correctText })),
  };
}
