import type { ElementDefinition } from "../../engine/registry";
import {
  checkJsxGraph,
  formatJsxGraphAnswer,
  formatJsxGraphCorrect,
  gradeJsxGraph,
  jsxGraphHelpText,
  validateJsxGraph,
} from "./gradeJsxGraph";
import { JsxGraphInput } from "./JsxGraphInput";
import type { JsxGraphPart } from "./types";

export type { JsxGraphPart, JsxGraphProps, JsxGraphValue } from "./types";

export const jsxGraphElement: ElementDefinition<JsxGraphPart> = {
  type: "jsxgraph",
  check: checkJsxGraph,
  validate: validateJsxGraph,
  grade: gradeJsxGraph,
  formatAnswer: formatJsxGraphAnswer,
  formatCorrectAnswer: formatJsxGraphCorrect,
  helpText: jsxGraphHelpText,
  Input: JsxGraphInput,
};
