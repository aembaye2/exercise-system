// A hand-graded essay: the student submits once and sees the model answer;
// the teacher grades it later on a review page (a quiz div with data-review).
const NONZERO = [-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6];

// "+ 5x", "- x", "" for 0.
function term(coef, x) {
  if (coef === 0) return "";
  const abs = Math.abs(coef);
  return ` ${coef < 0 ? "-" : "+"} ${abs === 1 && x ? "" : abs}${x}`;
}

const factor = (r) => `(x ${r < 0 ? "+" : "-"} ${Math.abs(r)})`;

export const quadraticEssay = {
  id: "quadratic-essay",
  title: "Solve a quadratic equation",
  generate: (rng) => {
    const [r1, r2] = rng.sample(NONZERO, 2).sort((a, b) => a - b);
    return { r1, r2 };
  },
  render: ({ r1, r2 }) => `Solve $x^2${term(-(r1 + r2), "x")}${term(r1 * r2, "")} = 0$. Show your steps.`,
  parts: ({ r1, r2 }) => [
    {
      type: "essay",
      name: "solution",
      maxWords: 80,
      rows: 5,
      modelAnswer: `$x^2${term(-(r1 + r2), "x")}${term(r1 * r2, "")} = ${factor(r1)}${factor(r2)} = 0$, so $x = ${r1}$ or $x = ${r2}$.`,
    },
  ],
};
