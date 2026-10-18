import { mc, noParams } from "./helpers.js";

export const isCurveDefinition = {
  id: "exam2-q22-is-curve-definition",
  title: "What the IS curve represents",
  generate: noParams,
  render: () => "The *IS* curve represents:",
  parts: () => [
    mc(
      "definition",
      "",
      [
        "combinations of output and the real interest rate such that desired national saving is equal to desired investment.",
        "combinations of output and the real interest rate such that output is equal to full-employment output.",
        "combinations of output and the real interest rate such that the real interest rate is equal to the full-employment interest rate.",
        "combinations of output and the real interest rate such that money demand is equal to money supply.",
      ],
      0
    ),
  ],
};
