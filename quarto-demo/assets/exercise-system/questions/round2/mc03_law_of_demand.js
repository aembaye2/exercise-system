// From mc_in_one_file.md. A fixed multiple-choice question: nothing is
// randomized except the order of the options.
export const lawOfDemand = {
  id: "law-of-demand",
  title: "The law of demand",
  generate: () => ({}),
  render: () => "Which of the following best describes the **Law of Demand**?",
  parts: () => [
    {
      type: "multiple-choice",
      name: "answer",
      options: [
        { text: "The amount of a good or service that a consumer is willing and able to purchase at a given price." },
        { text: "A curve that shows the relationship between the price of a product and the quantity of the product demanded." },
        { text: "The demand by all the consumers of a given good or service." },
        { text: "As the price of a good or service falls, the quantity demanded of the good or service will increase.", correct: true },
      ],
    },
  ],
};
