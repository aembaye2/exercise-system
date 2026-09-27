const TERMS = [
  { description: "a tax on imported goods", term: "tariff" },
  { description: "a limit on the quantity of a good that may be imported", term: "quota" },
  { description: "a legal maximum price", term: "price ceiling" },
  { description: "a legal minimum price", term: "price floor" },
  { description: "a government payment to producers for each unit produced", term: "subsidy" },
  { description: "the value of the next best alternative given up", term: "opportunity cost" },
  { description: "a sustained rise in the general price level", term: "inflation" },
  { description: "a market with a single seller and no close substitutes", term: "monopoly" },
  { description: "a market dominated by a few interdependent firms", term: "oligopoly" },
  { description: "a cost imposed on third parties outside a transaction", term: "negative externality" },
];

/** Dropdown multiple choice shown inline in a sentence. */
export const economicTerms = {
  id: "economic-terms-dropdown",
  title: "Economic terms (dropdown)",
  generate: (rng) => ({ index: rng.int(0, TERMS.length - 1) }),
  render: () => "Complete the sentence.",
  parts: ({ index }) => [
    {
      type: "multiple-choice",
      name: "term",
      display: "dropdown",
      numberAnswers: 4,
      label: `The economic term for **${TERMS[index].description}** is`,
      suffix: ".",
      options: TERMS.map((t, i) => ({ text: t.term, correct: i === index })),
    },
  ],
};
