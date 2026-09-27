import type { ElementDefinition } from "../../engine/registry";
import { checkNumber, formatCorrectNumber, gradeNumber, numberHelpText, validateNumber } from "./gradeNumber";
import { NumberInput } from "./NumberInput";
import type { NumberPart } from "./types";

export type { NumberPart, NumberComparison } from "./types";

export const numberElement: ElementDefinition<NumberPart> = {
  type: "number",
  check: checkNumber,
  validate: validateNumber,
  grade: gradeNumber,
  formatAnswer: (_part, value) => (typeof value === "string" && value.trim() ? `\`${value.trim()}\`` : "_(no answer)_"),
  formatCorrectAnswer: (part) => formatCorrectNumber(part) + (part.suffix ? ` ${part.suffix}` : ""),
  helpText: numberHelpText,
  Input: NumberInput,
};
