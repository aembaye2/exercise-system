import { mc, noParams } from "./helpers.js";

export const assetDesirability = {
  id: "exam2-q07-asset-desirability",
  title: "Return, risk, liquidity and asset desirability",
  generate: noParams,
  render: () => "Answer the following questions about what makes an asset desirable.",
  parts: () => [
    mc(
      "return",
      "**(a)** How does the *expected rate of return* on an asset affect its desirability?",
      [
        "They are inversely related - the higher the expected return, all else equal, the less attractive the asset.",
        "They are directly related - the higher the expected return, all else equal, the more attractive the asset.",
        "They are unrelated - expected return does not affect an asset's desirability.",
      ],
      1,
      { order: "fixed" }
    ),
    mc(
      "risk",
      "**(b)** How does the level of *risk* affect an asset's desirability?",
      [
        "They are inversely related - the higher the level of risk, all else equal, the less attractive the asset.",
        "They are directly related - the higher the level of risk, all else equal, the more attractive the asset.",
        "They are unrelated - an asset's level of risk is unrelated to its desirability.",
      ],
      0,
      { order: "fixed" }
    ),
    mc(
      "liquidity",
      "**(c)** How does the level of *liquidity* affect an asset's desirability?",
      [
        "They are inversely related - the more liquid the asset, all else equal, the less desirable the asset.",
        "They are directly related - the more liquid the asset, all else equal, the more desirable the asset.",
        "They are unrelated - liquidity does not affect an asset's desirability.",
      ],
      1,
      { order: "fixed" }
    ),
  ],
};
