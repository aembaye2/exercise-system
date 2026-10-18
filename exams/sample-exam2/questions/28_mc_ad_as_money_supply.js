import { mc, noParams } from "./helpers.js";

export const adAsMoneySupply = {
  id: "exam2-q28-ad-as-money-supply",
  title: "A decrease in the money supply in the AD-AS model",
  generate: noParams,
  render: () => "Answer both parts about a **decrease** in the money supply in the *AD-AS* model.",
  parts: () => [
    mc(
      "shortRun",
      "**(a)** In the *AD-AS* model, the short-run effect of a decrease in the money supply is",
      [
        "a shift down and to the left of the *AD* curve, causing output to fall at an unchanged price level.",
        "no change, because money is neutral in the short run.",
        "a shift up and to the right of the *AD* curve, causing output to rise at an unchanged price level.",
        "a shift up and to the right of the *AD* curve and a shift up of the *SRAS* curve, causing output and the price level to rise.",
        "a shift down and to the left of the *AD* curve and a shift down of the *SRAS* curve, causing output and the price level to fall.",
      ],
      0
    ),
    mc(
      "longRun",
      "**(b)** In the *AD-AS* model, the long-run effect of a decrease in the money supply is",
      [
        "a proportionate fall in the price level and in output.",
        "no change at all, because money is neutral in the long run.",
        "a proportionate increase in the price level, but no changes to real variables such as output.",
        "a proportionate increase in the price level and in output.",
        "a proportionate fall in the price level, but no changes to real variables such as output.",
      ],
      4
    ),
  ],
};
