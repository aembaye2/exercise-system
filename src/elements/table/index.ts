import type { ElementDefinition } from "../../engine/registry";
import { checkTable, formatTableAnswer, formatTableCorrect, gradeTable, tableHelpText, validateTable } from "./gradeTable";
import { TableInput } from "./TableInput";
import type { TablePart } from "./types";

export type { TableBlank, TableCell, TablePart, TableRow } from "./types";

export const tableElement: ElementDefinition<TablePart> = {
  type: "table",
  check: checkTable,
  validate: validateTable,
  grade: gradeTable,
  formatAnswer: formatTableAnswer,
  formatCorrectAnswer: formatTableCorrect,
  helpText: tableHelpText,
  Input: TableInput,
};
