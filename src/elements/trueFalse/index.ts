import type { ElementDefinition } from "../../engine/registry";
import {
  checkTrueFalse,
  formatTrueFalseAnswer,
  formatTrueFalseCorrect,
  gradeTrueFalse,
  trueFalseHelpText,
  validateTrueFalse,
} from "./gradeTrueFalse";
import { TrueFalseInput } from "./TrueFalseInput";
import type { TrueFalsePart } from "./types";

export type { TrueFalsePart, TrueFalseStatement, TrueFalseValue } from "./types";

export const trueFalseElement: ElementDefinition<TrueFalsePart> = {
  type: "true-false",
  check: checkTrueFalse,
  validate: validateTrueFalse,
  grade: gradeTrueFalse,
  formatAnswer: formatTrueFalseAnswer,
  formatCorrectAnswer: formatTrueFalseCorrect,
  helpText: trueFalseHelpText,
  Input: TrueFalseInput,
};
