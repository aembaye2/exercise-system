import { AuthoringError, type GradeResult, type JsonValue, type ValidationResult } from "../../engine/types";
import type { EssayPart } from "./types";

const PENDING = "Submitted. Your teacher will grade this answer later.";

function toText(raw: JsonValue | undefined): string {
  return typeof raw === "string" ? raw : "";
}

export function countWords(text: string): number {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

export function countChars(text: string): number {
  return [...text.trim()].length;
}

function checkLimit(name: string, value: number | undefined): void {
  if (value !== undefined && (!Number.isInteger(value) || value < 1)) {
    throw new AuthoringError(`${name} must be a positive integer.`);
  }
}

export function checkEssay(part: EssayPart): void {
  if (part.modelAnswer !== undefined && typeof part.modelAnswer !== "string") {
    throw new AuthoringError('"modelAnswer" must be a string (omit it to show none).');
  }
  checkLimit("maxWords", part.maxWords);
  checkLimit("maxChars", part.maxChars);
  checkLimit("minWords", part.minWords);
  checkLimit("rows", part.rows);
  if (part.minWords !== undefined && part.maxWords !== undefined && part.minWords > part.maxWords) {
    throw new AuthoringError("minWords must be <= maxWords.");
  }
}

/** Empty, too long or too short answers are invalid, so they don't use the single submission. */
export function validateEssay(part: EssayPart, value: JsonValue | undefined): ValidationResult {
  const text = toText(value);
  const words = countWords(text);
  if (words === 0) return { valid: false, message: "Please write your answer." };
  if (part.maxWords !== undefined && words > part.maxWords) {
    return { valid: false, message: `Too long: ${words} words (limit ${part.maxWords}).` };
  }
  const chars = countChars(text);
  if (part.maxChars !== undefined && chars > part.maxChars) {
    return { valid: false, message: `Too long: ${chars} characters (limit ${part.maxChars}).` };
  }
  if (part.minWords !== undefined && words < part.minWords) {
    return { valid: false, message: `Too short: ${words} words (at least ${part.minWords}).` };
  }
  return { valid: true };
}

/** Hand-graded: always pending until the teacher enters a grade. */
export function gradeEssay(part: EssayPart): GradeResult {
  const feedback = formatEssayCorrect(part) ? `${PENDING} Compare it with the model answer below.` : PENDING;
  return { score: 0, pending: true, feedback };
}

/** Review summary only; the full essay is shown in the text box above it. */
export function formatEssayAnswer(_part: EssayPart, value: JsonValue | undefined): string {
  const words = countWords(toText(value));
  return words === 0 ? "_(no answer)_" : `_essay, ${words} word${words === 1 ? "" : "s"}_`;
}

/** Empty when the teacher chose not to show a model answer. */
export function formatEssayCorrect(part: EssayPart): string {
  return part.modelAnswer?.trim() ?? "";
}

export function essayHelpText(part: EssayPart): string | undefined {
  if (part.showHelpText === false) return undefined;
  const math = part.equationEditor === true ? "Use “Insert equation” for math, or type it" : "Type math";
  return `${math} between dollar signs, e.g. $x^2 + 5$. Write a plain dollar sign as \\$ (e.g. \\$5). You can submit once; your teacher grades the answer later.`;
}
