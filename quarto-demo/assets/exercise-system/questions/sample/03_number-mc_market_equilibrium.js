const equilibriumPrice = ({ a, b, c, d }) => (a - c) / (b + d);

const OUTCOMES = {
  shortage: "A shortage: quantity demanded exceeds quantity supplied.",
  surplus: "A surplus: quantity supplied exceeds quantity demanded.",
  none: "No effect: the market stays at the equilibrium price and quantity.",
};

function outcome({ policy, binding }) {
  if (!binding) return "none";
  return policy === "ceiling" ? "shortage" : "surplus";
}

/** Mixed question: a weighted numeric part plus a multiple-choice part. */
export const marketEquilibrium = {
  id: "market-equilibrium-mixed",
  title: "Market equilibrium and price controls (mixed)",
  generate: (rng) => {
    const a = rng.int(80, 160);
    const b = rng.int(1, 5);
    const c = rng.int(0, 20);
    const d = rng.int(1, 5);
    const policy = rng.pick(["ceiling", "floor"]);
    const binding = rng.pick([true, false]);
    const pStar = equilibriumPrice({ a, b, c, d });
    // A ceiling binds below the equilibrium price; a floor binds above it.
    const below = (policy === "ceiling") === binding;
    const offset = rng.int(2, 5);
    const level = below ? Math.floor(pStar) - offset : Math.ceil(pStar) + offset;
    return { a, b, c, d, policy, binding, level };
  },
  render: ({ a, b, c, d, policy, level }) =>
    `In a competitive market, demand and supply are\n\n` +
    `$$\nQ_d = ${a} - ${b}P, \\qquad Q_s = ${c} + ${d}P\n$$\n\n` +
    `where $P$ is the price in dollars.\n\n` +
    `**(a)** Find the equilibrium price $P^*$.\n\n` +
    `**(b)** The government imposes a price **${policy}** of $${level}$ dollars. What happens in this market?`,
  parts: (params) => [
    {
      type: "number",
      name: "price",
      label: "**(a)** $P^* =$",
      correct: equilibriumPrice(params),
      rtol: 0.01,
      suffix: "dollars",
      weight: 2,
    },
    {
      type: "multiple-choice",
      name: "control",
      label: "**(b)**",
      weight: 1,
      order: "fixed",
      options: Object.keys(OUTCOMES).map((key) => ({
        text: OUTCOMES[key],
        correct: key === outcome(params),
        feedback:
          key === outcome(params)
            ? undefined
            : "Compare the controlled price with the equilibrium price from (a). Does the control stop the market from reaching it?",
      })),
    },
  ],
};
