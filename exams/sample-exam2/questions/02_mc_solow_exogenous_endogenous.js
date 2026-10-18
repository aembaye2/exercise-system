import { mc, noParams } from "./helpers.js";

const NATURE = ["unknown.", "exogenous.", "endogenous.", "a growth rate."];

export const solowExogenousEndogenous = {
  id: "exam2-q02-solow-exogenous-endogenous",
  title: "Exogenous and endogenous variables in the Solow model",
  generate: noParams,
  render: () => "Answer the following questions about the Solow model.",
  parts: () => [
    mc("savingRate", "**(a)** In the Solow model, the saving rate ($s$) is", NATURE, 1),
    mc("consumption", "**(b)** In the Solow model, steady-state consumption per worker ($c$) is", NATURE, 2),
    mc(
      "sensible",
      "**(c)** In the Solow model, a sensible question to ask is",
      [
        "how does a change in steady-state consumption per worker ($c$) affect the saving rate ($s$)?",
        "how does a change in steady-state consumption per worker ($c$) affect the steady-state population growth rate ($n$)?",
        "how does a change in the saving rate ($s$) affect the steady-state population growth rate ($n$)?",
        "how does a change in the saving rate ($s$) affect steady-state consumption per worker ($c$)?",
      ],
      3
    ),
  ],
};
