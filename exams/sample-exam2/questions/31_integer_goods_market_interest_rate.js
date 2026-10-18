import { noParams } from "./helpers.js";

// S^d = I^d: -4,100 + 0.30Y + 4,500r = 2,000 - 4,000r, so r = (6,100 - 0.30Y) / 8,500.
// Y = 10,000: r = 0.3647 -> 36%. Y = 12,000: r = 0.2941 -> 29%.
export const goodsMarketInterestRate = {
  id: "exam2-q31-goods-market-interest-rate",
  title: "Real interest rates that clear the goods market",
  generate: noParams,
  render: () =>
    "In an economy, the desired consumption and investment functions are given by\n\n" +
    "$$\n\\begin{aligned} C^d &= 2{,}000 + 0.70Y - 4{,}500r \\\\ I^d &= 2{,}000 - 4{,}000r \\end{aligned}\n$$\n\n" +
    "where $Y$ is output and $r$ is the real interest rate. Government purchases are $G = 2{,}100$.\n\n" +
    "The equation for desired national saving is\n\n" +
    "$$\nS^d = -4{,}100 + 0.30Y + 4{,}500r.\n$$\n\n" +
    "Using the condition that at equilibrium, quantity of goods supplied = quantity of goods demanded, determine the " +
    "real interest rates that clear the goods market when $Y = 10{,}000$ and $Y = 12{,}000$. " +
    "Enter each response as a percentage rounded to the nearest integer.",
  parts: () => [
    { type: "integer", name: "r10000", label: "When $Y = 10{,}000$: $r =$", suffix: "%", correct: 36 },
    { type: "integer", name: "r12000", label: "When $Y = 12{,}000$: $r =$", suffix: "%", correct: 29 },
  ],
};
