import { noParams } from "./helpers.js";

export const capitalLaborRatio = {
  id: "exam2-q04-capital-labor-ratio",
  title: "Steady-state capital-labor ratio and consumption",
  generate: noParams,
  render: () => "Is the following statement true or false?",
  parts: () => [
    {
      type: "true-false",
      name: "statement",
      statements: [
        {
          text: "The higher the steady-state capital-labor ratio is, the more consumption each worker can enjoy in the long run.",
          correct: false,
        },
      ],
    },
  ],
};
