import type { Question } from "../engine/types";

const INCOME = 120;
// Prices that divide the income evenly, so both intercepts are whole numbers within the graph.
const PRICES = [12, 15, 20, 24, 30, 40];

interface Params {
  pizzaPrice: number;
  bookPrice: number;
}

/**
 * Graph question drawn with the JSXGraph drawing component (src/components/jsxgraphComponent).
 * The student's segment is compared with `expectedDrawing` when they press Grade or Save.
 */
export const budgetLine: Question<Params> = {
  id: "budget-line-jsxgraph",
  title: "Budget line (jsxgraph drawing)",
  generate: (rng) => {
    const [pizzaPrice, bookPrice] = rng.sample(PRICES, 2);
    return { pizzaPrice, bookPrice };
  },
  render: ({ pizzaPrice, bookPrice }) =>
    // "\\$" reaches the Markdown as "\$", a literal dollar sign; a bare "$" would start LaTeX.
    `Sara has **\\$${INCOME}** to spend on pizza (x-axis) and books (y-axis). A pizza costs **\\$${pizzaPrice}** and a book costs **\\$${bookPrice}**.\n\n` +
    "Use the segment tool to draw her budget line, then grade or save your answer.",
  parts: ({ pizzaPrice, bookPrice }) => [
    {
      type: "jsxgraph",
      name: "budget",
      props: {
        boundingBox: [-1, 11, -1, 11],
        xLabel: "Pizzas",
        yLabel: "Books",
        width: 800,
        height: 600,
        showColorPicker: false,
        showDownloadButton: true,
        showOutputButton: true,
        //["select", "point", "line", "arrow", "doubleArrow", "rectangle", "circle", "curve", "polygon", "coordinate", "text", "eraser", "segment"]
        enabledTools: ["select", "point", "segment",  "scatter", "coordinate", "text", "eraser"],
        enabledActions: ["undo", "redo", "clear"],
        // Graded on Grade/Save, and drawn as the correct answer once the question is finished.
        // y = (income - pizzaPrice * x) / bookPrice
        expectedDrawing: [
          { type: "segment", yIntercept: INCOME / bookPrice, slope: -pizzaPrice / bookPrice, tolerance: 0.1 },
        ],
      },
    },
  ],
};
