// Consumed by exercise-system.js (see index.qmd). Quiz 1: a template/test quiz
// with exactly one question per element type (plus the dropdown display of
// multiple-choice, since it looks and behaves differently from the radio
// version even though it's the same element type). No type is duplicated
// beyond that.
import { typesOfGoods } from "./questions/sample/02_mc_types_of_goods.js";
import { economicTerms } from "./questions/sample/06_mc_economic_terms.js";
import { priceElasticity } from "./questions/sample/01_number_price_elasticity.js";
import { firmProfit } from "./questions/sample/04_integer_firm_profit.js";
import { budgetLine } from "./questions/sample/13_jsxgraph_budget_line.js";
import { econTermsMatching } from "./questions/quiz1/01_matching_econ_terms.js";
import { revenueTable } from "./questions/quiz1/02_table_revenue.js";
import { productionPossibilities } from "./questions/quiz1/03_svgDrawing_ppf.js";

export const questions = [
  typesOfGoods, // multiple-choice (radio)
  economicTerms, // multiple-choice (dropdown)
  priceElasticity, // number
  firmProfit, // integer
  revenueTable, // table
  budgetLine, // jsxgraph
  productionPossibilities, // svgDrawing
  econTermsMatching, // matching
];

export const assessment = {
  id: "quiz1",
  title: "Quiz 1: One question of every type",
  description: "A template quiz with one example of every question type. Unlimited attempts; your best score on each counts.",
  mode: "exercise",
  questions: questions.map((q) => ({ questionId: q.id, points: 10 })),
};
