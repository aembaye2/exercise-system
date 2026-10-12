import { useMemo, useState, type FormEvent } from "react";
import type { QuestionBank, Submission } from "../engine/assessment";
import { gradeQuestion, hasPending } from "../engine/gradeQuestion";
import { getElement } from "../engine/registry";
import { downloadJson, exportFileName, setManualGrade, type ExportedQuestion, type ResultsExport } from "../engine/storage";
import type { ManualGrade, Part } from "../engine/types";
import { createVariant, type Variant } from "../engine/variant";
import { Markdown } from "./Markdown";
import { QuestionBody } from "./QuestionBody";
import { Button, Card, GradeBadge, ModeBadge, formatPercent, formatPoints } from "./ui";

type OnGrade = (questionIndex: number, submissionIndex: number, parts: Part[], partName: string, grade: ManualGrade | null) => void;

/** Instructor review of an exported results file; hand-graded parts can be graded here. */
export function ReviewView({ data: initialData, bank }: { data: ResultsExport; bank: QuestionBank }) {
  const [data, setData] = useState(initialData);
  const [edited, setEdited] = useState(false);
  const onGrade: OnGrade = (qi, si, parts, partName, grade) => {
    setData((d) => setManualGrade(d, qi, si, parts, partName, grade));
    setEdited(true);
  };

  let pendingCount = 0;
  const regradedTotal = data.questions.reduce((sum, q) => {
    const grades = q.submissions.map((s) => regrade(bank, q.questionId, s));
    pendingCount += grades.filter((g) => g && hasPending(g.results)).length;
    const best = Math.max(0, ...grades.map((g) => g?.score ?? 0));
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
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {pendingCount > 0 && (
            <span className="text-sm font-medium text-sky-800 dark:text-sky-200">
              {pendingCount} answer{pendingCount === 1 ? "" : "s"} awaiting your grade
            </span>
          )}
          {edited && (
            <Button variant="primary" onClick={() => downloadJson(exportFileName(data).replace(/\.json$/, "-graded.json"), data)}>
              Download graded results
            </Button>
          )}
        </div>
      </Card>

      {data.questions.map((q, i) => (
        <QuestionReview key={i} index={i} q={q} bank={bank} onGrade={onGrade} />
      ))}
    </div>
  );
}

function regrade(bank: QuestionBank, questionId: string, s: Submission) {
  const question = bank(questionId);
  if (!question) return null;
  try {
    return gradeQuestion(createVariant(question, s.seed).parts, s.values, s.manualGrades);
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

function QuestionReview({ index, q, bank, onGrade }: { index: number; q: ExportedQuestion; bank: QuestionBank; onGrade: OnGrade }) {
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
        groups.map((g) => {
          const variant = safeVariant(question, g.seed);
          return (
            <VariantReview
              key={g.variant}
              group={g}
              variant={variant}
              idPrefix={`r${index}-v${g.variant}`}
              points={q.points}
              onGrade={(s, partName, grade) => {
                if (!(variant instanceof Error)) onGrade(index, q.submissions.indexOf(s), variant.parts, partName, grade);
              }}
            />
          );
        })
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

interface VariantReviewProps {
  group: VariantGroup;
  variant: Variant | Error;
  idPrefix: string;
  points: number;
  onGrade: (s: Submission, partName: string, grade: ManualGrade | null) => void;
}

function VariantReview({ group, variant, idPrefix, points, onGrade }: VariantReviewProps) {
  if (variant instanceof Error) {
    return <p role="alert">Could not regenerate variant (seed {group.seed}): {variant.message}</p>;
  }
  const last = group.submissions[group.submissions.length - 1];
  const lastGrade = last ? gradeQuestion(variant.parts, last.values, last.manualGrades) : null;
  const totalWeight = variant.parts.reduce((sum, p) => sum + (p.weight ?? 1), 0);
  const manualParts = variant.parts.filter((p) => getElement(p.type).manualGrading);

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
      {last &&
        manualParts.map((p) => (
          <ManualGradeForm
            key={`${p.name}:${last.timestamp}`}
            idPrefix={`${idPrefix}-${p.name}`}
            label={manualParts.length > 1 ? p.name : undefined}
            maxPoints={(points * (p.weight ?? 1)) / totalWeight}
            current={last.manualGrades?.[p.name]}
            onSave={(grade) => onGrade(last, p.name, grade)}
          />
        ))}
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
                const g = gradeQuestion(variant.parts, s.values, s.manualGrades);
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
                            {g.results[p.name] && <GradeBadge result={g.results[p.name]} />}
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

interface ManualGradeFormProps {
  idPrefix: string;
  label?: string;
  maxPoints: number;
  current?: ManualGrade;
  onSave: (grade: ManualGrade | null) => void;
}

/** Teacher's points + comment for one hand-graded part of the latest submission. */
function ManualGradeForm({ idPrefix, label, maxPoints, current, onSave }: ManualGradeFormProps) {
  const id = idPrefix.replace(/[^A-Za-z0-9_-]/g, "_");
  const [pointsText, setPointsText] = useState(current ? formatPoints(current.score * maxPoints) : "");
  const [comment, setComment] = useState(current?.comment ?? "");
  const [error, setError] = useState<string | null>(null);

  const save = (e: FormEvent) => {
    e.preventDefault();
    const pts = Number(pointsText.trim());
    if (pointsText.trim() === "" || !Number.isFinite(pts) || pts < 0 || pts > maxPoints + 1e-9) {
      setError(`Enter points between 0 and ${formatPoints(maxPoints)}.`);
      return;
    }
    setError(null);
    onSave({ score: maxPoints > 0 ? Math.min(1, pts / maxPoints) : 0, ...(comment.trim() ? { comment: comment.trim() } : {}) });
  };

  return (
    <form
      onSubmit={save}
      aria-label={`Teacher grade${label ? ` for ${label}` : ""}`}
      className="space-y-2 rounded-lg border border-sky-200 bg-sky-50 p-3 text-sm dark:border-sky-900 dark:bg-sky-950/40"
    >
      <p className="font-semibold">
        Teacher grade{label ? ` (${label})` : ""}
        {current ? (
          <span className="ml-2 font-normal text-emerald-700 dark:text-emerald-300">
            graded: {formatPoints(current.score * maxPoints)} / {formatPoints(maxPoints)}
          </span>
        ) : (
          <span className="ml-2 font-normal text-sky-800 dark:text-sky-200">not graded yet</span>
        )}
      </p>
      <label className="flex flex-wrap items-center gap-2" htmlFor={`${id}-points`}>
        Points
        <input
          id={`${id}-points`}
          type="text"
          inputMode="decimal"
          value={pointsText}
          onChange={(e) => setPointsText(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={`${id}-error`}
          className="w-24 rounded-md border border-slate-300 bg-white px-2 py-1 font-mono dark:border-slate-600 dark:bg-slate-900"
        />
        <span>/ {formatPoints(maxPoints)}</span>
      </label>
      <label className="flex flex-col gap-1" htmlFor={`${id}-comment`}>
        Comment for the student (optional)
        <textarea
          id={`${id}-comment`}
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full rounded-md border border-slate-300 bg-white px-2 py-1 dark:border-slate-600 dark:bg-slate-900"
        />
      </label>
      <p id={`${id}-error`} role="alert" className="text-red-700 dark:text-red-300 [&:empty]:hidden">
        {error}
      </p>
      <div className="flex flex-wrap gap-2">
        <Button type="submit" variant="primary">
          Save grade
        </Button>
        {current && <Button onClick={() => onSave(null)}>Clear grade</Button>}
      </div>
    </form>
  );
}
