import { Markdown } from "../../components/Markdown";
import type { ElementInputProps } from "../../engine/registry";
import type { JsonValue } from "../../engine/types";
import { answersOf } from "./gradeTrueFalse";
import type { TrueFalsePart } from "./types";

const border = "border border-slate-300 dark:border-slate-700";

export function TrueFalseInput({ part, id, labelId, describedBy, value, onChange, disabled, invalid, showCorrect }: ElementInputProps<TrueFalsePart>) {
  const answers = answersOf(part, value);

  const setAnswer = (row: number, answer: boolean) => {
    const next = [...answers];
    next[row] = answer;
    onChange(next as JsonValue);
  };

  return (
    <div className="basis-full overflow-x-auto">
      <table
        id={id}
        aria-labelledby={labelId}
        aria-describedby={describedBy}
        aria-invalid={invalid || undefined}
        className="w-full border-collapse text-sm"
      >
        <thead>
          <tr>
            <th scope="col" className={`${border} px-2 py-1 text-left`}>
              <span className="sr-only">Statement</span>
            </th>
            <th scope="col" className={`${border} w-16 px-3 py-1 text-center font-medium`}>
              True
            </th>
            <th scope="col" className={`${border} w-16 px-3 py-1 text-center font-medium`}>
              False
            </th>
          </tr>
        </thead>
        <tbody>
          {part.statements.map((statement, row) => {
            const answer = answers[row];
            const correct = answer === statement.correct;
            const rowFlagged = invalid && answer === null;
            return (
              <tr key={row} className={row % 2 === 1 ? "bg-slate-50 dark:bg-slate-900/40" : undefined}>
                <td
                  className={`${border} px-3 py-2 align-top ${rowFlagged ? "border-red-500 dark:border-red-400" : ""}`}
                >
                  <Markdown inline className="break-words">
                    {statement.text}
                  </Markdown>
                  {showCorrect && !correct && (
                    <div className="mt-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                      <span className="sr-only">Correct answer: </span>
                      Correct: {statement.correct ? "True" : "False"}
                    </div>
                  )}
                </td>
                {([true, false] as const).map((option) => {
                  const isCorrectOption = showCorrect && option === statement.correct;
                  const isWrongPick = showCorrect && option === answer && !correct;
                  return (
                    <td
                      key={String(option)}
                      className={`${border} px-3 py-2 text-center ${
                        isCorrectOption
                          ? "bg-emerald-50 dark:bg-emerald-950/30"
                          : isWrongPick
                            ? "bg-red-50 dark:bg-red-950/30"
                            : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name={`${id}-${row}`}
                        aria-label={`Statement ${row + 1}: ${option ? "True" : "False"}`}
                        checked={answer === option}
                        disabled={disabled}
                        onChange={() => setAnswer(row, option)}
                        className="h-4 w-4 accent-indigo-600"
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
