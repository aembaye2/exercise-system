import type { DrawingAppProps } from "./drawingApp";

const questionProps:DrawingAppProps={
  questionText:"Draw the line segments that intersect at the given points.",boundingBox:[-1,10,-1,10],
  xLabel:"Computers",
  yLabel:"soybeans",
  height:600,
  width:700,
  showColorPicker: false, // false hides the color picker entirely
  // All tools: ["select", "point", "line", "arrow", "doubleArrow", "segment", "rectangle", "circle", "polygon", "scatter", "curve", "text", "coordinate", "eraser"]
  enabledTools:["select", "point", "line", "arrow", "doubleArrow", "segment", "rectangle", "circle", "polygon", "scatter", "curve", "text", "coordinate", "eraser"],
  enabledActions:["undo","redo","clear"],
  initialObjects:[{type:"segment",points:[[0,9],[9,0]],color:"#2563eb"}],
  expectedDrawing:[{type:"segment",yIntercept:8,slope:-1,tolerance:.1},{type:"segment",yIntercept:0,slope:1,tolerance:.1}],
  suggestedAnswer:[{type:"segment",points:[[0,8],[8,0]],color:"rgba(235,37,37,.87)"},{type:"segment",points:[[0,0],[8,8]],color:"#eb2525"}]
};
export default questionProps;
