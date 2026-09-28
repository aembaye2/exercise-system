// From mc_in_one_file.md. A fixed multiple-choice question: nothing is
// randomized except the order of the options.
export const pointOutsidePpf = {
  id: "point-outside-ppf",
  title: "A point outside the PPF",
  generate: () => ({}),
  render: () => "A point outside the Production Possibilities Frontier (PPF) is",
  parts: () => [
    {
      type: "multiple-choice",
      name: "answer",
      options: [
        { text: "Efficient, but not feasible.", correct: true },
        { text: "Feasible, but not efficient." },
        { text: "Both feasible and efficient." },
        { text: "Neither efficient nor feasible." },
      ],
    },
  ],
};
