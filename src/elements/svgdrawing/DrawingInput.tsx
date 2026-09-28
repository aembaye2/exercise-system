import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { Button } from "../../components/ui";
import type { ElementInputProps } from "../../engine/registry";
import type { JsonValue } from "../../engine/types";
import { defaultObject, handlesOf, keyStep, moveHandle, readObjects, translate } from "./editing";
import { clipLineToBox, isStrictlyIncreasingX, pchipBeziers } from "./geometry";
import { describeObject, exampleDrawing, fmt, plotBox, resolveAxis, toolLabel } from "./gradeDrawing";
import type { DrawingPart, DrawnObject, InitialObject, Pt } from "./types";

// SVG user units; the SVG scales to the container width.
const W = 560;
const H = 400;
const M = { l: 58, r: 20, t: 16, b: 50 };
const PW = W - M.l - M.r;
const PH = H - M.t - M.b;

type Drag =
  | { obj: number; kind: "handle"; handle: number }
  | { obj: number; kind: "body"; start: Pt; orig: DrawnObject };

const INITIAL = "stroke-slate-700 dark:stroke-slate-300";
const STUDENT = "stroke-indigo-600 dark:stroke-indigo-400";
const CORRECT = "stroke-emerald-600 dark:stroke-emerald-400";

export function DrawingInput({
  part,
  id,
  labelId,
  describedBy,
  value,
  onChange,
  disabled,
  invalid,
  showCorrect,
}: ElementInputProps<DrawingPart>) {
  const xa = resolveAxis(part.x);
  const ya = resolveAxis(part.y);
  const box = plotBox(part);
  const sx = (x: number) => M.l + ((x - xa.min) / (xa.max - xa.min)) * PW;
  const sy = (y: number) => M.t + (1 - (y - ya.min) / (ya.max - ya.min)) * PH;
  const sp = (p: Pt): [number, number] => [sx(p[0]), sy(p[1])];

  const committed = useMemo(() => readObjects(part, value), [part, value]);
  const [live, setLive] = useState<DrawnObject[] | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [history, setHistory] = useState<DrawnObject[][]>([]);
  const drag = useRef<Drag | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const objects = live ?? committed;
  const example = useMemo(() => (showCorrect ? exampleDrawing(part) : []), [part, showCorrect]);
  const clipId = `${id}-clip`;

  // A new variant brings a new part: forget the old undo history.
  useEffect(() => {
    setHistory([]);
    setSelected(null);
  }, [id]);

  const commit = (next: DrawnObject[]) => {
    setHistory((h) => [...h.slice(-49), committed]);
    onChange(next as unknown as JsonValue);
  };

  const toData = (e: PointerEvent): Pt | null => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0 || rect.height === 0) return null;
    const vx = ((e.clientX - rect.left) * W) / rect.width;
    const vy = ((e.clientY - rect.top) * H) / rect.height;
    return [xa.min + ((vx - M.l) / PW) * (xa.max - xa.min), ya.min + (1 - (vy - M.t) / PH) * (ya.max - ya.min)];
  };

  const startDrag = (e: PointerEvent, d: Drag) => {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
    drag.current = d;
    setSelected(d.obj);
  };

  const onPointerMove = (e: PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const p = toData(e);
    if (!p) return;
    const base = live ?? committed;
    const obj = base[d.obj];
    if (!obj) return;
    const next =
      d.kind === "handle" ? moveHandle(part, obj, d.handle, p) : translate(part, d.orig, [p[0] - d.start[0], p[1] - d.start[1]]);
    setLive(base.map((o, i) => (i === d.obj ? next : o)));
  };

  const endDrag = () => {
    if (!drag.current) return;
    drag.current = null;
    if (live) commit(live);
    setLive(null);
  };

  const onHandleKey = (e: KeyboardEvent, objIndex: number, handle: number | "move") => {
    const obj = committed[objIndex];
    if (!obj || disabled) return;
    if (e.key === "Delete" || e.key === "Backspace") {
      e.preventDefault();
      commit(committed.filter((_, i) => i !== objIndex));
      setSelected(null);
      return;
    }
    const dir = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] }[e.key];
    if (!dir) return;
    e.preventDefault();
    const step = keyStep(part);
    const mult = e.shiftKey ? 5 : 1;
    const delta: Pt = [dir[0] * step.x * mult, dir[1] * step.y * mult];
    let next: DrawnObject;
    if (handle === "move") {
      next = translate(part, obj, delta);
    } else {
      const h = handlesOf(obj)[handle];
      next = moveHandle(part, obj, handle, [h[0] + delta[0], h[1] + delta[1]]);
    }
    if (next !== obj) commit(committed.map((o, i) => (i === objIndex ? next : o)));
  };

  const addObject = (toolIndex: number) => {
    const next = [...committed, defaultObject(part, toolIndex, committed)];
    commit(next);
    setSelected(next.length - 1);
  };

  const undo = () => {
    const prev = history[history.length - 1];
    if (!prev) return;
    setHistory((h) => h.slice(0, -1));
    onChange(prev as unknown as JsonValue);
    setSelected(null);
  };

  // ---------- rendering helpers ----------

  const linePath = (from: Pt, to: Pt, infinite: boolean): string | null => {
    const seg = infinite ? clipLineToBox(from, to, box) : [from, to];
    if (!seg) return null;
    const [a, b] = seg.map(sp);
    return `M${a[0]},${a[1]}L${b[0]},${b[1]}`;
  };

  const curvePath = (points: Pt[], smooth: boolean): string => {
    if (smooth && points.length >= 3 && isStrictlyIncreasingX(points)) {
      const segs = pchipBeziers(points);
      const start = sp(segs[0][0]);
      return `M${start[0]},${start[1]}` + segs.map(([, c1, c2, p]) => `C${sp(c1).join(",")} ${sp(c2).join(",")} ${sp(p).join(",")}`).join("");
    }
    return points.map((p, i) => `${i === 0 ? "M" : "L"}${sp(p).join(",")}`).join("");
  };

  const polygonPoints = (points: Pt[]) => points.map((p) => sp(p).join(",")).join(" ");

  /** Where to put a text tag: near the "far" end of a line/curve, or beside a point. */
  const tagAt = (obj: { type: string; from?: Pt; to?: Pt; points?: Pt[]; x?: number; y?: number }, infinite: boolean): [number, number] | null => {
    if (obj.type === "line" && obj.from && obj.to) {
      const seg = infinite ? clipLineToBox(obj.from, obj.to, box) : [obj.from, obj.to];
      if (!seg) return null;
      const [a, b] = seg;
      const end = infinite && (a[0] > b[0] || (a[0] === b[0] && a[1] > b[1])) ? a : b;
      const other = end === a ? b : a;
      return sp([other[0] + 0.93 * (end[0] - other[0]), other[1] + 0.93 * (end[1] - other[1])]);
    }
    if (obj.type === "curve" && obj.points) return sp(obj.points[obj.points.length - 1]);
    if (obj.type === "polygon" && obj.points) {
      const n = obj.points.length;
      return sp([obj.points.reduce((s, p) => s + p[0], 0) / n, obj.points.reduce((s, p) => s + p[1], 0) / n]);
    }
    if (obj.type === "point" && obj.x !== undefined && obj.y !== undefined) return sp([obj.x, obj.y]);
    return null;
  };

  const tag = (text: string | undefined, at: [number, number] | null, className: string, key: string, center = false): ReactNode => {
    if (!text || !at) return null;
    const x = Math.min(W - 4, Math.max(M.l + 4, center ? at[0] : at[0] + 7));
    const y = Math.min(H - M.b - 4, Math.max(M.t + 12, center ? at[1] + 4 : at[1] - 7));
    return (
      <text key={key} x={x} y={y} fontSize={13} textAnchor={center ? "middle" : "start"} className={className}>
        {text}
      </text>
    );
  };

  const renderInitial = (obj: InitialObject, i: number): ReactNode => {
    const key = `init-${i}`;
    const dash = "dashed" in obj && obj.dashed ? "6 4" : undefined;
    const label = "fill-slate-700 dark:fill-slate-200 font-medium";
    switch (obj.type) {
      case "line": {
        const d = linePath(obj.from, obj.to, false);
        return (
          <g key={key}>
            {d && <path d={d} strokeWidth={2.5} strokeDasharray={dash} fill="none" className={INITIAL} clipPath={`url(#${clipId})`} />}
            {tag(obj.label, tagAt(obj, false), label, `${key}-tag`)}
          </g>
        );
      }
      case "curve":
        return (
          <g key={key}>
            <path d={curvePath(obj.points, obj.points.length <= 8)} strokeWidth={2.5} strokeDasharray={dash} fill="none" className={INITIAL} clipPath={`url(#${clipId})`} />
            {tag(obj.label, tagAt(obj, false), label, `${key}-tag`)}
          </g>
        );
      case "polygon":
        return (
          <g key={key}>
            <polygon points={polygonPoints(obj.points)} className="fill-slate-400/25 stroke-slate-500" strokeWidth={1} />
            {tag(obj.label, tagAt(obj, false), label, `${key}-tag`, true)}
          </g>
        );
      case "point":
        return (
          <g key={key}>
            <circle cx={sx(obj.x)} cy={sy(obj.y)} r={5} className="fill-slate-700 dark:fill-slate-300" />
            {tag(obj.label, tagAt(obj, false), label, `${key}-tag`)}
          </g>
        );
    }
  };

  const renderShape = (obj: DrawnObject, cls: string, key: string, opts: { dashed?: boolean; bodyDrag?: (e: PointerEvent) => void; strong?: boolean }) => {
    const dash = opts.dashed ? "7 5" : undefined;
    const width = opts.strong ? 3.5 : 2.5;
    const grab = opts.bodyDrag ? { onPointerDown: opts.bodyDrag, style: { cursor: "move" } } : {};
    switch (obj.type) {
      case "line": {
        const d = linePath(obj.from, obj.to, true);
        if (!d) return null;
        return (
          <g key={key} clipPath={`url(#${clipId})`}>
            <path d={d} strokeWidth={width} strokeDasharray={dash} fill="none" className={cls} />
            {opts.bodyDrag && <path d={d} strokeWidth={16} stroke="transparent" fill="none" pointerEvents="stroke" {...grab} />}
          </g>
        );
      }
      case "curve": {
        const d = curvePath(obj.points, true);
        return (
          <g key={key} clipPath={`url(#${clipId})`}>
            <path d={d} strokeWidth={width} strokeDasharray={dash} fill="none" className={cls} />
            {opts.bodyDrag && <path d={d} strokeWidth={16} stroke="transparent" fill="none" pointerEvents="stroke" {...grab} />}
          </g>
        );
      }
      case "polygon":
        return (
          <polygon
            key={key}
            points={polygonPoints(obj.points)}
            strokeWidth={opts.strong ? 2.5 : 1.5}
            strokeDasharray={dash}
            className={`${cls} ${cls === CORRECT ? "fill-emerald-500/20" : "fill-indigo-500/25"}`}
            {...grab}
          />
        );
      case "point":
        return (
          <circle
            key={key}
            cx={sx(obj.x)}
            cy={sy(obj.y)}
            r={6}
            strokeWidth={2}
            className={`${cls} ${cls === CORRECT ? "fill-emerald-500/40" : "fill-indigo-600 dark:fill-indigo-400"}`}
          />
        );
    }
  };

  const handleLabel = (obj: DrawnObject, h: number) => {
    const name = toolLabel(part.tools[obj.tool]);
    const p = handlesOf(obj)[h];
    const which = obj.type === "point" ? name : `${name}, handle ${h + 1} of ${handlesOf(obj).length}`;
    return `${which} at (${fmt(p[0])}, ${fmt(p[1])}). Arrow keys move it; Delete removes the ${name}.`;
  };

  const renderHandles = (obj: DrawnObject, oi: number): ReactNode => {
    const pts = handlesOf(obj);
    const handles = pts.map((p, h) => {
      const key = `h-${oi}-${h}`;
      const [cx, cy] = sp(p);
      return (
        <g key={key}>
          {focused === key && <circle cx={cx} cy={cy} r={12} fill="none" strokeWidth={2} className="stroke-amber-500" />}
          <circle
            cx={cx}
            cy={cy}
            r={obj.type === "point" ? 7 : 6}
            strokeWidth={2}
            className={`${STUDENT} ${obj.type === "point" ? "fill-indigo-600 dark:fill-indigo-400" : "fill-white dark:fill-slate-900"}`}
            pointerEvents="none"
          />
          {/* Larger invisible target for fingers; this is the focusable control. */}
          <circle
            cx={cx}
            cy={cy}
            r={14}
            fill="transparent"
            tabIndex={0}
            role="button"
            aria-roledescription="draggable handle"
            aria-label={handleLabel(obj, h)}
            style={{ cursor: "grab", outline: "none" }}
            onPointerDown={(e) => startDrag(e, { obj: oi, kind: "handle", handle: h })}
            onKeyDown={(e) => onHandleKey(e, oi, h)}
            onFocus={() => {
              setFocused(key);
              setSelected(oi);
            }}
            onBlur={() => setFocused((f) => (f === key ? null : f))}
          />
        </g>
      );
    });
    if (obj.type === "line") {
      // Square handle: moves the whole line without turning it (for shifts).
      const key = `h-${oi}-move`;
      const [cx, cy] = sp([(obj.from[0] + obj.to[0]) / 2, (obj.from[1] + obj.to[1]) / 2]);
      const name = toolLabel(part.tools[obj.tool]);
      handles.push(
        <g key={key}>
          {focused === key && <rect x={cx - 12} y={cy - 12} width={24} height={24} fill="none" strokeWidth={2} className="stroke-amber-500" />}
          <rect x={cx - 6} y={cy - 6} width={12} height={12} strokeWidth={2} className={`${STUDENT} fill-white dark:fill-slate-900`} pointerEvents="none" />
          <rect
            x={cx - 14}
            y={cy - 14}
            width={28}
            height={28}
            fill="transparent"
            tabIndex={0}
            role="button"
            aria-roledescription="draggable handle"
            aria-label={`Move the whole ${name} without turning it. Arrow keys move it; Delete removes it.`}
            style={{ cursor: "move", outline: "none" }}
            onPointerDown={(e) => {
              const p = toData(e);
              if (p) startDrag(e, { obj: oi, kind: "body", start: p, orig: obj });
            }}
            onKeyDown={(e) => onHandleKey(e, oi, "move")}
            onFocus={() => {
              setFocused(key);
              setSelected(oi);
            }}
            onBlur={() => setFocused((f) => (f === key ? null : f))}
          />
        </g>,
      );
    }
    return handles;
  };

  // ---------- grid and axes ----------

  const ticks = (min: number, max: number, step: number) => {
    const out: number[] = [];
    for (let k = 0; min + k * step <= max + step * 1e-9; k++) out.push(Number((min + k * step).toPrecision(12)));
    return out;
  };
  const xTicks = ticks(xa.min, xa.max, xa.step);
  const yTicks = ticks(ya.min, ya.max, ya.step);
  const counts = part.tools.map((_, i) => objects.filter((o) => o.tool === i).length);

  return (
    <div id={id} role="group" aria-labelledby={labelId} aria-describedby={describedBy} className="basis-full space-y-2">
      {!disabled && (
        <div role="toolbar" aria-label="Drawing tools" className="flex flex-wrap gap-2">
          {part.tools.map((tool, i) => (
            <Button key={i} onClick={() => addObject(i)} disabled={counts[i] >= (tool.max ?? 1)}>
              <span aria-hidden="true">+</span> Add {toolLabel(tool)}
            </Button>
          ))}
          <Button
            onClick={() => {
              if (selected === null) return;
              commit(committed.filter((_, i) => i !== selected));
              setSelected(null);
            }}
            disabled={selected === null || !committed[selected]}
          >
            Delete selected
          </Button>
          <Button onClick={undo} disabled={history.length === 0}>
            Undo
          </Button>
          <Button
            onClick={() => {
              commit([]);
              setSelected(null);
            }}
            disabled={committed.length === 0}
          >
            Clear
          </Button>
        </div>
      )}

      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className={`h-auto w-full max-w-2xl select-none rounded-lg border bg-white dark:bg-slate-950 ${
          invalid ? "border-red-500 dark:border-red-400" : "border-slate-200 dark:border-slate-800"
        }`}
        style={{ touchAction: disabled ? "auto" : "none" }}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerDown={() => setSelected(null)}
      >
        <defs>
          <clipPath id={clipId}>
            <rect x={M.l} y={M.t} width={PW} height={PH} />
          </clipPath>
        </defs>

        {/* Grid, axes, fixed objects and the correct answer are decorative: the text equivalent is below. */}
        <g aria-hidden="true">
        {xTicks.map((x) => (
          <g key={`xt-${x}`}>
            <line x1={sx(x)} x2={sx(x)} y1={M.t} y2={M.t + PH} className="stroke-slate-200 dark:stroke-slate-800" strokeWidth={1} />
            <text x={sx(x)} y={M.t + PH + 18} fontSize={12} textAnchor="middle" className="fill-slate-500 dark:fill-slate-400">
              {fmt(x)}
            </text>
          </g>
        ))}
        {yTicks.map((y) => (
          <g key={`yt-${y}`}>
            <line x1={M.l} x2={M.l + PW} y1={sy(y)} y2={sy(y)} className="stroke-slate-200 dark:stroke-slate-800" strokeWidth={1} />
            <text x={M.l - 8} y={sy(y) + 4} fontSize={12} textAnchor="end" className="fill-slate-500 dark:fill-slate-400">
              {fmt(y)}
            </text>
          </g>
        ))}
        <line x1={M.l} x2={M.l + PW} y1={M.t + PH} y2={M.t + PH} strokeWidth={1.5} className="stroke-slate-500" />
        <line x1={M.l} x2={M.l} y1={M.t} y2={M.t + PH} strokeWidth={1.5} className="stroke-slate-500" />
        {xa.label && (
          <text x={M.l + PW / 2} y={H - 10} fontSize={13} textAnchor="middle" className="fill-slate-700 dark:fill-slate-300">
            {xa.label}
          </text>
        )}
        {ya.label && (
          <text
            x={14}
            y={M.t + PH / 2}
            fontSize={13}
            textAnchor="middle"
            transform={`rotate(-90 14 ${M.t + PH / 2})`}
            className="fill-slate-700 dark:fill-slate-300"
          >
            {ya.label}
          </text>
        )}

        {(part.initial ?? []).map(renderInitial)}

        {/* The correct answer, faded, under the student's drawing. */}
        {example.map((obj, i) => renderShape(obj, `${CORRECT} opacity-80`, `ex-${i}`, { dashed: true }))}
        </g>

        {objects.map((obj, i) => (
          <g key={`obj-${i}`}>
            <g aria-hidden="true">
            {renderShape(obj, STUDENT, `shape-${i}`, {
              strong: selected === i && !disabled,
              bodyDrag:
                disabled || obj.type === "point"
                  ? undefined
                  : (e) => {
                      const p = toData(e);
                      if (p) startDrag(e, { obj: i, kind: "body", start: p, orig: obj });
                    },
            })}
            {tag(part.tools[obj.tool]?.tag, tagAt(obj, true), "fill-indigo-700 dark:fill-indigo-300 font-semibold", `tag-${i}`, obj.type === "polygon")}
            </g>
            {!disabled && renderHandles(obj, i)}
          </g>
        ))}
      </svg>

      {/* Text equivalent of the graph for screen readers. */}
      <div className="sr-only">
        {(part.initial ?? []).length > 0 && (
          <p>
            The graph shows:{" "}
            {(part.initial ?? [])
              .map((o) => `${o.label ?? o.type}${o.type === "line" ? ` from (${fmt(o.from[0])}, ${fmt(o.from[1])}) to (${fmt(o.to[0])}, ${fmt(o.to[1])})` : ""}`)
              .join("; ")}
            .
          </p>
        )}
        <p>{objects.length === 0 ? "You haven't drawn anything yet." : `Your drawing: ${objects.map((o) => describeObject(part, o)).join("; ")}.`}</p>
      </div>

      {showCorrect && (
        <p className="text-xs text-slate-600 dark:text-slate-400">
          <span className="font-semibold text-emerald-700 dark:text-emerald-300">Green dashed</span>: a correct answer.{" "}
          <span className="font-semibold text-indigo-700 dark:text-indigo-300">Blue</span>: your drawing.
        </p>
      )}
    </div>
  );
}
