import type { AnyQuestion } from "../engine/types";
import { priceElasticity } from "./q01_price_elasticity";
import { typesOfGoods } from "./q02_types_of_goods";
import { marketEquilibrium } from "./q03_market_equilibrium";
import { firmProfit } from "./q04_firm_profit";
import { presentValue } from "./q05_present_value";
import { economicTerms } from "./q06_economic_terms";
import { taxIncidence } from "./q07_tax_incidence";
import { indifferenceCurve } from "./q08_indifference_curve";
import { demandShift } from "./q09_demand_shift";
import { gdpDeflator } from "./q10_gdp_deflator";
import { comparativeAdvantage } from "./q11_comparative_advantage";
import { gainsFromTrade } from "./q12_gains_from_trade";

/** Every question available to assessments. Add new questions here. */
export const questions: AnyQuestion[] = [
  priceElasticity,
  typesOfGoods,
  marketEquilibrium,
  firmProfit,
  presentValue,
  economicTerms,
  taxIncidence,
  indifferenceCurve,
  demandShift,
  gdpDeflator,
  comparativeAdvantage,
  gainsFromTrade,
];

const byId = new Map(questions.map((q) => [q.id, q]));
if (byId.size !== questions.length) throw new Error("Duplicate question ids in the question bank.");

export function getQuestion(id: string): AnyQuestion | undefined {
  return byId.get(id);
}
