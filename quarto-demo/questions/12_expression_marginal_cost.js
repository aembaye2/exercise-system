function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a || 1;
}

/** Formats `num/den * varPart` for a mathjs expression string, simplifying the fraction. */
function term(num, den, varPart) {
  const g = gcd(num, den);
  num /= g;
  den /= g;
  const coefStr = den === 1 ? `${num}` : `${num}/${den}`;
  if (!varPart) return coefStr;
  return num === 1 && den === 1 ? varPart : `${coefStr} ${varPart}`;
}

/**
 * expression element demo: a symbolic-equivalence check, not a text match —
 * "x^2 + .5 x + 1" and "x^2 + 1/2 x + 1" both grade as correct. The cost
 * function's coefficients are randomized per variant, and the correct
 * marginal-cost expression is derived from them (rather than hardcoded), so
 * grading always matches whatever TC the student was actually shown.
 */
export const marginalCostExpression = {
  id: "marginal-cost-expression",
  title: "Find the marginal cost function",
  generate: (rng) => ({
    denomA: rng.pick([2, 3, 4, 5]),
    denomB: rng.pick([2, 3, 4, 5]),
    c: rng.int(1, 5),
  }),
  render: ({ denomA, denomB, c }) =>
    `A firm's total cost function is $$TC(x) = \\frac{1}{${denomA}} x^3 + \\frac{1}{${denomB}} x^2 + ${
      c === 1 ? "x" : `${c} x`
    }$$\n\n` + "Find the marginal cost function, $MC(x) = TC'(x)$.",
  parts: ({ denomA, denomB, c }) => [
    {
      type: "expression",
      name: "mc",
      correct: `${term(3, denomA, "x^2")} + ${term(2, denomB, "x")} + ${c}`,
    },
  ],
};
