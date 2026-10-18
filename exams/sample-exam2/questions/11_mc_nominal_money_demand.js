import { mc, noParams } from "./helpers.js";

export const nominalMoneyDemand = {
  id: "exam2-q11-nominal-money-demand",
  title: "A 10% fall in nominal money demand",
  generate: noParams,
  render: () => "Which of the following is most likely to lead to a decrease of 10% in the nominal demand for money?",
  parts: () => [
    mc(
      "cause",
      "",
      [
        "A decrease in real income of 5%.",
        "An increase of 10% in the price level.",
        "A decline of 10% in the price level.",
        "An increase in real income of 5%.",
      ],
      2
    ),
  ],
};
