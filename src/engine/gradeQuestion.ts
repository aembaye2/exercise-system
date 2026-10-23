import { getElement, isManualPart } from "./registry";
import type { AnswerValues, GradeResult, ManualGrades, Part, ValidationResult } from "./types";

export interface QuestionGrade {
  /** True if every part passed validation (and was therefore graded). */
  valid: boolean;
  validation: Record<string, ValidationResult>;
  /** Per-part results; empty when `valid` is false. */
  results: Record<string, GradeResult>;
  /** Weighted average of part scores, 0..1 (0 when invalid). */
  score: number;
}

export function weightedScore(parts: Part[], results: Record<string, GradeResult>): number {
  let total = 0;
  let sum = 0;
  for (const part of parts) {
    const w = part.weight ?? 1;
    total += w;
    sum += w * clamp01(results[part.name]?.score ?? 0);
  }
  return total > 0 ? sum / total : 0;
}

/**
 * Validate every part, then grade only if all parts are valid. Pure.
 * `manualGrades` (teacher-entered) replace the pending result of hand-graded parts.
 */
export function gradeQuestion(parts: Part[], values: AnswerValues, manualGrades?: ManualGrades): QuestionGrade {
  const validation: Record<string, ValidationResult> = {};
  let valid = true;
  for (const part of parts) {
    const v = getElement(part.type).validate(part, values[part.name]);
    validation[part.name] = v;
    if (!v.valid) valid = false;
  }
  if (!valid) return { valid, validation, results: {}, score: 0 };

  const results: Record<string, GradeResult> = {};
  for (const part of parts) {
    const el = getElement(part.type);
    const manual = isManualPart(part) ? manualGrades?.[part.name] : undefined;
    const r: GradeResult = manual
      ? { score: manual.score, feedback: manual.comment || undefined }
      : part.manualGrading && !el.manualGrading
        ? { score: 0, pending: true } // an auto-graded type marked for hand grading: never auto-graded
        : el.grade(part, values[part.name]);
    results[part.name] = { ...r, score: clamp01(r.score) };
  }
  return { valid, validation, results, score: weightedScore(parts, results) };
}

export function hasPending(results: Record<string, GradeResult>): boolean {
  return Object.values(results).some((r) => r.pending);
}

/** Share of the question's points held by parts still awaiting a teacher's grade, 0..1. */
export function pendingShare(parts: Part[], results: Record<string, GradeResult>): number {
  let total = 0;
  let pending = 0;
  for (const part of parts) {
    const w = part.weight ?? 1;
    total += w;
    if (results[part.name]?.pending) pending += w;
  }
  return total > 0 ? pending / total : 0;
}

function clamp01(x: number): number {
  return Number.isFinite(x) ? Math.min(1, Math.max(0, x)) : 0;
}
