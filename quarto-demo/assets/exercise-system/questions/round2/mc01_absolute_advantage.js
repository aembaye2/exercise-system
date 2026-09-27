// From mc_in_one_file.md. A fixed multiple-choice question: nothing is
// randomized except the order of the options.
export const absoluteAdvantage = {
  id: "absolute-advantage",
  title: "Absolute advantage",
  generate: () => ({}),
  render: () => "Which of the following best describes **absolute advantage**?",
  parts: () => [
    {
      type: "multiple-choice",
      name: "answer",
      options: [
        { text: "A curve showing the maximum attainable combinations of two goods that can be produced with available resources and current technology." },
        { text: "The highest-valued alternative that must be given up to engage in an activity." },
        { text: "The ability of an individual, a firm, or a country to produce more of a good or service than competitors, using the same amount of resources.", correct: true },
        { text: "The study of the choices people make to attain their goals, given their scarce resources." },
      ],
    },
  ],
};
