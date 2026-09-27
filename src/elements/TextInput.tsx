import type { ElementInputProps } from "../engine/registry";
import type { Part } from "../engine/types";

/** Shared single-line text box used by the number and integer elements. */
export function TextInput<P extends Part>({
  id,
  labelId,
  describedBy,
  value,
  onChange,
  disabled,
  invalid,
  inputMode,
  placeholder,
}: ElementInputProps<P> & { inputMode: "decimal" | "numeric" | "text"; placeholder?: string }) {
  return (
    <input
      type="text"
      id={id}
      inputMode={inputMode}
      autoComplete="off"
      spellCheck={false}
      aria-labelledby={labelId}
      aria-describedby={describedBy}
      aria-invalid={invalid || undefined}
      disabled={disabled}
      placeholder={placeholder}
      value={typeof value === "string" ? value : ""}
      onChange={(e) => onChange(e.target.value)}
      className={`w-40 max-w-full rounded-md border bg-white px-2 py-1.5 font-mono dark:bg-slate-900 ${
        invalid ? "border-red-500 dark:border-red-400" : "border-slate-300 dark:border-slate-600"
      } disabled:opacity-80`}
    />
  );
}
