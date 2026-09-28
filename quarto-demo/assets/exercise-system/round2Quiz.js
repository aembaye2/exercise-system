// Consumed by exercise-system.js. Round 2: the multiple-choice questions
// converted from questions/round2/mc_in_one_file.md, plus a drawing question.
import { absoluteAdvantage } from "./questions/round2/01_mc_absolute_advantage.js";
import { pointOutsidePpf } from "./questions/round2/02_mc_point_outside_ppf.js";
import { lawOfDemand } from "./questions/round2/03_mc_law_of_demand.js";
import { economicsDefined } from "./questions/round2/04_mc_economics_defined.js";
import { opportunityCostVacation } from "./questions/round2/05_mc_opportunity_cost_vacation.js";
import { gasolineDemandShift } from "./questions/round2/06_mc_gasoline_demand_shift.js";
import { microeconomicsDefined } from "./questions/round2/07_mc_microeconomics_defined.js";
import { budgetLine } from "./questions/round2/08_jsxgraph_budget_line.js";

export const questions = [
  absoluteAdvantage,
  pointOutsidePpf,
  lawOfDemand,
  economicsDefined,
  opportunityCostVacation,
  gasolineDemandShift,
  microeconomicsDefined,
  budgetLine,
];

export const assessment = {
  id: "econ-exercise-2",
  title: "Exercise 2: Economics basics",
  description: "Seven multiple-choice questions and one graph to draw. Unlimited attempts; your best score on each counts.",
  mode: "exercise",
  questions: questions.map((q) => ({ questionId: q.id, points: 10 })),
};
