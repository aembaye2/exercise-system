import { Fragment, useState } from "react";
import { ArrowDown, ArrowRight, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, GripVertical } from "lucide-react";
import { Markdown } from "../../components/Markdown";
import type { ElementInputProps } from "../../engine/registry";
import type { JsonValue } from "../../engine/types";
import { arrangementOf } from "./gradeOrdering";
import type { OrderingPart } from "./types";

export function OrderingInput({ part, id, labelId, describedBy, value, onChange, disabled, invalid, showCorrect }: ElementInputProps<OrderingPart>) {
  const arrangement = arrangementOf(part, value);
  const [dragPosition, setDragPosition] = useState<number | null>(null);
  const horizontal = part.layout === "horizontal";
  const showArrows = part.showArrows !== false;

  const move = (from: number, to: number) => {
    if (disabled || to < 0 || to >= arrangement.length || from === to) return;
    const next = [...arrangement];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next as unknown as JsonValue);
  };

  return (
    <div
      id={id}
      role="list"
      aria-labelledby={labelId}
      aria-describedby={describedBy}
      aria-invalid={invalid || undefined}
      className={`flex basis-full items-center gap-2 ${horizontal ? "flex-row flex-wrap" : "flex-col items-stretch"}`}
    >
      {arrangement.map((itemIndex, position) => {
        const correct = itemIndex === position;
        return (
          <Fragment key={itemIndex}>
            <div
              role="listitem"
              draggable={!disabled}
              onDragStart={() => setDragPosition(position)}
              onDragOver={(e) => {
                if (dragPosition !== null) e.preventDefault();
              }}
              onDrop={(e) => {
                e.preventDefault();
                if (dragPosition !== null) move(dragPosition, position);
                setDragPosition(null);
              }}
              onDragEnd={() => setDragPosition(null)}
              className={`flex flex-wrap items-center gap-2 rounded-lg border px-3 py-2 ${
                disabled ? "opacity-80" : "cursor-grab active:cursor-grabbing"
              } ${
                showCorrect
                  ? correct
                    ? "border-emerald-600 dark:border-emerald-400"
                    : "border-red-500 dark:border-red-400"
                  : "border-slate-300 dark:border-slate-700"
              }`}
            >
              <GripVertical className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
              <span className="w-5 shrink-0 font-semibold text-slate-500 dark:text-slate-400">{position + 1}.</span>
              <Markdown inline className="min-w-0 break-words">
                {part.items[itemIndex]}
              </Markdown>
              <div className={`flex shrink-0 ${horizontal ? "flex-row" : "flex-col"}`}>
                <button
                  type="button"
                  disabled={disabled || position === 0}
                  onClick={() => move(position, position - 1)}
                  aria-label={`Move box ${position + 1} ${horizontal ? "left" : "up"}`}
                  className="rounded text-slate-500 hover:text-slate-900 disabled:opacity-30 dark:text-slate-400 dark:hover:text-slate-100"
                >
                  {horizontal ? <ChevronLeft className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
                </button>
                <button
                  type="button"
                  disabled={disabled || position === arrangement.length - 1}
                  onClick={() => move(position, position + 1)}
                  aria-label={`Move box ${position + 1} ${horizontal ? "right" : "down"}`}
                  className="rounded text-slate-500 hover:text-slate-900 disabled:opacity-30 dark:text-slate-400 dark:hover:text-slate-100"
                >
                  {horizontal ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                </button>
              </div>
              {showCorrect && !correct && (
                <div className="basis-full text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                  <span className="sr-only">Correct item for position {position + 1}: </span>
                  {part.items[position]}
                </div>
              )}
            </div>
            {showArrows && position < arrangement.length - 1 && (
              <span aria-hidden="true" className="shrink-0 text-slate-400 dark:text-slate-600">
                {horizontal ? <ArrowRight className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
              </span>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
