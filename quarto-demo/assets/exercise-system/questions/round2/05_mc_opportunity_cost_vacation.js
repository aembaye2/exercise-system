// From mc_in_one_file.md. A fixed multiple-choice question: nothing is
// randomized except the order of the options.
export const opportunityCostVacation = {
  id: "opportunity-cost-vacation",
  title: "Opportunity cost of a vacation",
  generate: () => ({}),
  render: () => "Your opportunity cost of going on vacation is",
  parts: () => [
    {
      type: "multiple-choice",
      name: "answer",
      options: [
        { text: "the price of your airline ticket and lodging." },
        { text: "the lost wages from missing work." },
        { text: "the total expenditure needed to go on vacation plus your lost wages from not working.", correct: true },
        { text: "zero, as long as you value the vacation as much as your wages from working." },
      ],
    },
  ],
};
