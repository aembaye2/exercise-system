import { mc, noParams } from "./helpers.js";

export const keynesiansClassicals = {
  id: "exam2-q20-keynesians-classicals",
  title: "Keynesians vs. classicals",
  generate: noParams,
  render: () =>
    "How do Keynesians and classicals differ in their beliefs about how long it takes the economy to reach long-run " +
    "equilibrium? What implications do these differences in beliefs have for Keynesian and classical views about the " +
    "usefulness of antirecessionary policies?",
  parts: () => [
    mc(
      "prices",
      "**(a)** Classical economists think prices adjust _____ and that antirecessionary policies are _____, whereas Keynesian economists think the opposite.",
      ["rapidly; necessary", "slowly; not necessary", "rapidly; not necessary", "slowly; necessary"],
      2
    ),
    mc(
      "shocks",
      "**(b)** What implications do these differences in beliefs have for the types of shocks that cause most recessions? " +
        "Classical economists think that _____ shocks cause recessions, whereas Keynesian economists think that _____ shocks cause recessions.",
      [
        "both aggregate demand and aggregate supply; aggregate demand",
        "aggregate supply; both aggregate demand and aggregate supply",
        "both aggregate demand and aggregate supply; aggregate supply",
        "aggregate demand; both aggregate demand and aggregate supply",
      ],
      1
    ),
  ],
};
