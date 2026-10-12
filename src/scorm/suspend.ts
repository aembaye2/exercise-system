import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";
import { lastSubmission, type AssessmentState, type QuestionBank, type Submission } from "../engine/assessment";
import { isCompatibleState } from "../engine/storage";
import type { Assessment } from "../engine/types";
import { createVariant } from "../engine/variant";

/** SCORM 2004 3rd/4th edition limit on cmi.suspend_data (2nd edition was 4,000). */
export const SUSPEND_LIMIT = 64000;
const PREFIX = "es1:";

/**
 * Only the latest submission per question keeps its answers; older ones keep their
 * score and timestamp (attempt counts and best scores still work). Prepared parts are
 * dropped: they're rebuilt from each seed on load.
 */
function compact(state: AssessmentState) {
  return {
    ...state,
    questions: state.questions.map((q) => {
      const keep = lastSubmission(q);
      const { preparedParts: _rebuiltOnLoad, ...rest } = q;
      return {
        ...rest,
        submissions: q.submissions.map((s): Submission => (s === keep ? s : { ...s, values: {}, results: {} })),
      };
    }),
  };
}

/** Compressed state for cmi.suspend_data (URI-safe ASCII). */
export function encodeSuspendData(state: AssessmentState): string {
  return PREFIX + compressToEncodedURIComponent(JSON.stringify(compact(state)));
}

/** State from cmi.suspend_data, or null if missing, unreadable, or for a different version of the assessment. */
export function decodeSuspendData(data: string, assessment: Assessment, bank: QuestionBank): AssessmentState | null {
  if (!data.startsWith(PREFIX)) return null;
  try {
    const json = decompressFromEncodedURIComponent(data.slice(PREFIX.length));
    if (!json) return null;
    const parsed: unknown = JSON.parse(json);
    if (typeof parsed !== "object" || parsed === null || !Array.isArray((parsed as { questions?: unknown }).questions)) return null;
    const raw = parsed as { questions: { questionId?: unknown; seed?: unknown }[] };
    const questions = raw.questions.map((q) => {
      const question = typeof q.questionId === "string" ? bank(q.questionId) : undefined;
      if (!question || typeof q.seed !== "number") throw new Error("unknown question");
      return { ...q, preparedParts: createVariant(question, q.seed).parts };
    });
    const state = { ...raw, questions };
    return isCompatibleState(state, assessment) ? state : null;
  } catch {
    return null;
  }
}
