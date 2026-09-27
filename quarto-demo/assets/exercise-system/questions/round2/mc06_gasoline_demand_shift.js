// From mc_in_one_file.md. A fixed multiple-choice question: nothing is
// randomized except the order of the options.
export const gasolineDemandShift = {
  id: "gasoline-demand-shift",
  title: "Shifting the demand for gasoline",
  generate: () => ({}),
  render: () => "Which of the following would shift the demand curve for gasoline to the **right**?",
  parts: () => [
    {
      type: "multiple-choice",
      name: "answer",
      options: [
        { text: "A decrease in the price of gasoline." },
        { text: "An increase in consumer income, assuming gasoline is a normal good.", correct: true },
        { text: "An increase in the price of cars, a complement of gasoline." },
        { text: "A decrease in the expected future price of gasoline." },
      ],
    },
  ],
};
