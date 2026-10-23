import { Markdown } from "../../components/Markdown";
import type { ElementInputProps } from "../../engine/registry";
import { parseExpression } from "../expression/mathUtils";
import { validateStep } from "./gradeConditional";
import type { ConditionalGradingPart } from "./types";

/** One labelled box per step, in order; expression steps get a live KaTeX preview. */
export function ConditionalGradingInput({
  part,
  id,
  labelId,
  describedBy,
  value,
  onChange,
  disabled,
  invalid,
}: ElementInputProps<ConditionalGradingPart>) {
  const values = typeof value === "object" && value !== null && !Array.isArray(value) ? value : {};
  const rawOf = (name: string) => (typeof values[name] === "string" ? (values[name] as string) : "");

  return (
    <div id={id} role="group" aria-labelledby={labelId} className="flex basis-full flex-col gap-3">
      {part.steps.map((step, i) => {
        const raw = rawOf(step.name);
        const stepId = `${id}-${step.name}`;
        const stepLabelId = `${stepId}-label`;
        // After a failed Grade/Save, mark exactly the steps that still need fixing.
        const stepInvalid = invalid && !validateStep(part, i, raw.trim()).valid;
        const trimmed = raw.trim();
        const preview = step.kind === "expression" && trimmed ? parseExpression(trimmed) : null;
        return (
          <div key={step.name} className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span id={stepLabelId} className="font-medium">
                <Markdown inline>{step.label ?? `${step.name})`}</Markdown>
              </span>
              <input
                type="text"
                id={stepId}
                inputMode={step.kind === "number" ? "decimal" : "text"}
                autoComplete="off"
                spellCheck={false}
                aria-labelledby={stepLabelId}
                aria-describedby={describedBy}
                aria-invalid={stepInvalid || undefined}
                disabled={disabled}
                placeholder={step.placeholder ?? (step.kind === "number" ? undefined : "e.g. -2x + 3")}
                value={raw}
                onChange={(e) => onChange({ ...values, [step.name]: e.target.value })}
                className={`${step.kind === "number" ? "w-40" : "w-full max-w-md"} max-w-full rounded-md border bg-white px-2 py-1.5 font-mono dark:bg-slate-900 ${
                  stepInvalid ? "border-red-500 dark:border-red-400" : "border-slate-300 dark:border-slate-600"
                } disabled:opacity-80`}
              />
              {step.suffix && <Markdown inline>{step.suffix}</Markdown>}
            </div>
            {step.kind === "expression" && (
              <div
                aria-live="polite"
                className="min-h-[1.75rem] w-fit max-w-md rounded-md border border-dashed border-slate-300 bg-slate-50 px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-900/40"
              >
                {!trimmed ? (
                  <span className="text-slate-400 dark:text-slate-500">Preview appears here as you type…</span>
                ) : preview?.ok ? (
                  <Markdown inline>{`$${preview.node.toTex()}$`}</Markdown>
                ) : (
                  <span className="text-slate-400 dark:text-slate-500">…</span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
