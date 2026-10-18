import { mc, noParams } from "./helpers.js";

export const moneyDemandVariables = {
  id: "exam2-q09-money-demand-variables",
  title: "Determinants of the demand for money",
  generate: noParams,
  render: () => "Which of the following four variables has little impact on the aggregate demand for money?",
  parts: () => [
    mc("variable", "", ["the real exchange rate", "the price level", "aggregate income", "the nominal interest rate"], 0),
  ],
};
