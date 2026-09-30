import type { Question } from "../engine/types";

const TERMS = [
  { term: "Scarcity", definition: "Unlimited wants confronting limited resources" },
  { term: "Opportunity cost", definition: "The value of the next best alternative given up" },
  { term: "Market equilibrium", definition: "The price at which quantity supplied equals quantity demanded" },
  { term: "Elastic demand", definition: "Quantity demanded responds more than proportionally to a price change" },
  { term: "Comparative advantage", definition: "The ability to produce a good at a lower opportunity cost than another producer" },
  { term: "Negative externality", definition: "A cost of a transaction imposed on someone outside it" },
  { term: "Absolute advantage", definition: "The ability to produce more of a good with the same amount of resources than another producer" },
] as const;

interface Params {
  indices: number[];
}

/**
 * Matching element demo: drag the right-hand definitions to line up with the
 * fixed, numbered terms on the left. Graded on Submit.
 */
export const econVocabularyMatching: Question<Params> = {
  id: "econ-vocabulary-matching",
  title: "Economic vocabulary (matching)",
  generate: (rng) => ({ indices: rng.sample(TERMS.map((_, i) => i), 5) }),
  render: () => "Match each term on the left with its definition on the right.",
  parts: ({ indices }) => [
    {
      type: "matching",
      name: "terms",
      pairs: indices.map((i) => ({ left: TERMS[i].term, right: TERMS[i].definition })),
    },
  ],
};
