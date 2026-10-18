import { mc, noParams } from "./helpers.js";

export const greatModeration = {
  id: "exam2-q13-great-moderation",
  title: "The Great Moderation",
  generate: noParams,
  render: () => "Which of the following is **not** a reasonable explanation for the Great Moderation?",
  parts: () => [
    mc(
      "explanation",
      "",
      [
        "higher oil prices",
        "changes in the behavior of the labor market",
        "changes in technology",
        "improved supply-chain management",
      ],
      0
    ),
  ],
};
