import type { ElementDefinition } from "../../engine/registry";
import { ConditionalGradingInput } from "./ConditionalGradingInput";
import {
  checkConditional,
  conditionalHelpText,
  formatConditionalAnswer,
  formatConditionalCorrect,
  gradeConditional,
  prepareConditional,
  validateConditional,
} from "./gradeConditional";
import type { ConditionalGradingPart } from "./types";

export type { ConditionalGradingPart, ConditionalGradingValue, ConditionalStep } from "./types";

export const conditionalGradingElement: ElementDefinition<ConditionalGradingPart> = {
  type: "conditional-grading",
  check: checkConditional,
  prepare: prepareConditional,
  validate: validateConditional,
  grade: gradeConditional,
  formatAnswer: formatConditionalAnswer,
  formatCorrectAnswer: formatConditionalCorrect,
  helpText: conditionalHelpText,
  Input: ConditionalGradingInput,
};
