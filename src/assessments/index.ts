import type { Assessment } from "../engine/types";
import { assessment as sampleExam2 } from "../../exams/macro-sample-exam2/exam2.js";
import { assessment as microSampleExam2 } from "../../exams/micro-sample-exam2/sample-micro-exam2.js";

export const assessments: Assessment[] = [
  {
    id: "ex1",
    title: "Exercise 1: Different type of questions",
    description: "Practice every question type. ",
    mode: "exercise",
    questions: [
      { questionId: "types-of-goods", points: 10  },
      { questionId: "market-equilibrium-mixed", points: 10  },
      { questionId: "firm-profit-integer", points: 10  },
      { questionId: "economic-terms-dropdown", points: 10  },
      { questionId: "comparative-advantage-table", points: 10  },
      { questionId: "gains-from-trade-table", points: 10 },
      { questionId: "budget-line-jsxgraph", points: 10 },
      { questionId: "ppf-svgdrawing", points: 10 },
      { questionId: "econ-vocabulary-matching", points: 10 },
      { questionId: "elasticity-true-false", points: 10 },
      { questionId: "income-demand-price-ordering", points: 10 },
      { questionId: "marginal-cost-expression", points: 10 },
      { questionId: "quadratic-essay", points: 10 },
      { questionId: "profit-maximum-conditional", points: 10 },
      { questionId: "supply-demand-shift-graph", points: 10 },
    ],
  },
  // Sample Exam 2 (exams/macro-sample-exam2/exam2.js, also packaged for SCORM), with the same
  // settings as the package: exam mode, grades hidden (Save only).
  { ...sampleExam2, id: "ex2" },
  // Micro Sample Exam 2 (exams/micro-sample-exam2/sample-micro-exam2.js, also packaged for SCORM).
  { ...microSampleExam2, id: "ex3" },
];

export function getAssessment(id: string): Assessment | undefined {
  return assessments.find((a) => a.id === id);
}
