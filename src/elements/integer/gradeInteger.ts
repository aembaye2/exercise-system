import { AuthoringError, type GradeResult, type JsonValue, type ValidationResult } from "../../engine/types";
import type { IntegerPart } from "./types";

const INTEGER_RE = /^[+-]?\d+$/;

export type IntegerParseResult = { ok: true; value: bigint } | { ok: false; message: string };

/** Parse with BigInt so very long inputs compare exactly instead of losing precision. */
export function parseInteger(raw: JsonValue | undefined): IntegerParseResult {
  if (typeof raw !== "string" || raw.trim() === "") return { ok: false, message: "Please enter an integer" };
  const s = raw.trim();
  if (!INTEGER_RE.test(s)) {
    return { ok: false, message: `"${s}" is not an integer. Enter whole numbers only, like 42 or -7.` };
  }
  return { ok: true, value: BigInt(s) };
}

export function checkInteger(part: IntegerPart): void {
  if (!Number.isSafeInteger(part.correct)) {
    throw new AuthoringError(`integer part needs an integer "correct" value (got ${String(part.correct)}).`);
  }
}

export function validateInteger(_part: IntegerPart, value: JsonValue | undefined): ValidationResult {
  const p = parseInteger(value);
  return p.ok ? { valid: true } : { valid: false, message: p.message };
}

export function gradeInteger(part: IntegerPart, value: JsonValue | undefined): GradeResult {
  const p = parseInteger(value);
  if (!p.ok) return { score: 0 };
  return { score: p.value === BigInt(part.correct) ? 1 : 0 };
}
