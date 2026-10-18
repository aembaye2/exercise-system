// Sample Exam 2 (Ch 6, 7, 8 & 9), ECON 31303 Intermediate Macroeconomics, fall 2026.
// Built from "Sample Exam 2-Ch 6-9, econ310303.pdf"; one file per exam question in questions/.
//
//   npm run scorm -- exams/sample-exam2/exam2.js
import { productivityGrowth } from "./questions/01_mc_productivity_growth.js";
import { solowExogenousEndogenous } from "./questions/02_mc_solow_exogenous_endogenous.js";
import { solowNoProductivityGrowth } from "./questions/03_mc_solow_no_productivity_growth.js";
import { capitalLaborRatio } from "./questions/04_true-false_capital_labor_ratio.js";
import { endogenousGrowth } from "./questions/05_mc_endogenous_growth.js";
import { usSavingRate } from "./questions/06_mc_us_saving_rate.js";
import { assetDesirability } from "./questions/07_mc_asset_desirability.js";
import { velocityOfMoney } from "./questions/08_mc_velocity_of_money.js";
import { moneyDemandVariables } from "./questions/09_mc_money_demand_variables.js";
import { assetMarketPriceLevel } from "./questions/10_mc_asset_market_price_level.js";
import { nominalMoneyDemand } from "./questions/11_mc_nominal_money_demand.js";
import { assetMarketVariables } from "./questions/12_mc_asset_market_variables.js";
import { greatModeration } from "./questions/13_mc_great_moderation.js";
import { usContractions } from "./questions/14_mc_us_contractions.js";
import { cyclicalTerms } from "./questions/15_mc_cyclical_terms.js";
import { procyclicalCountercyclical } from "./questions/16_mc_procyclical_countercyclical.js";
import { recessionEffects } from "./questions/17_mc_recession_effects.js";
import { durableGoodsRecessions } from "./questions/18_mc_durable_goods_recessions.js";
import { positiveAdShock } from "./questions/19_mc_positive_ad_shock.js";
import { keynesiansClassicals } from "./questions/20_mc_keynesians_classicals.js";
import { feLine } from "./questions/21_mc_fe_line.js";
import { isCurveDefinition } from "./questions/22_mc_is_curve_definition.js";
import { isCurveShifts } from "./questions/23_mc_is_curve_shifts.js";
import { lmCurveShifts } from "./questions/24_mc_lm_curve_shifts.js";
import { adverseSupplyShock } from "./questions/25_mc_adverse_supply_shock.js";
import { atmMoneyDemand } from "./questions/26_mc_atm_money_demand.js";
import { moneyNeutrality } from "./questions/27_mc_money_neutrality.js";
import { adAsMoneySupply } from "./questions/28_mc_ad_as_money_supply.js";
import { srasLras } from "./questions/29_mc_sras_lras.js";
import { deriveLmCurve } from "./questions/30_svgDrawing_derive_lm_curve.js";
import { goodsMarketInterestRate } from "./questions/31_integer_goods_market_interest_rate.js";
import { beneficialSupplyShock } from "./questions/32_mc_beneficial_supply_shock.js";

export const questions = [
  productivityGrowth,
  solowExogenousEndogenous,
  solowNoProductivityGrowth,
  capitalLaborRatio,
  endogenousGrowth,
  usSavingRate,
  assetDesirability,
  velocityOfMoney,
  moneyDemandVariables,
  assetMarketPriceLevel,
  nominalMoneyDemand,
  assetMarketVariables,
  greatModeration,
  usContractions,
  cyclicalTerms,
  procyclicalCountercyclical,
  recessionEffects,
  durableGoodsRecessions,
  positiveAdShock,
  keynesiansClassicals,
  feLine,
  isCurveDefinition,
  isCurveShifts,
  lmCurveShifts,
  adverseSupplyShock,
  atmMoneyDemand,
  moneyNeutrality,
  adAsMoneySupply,
  srasLras,
  deriveLmCurve,
  goodsMarketInterestRate,
  beneficialSupplyShock,
];

export const assessment = {
  id: "sample-exam2",
  title: "Sample Exam 2 (not ready yet)",
  description: "ECON 31303 Intermediate Macroeconomics. 32 questions, equal weight.",
  mode: "exam",
  gradeButton: false, // false: no Grade button, Save & next saves; grades are hidden until released in the LMS
  resetButton: true, // no "Reset assessment" button, so saved answers can't be wiped
  questions: questions.map((q) => ({ questionId: q.id, points: 1 })),
};
