import type { ElementDefinition } from "../../engine/registry";
import {
  formatOrderingAnswer,
  formatOrderingCorrect,
  gradeOrdering,
  orderingHelpText,
  validateOrdering,
} from "./gradeOrdering";
import { OrderingInput } from "./OrderingInput";
import { checkOrdering, prepareOrdering } from "./prepareOrdering";
import type { OrderingPart } from "./types";

export type { OrderingPart, OrderingValue } from "./types";

export const orderingElement: ElementDefinition<OrderingPart> = {
  type: "ordering",
  check: checkOrdering,
  prepare: prepareOrdering,
  validate: validateOrdering,
  grade: gradeOrdering,
  formatAnswer: formatOrderingAnswer,
  formatCorrectAnswer: formatOrderingCorrect,
  helpText: orderingHelpText,
  Input: OrderingInput,
};
