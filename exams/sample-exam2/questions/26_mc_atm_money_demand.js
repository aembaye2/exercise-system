import { dropdown, noParams } from "./helpers.js";

const CHANGES = ["Increases", "Decreases", "Remains unchanged"];

export const atmMoneyDemand = {
  id: "exam2-q26-atm-money-demand",
  title: "ATMs and the demand for money (IS-LM)",
  generate: noParams,
  render: () =>
    "Use the *IS-LM* model to determine the effects of an increased usage of automatic teller machines that reduces the " +
    "demand for money. Show the effects on the general equilibrium values of the following variables.",
  parts: () => [
    dropdown("realWage", "**(1)** Real wage", CHANGES, "Remains unchanged"),
    dropdown("employment", "**(2)** Employment", CHANGES, "Remains unchanged"),
    dropdown("output", "**(3)** Output", CHANGES, "Remains unchanged"),
    dropdown("priceLevel", "**(4)** Price level", CHANGES, "Increases"),
    dropdown("realInterestRate", "**(5)** Real interest rate", CHANGES, "Remains unchanged"),
    dropdown("investment", "**(6)** Investment", CHANGES, "Remains unchanged"),
    dropdown("consumption", "**(7)** Consumption", CHANGES, "Remains unchanged"),
  ],
};
