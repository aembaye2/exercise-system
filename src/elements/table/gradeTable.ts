import { AuthoringError, type GradeResult, type JsonValue, type ValidationResult } from "../../engine/types";
import { checkNumber, compareNumbers, formatCorrectNumber, parseNumber } from "../number/gradeNumber";
import type { NumberPart } from "../number/types";
import type { TableBlank, TableCell, TablePart, TableValue } from "./types";

export function cellKey(row: number, col: number): string {
  return `${row}:${col}`;
}

export function isBlank(cell: TableCell): cell is TableBlank {
  return typeof cell === "object" && cell !== null;
}

export interface BlankRef {
  key: string;
  row: number;
  col: number;
  blank: TableBlank;
}

/** Every blank cell, in reading order (row by row, left to right). */
export function blanks(part: TablePart): BlankRef[] {
  const out: BlankRef[] = [];
  part.rows.forEach((r, row) =>
    r.cells?.forEach((cell, col) => {
      if (isBlank(cell)) out.push({ key: cellKey(row, col), row, col, blank: cell });
    }),
  );
  return out;
}

/** A blank's grading options as a `number` part, so it's graded exactly like one. */
function asNumberPart(blank: TableBlank): NumberPart {
  return { type: "number", name: "cell", ...blank };
}

/** Full column name, including its group: "Saudi Arabia, Oil (barrels)". */
export function columnName(part: TablePart, col: number): string {
  let start = 0;
  for (const g of part.columnGroups ?? []) {
    if (col < start + g.span) return `${g.label}, ${part.columns[col]}`;
    start += g.span;
  }
  return part.columns[col];
}

/**
 * How a cell is named in feedback and screen-reader labels, including its section
 * (the nearest heading row above it): "With Trade – Production, Saudi Arabia, Oil (barrels)".
 */
export function cellName(part: TablePart, row: number, col: number): string {
  let section: string | undefined;
  for (let r = row - 1; r >= 0 && section === undefined; r--) if (!part.rows[r].cells) section = part.rows[r].label;
  const label = section ? `${section} – ${part.rows[row].label}` : part.rows[row].label;
  return `${label}, ${columnName(part, col)}`;
}

function toValue(value: JsonValue | undefined): TableValue {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return {};
  const out: TableValue = {};
  for (const [k, v] of Object.entries(value)) if (typeof v === "string") out[k] = v;
  return out;
}

export function checkTable(part: TablePart): void {
  const n = part.columns?.length ?? 0;
  if (n === 0) throw new AuthoringError("table part needs at least one column.");
  if (part.columnGroups) {
    const spans = part.columnGroups.reduce((sum, g) => sum + g.span, 0);
    if (part.columnGroups.some((g) => !Number.isInteger(g.span) || g.span < 1) || spans !== n) {
      throw new AuthoringError(`columnGroups spans must be positive integers adding up to ${n} (the column count).`);
    }
  }
  part.rows.forEach((r, row) => {
    if (r.cells && r.cells.length !== n) {
      throw new AuthoringError(`row ${row + 1} ("${r.label}") has ${r.cells.length} cells but the table has ${n} columns.`);
    }
    r.cells?.forEach((cell, col) => {
      if (!isBlank(cell)) return;
      try {
        checkNumber(asNumberPart(cell));
      } catch (err) {
        if (err instanceof AuthoringError) throw new AuthoringError(`cell "${cellName(part, row, col)}": ${err.message}`);
        throw err;
      }
    });
  });
  if (blanks(part).length === 0) throw new AuthoringError("table part has no blank cells to fill in.");
  if (part.grading !== undefined && part.grading !== "partial" && part.grading !== "all-or-nothing") {
    throw new AuthoringError(`unknown grading "${String(part.grading)}".`);
  }
}

export function validateTable(part: TablePart, value: JsonValue | undefined): ValidationResult {
  const v = toValue(value);
  const all = blanks(part);
  const empty = all.filter((b) => !v[b.key]?.trim());
  if (empty.length > 0) {
    return {
      valid: false,
      message:
        empty.length === all.length
          ? "Please fill in the table."
          : `Please fill in every blank cell (${empty.length} still empty).`,
    };
  }
  for (const b of all) {
    const p = parseNumber(v[b.key]);
    if (!p.ok) return { valid: false, message: `${cellName(part, b.row, b.col)}: ${p.message}` };
  }
  return { valid: true };
}

/** Is this one blank filled in correctly? (Pure; also used by the input to mark cells once the answer is shown.) */
export function isCellCorrect(blank: TableBlank, raw: string | undefined): boolean {
  const p = parseNumber(raw);
  return p.ok && compareNumbers(p.value, blank.correct, asNumberPart(blank));
}

/** Feedback names the wrong cells but never reveals their values. */
export function gradeTable(part: TablePart, value: JsonValue | undefined): GradeResult {
  const v = toValue(value);
  const all = blanks(part);
  const wrong = all.filter((b) => !isCellCorrect(b.blank, v[b.key]));
  const fraction = (all.length - wrong.length) / all.length;
  const score = part.grading === "all-or-nothing" ? (wrong.length === 0 ? 1 : 0) : fraction;
  if (wrong.length === 0) return { score };
  const list = wrong.map((b) => cellName(part, b.row, b.col)).join("; ");
  return { score, feedback: `${all.length - wrong.length} of ${all.length} cells correct. Check: ${list}.` };
}

export function formatCell(blank: TableBlank): string {
  return formatCorrectNumber(asNumberPart(blank));
}

/** Review summary: the student's entries, row by row. */
export function formatTableAnswer(part: TablePart, value: JsonValue | undefined): string {
  const v = toValue(value);
  const rows = part.rows
    .map((r, row) => {
      const entries = r.cells?.flatMap((cell, col) => (isBlank(cell) ? [v[cellKey(row, col)]?.trim() || "—"] : [])) ?? [];
      return entries.length > 0 ? `**${r.label}:** ${entries.join(", ")}` : null;
    })
    .filter((s): s is string => s !== null);
  return rows.length > 0 && Object.keys(v).length > 0 ? rows.join("; ") : "_(no answer)_";
}

export function formatTableCorrect(): string {
  return "shown in green in the table.";
}

export function tableHelpText(part: TablePart): string | undefined {
  if (part.showHelpText === false) return undefined;
  return "Fill in every empty box with a number, e.g. 12.5 or -45. Use Tab to move between boxes.";
}

/** A fully correct answer (for tests and examples). */
export function exampleTable(part: TablePart): TableValue {
  return Object.fromEntries(blanks(part).map((b) => [b.key, formatCell(b.blank)]));
}
