import type { Assessment } from "../engine/types";

export const assessments: Assessment[] = [
  {
    id: "ex1",
    title: "Exercise 1: Economics fundamentals",
    description: "Practice every question type. Unlimited attempts, new variants on demand; your best score counts.",
    mode: "exercise",
    questions: [
      //{ questionId: "price-elasticity-midpoint", points: 10 },
      { questionId: "types-of-goods", points: 10  },
      { questionId: "market-equilibrium-mixed", points: 10  },
      { questionId: "firm-profit-integer", points: 10  },
      //{ questionId: "present-value-sigfig", points: 10 },
      { questionId: "economic-terms-dropdown", points: 10  },
      //{ questionId: "gdp-deflator", points: 10  },
      { questionId: "comparative-advantage-table", points: 10  },
      { questionId: "gains-from-trade-table", points: 10 },
      //{ questionId: "economic-terms-dropdown", points: 10 },
      { questionId: "budget-line-jsxgraph", points: 10 },
      { questionId: "ppf-svgdrawing", points: 10 },
      { questionId: "econ-vocabulary-matching", points: 10 },
    ],
  },
];

export function getAssessment(id: string): Assessment | undefined {
  return assessments.find((a) => a.id === id);
}
