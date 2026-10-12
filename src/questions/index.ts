import type { AnyQuestion } from "../engine/types";
import { typesOfGoods } from "./01_mc_types_of_goods";
import { marketEquilibrium } from "./02_number-mc_market_equilibrium";
import { firmProfit } from "./03_integer_firm_profit";
import { economicTerms } from "./04_mc_economic_terms";
import { comparativeAdvantage } from "./05_mc-number_comparative_advantage";
import { gainsFromTrade } from "./06_table_gains_from_trade";
import { budgetLine } from "./07_jsxgraph_budget_line";
import { productionPossibilities } from "./08_svgDrawing_ppf";
import { econVocabularyMatching } from "./09_matching_econ_vocabulary";
import { elasticityStatements } from "./10_true-false_elasticity_statements";
import { incomeDemandPriceChain } from "./11_ordering_income_demand_price";
import { marginalCostExpression } from "./12_expression_marginal_cost";
import { quadraticEssay } from "./13_essay_quadratic_equation";

/** Every question available to assessments. Add new questions here. */
export const questions: AnyQuestion[] = [
  typesOfGoods,
  marketEquilibrium,
  firmProfit,
  economicTerms,
  comparativeAdvantage,
  gainsFromTrade,
  budgetLine,
  productionPossibilities,
  econVocabularyMatching,
  elasticityStatements,
  incomeDemandPriceChain,
  marginalCostExpression,
  quadraticEssay,
];

const byId = new Map(questions.map((q) => [q.id, q]));
if (byId.size !== questions.length) throw new Error("Duplicate question ids in the question bank.");

export function getQuestion(id: string): AnyQuestion | undefined {
  return byId.get(id);
}
