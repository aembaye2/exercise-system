import { mc, noParams } from "./helpers.js";

export const srasLras = {
  id: "exam2-q29-sras-lras",
  title: "Short-run and long-run aggregate supply",
  generate: noParams,
  render: () => "Answer the following questions about the short-run (*SRAS*) and long-run (*LRAS*) aggregate supply curves.",
  parts: () => [
    mc(
      "shapes",
      "**(a)** Describe the *SRAS* curve and the *LRAS* curve.",
      [
        "the *SRAS* curve is horizontal and the *LRAS* curve is upward sloping",
        "the *SRAS* curve is vertical and the *LRAS* curve is upward sloping",
        "the *SRAS* curve is horizontal and the *LRAS* curve is vertical",
        "the *SRAS* curve is vertical and the *LRAS* curve is horizontal",
      ],
      2
    ),
    mc(
      "srasHorizontal",
      "**(b)** Why is the short-run aggregate supply curve horizontal?",
      [
        "because prices remain fixed in the short run",
        "because the real interest rate is fixed in the short run",
        "because capital is fixed in the short run",
        "because output is fixed in the short run",
      ],
      0
    ),
    mc(
      "lrasVertical",
      "**(c)** Why is the long-run aggregate supply curve vertical?",
      [
        "because prices are fixed in the long run",
        "because the aggregate amount of output supplied is the full-employment level, regardless of the price level",
        "because the capital stock changes to produce the fixed amount of output in the long run",
        "because the price level depends on the amount of output",
      ],
      1
    ),
  ],
};
