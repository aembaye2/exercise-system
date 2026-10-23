import { useRef, useState } from "react";
import { Sigma } from "lucide-react";
import { Markdown } from "../../components/Markdown";
import { Button } from "../../components/ui";
import type { ElementInputProps } from "../../engine/registry";
import { countChars, countWords } from "./gradeEssay";
import { MathEditor } from "./MathEditor";
import type { EssayPart } from "./types";

/**
 * A multi-line text box with a live word/character count, an equation editor that
 * inserts $...$ at the cursor, and a preview where $...$ is typeset.
 */
export function EssayInput({ part, id, labelId, describedBy, value, onChange, disabled, invalid }: ElementInputProps<EssayPart>) {
  const text = typeof value === "string" ? value : "";
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [editingMath, setEditingMath] = useState(false);
  const words = countWords(text);
  const chars = countChars(text);
  const overWords = part.maxWords !== undefined && words > part.maxWords;
  const overChars = part.maxChars !== undefined && chars > part.maxChars;
  const counterId = `${id}-count`;

  const insertMath = (latex: string) => {
    const box = textareaRef.current;
    const start = box?.selectionStart ?? text.length;
    const end = box?.selectionEnd ?? start;
    const snippet = `$${latex}$`;
    onChange(text.slice(0, start) + snippet + text.slice(end));
    setEditingMath(false);
    const caret = start + snippet.length;
    requestAnimationFrame(() => {
      box?.focus();
      box?.setSelectionRange(caret, caret);
    });
  };

  return (
    <div className="flex basis-full flex-col gap-1.5">
      <textarea
        ref={textareaRef}
        id={id}
        rows={part.rows ?? 8}
        aria-labelledby={labelId}
        aria-describedby={[counterId, describedBy].filter(Boolean).join(" ")}
        aria-invalid={invalid || undefined}
        disabled={disabled}
        value={text}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full resize-y rounded-md border bg-white px-2 py-1.5 leading-relaxed dark:bg-slate-900 ${
          invalid ? "border-red-500 dark:border-red-400" : "border-slate-300 dark:border-slate-600"
        } disabled:opacity-80`}
      />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p id={counterId} className="flex flex-wrap gap-x-3 text-xs tabular-nums text-slate-500 dark:text-slate-400">
          <span className={overWords ? "font-semibold text-red-700 dark:text-red-300" : undefined}>
            {words}
            {part.maxWords !== undefined && ` / ${part.maxWords}`} words
            {part.minWords !== undefined && ` (min ${part.minWords})`}
          </span>
          <span className={overChars ? "font-semibold text-red-700 dark:text-red-300" : undefined}>
            {chars}
            {part.maxChars !== undefined && ` / ${part.maxChars}`} characters
          </span>
        </p>
        {part.equationEditor === true && !disabled && !editingMath && (
          <Button onClick={() => setEditingMath(true)}>
            <Sigma aria-hidden="true" className="h-4 w-4" /> Insert equation
          </Button>
        )}
      </div>
      {editingMath && !disabled && <MathEditor onInsert={insertMath} onCancel={() => setEditingMath(false)} />}
      {text.includes("$") && (
        <div
          aria-label="Preview"
          className="rounded-md border border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900/40"
        >
          <Markdown breaks>{text}</Markdown>
        </div>
      )}
    </div>
  );
}
