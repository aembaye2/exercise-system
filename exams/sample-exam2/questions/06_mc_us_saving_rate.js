import { mc, noParams } from "./helpers.js";

export const usSavingRate = {
  id: "exam2-q06-us-saving-rate",
  title: "Why the U.S. saving rate may be too low",
  generate: noParams,
  render: () =>
    "Some economists argue that the U.S. saving rate is too low. Which of the following is a reasonable explanation for why " +
    "the invisible hand of the market has failed to achieve a saving rate which optimally balances present consumption " +
    "against future increases in living standards?",
  parts: () => [
    mc(
      "explanation",
      "",
      [
        "Americans are predisposed to overweight the value of present consumption as compared to future consumption.",
        "Tax treatment of income discourages saving by taxing the returns to saving.",
        "The political process results in deficit spending that differs from public preferences.",
        "All of these are reasonable explanations.",
        "None of these are reasonable explanations.",
      ],
      3,
      { order: "fixed" }
    ),
  ],
};
