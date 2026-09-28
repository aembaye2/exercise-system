import type { DrawingAppProps } from "./drawingApp";

/** Configuration for the exercise rendered in App.tsx. Typed as
 * DrawingAppProps so every field is checked against <DrawingApp />'s props. */
const questionProps: DrawingAppProps = {
  questionText: "Draw the line segments that intersect at the given points.",
  boundingBox: [-1, 11, -1, 11],
  xLabel: "x-axis",
  yLabel: "y-axis",
  showNavigation: false,
  height: 700,
  width: 700,
  showColorPicker: false, // false hides the color picker entirely
  // All tools: ["select", "point", "line", "arrow", "doubleArrow", "segment", "rectangle", "circle", "polygon", "scatter", "curve", "text", "coordinate", "eraser"]
  enabledTools: ["select", "segment", "text", "coordinate", "eraser", "scatter"],
  enabledActions: ["undo", "redo", "clear"],
  showDownloadButton: true,
  showOutputButton: true, // false hides the eye (drawing data) button
  showGradeButton: true, // false hides Grade even though expectedDrawing is set
  initialObjects: [
    {
      type: "segment",
      points: [
        [0, 9],
        [9, 0],
      ],
      color: "#2563eb",
    },
  ],
  expectedDrawing: [
    {
      type: "segment",
      yIntercept: 8,
      slope: -1,
      tolerance: 0.1,
    },
    {
      type: "segment",
      yIntercept: 0,
      slope: 1,
      tolerance: 0.1,
    },
    {
      type: "segment",
      yIntercept: 10,
      slope: -1,
      tolerance: 0.1,
    },
  ],
  suggestedAnswer: [
    {
      type: "segment",
      points: [
        [0, 8],
        [8, 0],
      ],
      color: "rgba(235, 37, 37, 0.87)",
    },
    {
      type: "segment",
      points: [
        [0, 0],
        [8, 8],
      ],
      color: "#eb2525",
    },
  ],
};

export default questionProps;
