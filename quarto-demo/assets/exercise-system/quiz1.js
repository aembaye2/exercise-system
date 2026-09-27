// Consumed by exercise-system.js (see index.qmd). This is the only file a
// Quarto author needs to write or edit: pick which question modules to
// include and how many points each is worth.
import { priceElasticity } from "./questions/sample/q01_price_elasticity.js";
import { typesOfGoods } from "./questions/sample/q02_types_of_goods.js";
import { marketEquilibrium } from "./questions/sample/q03_market_equilibrium.js";
import { firmProfit } from "./questions/sample/q04_firm_profit.js";
import { presentValue } from "./questions/sample/q05_present_value.js";
import { economicTerms } from "./questions/sample/q06_economic_terms.js";
import { taxIncidence } from "./questions/sample/q07_tax_incidence.js";
import { indifferenceCurve } from "./questions/sample/q08_indifference_curve.js";
//import { demandShift } from "./questions/sample/q09_demand_shift.js";
import { gdpDeflator } from "./questions/sample/q10_gdp_deflator.js";

export const questions = [
  priceElasticity,
  typesOfGoods,
  marketEquilibrium,
  firmProfit,
  presentValue,
  economicTerms,
  taxIncidence,
  indifferenceCurve,
  //demandShift,
  gdpDeflator,
];

export const assessment = {
  id: "econ-exercise-1",
  title: "Exercise 1: All Type of Questions",
  description: "Every practice question in one exercise. Unlimited attempts; your best score on each counts.",
  mode: "exercise",
  questions: questions.map((q) => ({ questionId: q.id, points: 10 })),
};
