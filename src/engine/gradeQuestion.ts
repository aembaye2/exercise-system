import { getElement } from "./registry";
import type { AnswerValues, GradeResult, Part, ValidationResult } from "./types";

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

/** Validate every part, then grade only if all parts are valid. Pure. */
export function gradeQuestion(parts: Part[], values: AnswerValues): QuestionGrade {
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
    const r = getElement(part.type).grade(part, values[part.name]);
    results[part.name] = { ...r, score: clamp01(r.score) };
  }
  return { valid, validation, results, score: weightedScore(parts, results) };
}

function clamp01(x: number): number {
  return Number.isFinite(x) ? Math.min(1, Math.max(0, x)) : 0;
}
