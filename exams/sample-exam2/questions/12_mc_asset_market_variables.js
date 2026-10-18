import { mc, noParams } from "./helpers.js";

export const assetMarketVariables = {
  id: "exam2-q12-asset-market-variables",
  title: "Variables in the asset market equilibrium condition",
  generate: noParams,
  render: () => "Which of these variables is **not** a variable in the equation for the asset market equilibrium condition?",
  parts: () => [mc("variable", "", ["Real income", "Expected rate of inflation", "Real interest rate", "Saving"], 3)],
};
