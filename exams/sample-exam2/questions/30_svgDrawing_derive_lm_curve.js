import { noParams } from "./helpers.js";

// The original shows a money-market diagram; its three equilibria are given here in words.
// Points: (Y, r) = (8, 6), (12, 8), (16, 10), so LM is r = 2 + 0.5 Y (Y in thousands).
export const deriveLmCurve = {
  id: "exam2-q30-derive-lm-curve",
  title: "Deriving the LM curve",
  generate: noParams,
  render: () =>
    "In the money market, the real money supply is fixed at $110$ (a vertical *MS* line). " +
    "Real money demand equals the real money supply at a real interest rate of\n\n" +
    "- $r = 6\\%$ when real GDP is $Y = 8{,}000$,\n" +
    "- $r = 8\\%$ when $Y = 12{,}000$,\n" +
    "- $r = 10\\%$ when $Y = 16{,}000$.\n\n" +
    "Derive the *LM* curve graphically: use the **segment** tool to draw the *LM* curve through the three " +
    "money-market equilibria (real GDP is in thousands on the horizontal axis). Draw the *LM* segment **first**; " +
    "you may then label it with the text tool.",
  parts: () => [
    {
      type: "svgDrawing",
      name: "lm",
      props: {
        boundingBox: [0, 20, 0, 16],
        xLabel: "Real GDP, Y (thousands)",
        yLabel: "Real interest rate, r (%)",
        width: 700,
        height: 600,
        showColorPicker: false,
        showDownloadButton: false,
        showOutputButton: false,
        enabledTools: ["select", "segment", "text", "eraser"],
        enabledActions: ["undo", "redo", "clear"],
        defaultTool: "segment",
        expectedDrawing: [{ type: "segment", yIntercept: 2, slope: 0.5, tolerance: 0.1 }],
      },
    },
  ],
};
