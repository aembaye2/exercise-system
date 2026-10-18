import { dropdown, mc, noParams } from "./helpers.js";

export const velocityOfMoney = {
  id: "exam2-q08-velocity-of-money",
  title: "Velocity of money",
  generate: noParams,
  render: () => "Answer both parts about the velocity of money.",
  parts: () => [
    mc(
      "definition",
      "**(a)** Define the velocity of money.",
      [
        "It is the ratio of the amount of money in circulation to the price level.",
        "It is the ratio of real GDP to the amount of money in circulation.",
        "It is the ratio of nominal GDP to the price level.",
        "It is the ratio of nominal GDP to the amount of money in circulation.",
      ],
      3
    ),
    dropdown(
      "quantityTheory",
      "**(b)** In the quantity theory of money, velocity is assumed to be highly",
      ["volatile", "stable"],
      "stable"
    ),
  ],
};
