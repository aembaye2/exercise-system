import type { Question } from "../engine/types";

/**
 * ordering element demo: a three-step causal chain the student drags into
 * the correct order. Fixed (nothing randomized beyond the shuffled start).
 */
export const incomeDemandPriceChain: Question<Record<string, never>> = {
  id: "income-demand-price-ordering",
  title: "Order the causal chain",
  generate: () => ({}),
  render: () => "A normal good's market is in equilibrium. Put the following events in the correct causal order.",
  parts: () => [
    {
      type: "ordering",
      name: "chain",
      items: ["Income increases", "Demand shifts right", "Price increases"],
      layout: "horizontal",
    },
  ],
};
