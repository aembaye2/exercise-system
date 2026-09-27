// Consumed by exercise-system.js. Round 2: the multiple-choice questions
// converted from questions/round2/mc_in_one_file.md.
import { absoluteAdvantage } from "./questions/round2/mc01_absolute_advantage.js";
import { pointOutsidePpf } from "./questions/round2/mc02_point_outside_ppf.js";
import { lawOfDemand } from "./questions/round2/mc03_law_of_demand.js";
import { economicsDefined } from "./questions/round2/mc04_economics_defined.js";
import { opportunityCostVacation } from "./questions/round2/mc05_opportunity_cost_vacation.js";
import { gasolineDemandShift } from "./questions/round2/mc06_gasoline_demand_shift.js";
import { microeconomicsDefined } from "./questions/round2/mc07_microeconomics_defined.js";

export const questions = [
  absoluteAdvantage,
  pointOutsidePpf,
  lawOfDemand,
  economicsDefined,
  opportunityCostVacation,
  gasolineDemandShift,
  microeconomicsDefined,
];

export const assessment = {
  id: "econ-exercise-2",
  title: "Exercise 2: Economics basics",
  description: "Seven multiple-choice questions. Unlimited attempts; your best score on each counts.",
  mode: "exercise",
  questions: questions.map((q) => ({ questionId: q.id, points: 10 })),
};
