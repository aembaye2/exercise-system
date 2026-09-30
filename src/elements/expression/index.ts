import type { ElementDefinition } from "../../engine/registry";
import { ExpressionInput } from "./ExpressionInput";
import {
  expressionHelpText,
  formatExpressionAnswer,
  formatExpressionCorrect,
  gradeExpression,
  validateExpression,
} from "./gradeExpression";
import { checkExpression, prepareExpression } from "./prepareExpression";
import type { ExpressionPart } from "./types";

export type { ExpressionPart, ExpressionValue } from "./types";

export const expressionElement: ElementDefinition<ExpressionPart> = {
  type: "expression",
  check: checkExpression,
  prepare: prepareExpression,
  validate: validateExpression,
  grade: gradeExpression,
  formatAnswer: formatExpressionAnswer,
  formatCorrectAnswer: formatExpressionCorrect,
  helpText: expressionHelpText,
  Input: ExpressionInput,
};
