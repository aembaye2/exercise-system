// From mc_in_one_file.md. A fixed multiple-choice question: nothing is
// randomized except the order of the options.
export const economicsDefined = {
  id: "economics-defined",
  title: "Economics is the study of",
  generate: () => ({}),
  render: () => "Economics is best defined as the study of",
  parts: () => [
    {
      type: "multiple-choice",
      name: "answer",
      options: [
        { text: "how society manages its scarce resources.", correct: true },
        { text: "how to run a business most profitably." },
        { text: "how to predict inflation, unemployment, and stock prices." },
        { text: "how the government can stop the harm from unchecked self-interest." },
      ],
    },
  ],
};
