// Entry point for the standalone embeddable bundle (`npm run build:lib`).
// Bundles React, Tailwind's compiled CSS and every element type, so a page
// that has no build step of its own (e.g. a Quarto document) can drop in
// <script type="module" src="exercise-system.js"> and <div> and call mount().
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./entry.css";
import "../elements";
import { QuizWidget } from "./QuizWidget";
import type { AnyQuestion, Assessment } from "../engine/types";

export type { AnyQuestion, Assessment, AssessmentQuestionRef, Part, Question, Rng } from "../engine/types";
// Question authors need this to build a reference curve for a "drawing" part.
export { sampleFunction } from "../elements/drawing";

export interface MountOptions {
  assessment: Assessment;
  questions: AnyQuestion[];
}

/**
 * Mounts one exercise/quiz assessment into `container`.
 *
 * `assessment` and `questions` are plain data/functions, the same shape
 * authored in this project's `src/questions/*.ts` and `src/assessments/*.ts`
 * — just as plain `.js` instead of `.ts`. Returns a function that unmounts
 * and cleans up.
 */
export function mount(container: Element, { assessment, questions }: MountOptions): () => void {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <div className="exercise-system-widget">
        <QuizWidget assessment={assessment} questions={questions} />
      </div>
    </StrictMode>,
  );
  return () => root.unmount();
}
