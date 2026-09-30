import type { Question } from "../engine/types";

// Whole-number max outputs, so the two intercepts are clean.
const MAX_OUTPUTS = [4, 5, 6, 8, 9, 10, 12];

interface Params {
  maxGuns: number;
  maxButter: number;
}

/**
 * Graph question drawn with the SVG drawing component (src/components/svgDrawingComponent).
 * The student's segment is compared with `expectedDrawing` when they press Submit.
 */
export const productionPossibilities: Question<Params> = {
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
    "Use the segment tool to draw the economy's production possibilities frontier, then press **Submit**.",
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
        enabledTools: ["select", "point", "segment", "line", "arrow", "doubleArrow", "rectangle", "circle", "curve", "polygon", "coordinate", "text", "eraser", "scatter"],
        enabledActions: ["undo", "redo", "clear"],
        // Graded on Submit, and drawn as the correct answer once the question is finished.
        // y = maxButter - (maxButter / maxGuns) * x
        expectedDrawing: [
          { type: "segment", yIntercept: maxButter, slope: -maxButter / maxGuns, tolerance: 0.1 },
        ],
      },
    },
  ],
};
