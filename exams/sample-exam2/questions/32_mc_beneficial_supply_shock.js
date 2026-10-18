import { mc, noParams } from "./helpers.js";

// The original options are four IS-LM-FE graphs; they're described in words here.
export const beneficialSupplyShock = {
  id: "exam2-q32-beneficial-supply-shock",
  title: "A temporary beneficial supply shock (IS-LM-FE)",
  generate: noParams,
  render: () =>
    "Suppose that the economy is in general equilibrium, and a temporary beneficial supply shock occurs which raises " +
    "output above its previous full-employment level. Which of the following correctly describes the move to the new " +
    "general equilibrium in the *IS-LM-FE* diagram?",
  parts: () => [
    mc(
      "newEquilibrium",
      "",
      [
        "The *FE* line shifts right (to $FE_1$), and the price level falls, shifting the *LM* curve down and to the right (to $LM_1$) until it meets *IS* on $FE_1$.",
        "The *FE* line shifts right (to $FE_1$), and the *IS* curve shifts down and to the left (to $IS_1$) until it meets *LM* on $FE_1$.",
        "The *FE* line shifts left (to $FE_1$), and the price level rises, shifting the *LM* curve up and to the left (to $LM_1$) until it meets *IS* on $FE_1$.",
        "The *FE* line shifts left (to $FE_1$), and the *IS* curve shifts down and to the left (to $IS_1$) until it meets *LM* on $FE_1$.",
      ],
      0
    ),
  ],
};
