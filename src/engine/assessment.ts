import { gradeQuestion } from "./gradeQuestion";
import { createVariant } from "./variant";
import type {
  AnswerValues,
  AnyQuestion,
  Assessment,
  GradeResult,
  JsonValue,
  Part,
  ValidationResult,
} from "./types";

export type QuestionBank = (questionId: string) => AnyQuestion | undefined;

export interface Submission {
  /** 0-based index of the variant this submission belongs to. */
  variant: number;
  seed: number;
  values: AnswerValues;
  results: Record<string, GradeResult>;
  score: number; // 0..1
  timestamp: string; // ISO
}

export interface QuestionState {
  questionId: string;
  points: number;
  maxAttempts: number | null; // null = unlimited
  /** 0-based index of the current variant (exercise "New variant" increments it). */
  variant: number;
  seed: number;
  preparedParts: Part[];
  draft: AnswerValues;
  /** Validation messages from the last rejected (invalid) submit, if any. */
  validation: Record<string, ValidationResult> | null;
  /** All graded submissions across all variants. */
  submissions: Submission[];
  bestScore: number; // 0..1
}

export interface AssessmentState {
  version: 1;
  assessmentId: string;
  mode: Assessment["mode"];
  startedAt: string;
  currentIndex: number;
  studentName: string;
  questions: QuestionState[];
}

export type AssessmentAction =
  | { type: "setValue"; index: number; part: string; value: JsonValue }
  | { type: "submit"; index: number; timestamp: string }
  | { type: "newVariant"; index: number; seed: number; preparedParts: Part[] }
  | { type: "goTo"; index: number }
  | { type: "setStudentName"; name: string }
  | { type: "replace"; state: AssessmentState };

export function defaultMaxAttempts(mode: Assessment["mode"]): number | null {
  return mode === "exam" ? 1 : null;
}

/** Build a fresh state. `nextSeed` supplies seeds (randomness stays outside the reducer). */
export function createAssessmentState(
  assessment: Assessment,
  bank: QuestionBank,
  nextSeed: () => number,
  now: string,
): AssessmentState {
  return {
    version: 1,
    assessmentId: assessment.id,
    mode: assessment.mode,
    startedAt: now,
    currentIndex: 0,
    studentName: "",
    questions: assessment.questions.map((ref) => {
      const question = bank(ref.questionId);
      if (!question) throw new Error(`Assessment "${assessment.id}" references unknown question "${ref.questionId}".`);
      const seed = nextSeed();
      return {
        questionId: ref.questionId,
        points: ref.points,
        maxAttempts: ref.maxAttempts ?? defaultMaxAttempts(assessment.mode),
        variant: 0,
        seed,
        preparedParts: createVariant(question, seed).parts,
        draft: {},
        validation: null,
        submissions: [],
        bestScore: 0,
      };
    }),
  };
}

// ---------- derived state (pure helpers used by reducer and UI) ----------

export function attemptsUsed(q: QuestionState): number {
  return q.submissions.length;
}

export function attemptsRemaining(q: QuestionState): number | null {
  return q.maxAttempts === null ? null : Math.max(0, q.maxAttempts - q.submissions.length);
}

export function currentVariantSubmissions(q: QuestionState): Submission[] {
  return q.submissions.filter((s) => s.variant === q.variant);
}

export function lastSubmission(q: QuestionState): Submission | undefined {
  const subs = currentVariantSubmissions(q);
  return subs[subs.length - 1];
}

/** Finished = the current variant was answered fully correctly, or no attempts remain. */
export function isFinished(q: QuestionState): boolean {
  return lastSubmission(q)?.score === 1 || attemptsRemaining(q) === 0;
}

export function canSubmit(q: QuestionState): boolean {
  return !isFinished(q);
}

export function canNewVariant(q: QuestionState, mode: Assessment["mode"]): boolean {
  return mode === "exercise" && currentVariantSubmissions(q).length > 0 && attemptsRemaining(q) !== 0;
}

export function questionPoints(q: QuestionState): number {
  return q.bestScore * q.points;
}

export function totals(state: AssessmentState): { earned: number; possible: number } {
  let earned = 0;
  let possible = 0;
  for (const q of state.questions) {
    earned += questionPoints(q);
    possible += q.points;
  }
  return { earned, possible };
}

// ---------- reducer ----------

function updateQuestion(
  state: AssessmentState,
  index: number,
  fn: (q: QuestionState) => QuestionState,
): AssessmentState {
  const q = state.questions[index];
  if (!q) return state;
  const next = fn(q);
  if (next === q) return state;
  const questions = state.questions.slice();
  questions[index] = next;
  return { ...state, questions };
}

export function assessmentReducer(state: AssessmentState, action: AssessmentAction): AssessmentState {
  switch (action.type) {
    case "setValue":
      return updateQuestion(state, action.index, (q) => {
        if (isFinished(q)) return q;
        const validation = q.validation ? { ...q.validation } : null;
        if (validation) delete validation[action.part];
        return { ...q, draft: { ...q.draft, [action.part]: action.value }, validation };
      });

    case "submit":
      return updateQuestion(state, action.index, (q) => {
        if (!canSubmit(q)) return q;
        const grade = gradeQuestion(q.preparedParts, q.draft);
        if (!grade.valid) {
          // Invalid format: show messages, do NOT consume an attempt.
          return { ...q, validation: grade.validation };
        }
        const submission: Submission = {
          variant: q.variant,
          seed: q.seed,
          values: { ...q.draft },
          results: grade.results,
          score: grade.score,
          timestamp: action.timestamp,
        };
        return {
          ...q,
          validation: null,
          submissions: [...q.submissions, submission],
          bestScore: Math.max(q.bestScore, grade.score),
        };
      });

    case "newVariant":
      return updateQuestion(state, action.index, (q) => {
        if (!canNewVariant(q, state.mode)) return q;
        return {
          ...q,
          variant: q.variant + 1,
          seed: action.seed,
          preparedParts: action.preparedParts,
          draft: {},
          validation: null,
        };
      });

    case "goTo":
      if (action.index < 0 || action.index >= state.questions.length || action.index === state.currentIndex) {
        return state;
      }
      return { ...state, currentIndex: action.index };

    case "setStudentName":
      return { ...state, studentName: action.name };

    case "replace":
      return action.state;
  }
}
