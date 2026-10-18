import { dropdown, noParams } from "./helpers.js";

const CYCLICALITY = ["Procyclical", "Countercyclical"];

export const procyclicalCountercyclical = {
  id: "exam2-q16-procyclical-countercyclical",
  title: "Procyclical or countercyclical?",
  generate: noParams,
  render: () => "Identify the following variables as being procyclical or countercyclical.",
  parts: () => [
    dropdown("unemployment", "**(1)** Unemployment:", CYCLICALITY, "Countercyclical"),
    dropdown("consumption", "**(2)** Consumption expenditure:", CYCLICALITY, "Procyclical"),
    dropdown("inflation", "**(3)** Inflation:", CYCLICALITY, "Procyclical"),
    dropdown("nominalRates", "**(4)** Nominal interest rates:", CYCLICALITY, "Procyclical"),
  ],
};
