// Entry point for the standalone embeddable bundle (`npm run build:lib`).
// Bundles React, Tailwind's compiled CSS and every element type, so a page
// that has no build step of its own (e.g. a Quarto document) can drop in
// <script type="module" src="exercise-system.js"> and <div> and call mount().
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./entry.css";
import "../elements";
import { QuizWidget, questionBank } from "./QuizWidget";
import { findScormApi } from "../scorm/api";
import { connectScorm } from "../scorm/scormPersistence";
import { hidesGrades, type AnyQuestion, type Assessment } from "../engine/types";

export type { AnyQuestion, Assessment, AssessmentQuestionRef, Part, Question, Rng } from "../engine/types";

export interface MountOptions {
  assessment: Assessment;
  questions: AnyQuestion[];
  /** Teacher view instead of the quiz: review and grade a student's exported results file. */
  review?: boolean;
}

/**
 * Mounts one exercise/quiz assessment into `container`.
 *
 * `assessment` and `questions` are plain data/functions, the same shape
 * authored in this project's `src/questions/*.ts` and `src/assessments/*.ts`
 * — just as plain `.js` instead of `.ts`. Returns a function that unmounts
 * and cleans up.
 */
export function mount(container: Element, { assessment, questions, review }: MountOptions): () => void {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <div className="exercise-system-widget">
        <QuizWidget assessment={assessment} questions={questions} review={review} />
      </div>
    </StrictMode>,
  );
  return () => root.unmount();
}

/**
 * Mounts an assessment inside a SCORM 2004 package (see scripts/scorm-package.mjs).
 * Progress is kept in the LMS (cmi.suspend_data) and the score, status and each
 * question's latest answer are reported to it. Outside an LMS it runs as a preview
 * that saves to localStorage and reports nothing.
 */
export function mountScorm(container: Element, { assessment, questions }: Omit<MountOptions, "review">): () => void {
  const bank = questionBank(questions);
  const api = findScormApi();
  const scorm = api ? connectScorm(api, bank, { hideGrades: hidesGrades(assessment) }) : null;
  const end = () => scorm?.terminate();
  window.addEventListener("pagehide", end);
  window.addEventListener("beforeunload", end);
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <div className="exercise-system-widget">
        {!scorm && (
          <p role="status" className="mb-3 rounded-md bg-amber-100 px-3 py-2 text-sm text-amber-900 dark:bg-amber-900/50 dark:text-amber-100">
            Preview: not connected to a course site, so scores aren't reported and progress is saved only in this browser.
          </p>
        )}
        <QuizWidget assessment={assessment} questions={questions} persistence={scorm ?? undefined} />
      </div>
    </StrictMode>,
  );
  return () => {
    end();
    window.removeEventListener("pagehide", end);
    window.removeEventListener("beforeunload", end);
    root.unmount();
  };
}
