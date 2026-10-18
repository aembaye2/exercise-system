import { mc, noParams } from "./helpers.js";

const SHIFTS = ["shifts the *IS* curve down and to the left.", "shifts the *IS* curve up and to the right.", "does not change the *IS* curve."];

export const isCurveShifts = {
  id: "exam2-q23-is-curve-shifts",
  title: "What shifts the IS curve",
  generate: noParams,
  render: () => "In each of the following cases, what is the effect on the *IS* curve?",
  parts: () => [
    mc("capitalTax", "**(a)** An increase in the effective tax rate on capital", SHIFTS, 0, { order: "fixed" }),
    mc("moneySupply", "**(b)** An increase in the money supply", SHIFTS, 2, { order: "fixed" }),
    mc("governmentSpending", "**(c)** A temporary increase in government spending", SHIFTS, 1, { order: "fixed" }),
  ],
};
