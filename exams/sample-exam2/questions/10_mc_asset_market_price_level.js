import { dropdown, noParams } from "./helpers.js";

const EFFECTS = ["an increase", "no change", "a decrease"];

export const assetMarketPriceLevel = {
  id: "exam2-q10-asset-market-price-level",
  title: "Asset market equilibrium and the price level",
  generate: noParams,
  render: () =>
    "Consider the equilibrium condition for the asset market\n\n" +
    "$$\n\\frac{M}{P} = L(Y, r + \\pi^e).\n$$\n\n" +
    "Using this condition, answer the following questions.",
  parts: () => [
    dropdown(
      "inflationExpectations",
      "**(1)** A decrease in inflation expectations ($\\pi^e$), with no change in output, real interest rate, or the money supply, will result in ___ in the price level.",
      EFFECTS,
      "a decrease"
    ),
    dropdown(
      "moneySupply",
      "**(2)** An increase in the nominal money supply ($M$), with no change in output, real interest rate, or inflation expectations, will result in ___ in the price level.",
      EFFECTS,
      "an increase"
    ),
    dropdown(
      "output",
      "**(3)** A decrease in output ($Y$), with no change in the money supply, real interest rate, or inflation expectations, will result in ___ in the price level.",
      EFFECTS,
      "an increase"
    ),
  ],
};
