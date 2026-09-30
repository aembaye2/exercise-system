import type { Question } from "../engine/types";

/**
 * true-false element demo: three statements about price elasticity of
 * demand, each marked True or False independently.
 */
export const elasticityStatements: Question<Record<string, never>> = {
  id: "elasticity-true-false",
  title: "True or false: price elasticity of demand",
  generate: () => ({}),
  render: () => "Which of the following statements about price elasticity of demand are true?",
  parts: () => [
    {
      type: "true-false",
      name: "statements",
      statements: [
        {
          text: "Demand is perfectly inelastic when the quantity demanded doesn't change at all as price changes.",
          correct: true,
        },
        {
          text: "An elastic demand curve means that consumers are relatively unresponsive to price changes.",
          correct: false,
        },
        {
          text: "Price elasticity of demand tends to be higher when there are more close substitutes available.",
          correct: true,
        },
      ],
    },
  ],
};
