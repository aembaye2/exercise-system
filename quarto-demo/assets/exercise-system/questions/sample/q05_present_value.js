export const presentValue = {
  id: "present-value-sigfig",
  title: "Present value (significant figures)",
  generate: (rng) => ({
    fv: rng.int(10, 100) * 100,
    r: rng.float(1.5, 9.5, 1),
    n: rng.int(2, 15),
  }),
  render: ({ fv, r, n }) =>
    `You will receive $${fv}$ dollars in $${n}$ years. The annual interest rate is $${r}\\%$, compounded yearly.\n\n` +
    `Compute the present value $PV = \\dfrac{FV}{(1 + r)^n}$ and give your answer to **3 significant figures**.`,
  parts: ({ fv, r, n }) => [
    {
      type: "number",
      name: "PV",
      label: "$PV =$",
      correct: fv / (1 + r / 100) ** n,
      comparison: "sigfig",
      digits: 3,
      suffix: "dollars",
    },
  ],
};
