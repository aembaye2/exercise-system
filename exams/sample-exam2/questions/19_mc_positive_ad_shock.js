import { mc, noParams } from "./helpers.js";

// The original asks students to draw the new AD curve and point B on an AD-AS graph
// (horizontal SRAS, vertical LRAS, starting equilibrium A). Without the graph it is asked
// as two multiple-choice parts with the same answer: AD shifts right, and B lies on the
// SRAS line to the right of A (higher output, same price level).
export const positiveAdShock = {
  id: "exam2-q19-positive-ad-shock",
  title: "A positive aggregate demand shock",
  generate: noParams,
  render: () =>
    "The economy starts at long-run equilibrium **A**, where the aggregate demand curve $AD^1$ crosses the vertical " +
    "long-run aggregate supply curve $LRAS^1$ and the horizontal short-run aggregate supply curve $SRAS^1$. " +
    "Consumers then become more optimistic, causing a positive aggregate demand shock.",
  parts: () => [
    mc(
      "adCurve",
      "**(a)** What happens to the aggregate demand curve?",
      [
        "It shifts up and to the right (to $AD^2$).",
        "It shifts down and to the left (to $AD^2$).",
        "It does not move; the economy moves along $AD^1$.",
      ],
      0
    ),
    mc(
      "shortRun",
      "**(b)** Compared with point A, the new short-run equilibrium **B** has",
      [
        "higher output and the same price level.",
        "the same output and a higher price level.",
        "higher output and a higher price level.",
        "lower output and the same price level.",
      ],
      0
    ),
  ],
};
