import { useState } from "react";
import { attemptsUsed, isFinished, totals, type QuestionState } from "../engine/assessment";
import { useAssessment } from "./AssessmentContext";
import { QuestionView } from "./QuestionView";
import { Button, Card, ConfirmButton, ModeBadge, formatPoints } from "./ui";

/** Announced to screen readers in each question button's label. */
function statusOf(q: QuestionState): string {
  if (q.bestScore >= 1) return "complete";
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
  const { assessment, state, bank, actions, saved } = useAssessment();
  const [confirmingReset, setConfirmingReset] = useState(false);
  const { earned, possible } = totals(state);
  const index = state.currentIndex;
  const last = state.questions.length - 1;

  return (
    <div className="space-y-4">
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold">{assessment.title}</h1>
          <ModeBadge mode={assessment.mode} />
        </div>
        {assessment.description && <p className="text-slate-600 dark:text-slate-400">{assessment.description}</p>}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-sm">
            Total score:{" "}
            <strong>
              {formatPoints(earned)} / {possible}
            </strong>
          </p>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            {onShowResults ? (
              <button
                type="button"
                onClick={onShowResults}
                className="rounded-md px-3 py-1.5 text-sm font-medium text-indigo-700 underline-offset-2 hover:underline dark:text-indigo-300"
              >
                Results
              </button>
            ) : (
              <a
                href={`#/assessment/${assessment.id}/results`}
                className="rounded-md px-3 py-1.5 text-sm font-medium text-indigo-700 underline-offset-2 hover:underline dark:text-indigo-300"
              >
                Results &amp; export
              </a>
            )}
            <ConfirmButton
              label="Reset assessment"
              confirmLabel="Yes, reset"
              prompt="Erase all answers and start over?"
              onConfirm={actions.reset}
              confirming={confirmingReset}
              setConfirming={setConfirmingReset}
            />
          </div>
        </div>
        {!saved && (
          <p role="alert" className="rounded-md bg-amber-100 px-3 py-2 text-sm text-amber-900 dark:bg-amber-900/50 dark:text-amber-100">
            Your browser is blocking storage, so progress will be lost if you reload. Export your results before leaving.
          </p>
        )}
      </header>

      <nav aria-label="Questions">
        <ol className="m-0 flex list-none flex-wrap gap-2 p-0">
          {state.questions.map((q, i) => {
            const status = statusOf(q);
            const title = bank(q.questionId)?.title ?? q.questionId;
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => actions.goTo(i)}
                  aria-current={i === index ? "step" : undefined}
                  aria-label={`Question ${i + 1}: ${title}, ${status}, ${formatPoints(q.bestScore * q.points)} of ${q.points} points`}
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

      <div className="flex justify-between gap-2">
        <Button onClick={() => actions.goTo(index - 1)} disabled={index === 0}>
          ← Previous
        </Button>
        {index < last ? (
          <Button onClick={() => actions.goTo(index + 1)}>Next →</Button>
        ) : onShowResults ? (
          <Button variant="primary" onClick={onShowResults}>
            Finish &amp; see results →
          </Button>
        ) : (
          <a
            href={`#/assessment/${assessment.id}/results`}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400"
          >
            Finish &amp; see results →
          </a>
        )}
      </div>
    </div>
  );
}
