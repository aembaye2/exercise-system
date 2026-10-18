import { mc, noParams } from "./helpers.js";

export const usContractions = {
  id: "exam2-q14-us-contractions",
  title: "Deepest and longest U.S. contractions",
  generate: noParams,
  render: () => "Answer both parts about U.S. business cycle history.",
  parts: () => [
    mc(
      "deepest",
      "**(a)** The deepest contraction in U.S. history occurred",
      ["in the 1960s.", "from 2007 to 2009.", "during the 1930s.", "in the 1970s."],
      2,
      { order: "fixed" }
    ),
    mc(
      "longest",
      "**(b)** Since World War II, the longest U.S. recession occurred",
      ["in the 1990s.", "in the 1980s.", "in the 1970s.", "in the 2000s."],
      3,
      { order: "fixed" }
    ),
  ],
};
