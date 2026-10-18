export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export interface Rng {
  next(): number; // [0, 1)
  int(min: number, max: number): number; // inclusive
  float(min: number, max: number, decimals?: number): number;
  pick<T>(arr: readonly T[]): T;
  shuffle<T>(arr: readonly T[]): T[]; // returns a new array
  sample<T>(arr: readonly T[], k: number): T[]; // k distinct items, random order
}

export interface BasePart {
  name: string; // unique within the question
  weight?: number; // default 1
  label?: string; // optional prompt shown before the input (Markdown + LaTeX)
  suffix?: string; // optional text shown after the input (Markdown + LaTeX)
}

/**
 * Maps an element type name to its part spec. The core declares it empty;
 * each element adds its own entry via module augmentation, e.g.
 *
 *   declare module "../../engine/types" {
 *     interface PartTypeMap { "my-type": MyPart }
 *   }
 *
 * so new element types plug in without editing the engine.
 */
export interface PartTypeMap {}
export type PartType = keyof PartTypeMap;
// Falls back to a generic part when no element is registered (engine-only builds).
export type Part = [PartType] extends [never] ? BasePart & { type: string } : PartTypeMap[PartType];

/**
 * A question definition. `P` is the shape of the random parameters.
 * Methods (rather than function properties) keep Question<P> assignable to
 * Question<unknown>, so a bank can hold questions with different parameters.
 */
export interface Question<P = unknown> {
  id: string;
  title: string;
  generate(rng: Rng): P;
  render(params: P): string; // Markdown + LaTeX
  parts(params: P): Part[];
}

export type AnyQuestion = Question<unknown>;

export interface GradeResult {
  score: number; // 0..1
  feedback?: string;
  /** Hand-graded part not graded yet: `score` is 0 until a teacher enters a grade. */
  pending?: boolean;
}

/** A teacher's grade for a hand-graded part, stored on the submission. */
export interface ManualGrade {
  score: number; // 0..1
  comment?: string;
}

export type ManualGrades = Record<string, ManualGrade>;

// validate() runs before grade(). An invalid-format submission returns a
// message and does NOT consume an attempt.
export interface ValidationResult {
  valid: boolean;
  message?: string;
}

export type AnswerValues = Record<string, JsonValue>;

export interface AssessmentQuestionRef {
  questionId: string;
  points: number;
  maxAttempts?: number;
}

export interface Assessment {
  id: string;
  title: string;
  description?: string;
  mode: "exercise" | "exam";
  questions: AssessmentQuestionRef[];
  /**
   * Show the "Grade" button (grades and shows feedback right away). Default true.
   * With `false` there is no button: Next (and Finish) saves the answer, graded silently
   * (for the LMS/results file); students see no scores, feedback or correct answers and
   * can change and re-save their answers.
   */
  gradeButton?: boolean;
  /**
   * Show the "Reset assessment" button, which erases every answer and starts over.
   * Default true. Set it to false for exams, so students can't wipe their saved work.
   * (In a SCORM package there is never a Reset button.)
   */
  resetButton?: boolean;
}

/** Students don't see grades: there is no Grade button; Save & next saves the answers. */
export function hidesGrades(assessment: Pick<Assessment, "gradeButton">): boolean {
  return assessment.gradeButton === false;
}

/** Thrown for mistakes in question definitions (not student mistakes). */
export class AuthoringError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthoringError";
  }
}
