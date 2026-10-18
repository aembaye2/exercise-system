// The demo quiz: one question of every element type, the same as assessment `ex1` in
// src/assessments/index.ts. Each file in questions/ is a plain-JS copy of the matching
// src/questions/*.ts file.
import { typesOfGoods } from "./questions/01_mc_types_of_goods.js";
import { marketEquilibrium } from "./questions/02_number-mc_market_equilibrium.js";
import { firmProfit } from "./questions/03_integer_firm_profit.js";
import { economicTerms } from "./questions/04_mc_economic_terms.js";
import { comparativeAdvantage } from "./questions/05_mc-number_comparative_advantage.js";
import { gainsFromTrade } from "./questions/06_table_gains_from_trade.js";
import { budgetLine } from "./questions/07_jsxgraph_budget_line.js";
import { productionPossibilities } from "./questions/08_svgDrawing_ppf.js";
import { econVocabularyMatching } from "./questions/09_matching_econ_vocabulary.js";
import { elasticityStatements } from "./questions/10_true-false_elasticity_statements.js";
import { incomeDemandPriceChain } from "./questions/11_ordering_income_demand_price.js";
import { marginalCostExpression } from "./questions/12_expression_marginal_cost.js";
import { quadraticEssay } from "./questions/13_essay_quadratic_equation.js";
import { profitMaximum } from "./questions/14_conditional-grading_profit_maximum.js";

export const questions = [
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
  profitMaximum,
];

export const assessment = {
  id: "quiz1",
  title: "Quiz 1: (for instructor use only)",
  description: "One question of every type.",
  mode: "exercise",
  gradeButton: false,   // false: no Grade button, Save & next saves; grades are hidden
  questions: questions.map((q) => ({ questionId: q.id, points: 10 })),
};
