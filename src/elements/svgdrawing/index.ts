import type { ElementDefinition } from "../../engine/registry";
import { DrawingInput } from "./DrawingInput";
import {
  checkDrawing,
  drawingHelpText,
  formatDrawingAnswer,
  formatDrawingCorrect,
  gradeDrawing,
  validateDrawing,
} from "./gradeDrawing";
import type { DrawingPart } from "./types";

export type { AnswerObject, DrawingPart, DrawnObject, InitialObject, Pt, Tol, Tool } from "./types";
export { sampleFunction } from "./geometry";

export const drawingElement: ElementDefinition<DrawingPart> = {
  type: "svgdrawing",
  check: checkDrawing,
  validate: validateDrawing,
  grade: gradeDrawing,
  formatAnswer: formatDrawingAnswer,
  formatCorrectAnswer: formatDrawingCorrect,
  helpText: drawingHelpText,
  Input: DrawingInput,
};
