import { sampleFunction } from "../elements/drawing";
import type { Question } from "../engine/types";

interface Params {
  m: number; // income, dollars
  px: number; // price of x, dollars
  py: number; // price of y, dollars
}

const MAX = 20;

/** Drawing question with a 4-point curve: only its two middle points are graded. */
export const indifferenceCurve: Question<Params> = {
  id: "indifference-curve-drawing",
  title: "Optimal bundle and indifference curve (drawing)",
  generate: (rng) => ({
    m: 2 * rng.int(5, 10),
    px: rng.pick([1, 2]),
    py: rng.pick([1, 2]),
  }),
  render: ({ m, px, py }) =>
    `A consumer has utility $U(x, y) = xy$, income $M = ${m}$ dollars, and faces prices ` +
    `$p_x = ${px}$ and $p_y = ${py}$ dollars. Their budget line is drawn on the graph.\n\n` +
    `**(a)** Add a curve and shape it into the indifference curve that is tangent to the budget line. ` +
    `Put **one of its two middle points at the optimal bundle** and the other middle point on the same indifference curve.\n\n` +
    `**(b)** How many units of good $x$ does the consumer buy?`,
  parts: ({ m, px, py }) => {
    const x = m / (2 * px);
    const y = m / (2 * py);
    const k = x * y;
    return [
      {
        type: "drawing",
        name: "graph",
        label: "**(a)**",
        weight: 2,
        x: { max: MAX, label: "Good x" },
        y: { max: MAX, label: "Good y" },
        initial: [{ type: "line", id: "budget", from: [0, m / py], to: [m / px, 0], label: "Budget line" }],
        tools: [{ type: "curve", label: "indifference curve", tag: "U" }],
        answer: [
          {
            type: "curve",
            label: "indifference curve",
            points: sampleFunction((q) => k / q, k / MAX, MAX, 80),
            relation: "on",
            through: [x, y],
          },
        ],
      },
      {
        type: "number",
        name: "x",
        label: "**(b)** $x^* =$",
        correct: x,
        rtol: 0.01,
        suffix: "units",
      },
    ];
  },
};
