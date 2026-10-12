import { isDone, lastSubmission, totals, type AssessmentState, type QuestionBank } from "../engine/assessment";
import { hasPending } from "../engine/gradeQuestion";
import { getElement } from "../engine/registry";
import type { GradeResult, JsonValue, Part } from "../engine/types";

const RESPONSE_LIMIT = 4000; // cmi.interactions.n.learner_response for type "other"
const DESCRIPTION_LIMIT = 250;

function round(x: number, digits: number): string {
  return String(Math.round(x * 10 ** digits) / 10 ** digits);
}

/**
 * SCORM time(second,10,2), e.g. 2026-10-12T15:12:36.12Z: at most 2 fractional digits, and the
 * time zone (Z) is only allowed after a fraction, so "...:36Z" is rejected (Blackboard: error 406).
 */
export function scormTimestamp(iso: string): string {
  return `${iso.slice(0, 22)}Z`;
}

function interactionId(assessmentId: string, index: number, questionId: string): string {
  return `urn:exercise-system:${assessmentId}:q${index + 1}-${questionId}`.replace(/[^A-Za-z0-9:._-]/g, "-");
}

/** The student's answer per part: typed text as-is (essays, numbers), anything else as the review summary. */
function learnerResponse(parts: Part[], values: Record<string, JsonValue>): string {
  const answers = parts.map((p) => {
    const v = values[p.name];
    const text = typeof v === "string" ? v : getElement(p.type).formatAnswer(p, v);
    return parts.length > 1 ? `${p.name}: ${text}` : text;
  });
  return answers.join(" | ").slice(0, RESPONSE_LIMIT);
}

function interactionResult(score: number, results: Record<string, GradeResult>): string {
  if (hasPending(results)) return "neutral";
  if (score >= 1) return "correct";
  if (score <= 0) return "incorrect";
  return round(score, 7);
}

/**
 * The cmi values describing `state`, in the order they must be set. With `hideGrades`
 * (Save only) a question counts as completed once it has been saved. Interactions are
 * indexed by question position and written for questions 0..k (k = the last one with
 * a submission), so new indices are always created in order, as SCORM requires.
 */
export function scormReport(
  state: AssessmentState,
  bank: QuestionBank,
  passingScore: number | null,
  hideGrades = false,
): [string, string][] {
  const { earned, possible, pending } = totals(state);
  const scaled = possible > 0 ? earned / possible : 0;
  const finished = state.questions.filter((q) => isDone(q, hideGrades)).length;
  const success = pending > 0 || passingScore === null ? "unknown" : scaled >= passingScore ? "passed" : "failed";

  const values: [string, string][] = [
    ["cmi.score.min", "0"],
    ["cmi.score.max", round(possible, 2)],
    ["cmi.score.raw", round(earned, 2)],
    ["cmi.score.scaled", round(scaled, 7)],
    ["cmi.progress_measure", round(state.questions.length ? finished / state.questions.length : 0, 7)],
    ["cmi.completion_status", finished === state.questions.length ? "completed" : "incomplete"],
    ["cmi.success_status", success],
  ];

  const lastAnswered = state.questions.map((q) => q.submissions.length > 0).lastIndexOf(true);
  state.questions.slice(0, lastAnswered + 1).forEach((q, i) => {
    const key = `cmi.interactions.${i}`;
    const title = bank(q.questionId)?.title ?? q.questionId;
    values.push(
      [`${key}.id`, interactionId(state.assessmentId, i, q.questionId)],
      [`${key}.type`, "other"],
      [`${key}.description`, title.slice(0, DESCRIPTION_LIMIT)],
      [`${key}.weighting`, String(q.points)],
    );
    const last = lastSubmission(q);
    if (!last) return;
    values.push(
      [`${key}.timestamp`, scormTimestamp(last.timestamp)],
      [`${key}.learner_response`, learnerResponse(q.preparedParts, last.values)],
      [`${key}.result`, interactionResult(last.score, last.results)],
    );
  });
  return values;
}
