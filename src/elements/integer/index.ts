import type { ElementDefinition } from "../../engine/registry";
import { checkInteger, gradeInteger, validateInteger } from "./gradeInteger";
import { IntegerInput } from "./IntegerInput";
import type { IntegerPart } from "./types";

export type { IntegerPart } from "./types";

export const integerElement: ElementDefinition<IntegerPart> = {
  type: "integer",
  check: checkInteger,
  validate: validateInteger,
  grade: gradeInteger,
  formatAnswer: (_part, value) => (typeof value === "string" && value.trim() ? `\`${value.trim()}\`` : "_(no answer)_"),
  formatCorrectAnswer: (part) => String(part.correct) + (part.suffix ? ` ${part.suffix}` : ""),
  helpText: () => "Enter a whole number, e.g. 42 or -7.",
  Input: IntegerInput,
};
