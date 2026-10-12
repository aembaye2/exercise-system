import type { ElementDefinition } from "../../engine/registry";
import { EssayInput } from "./EssayInput";
import { checkEssay, essayHelpText, formatEssayAnswer, formatEssayCorrect, gradeEssay, validateEssay } from "./gradeEssay";
import type { EssayPart } from "./types";

export type { EssayPart, EssayValue } from "./types";

export const essayElement: ElementDefinition<EssayPart> = {
  type: "essay",
  check: checkEssay,
  validate: validateEssay,
  grade: gradeEssay,
  manualGrading: true,
  correctAnswerHeading: "Model answer",
  formatAnswer: formatEssayAnswer,
  formatCorrectAnswer: formatEssayCorrect,
  helpText: essayHelpText,
  Input: EssayInput,
};
