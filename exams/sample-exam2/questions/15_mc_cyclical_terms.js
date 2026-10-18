import { mc, noParams } from "./helpers.js";

const TERMS = [
  "procyclical and countercyclical",
  "peak and trough",
  "stable and unstable",
  "leading, coincident, and lagging",
];

export const cyclicalTerms = {
  id: "exam2-q15-cyclical-terms",
  title: "Direction and timing of cyclical variables",
  generate: noParams,
  render: () => "Answer both parts about the terms used to describe business cycle variables.",
  parts: () => [
    mc(
      "direction",
      "**(a)** What terms are used to describe the way a variable moves in terms of direction when economic activity is rising or falling?",
      TERMS,
      0
    ),
    mc("timing", "**(b)** What terms are used to describe the timing of cyclical changes in economic variables?", TERMS, 3),
  ],
};
