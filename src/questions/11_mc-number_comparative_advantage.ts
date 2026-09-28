import type { Question } from "../engine/types";

interface Params {
  saOil: number; // barrels Saudi Arabia can produce with 100 hours
  saCorn: number; // bushels
  usOil: number;
  usCorn: number;
}

const COUNTRIES = ["Saudi Arabia", "United States"] as const;
// Powers of 2 apart, so every opportunity cost is a terminating decimal.
const AMOUNTS = [25, 50, 100, 200];

/** Fill-in-the-blank table question: numeric parts plus inline dropdowns. */
export const comparativeAdvantage: Question<Params> = {
  id: "comparative-advantage-table",
  title: "Opportunity cost, absolute and comparative advantage",
  generate: (rng) => {
    // Redraw until each country has a different opportunity cost (so comparative
    // advantage is defined) and neither good is a tie (so absolute advantage is).
    for (;;) {
      const [saOil, saCorn, usOil, usCorn] = [0, 0, 0, 0].map(() => rng.pick(AMOUNTS));
      if (saOil !== usOil && saCorn !== usCorn && saCorn * usOil !== usCorn * saOil) {
        return { saOil, saCorn, usOil, usCorn };
      }
    }
  },
  render: ({ saOil, saCorn, usOil, usCorn }) =>
    `Saudi Arabia and the United States each have $100$ worker hours per week to produce oil, corn, ` +
    `or a combination of both. The following table shows their production possibilities:\n\n` +
    `| Country | Oil using 100 hours (barrels) | Corn using 100 hours (bushels) |\n` +
    `| --- | --- | --- |\n` +
    `| Saudi Arabia | ${saOil} | ${saCorn} |\n` +
    `| United States | ${usOil} | ${usCorn} |\n\n` +
    `Fill in the blanks. Enter opportunity costs as decimals.`,
  parts: ({ saOil, saCorn, usOil, usCorn }) => {
    const who = (saWins: boolean) => (saWins ? COUNTRIES[0] : COUNTRIES[1]);
    const saOilCost = saCorn / saOil; // bushels of corn per barrel of oil
    const usOilCost = usCorn / usOil;
    const country = (name: string, label: string, winner: string) => ({
      type: "multiple-choice" as const,
      name,
      label,
      suffix: ".",
      display: "dropdown" as const,
      order: "fixed" as const,
      options: COUNTRIES.map((c) => ({ text: c, correct: c === winner })),
    });
    return [
      { type: "number", name: "saOil", label: "**(a)** Saudi Arabia's opportunity cost of 1 barrel of oil:", correct: saOilCost, suffix: "bushels of corn" },
      { type: "number", name: "saCorn", label: "1 bushel of corn:", correct: 1 / saOilCost, suffix: "barrels of oil" },
      { type: "number", name: "usOil", label: "**(b)** The United States' opportunity cost of 1 barrel of oil:", correct: usOilCost, suffix: "bushels of corn" },
      { type: "number", name: "usCorn", label: "1 bushel of corn:", correct: 1 / usOilCost, suffix: "barrels of oil" },
      country("absOil", "**(c)** The absolute advantage in oil production belongs to", who(saOil > usOil)),
      country("absCorn", "**(d)** The absolute advantage in corn production belongs to", who(saCorn > usCorn)),
      country("compOil", "**(e)** The comparative advantage in oil production belongs to", who(saOilCost < usOilCost)),
      country("compCorn", "**(f)** The comparative advantage in corn production belongs to", who(saOilCost > usOilCost)),
    ];
  },
};
