import type { GraphShape, GraphSpec, Point } from "../components/graphView/types";
import type { Question } from "../engine/types";

type Shift = "demand-right" | "demand-left" | "supply-right" | "supply-left";

interface Params {
  event: string;
  shift: Shift;
  size: number; // how far the curve shifts, in Q units
}

const EVENTS: { event: string; shift: Shift }[] = [
  { event: "Consumers' incomes rise, and coffee is a normal good.", shift: "demand-right" },
  { event: "Consumers expect the price of coffee to rise next month.", shift: "demand-right" },
  { event: "The price of tea, a substitute for coffee, falls.", shift: "demand-left" },
  { event: "A health report says coffee is bad for you.", shift: "demand-left" },
  { event: "A new roasting technology lowers the cost of producing coffee.", shift: "supply-right" },
  { event: "More firms enter the coffee market.", shift: "supply-right" },
  { event: "A frost destroys part of the coffee bean harvest.", shift: "supply-left" },
  { event: "Wages of coffee workers rise.", shift: "supply-left" },
];

const DESCRIPTIONS: Record<Shift, string> = {
  "demand-right": "Demand shifts right (D₁ to D₂): price and quantity both rise.",
  "demand-left": "Demand shifts left (D₁ to D₂): price and quantity both fall.",
  "supply-right": "Supply shifts right (S₁ to S₂): price falls, quantity rises.",
  "supply-left": "Supply shifts left (S₁ to S₂): price rises, quantity falls.",
};

/**
 * Demand P = 11 - Q and supply P = 1 + Q on a 12 x 12 grid (equilibrium Q = 5, P = 6), with
 * one curve shifted horizontally by `size` and drawn dashed, an arrow showing the shift, and
 * both equilibria marked.
 */
function shiftGraph(shift: Shift, size: number): GraphSpec {
  const demand = shift.startsWith("demand");
  const d = shift.endsWith("right") ? size : -size;
  const D = (dx: number): [Point, Point] => [[1 + dx, 10], [9 + dx, 2]];
  const S = (dx: number): [Point, Point] => [[1 + dx, 2], [9 + dx, 10]];
  // New equilibrium: D shifted by d gives Q = 5 + d/2, P = 6 + d/2; S shifted gives P = 6 - d/2.
  const e2: Point = demand ? [5 + d / 2, 6 + d / 2] : [5 + d / 2, 6 - d / 2];
  // A price level where the arrow has room and doesn't cross the other curve.
  const arrowY = demand ? (d > 0 ? 8.5 : 4) : d > 0 ? 3.5 : 8;
  const arrowX = demand ? 11 - arrowY : arrowY - 1; // where the old curve crosses arrowY
  const sign = Math.sign(d);
  const shapes: GraphShape[] = [
    { type: "segment", from: D(0)[0], to: D(0)[1], color: "blue", label: "D₁" },
    { type: "segment", from: S(0)[0], to: S(0)[1], color: "red", label: "S₁" },
    demand
      ? { type: "segment", from: D(d)[0], to: D(d)[1], color: "blue", dashed: true, label: "D₂" }
      : { type: "segment", from: S(d)[0], to: S(d)[1], color: "red", dashed: true, label: "S₂" },
    { type: "arrow", from: [arrowX + 0.4 * sign, arrowY], to: [arrowX + d - 0.4 * sign, arrowY], color: "gray" },
    { type: "point", at: [5, 6], label: "e₁" },
    { type: "point", at: e2, label: "e₂" },
  ];
  return { xMax: 12, yMax: 12, xLabel: "Q", yLabel: "P", shapes };
}

/** multiple-choice demo with graphs as the choices: pick the graph that shows a market event. */
export const supplyDemandShiftGraph: Question<Params> = {
  id: "supply-demand-shift-graph",
  title: "Which graph shows the change?",
  generate: (rng) => ({ ...rng.pick(EVENTS), size: rng.pick([2, 2.5, 3]) }),
  render: ({ event }) =>
    `In the market for coffee: **${event}**\n\n` +
    "Which graph shows the effect on the market? The dashed curve is the new one.",
  parts: ({ shift, size }) => [
    {
      type: "multiple-choice",
      name: "graph",
      options: (Object.keys(DESCRIPTIONS) as Shift[]).map((s) => ({
        text: DESCRIPTIONS[s],
        correct: s === shift,
        graph: shiftGraph(s, size),
      })),
    },
  ],
};
