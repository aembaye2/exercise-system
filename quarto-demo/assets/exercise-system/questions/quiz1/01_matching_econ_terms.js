// A fixed matching question: nothing is randomized except the right column's
// starting order (shuffled once per variant by the matching element's prepare()).
export const econTermsMatching = {
  id: "econ-terms-matching",
  title: "Match the term to its definition",
  generate: () => ({}),
  render: () => "Match each economic term on the left with its definition on the right.",
  parts: () => [
    {
      type: "matching",
      name: "terms",
      pairs: [
        { left: "Scarcity", right: "Unlimited wants confronting limited resources" },
        { left: "Opportunity cost", right: "The value of the next best alternative given up" },
        { left: "Market equilibrium", right: "The price at which quantity supplied equals quantity demanded" },
        { left: "Comparative advantage", right: "The ability to produce a good at a lower opportunity cost than another producer" },
        { left: "Negative externality", right: "A cost of a transaction imposed on someone outside it" },
      ],
    },
  ],
};
