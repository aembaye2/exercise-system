// A small fillable table: total revenue (price x quantity) for three goods.
export const revenueTable = {
  id: "revenue-table",
  title: "Total revenue (fill in the table)",
  generate: (rng) => ({
    prices: [rng.int(2, 9), rng.int(2, 9), rng.int(2, 9)],
    quantities: [rng.int(10, 60), rng.int(10, 60), rng.int(10, 60)],
  }),
  render: () => "A firm sells three goods. Fill in the total revenue (price times quantity) for each.",
  parts: ({ prices, quantities }) => [
    {
      type: "table",
      name: "revenue",
      columns: ["Price (dollars)", "Quantity", "Total revenue (dollars)"],
      rows: prices.map((p, i) => ({
        label: `Good ${i + 1}`,
        cells: [p, quantities[i], { correct: p * quantities[i] }],
      })),
    },
  ],
};
