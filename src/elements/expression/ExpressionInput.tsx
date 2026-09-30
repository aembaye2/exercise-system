import { Markdown } from "../../components/Markdown";
import type { ElementInputProps } from "../../engine/registry";
import { parseExpression } from "./mathUtils";
import type { ExpressionPart } from "./types";

/** A text box for typing a math expression, with a live KaTeX preview of what's been typed so far. */
export function ExpressionInput({ part: _part, id, labelId, describedBy, value, onChange, disabled, invalid }: ElementInputProps<ExpressionPart>) {
  const raw = typeof value === "string" ? value : "";
  const trimmed = raw.trim();
  const parsed = trimmed === "" ? null : parseExpression(trimmed);

  return (
    <div className="flex basis-full flex-col gap-1.5">
      <input
        type="text"
        id={id}
        inputMode="text"
        autoComplete="off"
        spellCheck={false}
        aria-labelledby={labelId}
        aria-describedby={describedBy}
        aria-invalid={invalid || undefined}
        disabled={disabled}
        placeholder="e.g. x^2 + 1/2 x + 1"
        value={raw}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full max-w-md rounded-md border bg-white px-2 py-1.5 font-mono dark:bg-slate-900 ${
          invalid ? "border-red-500 dark:border-red-400" : "border-slate-300 dark:border-slate-600"
        } disabled:opacity-80`}
      />
      <div
        aria-live="polite"
        className="min-h-[1.75rem] w-fit max-w-md rounded-md border border-dashed border-slate-300 bg-slate-50 px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-900/40"
      >
        {trimmed === "" ? (
          <span className="text-slate-400 dark:text-slate-500">Preview appears here as you type…</span>
        ) : parsed?.ok ? (
          <Markdown inline>{`$${parsed.node.toTex()}$`}</Markdown>
        ) : (
          <span className="text-slate-400 dark:text-slate-500">…</span>
        )}
      </div>
    </div>
  );
}
