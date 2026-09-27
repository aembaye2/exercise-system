const SCENARIOS = [
  { text: "Consumer incomes rise, and the good is a **normal** good.", shift: "right" },
  { text: "Consumer incomes rise, and the good is an **inferior** good.", shift: "left" },
  { text: "The price of a **substitute** good rises.", shift: "right" },
  { text: "The price of a **complementary** good rises.", shift: "left" },
  { text: "Consumers expect the price of the good to rise next month.", shift: "right" },
  { text: "The number of buyers in the market falls.", shift: "left" },
  { text: "A successful advertising campaign makes the good more popular.", shift: "right" },
  { text: "Consumer incomes fall, and the good is a **normal** good.", shift: "left" },
];

/** Drawing question graded on direction only: any parallel shift the right way is accepted. */
export const demandShift = {
  id: "demand-shift-drawing",
  title: "Shifts in demand (drawing)",
  generate: (rng) => ({ index: rng.int(0, SCENARIOS.length - 1), a: rng.int(12, 17) }),
  render: ({ index }) =>
    `${SCENARIOS[index].text}\n\n` +
    `**(a)** Add a copy of the demand curve $D_1$ and move it to show the new demand curve.\n\n` +
    `**(b)** If supply doesn't change, what happens to the equilibrium price?`,
  parts: ({ index, a }) => {
    const shift = SCENARIOS[index].shift;
    return [
      {
        type: "drawing",
        name: "graph",
        label: "**(a)**",
        weight: 2,
        x: { max: 20, label: "Quantity" },
        y: { max: 20, label: "Price (dollars)" },
        initial: [
          { type: "line", id: "D1", from: [0, a], to: [a, 0], label: "D₁" },
          { type: "line", id: "S", from: [0, 2], to: [20, 22], label: "S" },
        ],
        tools: [{ type: "line", copyOf: "D1", label: "new demand curve", tag: "D₂" }],
        answer: [{ type: "line", label: "new demand curve", shiftOf: { from: [0, a], to: [a, 0] }, direction: shift }],
      },
      {
        type: "multiple-choice",
        name: "price",
        label: "**(b)**",
        order: "fixed",
        options: [
          { text: "It rises.", correct: shift === "right" },
          { text: "It falls.", correct: shift === "left" },
          { text: "It stays the same.", feedback: "A shift in demand moves the equilibrium along the supply curve." },
        ],
      },
    ];
  },
};
