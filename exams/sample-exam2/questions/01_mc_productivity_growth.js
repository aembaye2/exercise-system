import { mc, noParams } from "./helpers.js";

export const productivityGrowth = {
  id: "exam2-q01-productivity-growth",
  title: "Labor productivity and total factor productivity",
  generate: noParams,
  render: () => "Answer both parts about labor productivity and total factor productivity (TFP).",
  parts: () => [
    mc(
      "difference",
      "**(a)** The difference between the growth rate of labor productivity and the growth rate of total factor productivity depends on",
      [
        "the growth rate of the amount of capital per unit of labor.",
        "the growth rate of real wages.",
        "the growth rate of business investment.",
        "the inflation rate.",
      ],
      0
    ),
    mc(
      "period1995",
      "**(b)** From 1995 to 2008, the growth rate of capital per unit of labor was high, which caused",
      [
        "high inflation rates.",
        "labor productivity growth to be much higher than total factor productivity growth.",
        "labor productivity growth to be much lower than total factor productivity growth.",
        "wages to grow faster than before.",
      ],
      1
    ),
  ],
};
