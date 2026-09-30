import type { Question } from "../engine/types";

/**
 * expression element demo: a symbolic-equivalence check, not a text match —
 * "x^2 + .5 x + 1" and "x^2 + 1/2 x + 1" both grade as correct. Fixed
 * (nothing randomized beyond the prepared random test points).
 */
export const marginalCostExpression: Question<Record<string, never>> = {
  id: "marginal-cost-expression",
  title: "Find the marginal cost function",
  generate: () => ({}),
  render: () =>
    "A firm's total cost function is $$TC(x) = \\frac{1}{3} x^3 + \\frac{1}{4} x^2 + x$$\n\n" +
    "Find the marginal cost function, $MC(x) = TC'(x)$.",
  parts: () => [
    {
      type: "expression",
      name: "mc",
      correct: "x^2 + 1/2 x + 1",
    },
  ],
};
