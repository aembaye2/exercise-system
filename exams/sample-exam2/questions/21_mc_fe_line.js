import { mc, noParams } from "./helpers.js";

export const feLine = {
  id: "exam2-q21-fe-line",
  title: "The FE line",
  generate: noParams,
  render: () => "Answer both parts about the full-employment (*FE*) line.",
  parts: () => [
    mc(
      "position",
      "**(a)** The position of the *FE* line is determined by:",
      [
        "the price level and interest rate.",
        "the labor market and the production function.",
        "the money supply and government purchases.",
        "consumption and investment.",
      ],
      1
    ),
    mc(
      "except",
      "**(b)** All of the following will shift the *FE* line **except**:",
      [
        "a beneficial supply shock.",
        "an increase in the price level.",
        "an increase in labor supply.",
        "an increase in the capital stock.",
      ],
      1
    ),
  ],
};
