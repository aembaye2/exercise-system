import type { Question } from "../engine/types";

const GOODS = [
  { kind: "normal good", definition: "Demand increases when consumer income increases." },
  { kind: "inferior good", definition: "Demand decreases when consumer income increases." },
  { kind: "pair of substitute goods", definition: "A rise in the price of one increases the demand for the other." },
  { kind: "pair of complementary goods", definition: "A rise in the price of one decreases the demand for the other." },
  { kind: "public good", definition: "It is both non-excludable and non-rival in consumption." },
  { kind: "common resource", definition: "It is rival in consumption but non-excludable." },
  { kind: "club good", definition: "It is excludable but non-rival in consumption." },
  { kind: "luxury good", definition: "Its income elasticity of demand is greater than $1$." },
  { kind: "necessity", definition: "Its income elasticity of demand is between $0$ and $1$." },
] as const;

interface Params {
  index: number;
}

export const typesOfGoods: Question<Params> = {
  id: "types-of-goods",
  title: "Types of goods",
  generate: (rng) => ({ index: rng.int(0, GOODS.length - 1) }),
  render: ({ index }) => `Which statement describes a **${GOODS[index].kind}**?`,
  parts: ({ index }) => [
    {
      type: "multiple-choice",
      name: "definition",
      numberAnswers: 4,
      options: GOODS.map((g, i) => ({
        text: g.definition,
        correct: i === index,
        feedback: i === index ? undefined : `That describes a ${g.kind}.`,
      })),
    },
  ],
};
