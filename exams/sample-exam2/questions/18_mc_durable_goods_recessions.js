import { mc, noParams } from "./helpers.js";

export const durableGoodsRecessions = {
  id: "exam2-q18-durable-goods-recessions",
  title: "Durable goods spending in recessions",
  generate: noParams,
  render: () =>
    "Consumer expenditures on durable goods such as cars and furniture, as well as purchases of new houses, fall much more " +
    "than expenditures on nondurable goods and services during most recessions. Why do you think that is?",
  parts: () => [
    mc(
      "reason",
      "",
      [
        "because companies stop making cars, furniture, and houses in recessions",
        "because people can more easily change the timing of their expenditure on durables",
        "because prices of cars, furniture, and houses rise sharply in recessions",
        "because the government increases taxes on cars, furniture, and houses in recessions",
      ],
      1
    ),
  ],
};
