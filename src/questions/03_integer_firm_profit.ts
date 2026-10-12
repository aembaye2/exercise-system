import type { Question } from "../engine/types";

interface Params {
  q: number; // units sold
  p: number; // price, dollars
  avc: number; // average variable cost, dollars
  fc: number; // fixed cost, dollars
}

export const firmProfit: Question<Params> = {
  id: "firm-profit-integer",
  title: "Profit of a firm",
  generate: (rng) => ({
    q: rng.int(20, 300),
    p: rng.int(10, 40),
    avc: rng.int(5, 35),
    fc: rng.int(10, 80) * 50,
  }),
  render: ({ q, p, avc, fc }) =>
    `A firm sells $${q}$ units at a price of $${p}$ dollars each. ` +
    `Its average variable cost is $${avc}$ dollars per unit and its fixed cost is $${fc}$ dollars.\n\n` +
    `Compute the firm's profit $\\pi = TR - TC$. Enter a negative number for a loss.`,
  parts: ({ q, p, avc, fc }) => [
    {
      type: "integer",
      name: "profit",
      label: "$\\pi =$",
      correct: p * q - (avc * q + fc),
      suffix: "dollars",
    },
  ],
};
