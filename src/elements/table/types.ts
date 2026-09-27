import type { BasePart } from "../../engine/types";
import type { NumberComparison } from "../number/types";

/** A cell the student fills in with a number. Graded like a `number` part. */
export interface TableBlank {
  correct: number;
  comparison?: NumberComparison; // default "relabs"
  rtol?: number; // default 1e-2
  atol?: number; // default 1e-8
  digits?: number; // for sigfig / decdig, default 2
}

/** A fixed cell (shown as is, Markdown + LaTeX), an empty cell (null), or a blank to fill in. */
export type TableCell = string | number | null | TableBlank;

export interface TableRow {
  label: string; // row header (Markdown + LaTeX)
  /** One cell per column. Omit for a section heading row that spans the table, e.g. "With Trade". */
  cells?: TableCell[];
}

export interface TablePart extends BasePart {
  type: "table";
  /** Text in the top-left header cell. */
  corner?: string;
  /** Optional top header row grouping the columns, e.g. one group per country. Spans must add up to the column count. */
  columnGroups?: { label: string; span: number }[];
  columns: string[];
  rows: TableRow[];
  /** "partial" (default): score = fraction of blanks correct. "all-or-nothing": 1 only if every blank is correct. */
  grading?: "partial" | "all-or-nothing";
  showHelpText?: boolean; // default true
}

/** The submitted value: raw text per blank, keyed by `cellKey(row, col)`. */
export type TableValue = Record<string, string>;

declare module "../../engine/types" {
  interface PartTypeMap {
    table: TablePart;
  }
}
