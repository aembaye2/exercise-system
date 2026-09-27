import { useMemo } from "react";
import type { QuestionBank, Submission } from "../engine/assessment";
import { gradeQuestion } from "../engine/gradeQuestion";
import { getElement } from "../engine/registry";
import type { ExportedQuestion, ResultsExport } from "../engine/storage";
import { createVariant, type Variant } from "../engine/variant";
import { Markdown } from "./Markdown";
import { QuestionBody } from "./QuestionBody";
import { Card, ModeBadge, ScoreBadge, formatPercent, formatPoints } from "./ui";

/** Read-only instructor review of an exported results file. */
export function ReviewView({ data, bank }: { data: ResultsExport; bank: QuestionBank }) {
  const regradedTotal = data.questions.reduce((sum, q) => {
    const best = Math.max(0, ...q.submissions.map((s) => regrade(bank, q.questionId, s)?.score ?? 0));
    return sum + best * q.points;
  }, 0);
  const mismatch = Math.abs(regradedTotal - data.earned) > 1e-9;

  return (
    <div className="space-y-4">
      <Card className="space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-xl font-bold">{data.assessmentTitle}</h2>
          <ModeBadge mode={data.mode} />
        </div>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-0.5 text-sm">
          <dt className="text-slate-500 dark:text-slate-400">Student</dt>
          <dd className="font-medium">{data.studentName || "(no name)"}</dd>
          <dt className="text-slate-500 dark:text-slate-400">Started</dt>
          <dd>{new Date(data.startedAt).toLocaleString()}</dd>
          <dt className="text-slate-500 dark:text-slate-400">Exported</dt>
          <dd>{new Date(data.exportedAt).toLocaleString()}</dd>
          <dt className="text-slate-500 dark:text-slate-400">Score</dt>
          <dd>
            <strong>
              {formatPoints(data.earned)} / {data.possible}
            </strong>{" "}
            {mismatch ? (
              <span className="font-medium text-red-700 dark:text-red-300">
                (regrading gives {formatPoints(regradedTotal)} — the file may have been edited or questions changed)
              </span>
            ) : (
              <span className="text-emerald-700 dark:text-emerald-300">(verified by regrading)</span>
            )}
          </dd>
        </dl>
      </Card>

      {data.questions.map((q, i) => (
        <QuestionReview key={i} index={i} q={q} bank={bank} />
      ))}
    </div>
  );
}

function regrade(bank: QuestionBank, questionId: string, s: Submission) {
  const question = bank(questionId);
  if (!question) return null;
  try {
    return gradeQuestion(createVariant(question, s.seed).parts, s.values);
  } catch {
    return null;
  }
}

interface VariantGroup {
  variant: number;
  seed: number;
  submissions: Submission[];
}

function groupByVariant(q: ExportedQuestion): VariantGroup[] {
  const groups = new Map<number, VariantGroup>();
  for (const s of q.submissions) {
    const g = groups.get(s.variant) ?? { variant: s.variant, seed: s.seed, submissions: [] };
    g.submissions.push(s);
    groups.set(s.variant, g);
  }
  if (!groups.has(q.currentVariant)) {
    groups.set(q.currentVariant, { variant: q.currentVariant, seed: q.currentSeed, submissions: [] });
  }
  return [...groups.values()].sort((a, b) => a.variant - b.variant);
}

function QuestionReview({ index, q, bank }: { index: number; q: ExportedQuestion; bank: QuestionBank }) {
  const question = bank(q.questionId);
  const groups = useMemo(() => groupByVariant(q), [q]);

  return (
    <Card className="space-y-4">
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-lg font-semibold">
          Question {index + 1}. {question?.title ?? q.questionId}
        </h3>
        <span className="text-sm">
          {formatPoints(q.earned)} / {q.points} points · {q.submissions.length} attempt
          {q.submissions.length === 1 ? "" : "s"}
          {q.maxAttempts !== null && ` of ${q.maxAttempts}`}
        </span>
      </header>
      {!question ? (
        <p role="alert" className="text-red-700 dark:text-red-300">
          Question “{q.questionId}” is not in this app’s question bank, so it cannot be regenerated.
        </p>
      ) : (
        groups.map((g) => <VariantReview key={g.variant} group={g} variant={safeVariant(question, g.seed)} idPrefix={`r${index}-v${g.variant}`} />)
      )}
    </Card>
  );
}

function safeVariant(question: Parameters<typeof createVariant>[0], seed: number): Variant | Error {
  try {
    return createVariant(question, seed);
  } catch (err) {
    return err instanceof Error ? err : new Error(String(err));
  }
}

function VariantReview({ group, variant, idPrefix }: { group: VariantGroup; variant: Variant | Error; idPrefix: string }) {
  if (variant instanceof Error) {
    return <p role="alert">Could not regenerate variant (seed {group.seed}): {variant.message}</p>;
  }
  const last = group.submissions[group.submissions.length - 1];
  const lastGrade = last ? gradeQuestion(variant.parts, last.values) : null;

  return (
    <section aria-label={`Variant ${group.variant + 1}`} className="space-y-3 border-t border-slate-200 pt-3 dark:border-slate-800">
      <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400">
        Variant {group.variant + 1} <span className="font-mono font-normal">· seed {group.seed}</span>
        {group.submissions.length === 0 && " · not attempted"}
      </h4>
      <QuestionBody
        idPrefix={idPrefix}
        text={variant.text}
        parts={variant.parts}
        values={last?.values ?? {}}
        results={lastGrade?.results}
        disabled
        showCorrect
      />
      {group.submissions.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[28rem] text-left text-sm">
            <caption className="sr-only">Submissions for variant {group.variant + 1}</caption>
            <thead className="text-xs uppercase text-slate-500 dark:text-slate-400">
              <tr>
                <th scope="col" className="py-1 pr-3">#</th>
                <th scope="col" className="py-1 pr-3">Time</th>
                <th scope="col" className="py-1 pr-3">Answers</th>
                <th scope="col" className="py-1 pr-3 text-right">Score</th>
              </tr>
            </thead>
            <tbody>
              {group.submissions.map((s, i) => {
                const g = gradeQuestion(variant.parts, s.values);
                const agrees = Math.abs(g.score - s.score) < 1e-9;
                return (
                  <tr key={i} className="border-t border-slate-100 align-top dark:border-slate-800/60">
                    <td className="py-1.5 pr-3 tabular-nums">{i + 1}</td>
                    <td className="whitespace-nowrap py-1.5 pr-3">{new Date(s.timestamp).toLocaleString()}</td>
                    <td className="py-1.5 pr-3">
                      <ul className="space-y-1">
                        {variant.parts.map((p) => (
                          <li key={p.name} className="flex flex-wrap items-center gap-2">
                            <span className="text-slate-500 dark:text-slate-400">{p.name}:</span>
                            <Markdown inline>{getElement(p.type).formatAnswer(p, s.values[p.name])}</Markdown>
                            {g.results[p.name] && <ScoreBadge score={g.results[p.name].score} />}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-1.5 pr-3 text-right tabular-nums">
                      {formatPercent(g.score)}
                      {!agrees && (
                        <span className="block text-xs text-red-700 dark:text-red-300">file says {formatPercent(s.score)}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
