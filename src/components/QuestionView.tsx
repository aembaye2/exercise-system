import { useMemo, type KeyboardEvent } from "react";
import {
  attemptsRemaining,
  attemptsUsed,
  canNewVariant,
  currentVariantSubmissions,
  isDraftSaved,
  isFinished,
  lastSubmission,
  pendingPoints,
} from "../engine/assessment";
import type { GradeResult } from "../engine/types";
import { createVariant } from "../engine/variant";
import { useAssessment } from "./AssessmentContext";
import { QuestionBody } from "./QuestionBody";
import { Button, formatPercent, formatPoints } from "./ui";

/**
 * One question of the running assessment: text, inputs, Grade button, feedback, attempts.
 * With hidden grades there is no button: the answer is saved (graded silently) when the student
 * moves on with Next (see AssessmentView), and no scores, feedback or correct answers are shown.
 */
export function QuestionView({ index }: { index: number }) {
  const { state, bank, actions, hideGrades } = useAssessment();
  const q = state.questions[index];
  const question = bank(q.questionId);
  // The text is regenerated from the seed; the prepared parts come from state,
  // so rendering and grading always use the same option list.
  const text = useMemo(() => (question ? createVariant(question, q.seed).text : ""), [question, q.seed]);

  if (!question) {
    return <p role="alert">Unknown question “{q.questionId}”.</p>;
  }

  const last = lastSubmission(q);
  const finished = !hideGrades && isFinished(q);
  const remaining = attemptsRemaining(q);
  const variantAttempts = currentVariantSubmissions(q).length;
  const headingId = `q${index}-heading`;

  // Only show a part's grade while the input still holds the graded value.
  const sameAsLast = (name: string) => JSON.stringify(q.draft[name]) === JSON.stringify(last?.values[name]);
  const visibleResults: Record<string, GradeResult> = {};
  if (last && !hideGrades) {
    for (const [name, result] of Object.entries(last.results)) {
      if (sameAsLast(name)) visibleResults[name] = result;
    }
  }
  const unsaved = hideGrades && last !== undefined && !isDraftSaved(q);

  // Enter on a radio button or select submits too (text inputs do this natively).
  const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    const t = e.target as HTMLElement;
    const isRadio = t instanceof HTMLInputElement && t.type === "radio";
    if (e.key === "Enter" && (isRadio || t instanceof HTMLSelectElement)) {
      e.preventDefault();
      if (!finished) e.currentTarget.requestSubmit();
    }
  };

  return (
    <article aria-labelledby={headingId} className="space-y-4">
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id={headingId} className="text-lg font-semibold">
          Question {index + 1}. {question.title}
        </h2>
        <span className="text-sm text-slate-600 dark:text-slate-400">
          {hideGrades ? `${q.points} points` : `${formatPoints(q.bestScore * q.points)} / ${q.points} points`}
        </span>
      </header>

      <form
        noValidate
        onKeyDown={onKeyDown}
        onSubmit={(e) => {
          e.preventDefault();
          if (hideGrades) actions.save(index);
          else actions.submit(index);
        }}
        className="space-y-4"
      >
        <QuestionBody
          idPrefix={`q${index}-v${q.variant}`}
          text={text}
          parts={q.preparedParts}
          values={q.draft}
          onChange={(part, value) => actions.setValue(index, part, value)}
          disabled={finished}
          validation={q.validation}
          results={visibleResults}
          showCorrect={finished}
        />

        {!hideGrades && (
          <div className="flex flex-wrap items-center gap-2">
            <Button type="submit" variant="primary" disabled={finished}>
              Grade
            </Button>
            {canNewVariant(q, hideGrades) && <Button onClick={() => actions.newVariant(index)}>New variant</Button>}
          </div>
        )}
      </form>

      <div role="status" aria-live="polite" className="text-sm">
        {q.validation ? (
          <p className="text-red-700 dark:text-red-300">
            {hideGrades
              ? "Some answers are missing or not in a valid format. Fix them, then press Save & next (or Save & finish)."
              : "Some answers are not in a valid format. Fix them and grade again; this did not use an attempt."}
          </p>
        ) : hideGrades ? (
          unsaved ? (
            <p className="text-amber-800 dark:text-amber-200">You have unsaved changes. Press Save &amp; next (or Save &amp; finish) to save them.</p>
          ) : last ? (
            <p>Answer saved ({new Date(last.timestamp).toLocaleString()}). You can change it and save it again.</p>
          ) : null
        ) : last && pendingPoints(q) > 0 ? (
          <p>Submitted. Your teacher will grade this answer later.</p>
        ) : last ? (
          <p>
            Submission score: <strong>{formatPercent(last.score)}</strong>
            {last.score === 1
              ? " — well done!"
              : canNewVariant(q, hideGrades)
                ? " — the correct answer is shown below. Press New variant to try again with new numbers."
                : finished
                  ? " — no attempts left."
                  : ""}
          </p>
        ) : null}
      </div>

      <footer className="flex flex-wrap gap-x-4 gap-y-1 border-t border-slate-200 pt-3 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-400">
        {hideGrades ? (
          <span>{last ? "Saved" : "Not saved yet"}</span>
        ) : (
          <>
            <span>
              Attempts used: {attemptsUsed(q)}
              {q.maxAttempts === null ? " (unlimited)" : ` of ${q.maxAttempts} · ${remaining} remaining`}
            </span>
            <span>
              Variant {q.variant + 1}
              {variantAttempts > 0 ? ` · ${variantAttempts} attempt${variantAttempts === 1 ? "" : "s"} on this variant` : ""}
            </span>
            <span>Best score: {formatPercent(q.bestScore)}</span>
          </>
        )}
        <span className="font-mono">seed {q.seed}</span>
      </footer>
    </article>
  );
}
