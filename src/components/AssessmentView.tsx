import { useState } from "react";
import {
  attemptsUsed,
  isDraftComplete,
  isDraftSaved,
  isFinished,
  pendingPoints,
  totals,
  type QuestionState,
} from "../engine/assessment";
import { useAssessment } from "./AssessmentContext";
import { QuestionView } from "./QuestionView";
import { Button, Card, ConfirmButton, ModeBadge, formatPoints } from "./ui";

/** Announced to screen readers in each question button's label. */
function statusOf(q: QuestionState, hideGrades: boolean): string {
  if (hideGrades) return attemptsUsed(q) > 0 ? "saved" : "not started";
  if (q.bestScore >= 1) return "complete";
  if (pendingPoints(q) > 0) return "awaiting teacher's grade";
  if (isFinished(q)) return "closed";
  if (attemptsUsed(q) > 0) return "in progress";
  return "not started";
}

export interface AssessmentViewProps {
  /**
   * Called instead of navigating to the `#/assessment/:id/results` route.
   * Pass this when embedding outside the hash-routed app (e.g. the packaged
   * widget), so the component never touches `window.location.hash`.
   */
  onShowResults?: () => void;
}

/** The running assessment: header, question navigation, current question. */
export function AssessmentView({ onShowResults }: AssessmentViewProps = {}) {
  const { assessment, state, bank, actions, saved, persistence, hideGrades } = useAssessment();
  const [confirmingReset, setConfirmingReset] = useState(false);
  // Hidden grades: the question whose Next/Finish press was stopped because it isn't answered.
  const [warnedIndex, setWarnedIndex] = useState<number | null>(null);
  const { earned, possible, pending } = totals(state);
  const index = state.currentIndex;
  const last = state.questions.length - 1;
  const current = state.questions[index];

  /**
   * Leave the current question. With hidden grades this is where answers are saved: a
   * complete, changed answer is saved first. With `requireAnswer` (Next, Finish) an
   * unanswered or incomplete question stops the first press with a warning (and marks the
   * missing parts); pressing again moves on without saving. Previous and the question
   * buttons save a complete answer but never stop.
   */
  const leave = (go: () => void, requireAnswer: boolean) => {
    if (hideGrades && current && !isDraftSaved(current)) {
      if (isDraftComplete(current)) {
        actions.save(index);
      } else if (requireAnswer && warnedIndex !== index) {
        actions.save(index); // invalid: shows which parts are missing, saves nothing
        setWarnedIndex(index);
        return;
      }
    }
    setWarnedIndex(null);
    go();
  };
  const showResults = () => {
    if (onShowResults) onShowResults();
    else window.location.hash = `#/assessment/${assessment.id}/results`;
  };

  return (
    <div className="space-y-4">
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold">{assessment.title}</h1>
          <ModeBadge mode={assessment.mode} />
        </div>
        {assessment.description && <p className="text-slate-600 dark:text-slate-400">{assessment.description}</p>}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {hideGrades ? (
            <p className="text-sm">
              Total points: <strong>{possible}</strong>
              <span className="text-slate-600 dark:text-slate-400"> · Answers are saved when you press Save &amp; next; scores are not shown here.</span>
            </p>
          ) : (
            <p className="text-sm">
              Total score:{" "}
              <strong>
                {formatPoints(earned)} / {possible}
              </strong>
              {pending > 0 && (
                <span className="text-slate-600 dark:text-slate-400"> ({formatPoints(pending)} awaiting teacher's grade)</span>
              )}
            </p>
          )}
          <div className="ml-auto flex flex-wrap items-center gap-2">
            {onShowResults ? (
              <button
                type="button"
                onClick={() => leave(onShowResults, false)}
                className="rounded-md px-3 py-1.5 text-sm font-medium text-indigo-700 underline-offset-2 hover:underline dark:text-indigo-300"
              >
                Results
              </button>
            ) : (
              <a
                href={`#/assessment/${assessment.id}/results`}
                onClick={() => leave(() => {}, false)}
                className="rounded-md px-3 py-1.5 text-sm font-medium text-indigo-700 underline-offset-2 hover:underline dark:text-indigo-300"
              >
                Results
              </a>
            )}
            {persistence.canReset && assessment.resetButton !== false && (
              <ConfirmButton
                label="Reset assessment"
                confirmLabel="Yes, reset"
                prompt="Erase all answers and start over?"
                onConfirm={actions.reset}
                confirming={confirmingReset}
                setConfirming={setConfirmingReset}
              />
            )}
          </div>
        </div>
        {!saved && (
          <p role="alert" className="rounded-md bg-amber-100 px-3 py-2 text-sm text-amber-900 dark:bg-amber-900/50 dark:text-amber-100">
            {persistence.saveFailedMessage}
          </p>
        )}
      </header>

      <nav aria-label="Questions">
        <ol className="m-0 flex list-none flex-wrap gap-2 p-0">
          {state.questions.map((q, i) => {
            const status = statusOf(q, hideGrades);
            const points = hideGrades ? `${q.points} points` : `${formatPoints(q.bestScore * q.points)} of ${q.points} points`;
            const title = bank(q.questionId)?.title ?? q.questionId;
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => leave(() => actions.goTo(i), false)}
                  aria-current={i === index ? "step" : undefined}
                  aria-label={`Question ${i + 1}: ${title}, ${status}, ${points}`}
                  className={`rounded-md border px-3 py-1.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
                    i === index
                      ? "border-indigo-500 bg-indigo-50 text-indigo-800 dark:border-indigo-400 dark:bg-indigo-950/60 dark:text-indigo-200"
                      : "border-slate-300 bg-white hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
                  }`}
                >
                  Q{i + 1}
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <Card>
        {/* key: remount per question/variant so ids and input state are fresh */}
        <QuestionView key={`${index}`} index={index} />
      </Card>

      {hideGrades && warnedIndex === index && (
        <p role="alert" className="rounded-md bg-amber-100 px-3 py-2 text-sm text-amber-900 dark:bg-amber-900/50 dark:text-amber-100">
          You haven&apos;t answered this question completely, so it wasn&apos;t saved. Answer it, or press{" "}
          {index < last ? "Save & next" : "Save & finish"} again to skip it for now.
        </p>
      )}

      <div className="flex justify-between gap-2">
        <Button onClick={() => leave(() => actions.goTo(index - 1), false)} disabled={index === 0}>
          ← Previous
        </Button>
        {index < last ? (
          <Button variant={hideGrades ? "primary" : undefined} onClick={() => leave(() => actions.goTo(index + 1), true)}>
            {hideGrades ? "Save & next →" : "Next →"}
          </Button>
        ) : (
          <Button variant="primary" onClick={() => leave(showResults, true)}>
            {hideGrades ? "Save & finish →" : "Finish & see results →"}
          </Button>
        )}
      </div>
    </div>
  );
}
