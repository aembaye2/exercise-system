import type { ElementDefinition } from "../../engine/registry";
import {
  checkSvgDrawing,
  formatSvgDrawingAnswer,
  formatSvgDrawingCorrect,
  gradeSvgDrawing,
  svgDrawingHelpText,
  validateSvgDrawing,
} from "./gradeSvgDrawing";
import { SvgDrawingInput } from "./SvgDrawingInput";
import type { SvgDrawingPart } from "./types";

export type { SvgDrawingPart, SvgDrawingProps, SvgDrawingValue } from "./types";

export const svgDrawingElement: ElementDefinition<SvgDrawingPart> = {
  type: "svgDrawing",
  check: checkSvgDrawing,
  validate: validateSvgDrawing,
  grade: gradeSvgDrawing,
  formatAnswer: formatSvgDrawingAnswer,
  formatCorrectAnswer: formatSvgDrawingCorrect,
  helpText: svgDrawingHelpText,
  Input: SvgDrawingInput,
};
