import { useState, type ReactNode } from "react";
import { ChevronDown, ChevronUp, GripVertical } from "lucide-react";
import { Markdown } from "../../components/Markdown";
import type { ElementInputProps } from "../../engine/registry";
import type { JsonValue } from "../../engine/types";
import { arrangementOf } from "./gradeMatching";
import type { MatchingPart } from "./types";

/** a, b, c, ... for the right column's current row order. */
function letterFor(row: number): string {
  return String.fromCharCode(97 + row);
}

const rowBase = "flex flex-wrap items-center gap-2 rounded-lg border px-3 py-2";

export function MatchingInput({ part, id, labelId, describedBy, value, onChange, disabled, invalid, showCorrect }: ElementInputProps<MatchingPart>) {
  const arrangement = arrangementOf(part, value);
  const [dragRow, setDragRow] = useState<number | null>(null);

  const move = (from: number, to: number) => {
    if (disabled || to < 0 || to >= arrangement.length || from === to) return;
    const next = [...arrangement];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next as unknown as JsonValue);
  };

  // One flat, interleaved list (left row, right row, left row, right row, ...) inside a single
  // 2-column grid, so each pair of boxes shares a grid row and CSS stretches both to the same
  // height automatically - no JS measuring needed. Left boxes key off their fixed row (their
  // content never moves); right boxes key off the pair they hold, so the dragged box keeps its
  // own DOM node as it moves between rows.
  const cells: ReactNode[] = [];
  part.pairs.forEach((leftPair, row) => {
    cells.push(
      <li key={`left-${row}`} className={`${rowBase} border-slate-300 dark:border-slate-700`}>
        <span className="w-5 shrink-0 font-semibold text-slate-500 dark:text-slate-400">{row + 1}.</span>
        <Markdown inline className="min-w-0 break-words">
          {leftPair.left}
        </Markdown>
      </li>,
    );

    const pairIndex = arrangement[row];
    const rightPair = part.pairs[pairIndex];
    const correct = pairIndex === row;
    cells.push(
      <li
        key={`right-${pairIndex}`}
        draggable={!disabled}
        onDragStart={() => setDragRow(row)}
        onDragOver={(e) => {
          if (dragRow !== null) e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          if (dragRow !== null) move(dragRow, row);
          setDragRow(null);
        }}
        onDragEnd={() => setDragRow(null)}
        className={`${rowBase} ${disabled ? "opacity-80" : "cursor-grab active:cursor-grabbing"} ${
          showCorrect
            ? correct
              ? "border-emerald-600 dark:border-emerald-400"
              : "border-red-500 dark:border-red-400"
            : "border-slate-300 dark:border-slate-700"
        }`}
      >
        <GripVertical className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
        <span className="w-5 shrink-0 font-semibold text-slate-500 dark:text-slate-400">{letterFor(row)}.</span>
        <Markdown inline className="min-w-0 flex-1 break-words">
          {rightPair.right}
        </Markdown>
        <div className="flex shrink-0 flex-col">
          <button
            type="button"
            disabled={disabled || row === 0}
            onClick={() => move(row, row - 1)}
            aria-label={`Move item ${letterFor(row)} up`}
            className="rounded text-slate-500 hover:text-slate-900 disabled:opacity-30 dark:text-slate-400 dark:hover:text-slate-100"
          >
            <ChevronUp className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            disabled={disabled || row === arrangement.length - 1}
            onClick={() => move(row, row + 1)}
            aria-label={`Move item ${letterFor(row)} down`}
            className="rounded text-slate-500 hover:text-slate-900 disabled:opacity-30 dark:text-slate-400 dark:hover:text-slate-100"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
        {showCorrect && !correct && (
          <div className="basis-full text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            <span className="sr-only">Correct match for item {row + 1}: </span>
            {part.pairs[row].right}
          </div>
        )}
      </li>,
    );
  });

  return (
    <ol
      id={id}
      role="list"
      aria-labelledby={labelId}
      aria-describedby={describedBy}
      aria-invalid={invalid || undefined}
      className="grid basis-full grid-cols-1 items-stretch gap-x-4 gap-y-1.5 sm:grid-cols-2"
    >
      {cells}
    </ol>
  );
}
