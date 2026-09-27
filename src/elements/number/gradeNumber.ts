import { AuthoringError, type GradeResult, type JsonValue, type ValidationResult } from "../../engine/types";
import type { NumberComparison, NumberPart } from "./types";

export const NUMBER_DEFAULTS = { comparison: "relabs" as NumberComparison, rtol: 1e-2, atol: 1e-8, digits: 2 };

// Plain decimals and scientific notation only: 3, -0.5, .5, 5., 1e-3, 4.5E6.
const NUMBER_RE = /^[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?$/;

export type ParseResult = { ok: true; value: number } | { ok: false; message: string };

export function parseNumber(raw: JsonValue | undefined): ParseResult {
  if (typeof raw !== "string" || raw.trim() === "") return { ok: false, message: "Please enter a number" };
  const s = raw.trim();
  if (!NUMBER_RE.test(s)) {
    return { ok: false, message: `"${s}" is not a valid number. Use a decimal like 3.2 or scientific notation like 1.5e-3.` };
  }
  const value = Number(s);
  if (!Number.isFinite(value)) return { ok: false, message: `"${s}" is too large` };
  return { ok: true, value };
}

export function roundToSigFigs(x: number, digits: number): number {
  if (x === 0 || !Number.isFinite(x)) return x;
  return Number(x.toPrecision(digits));
}

export function roundToDecimals(x: number, digits: number): number {
  if (!Number.isFinite(x)) return x;
  return Number(x.toFixed(digits));
}

export function compareNumbers(submitted: number, correct: number, part: NumberPart): boolean {
  const comparison = part.comparison ?? NUMBER_DEFAULTS.comparison;
  const digits = part.digits ?? NUMBER_DEFAULTS.digits;
  switch (comparison) {
    case "relabs": {
      const rtol = part.rtol ?? NUMBER_DEFAULTS.rtol;
      const atol = part.atol ?? NUMBER_DEFAULTS.atol;
      return Math.abs(submitted - correct) <= atol + rtol * Math.abs(correct);
    }
    case "sigfig":
      return roundToSigFigs(submitted, digits) === roundToSigFigs(correct, digits);
    case "decdig":
      return roundToDecimals(submitted, digits) === roundToDecimals(correct, digits);
  }
}

export function checkNumber(part: NumberPart): void {
  if (typeof part.correct !== "number" || !Number.isFinite(part.correct)) {
    throw new AuthoringError(`number part needs a finite "correct" value (got ${String(part.correct)}).`);
  }
  const comparison = part.comparison ?? NUMBER_DEFAULTS.comparison;
  if (!["relabs", "sigfig", "decdig"].includes(comparison)) {
    throw new AuthoringError(`unknown comparison "${comparison}".`);
  }
  if (part.rtol !== undefined && !(part.rtol >= 0)) throw new AuthoringError("rtol must be >= 0.");
  if (part.atol !== undefined && !(part.atol >= 0)) throw new AuthoringError("atol must be >= 0.");
  if (part.digits !== undefined) {
    const min = comparison === "sigfig" ? 1 : 0;
    if (!Number.isInteger(part.digits) || part.digits < min || part.digits > 100) {
      throw new AuthoringError(`digits must be an integer from ${min} to 100.`);
    }
  }
}

export function validateNumber(_part: NumberPart, value: JsonValue | undefined): ValidationResult {
  const p = parseNumber(value);
  return p.ok ? { valid: true } : { valid: false, message: p.message };
}

/** Feedback never reveals the correct value; the UI shows it once the question is finished. */
export function gradeNumber(part: NumberPart, value: JsonValue | undefined): GradeResult {
  const p = parseNumber(value);
  if (!p.ok) return { score: 0 };
  return { score: compareNumbers(p.value, part.correct, part) ? 1 : 0 };
}

export function formatCorrectNumber(part: NumberPart): string {
  const comparison = part.comparison ?? NUMBER_DEFAULTS.comparison;
  const digits = part.digits ?? NUMBER_DEFAULTS.digits;
  if (comparison === "sigfig") return String(roundToSigFigs(part.correct, digits));
  if (comparison === "decdig") return part.correct.toFixed(digits);
  // Trim float noise like 0.30000000000000004 for display.
  return String(Number(part.correct.toPrecision(12)));
}

export function numberHelpText(part: NumberPart): string | undefined {
  if (part.showHelpText === false) return undefined;
  const comparison = part.comparison ?? NUMBER_DEFAULTS.comparison;
  const digits = part.digits ?? NUMBER_DEFAULTS.digits;
  const base = "Enter a number, e.g. 3.2, -0.5 or 1.5e-3.";
  if (comparison === "sigfig") return `${base} Graded to ${digits} significant figure${digits === 1 ? "" : "s"}.`;
  if (comparison === "decdig") return `${base} Graded to ${digits} decimal place${digits === 1 ? "" : "s"}.`;
  const rtol = part.rtol ?? NUMBER_DEFAULTS.rtol;
  return `${base} Accepted within ${Number((rtol * 100).toPrecision(3))}% relative error.`;
}
