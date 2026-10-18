import { mc, noParams } from "./helpers.js";

export const moneyNeutrality = {
  id: "exam2-q27-money-neutrality",
  title: "Neutrality of money",
  generate: noParams,
  render: () => "When economists say that money is neutral, this means that:",
  parts: () => [
    mc(
      "meaning",
      "",
      [
        "a change in the money supply changes real variables but not nominal variables.",
        "a change in the money supply has no effect on the economy.",
        "a change in the money supply changes nominal variables but not real variables.",
        "a change in the money supply will stall the economy, preventing further growth.",
      ],
      2
    ),
  ],
};
