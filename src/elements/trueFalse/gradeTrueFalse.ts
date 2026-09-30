import { AuthoringError, type GradeResult, type JsonValue, type ValidationResult } from "../../engine/types";
import type { TrueFalsePart, TrueFalseValue } from "./types";

export function checkTrueFalse(part: TrueFalsePart): void {
  if (!Array.isArray(part.statements) || part.statements.length === 0) {
    throw new AuthoringError("true-false part needs at least one statement.");
  }
  part.statements.forEach((s, i) => {
    if (!s.text?.trim()) throw new AuthoringError(`true-false statement ${i + 1} needs non-empty text.`);
    if (typeof s.correct !== "boolean") {
      throw new AuthoringError(`true-false statement ${i + 1} needs a boolean "correct" value.`);
    }
  });
  if (part.grading !== undefined && part.grading !== "partial" && part.grading !== "all-or-nothing") {
    throw new AuthoringError(`unknown grading "${String(part.grading)}".`);
  }
}

/** The student's current answers: one entry per statement, `null` where unanswered. */
export function answersOf(part: TrueFalsePart, value: JsonValue | undefined): TrueFalseValue {
  const n = part.statements.length;
  if (!Array.isArray(value) || value.length !== n) return new Array(n).fill(null);
  return value.map((v) => (typeof v === "boolean" ? v : null));
}

export function validateTrueFalse(part: TrueFalsePart, value: JsonValue | undefined): ValidationResult {
  const answers = answersOf(part, value);
  const unanswered = answers.filter((a) => a === null).length;
  if (unanswered === 0) return { valid: true };
  return {
    valid: false,
    message:
      unanswered === answers.length
        ? "Please mark True or False for each statement."
        : `Please mark True or False for every statement (${unanswered} still unanswered).`,
  };
}

/** Feedback names the wrong statements by number but never reveals which way they should go. */
export function gradeTrueFalse(part: TrueFalsePart, value: JsonValue | undefined): GradeResult {
  const answers = answersOf(part, value);
  const n = part.statements.length;
  const wrong = part.statements.flatMap((s, i) => (answers[i] === s.correct ? [] : [i + 1]));
  const correctCount = n - wrong.length;
  const score = part.grading === "all-or-nothing" ? (wrong.length === 0 ? 1 : 0) : correctCount / n;
  if (wrong.length === 0) return { score };
  return {
    score,
    feedback: `${correctCount} of ${n} correct. Check statement${wrong.length > 1 ? "s" : ""} ${wrong.join(", ")}.`,
  };
}

/** Review summary: what the student marked for each statement. */
export function formatTrueFalseAnswer(part: TrueFalsePart, value: JsonValue | undefined): string {
  const answers = answersOf(part, value);
  if (answers.every((a) => a === null)) return "_(no answer)_";
  return part.statements.map((_, i) => `${i + 1}. ${answers[i] === null ? "—" : answers[i] ? "True" : "False"}`).join("; ");
}

export function formatTrueFalseCorrect(): string {
  return "shown in green in the table.";
}

export function trueFalseHelpText(part: TrueFalsePart): string | undefined {
  if (part.showHelpText === false) return undefined;
  return "Mark True or False for every statement.";
}

/** A fully correct answer (for tests and examples). */
export function exampleTrueFalse(part: TrueFalsePart): TrueFalseValue {
  return part.statements.map((s) => s.correct);
}
