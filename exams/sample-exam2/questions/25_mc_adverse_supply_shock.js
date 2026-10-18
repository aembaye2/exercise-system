import { dropdown, noParams } from "./helpers.js";

const CHANGES = ["will increase.", "will stay the same.", "will decrease."];

export const adverseSupplyShock = {
  id: "exam2-q25-adverse-supply-shock",
  title: "General-equilibrium effects of a temporary adverse supply shock",
  generate: noParams,
  render: () =>
    "Consider the general-equilibrium effects of a **temporary adverse supply shock**. For each of the following variables, " +
    "select whether you would expect it to increase, decrease, or remain constant in general equilibrium as a result of the shock.",
  parts: () => [
    dropdown("output", "**(1)** Output", CHANGES, "will decrease."),
    dropdown("realInterestRate", "**(2)** The real interest rate", CHANGES, "will increase."),
    dropdown("priceLevel", "**(3)** The price level", CHANGES, "will increase."),
    dropdown("consumption", "**(4)** Consumption", CHANGES, "will decrease."),
    dropdown("investment", "**(5)** Investment", CHANGES, "will decrease."),
    dropdown("governmentSpending", "**(6)** Government spending", CHANGES, "will stay the same."),
    dropdown("moneySupply", "**(7)** The nominal money supply", CHANGES, "will stay the same."),
  ],
};
