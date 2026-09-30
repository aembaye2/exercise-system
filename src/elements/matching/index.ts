import type { ElementDefinition } from "../../engine/registry";
import {
  formatMatchingAnswer,
  formatMatchingCorrect,
  gradeMatching,
  matchingHelpText,
  validateMatching,
} from "./gradeMatching";
import { MatchingInput } from "./MatchingInput";
import { checkMatching, prepareMatching } from "./prepareMatching";
import type { MatchingPart } from "./types";

export type { MatchingPair, MatchingPart, MatchingValue } from "./types";

export const matchingElement: ElementDefinition<MatchingPart> = {
  type: "matching",
  check: checkMatching,
  prepare: prepareMatching,
  validate: validateMatching,
  grade: gradeMatching,
  formatAnswer: formatMatchingAnswer,
  formatCorrectAnswer: formatMatchingCorrect,
  helpText: matchingHelpText,
  Input: MatchingInput,
};
