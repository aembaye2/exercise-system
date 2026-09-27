import type { ElementDefinition } from "../../engine/registry";
import {
  formatMultipleChoiceAnswer,
  formatMultipleChoiceCorrect,
  gradeMultipleChoice,
  validateMultipleChoice,
} from "./gradeMultipleChoice";
import { MultipleChoiceInput } from "./MultipleChoiceInput";
import { checkMultipleChoice, prepareMultipleChoice } from "./prepareMultipleChoice";
import type { MultipleChoicePart } from "./types";

export type { MultipleChoicePart, MultipleChoiceOption } from "./types";

export const multipleChoiceElement: ElementDefinition<MultipleChoicePart> = {
  type: "multiple-choice",
  check: checkMultipleChoice,
  prepare: prepareMultipleChoice,
  validate: validateMultipleChoice,
  grade: gradeMultipleChoice,
  formatAnswer: formatMultipleChoiceAnswer,
  formatCorrectAnswer: formatMultipleChoiceCorrect,
  Input: MultipleChoiceInput,
};
