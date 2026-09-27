import { Markdown } from "../../components/Markdown";
import type { ElementInputProps } from "../../engine/registry";
import { selectedIndex } from "./gradeMultipleChoice";
import type { MultipleChoicePart } from "./types";

/** Native <option> elements can't hold markup, so strip Markdown/LaTeX delimiters. */
export function toPlainText(md: string): string {
  return md
    .replace(/\$\$?([^$]*)\$\$?/g, "$1")
    .replace(/[*_`]/g, "")
    .trim();
}

export function MultipleChoiceInput(props: ElementInputProps<MultipleChoicePart>) {
  return (props.part.display ?? "radio") === "dropdown" ? <Dropdown {...props} /> : <RadioGroup {...props} />;
}

function RadioGroup({ part, id, labelId, describedBy, value, onChange, disabled, invalid }: ElementInputProps<MultipleChoicePart>) {
  const selected = selectedIndex(part, value);
  return (
    <div
      role="radiogroup"
      id={id}
      aria-labelledby={labelId}
      aria-describedby={describedBy}
      aria-invalid={invalid || undefined}
      className="flex basis-full flex-col gap-1.5"
    >
      {part.options.map((option, i) => {
        const optionId = `${id}-opt-${i}`;
        const checked = selected === i;
        return (
          <label
            key={optionId}
            htmlFor={optionId}
            className={`flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2 transition-colors ${
              checked
                ? "border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-950/50"
                : "border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800/60"
            } ${disabled ? "cursor-not-allowed opacity-80" : ""}`}
          >
            <input
              type="radio"
              id={optionId}
              name={id}
              value={i}
              checked={checked}
              disabled={disabled}
              onChange={() => onChange(i)}
              className="mt-1 h-4 w-4 shrink-0 accent-indigo-600"
            />
            <Markdown inline className="min-w-0 break-words">
              {option.text}
            </Markdown>
          </label>
        );
      })}
    </div>
  );
}

function Dropdown({ part, id, labelId, describedBy, value, onChange, disabled, invalid }: ElementInputProps<MultipleChoicePart>) {
  const selected = selectedIndex(part, value);
  return (
    <select
      id={id}
      aria-labelledby={labelId}
      aria-describedby={describedBy}
      aria-invalid={invalid || undefined}
      disabled={disabled}
      value={selected === null ? "" : String(selected)}
      onChange={(e) => {
        if (e.target.value !== "") onChange(Number(e.target.value));
      }}
      className={`max-w-full rounded-md border bg-white px-2 py-1.5 dark:bg-slate-900 ${
        invalid ? "border-red-500" : "border-slate-300 dark:border-slate-600"
      }`}
    >
      <option value="" disabled>
        Select…
      </option>
      {part.options.map((option, i) => (
        <option key={i} value={String(i)}>
          {toPlainText(option.text)}
        </option>
      ))}
    </select>
  );
}
