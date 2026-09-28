// Consumed by exercise-system.js (see index.qmd). This is the only file a
// Quarto author needs to write or edit: pick which question modules to
// include and how many points each is worth.
import { priceElasticity } from "./questions/sample/01_number_price_elasticity.js";
import { typesOfGoods } from "./questions/sample/02_mc_types_of_goods.js";
import { marketEquilibrium } from "./questions/sample/03_number-mc_market_equilibrium.js";
import { firmProfit } from "./questions/sample/04_integer_firm_profit.js";
import { presentValue } from "./questions/sample/05_number_present_value.js";
import { economicTerms } from "./questions/sample/06_mc_economic_terms.js";
import { gdpDeflator } from "./questions/sample/10_number_gdp_deflator.js";
import { budgetLine } from "./questions/sample/13_jsxgraph_budget_line.js";

export const questions = [
  priceElasticity,
  typesOfGoods,
  marketEquilibrium,
  firmProfit,
  presentValue,
  economicTerms,
  gdpDeflator,
  budgetLine,
];

export const assessment = {
  id: "econ-exercise-1",
  title: "Exercise 1: All Type of Questions",
  description: "Every practice question in one exercise. Unlimited attempts; your best score on each counts.",
  mode: "exercise",
  questions: questions.map((q) => ({ questionId: q.id, points: 10 })),
};
