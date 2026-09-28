// A graph question drawn on the JSXGraph board (part type "jsxgraph"). The student's
// segment is compared with `expectedDrawing` when they press Submit.
const INCOME = 120;
// Prices that divide the income evenly, so both intercepts are whole numbers within the graph.
const PRICES = [12, 15, 20, 24, 30, 40];

export const budgetLine = {
  id: "budget-line-drawing-r2",
  title: "Budget line (drawing)",
  generate: (rng) => {
    const [pizzaPrice, bookPrice] = rng.sample(PRICES, 2);
    return { pizzaPrice, bookPrice };
  },
  render: ({ pizzaPrice, bookPrice }) =>
    // "\\$" reaches the Markdown as "\$", a literal dollar sign; a bare "$" would start LaTeX.
    `Sara has **\\$${INCOME}** to spend on pizza (x-axis) and books (y-axis). A pizza costs **\\$${pizzaPrice}** and a book costs **\\$${bookPrice}**.

` +
    "Use the segment tool to draw her budget line, then press **Submit**.",
  parts: ({ pizzaPrice, bookPrice }) => [
    {
      type: "jsxgraph",
      name: "budget",
      props: {
        boundingBox: [-1, 11, -1, 11],
        xLabel: "Pizzas",
        yLabel: "Books",
        width: 700,
        height: 600,
        showColorPicker: false,
        showDownloadButton: false,
        showOutputButton: false,
        enabledTools: ["select", "segment", "eraser"],
        enabledActions: ["undo", "redo", "clear"],
        // y = (income - pizzaPrice * x) / bookPrice
        expectedDrawing: [
          { type: "segment", yIntercept: INCOME / bookPrice, slope: -pizzaPrice / bookPrice, tolerance: 0.1 },
        ],
      },
    },
  ],
};
