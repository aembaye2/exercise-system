import type { AssessmentState, QuestionBank } from "./assessment";
import { clearState, loadState, saveState } from "./storage";
import type { Assessment } from "./types";

/** Where an assessment's state is kept between page loads (browser storage, an LMS, ...). */
export interface Persistence {
  load(assessment: Assessment, bank: QuestionBank): AssessmentState | null;
  /** False if the state couldn't be saved. */
  save(state: AssessmentState): boolean;
  clear(assessmentId: string): void;
  /** Students may erase their progress and start over. */
  canReset: boolean;
  /** Shown when save() fails. */
  saveFailedMessage: string;
  /** Pre-fills the student's name in a fresh assessment. */
  learnerName?: string;
}

export const localPersistence: Persistence = {
  load: (assessment) => loadState(assessment),
  save: saveState,
  clear: clearState,
  canReset: true,
  saveFailedMessage: "Your browser is blocking storage, so your answers will be lost if you reload or close this page.",
};
