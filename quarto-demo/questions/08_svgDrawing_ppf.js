// Whole-number max outputs, so the two intercepts are clean.
const MAX_OUTPUTS = [4, 5, 6, 8, 9, 10, 12];

/**
 * Graph question drawn with the SVG drawing component (src/components/svgDrawingComponent).
 * The student's segment is compared with `expectedDrawing` when they press Grade or Save.
 */
export const productionPossibilities = {
  id: "ppf-svgdrawing",
  title: "Production possibilities frontier (SVG drawing)",
  generate: (rng) => {
    const [maxGuns, maxButter] = rng.sample(MAX_OUTPUTS, 2);
    return { maxGuns, maxButter };
  },
  render: ({ maxGuns, maxButter }) =>
    `An economy can produce **guns** (x-axis) and **butter** (y-axis). Devoting all its resources to guns, ` +
    `it can produce **${maxGuns}** units; devoting all its resources to butter, it can produce **${maxButter}** units. ` +
    "The trade-off between them is a straight line.\n\n" +
    "Use the segment tool to draw the economy's production possibilities frontier, then grade or save your answer.",
  parts: ({ maxGuns, maxButter }) => [
    {
      type: "svgDrawing",
      name: "ppf",
      props: {
        boundingBox: [-1, maxGuns + 2, -1, maxButter + 2],
        xLabel: "Guns",
        yLabel: "Butter",
        width: 700,
        height: 600,
        showColorPicker: false,
        showDownloadButton: true,
        showOutputButton: true,
        enabledTools: ["select", "point", "segment", "coordinate", "text", "eraser"],
        enabledActions: ["undo", "redo", "clear"],
        // Graded on Grade/Save, and drawn as the correct answer once the question is finished.
        // y = maxButter - (maxButter / maxGuns) * x
        expectedDrawing: [
          { type: "segment", yIntercept: maxButter, slope: -maxButter / maxGuns, tolerance: 0.1 },
        ],
      },
    },
  ],
};
