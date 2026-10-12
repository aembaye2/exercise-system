import type { TableCell } from "../elements/table";
import type { Question } from "../engine/types";

interface Params {
  saOil: number; // barrels Saudi Arabia can produce with 100 hours
  saCorn: number; // bushels
  usOil: number;
  usCorn: number;
  oilTraded: number; // barrels exported by the oil specialist
  cornTraded: number; // bushels received for them
}

type Bundle = [oil: number, corn: number];

/** The worksheet's numbers (same production possibilities as the comparative-advantage question). */
const WORKSHEET: Params = { saOil: 100, saCorn: 25, usOil: 50, usCorn: 100, oilTraded: 45, cornTraded: 40 };

/**
 * Everything the table needs, computed from the production possibilities:
 * without trade each country splits its hours evenly; with trade each completely
 * specializes by comparative advantage and the oil specialist exports oil for corn.
 */
function solve({ saOil, saCorn, usOil, usCorn, oilTraded, cornTraded }: Params) {
  const saSpecializesInOil = saCorn / saOil < usCorn / usOil;
  const autarky: Record<"sa" | "us", Bundle> = { sa: [saOil / 2, saCorn / 2], us: [usOil / 2, usCorn / 2] };
  const production: Record<"sa" | "us", Bundle> = saSpecializesInOil
    ? { sa: [saOil, 0], us: [0, usCorn] }
    : { sa: [0, saCorn], us: [usOil, 0] };
  const exporter: Bundle = [-oilTraded, cornTraded];
  const importer: Bundle = [oilTraded, -cornTraded];
  const trade = saSpecializesInOil ? { sa: exporter, us: importer } : { sa: importer, us: exporter };
  const add = (a: Bundle, b: Bundle): Bundle => [a[0] + b[0], a[1] + b[1]];
  const consumption = { sa: add(production.sa, trade.sa), us: add(production.us, trade.us) };
  const gains = {
    sa: add(consumption.sa, [-autarky.sa[0], -autarky.sa[1]]),
    us: add(consumption.us, [-autarky.us[0], -autarky.us[1]]),
  };
  return { saSpecializesInOil, autarky, production, trade, consumption, gains };
}

/** One table row: Saudi Arabia (oil, corn) then United States (oil, corn). */
const row = (sa: Bundle, us: Bundle, blank: boolean): TableCell[] =>
  [...sa, ...us].map((x) => (blank ? { correct: x } : x));

/** Fillable table: production, trade and consumption with complete specialization. */
export const gainsFromTrade: Question<Params> = {
  id: "gains-from-trade-table",
  title: "Gains from trade (fill in the table)",
  generate: () => ({ ...WORKSHEET }),
  render: (params) => {
    const { saOil, saCorn, usOil, usCorn, oilTraded, cornTraded } = params;
    const exporter = solve(params).saSpecializesInOil ? "Saudi Arabia" : "The United States";
    return (
      `Saudi Arabia and the United States each have $100$ worker hours per week to produce oil, corn, ` +
      `or a combination of both:\n\n` +
      `| Country | Oil using 100 hours (barrels) | Corn using 100 hours (bushels) |\n` +
      `| --- | --- | --- |\n` +
      `| Saudi Arabia | ${saOil} | ${saCorn} |\n` +
      `| United States | ${usOil} | ${usCorn} |\n\n` +
      `Without trade, each country splits its hours evenly between the two goods. ` +
      `Fill in the table assuming *complete specialization* and a trade action of: ` +
      `**${exporter} trades ${oilTraded} barrels of oil for ${cornTraded} bushels of corn.**\n\n` +
      `In the **Trade Action** row, enter exports as negative numbers and imports as positive numbers.`
    );
  },
  parts: (params) => {
    const s = solve(params);
    return [
      {
        type: "table",
        name: "trade",
        columnGroups: [
          { label: "Saudi Arabia", span: 2 },
          { label: "United States", span: 2 },
        ],
        columns: ["Oil (barrels)", "Corn (bushels)", "Oil (barrels)", "Corn (bushels)"],
        rows: [
          { label: "Without Trade" },
          { label: "Production", cells: row(s.autarky.sa, s.autarky.us, false) },
          { label: "Consumption", cells: row(s.autarky.sa, s.autarky.us, false) },
          { label: "With Trade" },
          { label: "Production", cells: row(s.production.sa, s.production.us, true) },
          { label: "Trade Action", cells: row(s.trade.sa, s.trade.us, true) },
          { label: "Consumption", cells: row(s.consumption.sa, s.consumption.us, true) },
          { label: "Gains from Trade" },
          { label: "Increase in Consumption", cells: row(s.gains.sa, s.gains.us, true) },
        ],
      },
    ];
  },
};
