import { dropdown, noParams } from "./helpers.js";

const CHANGES = ["Increase", "Decrease", "Remain unchanged"];

export const recessionEffects = {
  id: "exam2-q17-recession-effects",
  title: "What happens in a recession",
  generate: noParams,
  render: () =>
    "If you knew that the economy was falling into a recession, what would you expect to happen during the next few quarters to each of the following?",
  parts: () => [
    dropdown("production", "**(1)** Production:", CHANGES, "Decrease"),
    dropdown("investment", "**(2)** Investment:", CHANGES, "Decrease"),
    dropdown("productivity", "**(3)** Average labor productivity:", CHANGES, "Decrease"),
    dropdown("realWage", "**(4)** The real wage:", CHANGES, "Decrease"),
    dropdown("unemployment", "**(5)** The unemployment rate:", CHANGES, "Increase"),
  ],
};
