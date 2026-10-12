import { getElement } from "../engine/registry";
import type { AnswerValues, GradeResult, JsonValue, Part, ValidationResult } from "../engine/types";
import { Markdown } from "./Markdown";
import { GradeBadge } from "./ui";

export interface QuestionBodyProps {
  /** Unique prefix for DOM ids (so several questions can share a page). */
  idPrefix: string;
  text: string;
  parts: Part[];
  values: AnswerValues;
  onChange?: (part: string, value: JsonValue) => void;
  disabled?: boolean;
  validation?: Record<string, ValidationResult> | null;
  results?: Record<string, GradeResult> | null;
  showCorrect?: boolean;
}

/** Presentational: question text + one input per part + per-part feedback. No grading logic. */
export function QuestionBody({
  idPrefix,
  text,
  parts,
  values,
  onChange,
  disabled,
  validation,
  results,
  showCorrect,
}: QuestionBodyProps) {
  return (
    <div className="space-y-4">
      <Markdown className="leading-relaxed">{text}</Markdown>
      <div className="space-y-3">
        {parts.map((part, i) => (
          <PartView
            key={part.name}
            idPrefix={idPrefix}
            index={i}
            total={parts.length}
            part={part}
            value={values[part.name]}
            onChange={onChange ? (v) => onChange(part.name, v) : undefined}
            disabled={disabled || !onChange}
            validation={validation?.[part.name]}
            result={results?.[part.name]}
            showCorrect={showCorrect}
          />
        ))}
      </div>
    </div>
  );
}

interface PartViewProps {
  idPrefix: string;
  index: number;
  total: number;
  part: Part;
  value: JsonValue | undefined;
  onChange?: (value: JsonValue) => void;
  disabled?: boolean;
  validation?: ValidationResult;
  result?: GradeResult;
  showCorrect?: boolean;
}

function PartView({ idPrefix, index, total, part, value, onChange, disabled, validation, result, showCorrect }: PartViewProps) {
  const el = getElement(part.type);
  const base = `${idPrefix}-${part.name}`.replace(/[^A-Za-z0-9_-]/g, "_");
  const inputId = `${base}-input`;
  const labelId = `${base}-label`;
  const helpId = `${base}-help`;
  const feedbackId = `${base}-feedback`;
  const help = !disabled ? el.helpText?.(part) : undefined;
  const invalid = validation !== undefined && !validation.valid;
  // Empty means there's nothing to reveal (e.g. an essay without a model answer).
  const correctAnswer = showCorrect ? el.formatCorrectAnswer(part) : "";

  return (
    <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-800">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
        {part.label ? (
          <span id={labelId} className="font-medium">
            <Markdown inline>{part.label}</Markdown>
          </span>
        ) : (
          <span id={labelId} className="sr-only">
            {total > 1 ? `Answer for part ${index + 1}` : "Answer"}
          </span>
        )}
        <el.Input
          part={part}
          id={inputId}
          labelId={labelId}
          describedBy={[help ? helpId : "", feedbackId].filter(Boolean).join(" ")}
          value={value}
          onChange={onChange ?? noop}
          disabled={disabled}
          invalid={invalid}
          showCorrect={showCorrect}
        />
        {part.suffix && <Markdown inline>{part.suffix}</Markdown>}
        {result && <GradeBadge result={result} />}
      </div>
      {help && (
        <p id={helpId} className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
          {help}
        </p>
      )}
      <div id={feedbackId} aria-live="polite" className="space-y-1 text-sm [&:not(:empty)]:mt-2">
        {invalid && (
          <p className="font-medium text-red-700 dark:text-red-300">
            <span aria-hidden="true">⚠ </span>
            {validation.message ?? "Invalid answer"}
          </p>
        )}
        {result?.feedback && (
          <div className="text-slate-700 dark:text-slate-300">
            <Markdown inline>{result.feedback}</Markdown>
          </div>
        )}
        {correctAnswer &&
          (el.correctAnswerHeading ? (
            <div className="rounded-md border-l-4 border-emerald-500 bg-emerald-50 px-3 py-2 text-slate-800 dark:bg-emerald-950/40 dark:text-slate-200">
              <p className="font-semibold">{el.correctAnswerHeading}</p>
              <Markdown>{correctAnswer}</Markdown>
            </div>
          ) : (
            <p className="text-slate-700 dark:text-slate-300">
              Correct answer: <Markdown inline className="font-semibold">{correctAnswer}</Markdown>
            </p>
          ))}
      </div>
    </div>
  );
}

function noop() {}
