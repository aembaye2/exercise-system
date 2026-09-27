import type { Question } from "../engine/types";

interface Params {
  p1: number; // dollars
  p2: number; // dollars
  q1: number; // units
  q2: number; // units
}

/** Absolute value of the midpoint (arc) price elasticity of demand. */
function midpointElasticity({ p1, p2, q1, q2 }: Params): number {
  const pctQ = (q2 - q1) / ((q1 + q2) / 2);
  const pctP = (p2 - p1) / ((p1 + p2) / 2);
  return Math.abs(pctQ / pctP);
}

export const priceElasticity: Question<Params> = {
  id: "price-elasticity-midpoint",
  title: "Price elasticity of demand (midpoint method)",
  generate: (rng) => {
    const p1 = rng.int(2, 20);
    const q1 = rng.int(60, 200);
    return { p1, p2: p1 + rng.int(1, 6), q1, q2: q1 - rng.int(5, 50) };
  },
  render: ({ p1, p2, q1, q2 }) =>
    `When the price of coffee rises from $${p1}$ to $${p2}$ dollars per pound, ` +
    `the quantity demanded falls from $${q1}$ to $${q2}$ pounds per week.\n\n` +
    `Using the midpoint method, compute the **absolute value** of the price elasticity of demand:\n\n` +
    `$$\n|E_d| = \\left| \\frac{(Q_2 - Q_1) \\big/ \\frac{Q_1 + Q_2}{2}}{(P_2 - P_1) \\big/ \\frac{P_1 + P_2}{2}} \\right|\n$$`,
  parts: (params) => [
    {
      type: "number",
      name: "Ed",
      label: "$|E_d| =$",
      correct: midpointElasticity(params),
      comparison: "relabs",
      rtol: 0.01,
    },
  ],
};
