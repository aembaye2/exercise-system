import type { QuestionBank } from "../engine/assessment";
import type { Assessment, Question } from "../engine/types";

/** Deterministic test question: the answer to "a + b" is an integer. */
export const addQuestion: Question<{ a: number; b: number }> = {
  id: "add",
  title: "Addition",
  generate: (rng) => ({ a: rng.int(1, 9), b: rng.int(1, 9) }),
  render: ({ a, b }) => `What is $${a} + ${b}$?`,
  parts: ({ a, b }) => [{ type: "integer", name: "sum", label: "Sum:", correct: a + b }],
};

/** Two weighted parts: an integer (weight 3) and a fixed-order MC (weight 1). */
export const twoPartQuestion: Question<{ n: number }> = {
  id: "two-part",
  title: "Two parts",
  generate: (rng) => ({ n: rng.int(2, 9) }),
  render: ({ n }) => `Let $n = ${n}$.`,
  parts: ({ n }) => [
    { type: "integer", name: "double", label: "$2n =$", correct: 2 * n, weight: 3 },
    {
      type: "multiple-choice",
      name: "parity",
      label: "$2n$ is",
      order: "fixed",
      options: [{ text: "even", correct: true }, { text: "odd", feedback: "Any multiple of 2 is even." }],
    },
  ],
};

export const testBank: QuestionBank = (id) =>
  ({ add: addQuestion, "two-part": twoPartQuestion })[id] as Question<unknown> | undefined;

export const exercise: Assessment = {
  id: "test-hw",
  title: "Test exercise",
  mode: "exercise",
  questions: [
    { questionId: "add", points: 10 },
    { questionId: "two-part", points: 4 },
  ],
};

export const exam: Assessment = {
  id: "test-exam",
  title: "Test exam",
  mode: "exam",
  questions: [
    { questionId: "add", points: 10 },
    { questionId: "two-part", points: 4, maxAttempts: 2 },
  ],
};

/** Deterministic seed source for tests. */
export function seedCounter(start = 100): () => number {
  let s = start;
  return () => s++;
}
