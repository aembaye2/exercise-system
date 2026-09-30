import type { AnyQuestion } from "../engine/types";
import { priceElasticity } from "./01_number_price_elasticity";
import { typesOfGoods } from "./02_mc_types_of_goods";
import { marketEquilibrium } from "./03_number-mc_market_equilibrium";
import { firmProfit } from "./04_integer_firm_profit";
import { presentValue } from "./05_number_present_value";
import { economicTerms } from "./06_mc_economic_terms";
import { gdpDeflator } from "./10_number_gdp_deflator";
import { comparativeAdvantage } from "./11_mc-number_comparative_advantage";
import { gainsFromTrade } from "./12_table_gains_from_trade";
import { budgetLine } from "./13_jsxgraph_budget_line";
import { productionPossibilities } from "./14_svgDrawing_ppf";
import { econVocabularyMatching } from "./15_matching_econ_vocabulary";
import { elasticityStatements } from "./16_true-false_elasticity_statements";

/** Every question available to assessments. Add new questions here. */
export const questions: AnyQuestion[] = [
  priceElasticity,
  typesOfGoods,
  marketEquilibrium,
  firmProfit,
  presentValue,
  economicTerms,
  gdpDeflator,
  comparativeAdvantage,
  gainsFromTrade,
  budgetLine,
  productionPossibilities,
  econVocabularyMatching,
  elasticityStatements,
];

const byId = new Map(questions.map((q) => [q.id, q]));
if (byId.size !== questions.length) throw new Error("Duplicate question ids in the question bank.");

export function getQuestion(id: string): AnyQuestion | undefined {
  return byId.get(id);
}
