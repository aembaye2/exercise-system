// From mc_in_one_file.md. A fixed multiple-choice question: nothing is
// randomized except the order of the options.
export const microeconomicsDefined = {
  id: "microeconomics-defined",
  title: "Microeconomics is",
  generate: () => ({}),
  render: () => "**Microeconomics** is best defined as",
  parts: () => [
    {
      type: "multiple-choice",
      name: "answer",
      options: [
        { text: "the study of economy-wide phenomena, including inflation, unemployment, and economic growth." },
        { text: "the study of how individuals, households, and firms make decisions and how they interact in markets.", correct: true },
        { text: "claims that attempt to prescribe how the world should be." },
        { text: "claims that attempt to describe the world as it is." },
      ],
    },
  ],
};
