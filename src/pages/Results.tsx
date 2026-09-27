import { attemptsUsed, totals } from "../engine/assessment";
import { useAssessment } from "../components/AssessmentContext";
import { Card, ModeBadge, formatPercent, formatPoints } from "../components/ui";

export interface ResultsProps {
  /**
   * Called instead of navigating to the `#/assessment/:id` route (for the
   * top "back" link and for jumping to a question from the score table).
   * Pass this when embedding outside the hash-routed app, so the component
   * never touches `window.location.hash`.
   */
  onBack?: () => void;
}

export function Results({ onBack }: ResultsProps = {}) {
  const { assessment, state, bank, actions } = useAssessment();
  const { earned, possible } = totals(state);
  const backLinkClass = "text-sm text-indigo-700 hover:underline dark:text-indigo-300";

  return (
    <div className="space-y-4">
      <header className="space-y-1">
        {onBack ? (
          <button type="button" onClick={onBack} className={backLinkClass}>
            ← Back to {assessment.title}
          </button>
        ) : (
          <a href={`#/assessment/${assessment.id}`} className={backLinkClass}>
            ← Back to {assessment.title}
          </a>
        )}
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold">Results</h1>
          <ModeBadge mode={assessment.mode} />
        </div>
        <p className="text-lg">
          Total:{" "}
          <strong>
            {formatPoints(earned)} / {possible}
          </strong>{" "}
          <span className="text-slate-600 dark:text-slate-400">({formatPercent(possible ? earned / possible : 0)})</span>
        </p>
      </header>

      <Card className="overflow-x-auto p-0 sm:p-0">
        <table className="w-full min-w-[20rem] text-left text-sm">
          <caption className="sr-only">Score per question</caption>
          <thead className="border-b border-slate-200 text-xs uppercase text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <tr>
              <th scope="col" className="px-4 py-2">Question</th>
              <th scope="col" className="px-4 py-2 text-right">Attempts</th>
              <th scope="col" className="px-4 py-2 text-right">Best</th>
              <th scope="col" className="px-4 py-2 text-right">Points</th>
            </tr>
          </thead>
          <tbody>
            {state.questions.map((q, i) => (
              <tr key={i} className="border-b border-slate-100 last:border-0 dark:border-slate-800/60">
                <th scope="row" className="px-4 py-2 font-medium">
                  {onBack ? (
                    <button
                      type="button"
                      onClick={() => {
                        actions.goTo(i);
                        onBack();
                      }}
                      className="text-left hover:underline"
                    >
                      {i + 1}. {bank(q.questionId)?.title ?? q.questionId}
                    </button>
                  ) : (
                    <a
                      href={`#/assessment/${assessment.id}`}
                      onClick={() => actions.goTo(i)}
                      className="hover:underline"
                    >
                      {i + 1}. {bank(q.questionId)?.title ?? q.questionId}
                    </a>
                  )}
                </th>
                <td className="px-4 py-2 text-right tabular-nums">
                  {attemptsUsed(q)}
                  {q.maxAttempts !== null && ` / ${q.maxAttempts}`}
                </td>
                <td className="px-4 py-2 text-right tabular-nums">{formatPercent(q.bestScore)}</td>
                <td className="px-4 py-2 text-right tabular-nums">
                  {formatPoints(q.bestScore * q.points)} / {q.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
