import { mc, noParams } from "./helpers.js";

export const solowNoProductivityGrowth = {
  id: "exam2-q03-solow-no-productivity-growth",
  title: "Solow model without productivity growth",
  generate: noParams,
  render: () =>
    "According to the Solow model of economic growth, if there is no productivity growth, what will happen to " +
    "output per worker, consumption per worker, and capital per worker in the long run?",
  parts: () => [
    mc(
      "longRun",
      "",
      [
        "all will increase",
        "all will decrease",
        "all will remain the same",
        "output and capital per worker will increase, while consumption will decrease",
      ],
      2
    ),
  ],
};
