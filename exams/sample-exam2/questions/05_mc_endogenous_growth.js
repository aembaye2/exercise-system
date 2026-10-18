import { mc, noParams } from "./helpers.js";

export const endogenousGrowth = {
  id: "exam2-q05-endogenous-growth",
  title: "Endogenous growth theory",
  generate: noParams,
  render: () => "Answer both parts about endogenous growth theory.",
  parts: () => [
    mc(
      "explanations",
      "**(a)** What two explanations of productivity growth does endogenous growth theory offer?",
      [
        "population growth and increased saving",
        "population growth and technological innovation",
        "increased saving and technological innovation",
        "accumulation of human capital and technological innovation",
      ],
      3
    ),
    mc(
      "productionFunction",
      "**(b)** How does the production function in an endogenous growth model differ from the production function in the Solow model? " +
        "In the Solow model, the production function _____, while in the endogenous growth model, the production function _____.",
      [
        "depends on capital but not labor; depends on labor but not capital",
        "depends on labor but not capital; depends on capital but not labor",
        "does not exhibit diminishing marginal productivity; exhibits diminishing marginal productivity",
        "exhibits diminishing marginal productivity; does not exhibit diminishing marginal productivity",
      ],
      3
    ),
  ],
};
