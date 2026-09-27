import { Markdown } from "../../components/Markdown";
import type { ElementInputProps } from "../../engine/registry";
import { cellKey, cellName, formatCell, isBlank, isCellCorrect } from "./gradeTable";
import type { TablePart, TableValue } from "./types";

const border = "border border-slate-300 dark:border-slate-700";
const headerCell = `${border} bg-slate-100 px-2 py-1 font-medium dark:bg-slate-800`;

export function TableInput({ part, id, labelId, describedBy, value, onChange, disabled, invalid, showCorrect }: ElementInputProps<TablePart>) {
  const current: TableValue = typeof value === "object" && value !== null && !Array.isArray(value) ? (value as TableValue) : {};
  const width = part.columns.length + 1;
  const groups = part.columnGroups;

  const setCell = (key: string, text: string) => onChange({ ...current, [key]: text });

  return (
    <div className="basis-full overflow-x-auto">
      <table id={id} aria-labelledby={labelId} aria-describedby={describedBy} className="border-collapse text-sm">
        <thead>
          {groups && (
            <tr>
              <th rowSpan={2} scope="col" className={`${headerCell} text-left`}>
                {part.corner && <Markdown inline>{part.corner}</Markdown>}
              </th>
              {groups.map((g, i) => (
                <th key={i} colSpan={g.span} scope="colgroup" className={`${headerCell} text-center font-semibold`}>
                  <Markdown inline>{g.label}</Markdown>
                </th>
              ))}
            </tr>
          )}
          <tr>
            {!groups && (
              <th scope="col" className={`${headerCell} text-left`}>
                {part.corner && <Markdown inline>{part.corner}</Markdown>}
              </th>
            )}
            {part.columns.map((c, i) => (
              <th key={i} scope="col" className={`${headerCell} text-center`}>
                <Markdown inline>{c}</Markdown>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {part.rows.map((r, row) =>
            r.cells ? (
              <tr key={row}>
                <th scope="row" className={`${border} px-2 py-1 text-left font-normal`}>
                  <Markdown inline>{r.label}</Markdown>
                </th>
                {r.cells.map((cell, col) => {
                  if (!isBlank(cell)) {
                    return (
                      <td key={col} className={`${border} px-2 py-1 text-center`}>
                        {cell === null ? "" : <Markdown inline>{String(cell)}</Markdown>}
                      </td>
                    );
                  }
                  const key = cellKey(row, col);
                  const raw = current[key] ?? "";
                  const empty = raw.trim() === "";
                  const right = showCorrect && isCellCorrect(cell, raw);
                  const wrong = showCorrect && !right;
                  const flagged = wrong || (invalid && empty);
                  return (
                    <td key={col} className={`${border} p-1 text-center`}>
                      <input
                        type="text"
                        id={`${id}-${row}-${col}`}
                        inputMode="decimal"
                        autoComplete="off"
                        spellCheck={false}
                        aria-label={cellName(part, row, col)}
                        aria-invalid={flagged || undefined}
                        disabled={disabled}
                        value={raw}
                        onChange={(e) => setCell(key, e.target.value)}
                        className={`w-20 rounded border bg-white px-1.5 py-1 text-center font-mono dark:bg-slate-900 ${
                          right
                            ? "border-emerald-600 dark:border-emerald-400"
                            : flagged
                              ? "border-red-500 dark:border-red-400"
                              : "border-slate-300 dark:border-slate-600"
                        } disabled:opacity-80`}
                      />
                      {wrong && (
                        <div className="mt-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                          <span className="sr-only">Correct answer: </span>
                          {formatCell(cell)}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ) : (
              <tr key={row}>
                <th colSpan={width} scope="colgroup" className={`${border} bg-slate-50 px-2 py-1 text-left font-semibold dark:bg-slate-900/60`}>
                  <Markdown inline>{r.label}</Markdown>
                </th>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}
