import { mc, noParams } from "./helpers.js";

const SHIFTS = ["shifts the *LM* curve up and to the left.", "shifts the *LM* curve down and to the right.", "does not shift the *LM* curve."];

export const lmCurveShifts = {
  id: "exam2-q24-lm-curve-shifts",
  title: "What shifts the LM curve",
  generate: noParams,
  render: () => "In each of the following cases, what is the effect on the *LM* curve?",
  parts: () => [
    mc("expectedInflation", "**(a)** An increase in the expected inflation rate", SHIFTS, 1, { order: "fixed" }),
    mc("governmentSpending", "**(b)** An increase in government spending", SHIFTS, 2, { order: "fixed" }),
    mc("priceLevel", "**(c)** An increase in the price level", SHIFTS, 0, { order: "fixed" }),
  ],
};
