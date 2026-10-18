/** "\frac{3}{2}" for k = 3, "" for k = 2, "2" for k = 4. */
function halfCoef(k) {
  if (k === 2) return "";
  return k % 2 === 0 ? `${k / 2}` : `\\frac{${k}}{2}`;
}

/**
 * conditional-grading demo: three steps where each one builds on the previous answer.
 * A student who gets the derivative wrong in (a) (say, forgetting the 2 from q^2) but then
 * correctly solves their own derivative for q in (b), and evaluates profit at that q in (c),
 * loses only (a)'s point.
 */
export const profitMaximum = {
  id: "profit-maximum-conditional",
  title: "Maximize profit step by step",
  generate: (rng) => ({
    k: rng.int(1, 4),
    b: rng.pick([6, 8, 10, 12]),
    f: rng.int(1, 4),
  }),
  render: ({ k, b, f }) =>
    `A firm's profit from selling $q$ units is $$\\pi(q) = -${halfCoef(k)}q^2 + ${b}q - ${f}$$\n\n` +
    "Answer in order: each step is graded using **your own** answer to the step before, " +
    "so a mistake only costs the step where you made it.",
  parts: ({ k, b, f }) => [
    {
      type: "conditional-grading",
      name: "steps",
      steps: [
        { name: "a", kind: "expression", label: "a) $\\pi'(q) =$", correct: `-${k} q + ${b}` },
        {
          name: "b",
          kind: "number",
          label: "b) Profit-maximizing quantity $q^* =$",
          // Where the student's derivative from (a) is zero (it's linear: a(0) + slope * q).
          correct: "-a(0) / (a(1) - a(0))",
        },
        {
          name: "c",
          kind: "number",
          label: "c) Maximum profit $\\pi(q^*) =$",
          // Profit at the student's q* from (b).
          correct: `-${k}/2 * b^2 + ${b} * b - ${f}`,
        },
      ],
    },
  ],
};
