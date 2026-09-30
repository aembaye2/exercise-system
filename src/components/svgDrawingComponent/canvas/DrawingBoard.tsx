import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";

// Ported from svg-drawing-library/src/canvas/DrawingBoard.tsx (plain SVG, no
// JSXGraph dependency): same tool set and board data shape as
// src/components/jsxgraphComponent, just rendered as hand-written SVG.
export type ToolName =
  | "select"
  | "point"
  | "line"
  | "arrow"
  | "doubleArrow"
  | "segment"
  | "rectangle"
  | "circle"
  | "polygon"
  | "scatter"
  | "curve"
  | "text"
  | "coordinate"
  | "eraser";

export type Point2D = [number, number];

/** [xMin, xMax, yMin, yMax] */
export type BoundingBox = [xMin: number, xMax: number, yMin: number, yMax: number];

/** A shape that should already be present on the board when it is created. */
export interface InitialObjectSpec {
  type: Exclude<ToolName, "select" | "eraser" | "coordinate">;
  points: Point2D[];
  radius?: number;
  text?: string;
  /** Only used for `type: "scatter"`: also connect the last point back to the first. */
  closed?: boolean;
  color?: string;
}

/** One shape the user drew, as reported by `DrawingBoardHandle.getUserDrawings()`. */
export interface UserDrawing {
  tool: ToolName;
  points: Point2D[];
  color: string;
  text?: string;
  radius?: number;
  closed?: boolean;
}

export interface DrawingBoardHandle {
  undo: () => void;
  redo: () => void;
  clear: () => void;
  /** Every shape the user has drawn so far (excludes `initialObjects`). */
  getUserDrawings: () => UserDrawing[];
  /** Saves the current board as a PNG file. */
  downloadImage: (filename?: string) => Promise<void>;
}

export interface DrawingBoardProps {
  boundingBox?: BoundingBox;
  xLabel?: string;
  yLabel?: string;
  initialObjects?: InitialObjectSpec[];
  /** Shapes to put back on the board as the student's own drawings (draggable,
   * erasable, undoable), e.g. an answer restored from saved progress. Read only
   * when the board is (re)built. */
  initialDrawings?: UserDrawing[];
  activeTool: ToolName;
  color: string;
  showNavigation?: boolean;
  /** Bump this (e.g. on every toolbar click) to reset any in-progress shape. */
  toolActivationSeq?: number;
  onHistoryChange?: (state: { canUndo: boolean; canRedo: boolean }) => void;
  /** Called whenever the set of user drawings changes: a shape is drawn,
   * undone, redone, erased, cleared, or dragged to a new position. */
  onDrawingsChange?: () => void;
  /** Reference shapes drawn dashed on top of the board (e.g. the suggested
   * answer). They aren't user drawings: not graded, erasable, or undoable. */
  overlayObjects?: InitialObjectSpec[];
  overlayColor?: string;
}

interface Draft {
  tool: ToolName;
  points: Point2D[];
  color: string;
  closed?: boolean;
}

const CLICK_PX = 12;

const round = (n: number) => Math.round(n * 100) / 100;

function dist(a: Point2D, b: Point2D) {
  return Math.hypot(a[0] - b[0], a[1] - b[1]);
}

/** Catmull-Rom spline through `points`, as an SVG path. */
function curvePath(points: Point2D[]): string {
  if (points.length < 2) return "";
  if (points.length === 2) return `M ${points[0].join(" ")} L ${points[1].join(" ")}`;
  let out = `M ${points[0].join(" ")}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    out +=
      ` C ${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6}, ` +
      `${p2[0] - (p3[0] - p1[0]) / 6} ${p2[1] - (p3[1] - p1[1]) / 6}, ${p2.join(" ")}`;
  }
  return out;
}

/** Renders one shape: a student drawing, an initial object, an overlay, or the in-progress draft. */
function Shape({
  spec,
  index,
  interactive = false,
  dashed = false,
  onDown,
}: {
  spec: InitialObjectSpec | UserDrawing;
  index?: number;
  interactive?: boolean;
  dashed?: boolean;
  onDown?: (e: ReactPointerEvent) => void;
}) {
  const type = "tool" in spec ? spec.tool : spec.type;
  const p = spec.points;
  const color = spec.color ?? "#111827";
  const common = {
    stroke: color,
    strokeWidth: 2,
    vectorEffect: "non-scaling-stroke" as const,
    fill: "none",
    strokeDasharray: dashed ? "7 5" : undefined,
  };
  const hit = { onPointerDown: onDown, "data-shape-index": index, style: { cursor: interactive ? "pointer" : "default" } };
  const dots = (visible = true) =>
    p.map((q, i) => (
      <circle key={i} cx={q[0]} cy={q[1]} r={visible ? 0.12 : 0.001} fill={color} stroke="white" strokeWidth={0.03} vectorEffect="non-scaling-stroke" />
    ));

  let body: ReactNode = null;
  if (type === "point") {
    body = <circle cx={p[0]?.[0]} cy={p[0]?.[1]} r={0.08} fill={color} />;
  } else if (type === "text") {
    body = (
      <text transform={`translate(${p[0]?.[0]} ${p[0]?.[1]}) scale(1 -1)`} fill={color} stroke="none" fontSize={0.42} style={{ userSelect: "none" }}>
        {spec.text ?? "Text"}
      </text>
    );
  } else if (type === "coordinate") {
    body = (
      <>
        <line x1={p[0][0]} y1={0} x2={p[0][0]} y2={p[0][1]} {...common} strokeDasharray="5 4" />
        <line x1={0} y1={p[0][1]} x2={p[0][0]} y2={p[0][1]} {...common} strokeDasharray="5 4" />
        <circle cx={p[0][0]} cy={p[0][1]} r={0.09} fill={color} />
        <text transform={`translate(${p[0][0] + 0.2} ${p[0][1] + 0.35}) scale(1 -1)`} fill={color} stroke="none" fontSize={0.34}>
          ({round(p[0][0])}, {round(p[0][1])})
        </text>
      </>
    );
  } else if (type === "circle") {
    const r = spec.radius ?? dist(p[0], p[1] ?? p[0]);
    body = (
      <>
        <circle cx={p[0][0]} cy={p[0][1]} r={r} {...common} fill={color} fillOpacity={0.12} />
        {dots()}
      </>
    );
  } else if (type === "rectangle") {
    const [a, b] = [p[0], p[1]];
    body = (
      <>
        <rect
          x={Math.min(a[0], b[0])}
          y={Math.min(a[1], b[1])}
          width={Math.abs(a[0] - b[0])}
          height={Math.abs(a[1] - b[1])}
          {...common}
          fill={color}
          fillOpacity={0.12}
        />
        {dots()}
      </>
    );
  } else if (type === "polygon") {
    body = (
      <>
        <polygon points={p.map((x) => x.join(",")).join(" ")} {...common} fill={color} fillOpacity={0.12} />
        {dots()}
      </>
    );
  } else if (type === "scatter") {
    body = (
      <>
        <polyline points={(spec.closed ? [...p, p[0]] : p).map((x) => x.join(",")).join(" ")} {...common} fill="none" />
        {dots()}
      </>
    );
  } else if (type === "curve") {
    body = (
      <>
        <path d={curvePath(p)} {...common} />
        {dots()}
      </>
    );
  } else if ((type === "line" || type === "segment" || type === "arrow" || type === "doubleArrow") && p.length > 1) {
    const markers =
      type === "arrow" ? { markerEnd: "url(#arrow)" } : type === "doubleArrow" ? { markerStart: "url(#arrow-start)", markerEnd: "url(#arrow)" } : {};
    const a: Point2D = type === "line" ? [p[0][0] - (p[1][0] - p[0][0]) * 1000, p[0][1] - (p[1][1] - p[0][1]) * 1000] : p[0];
    const b: Point2D = type === "line" ? [p[1][0] + (p[1][0] - p[0][0]) * 1000, p[1][1] + (p[1][1] - p[0][1]) * 1000] : p[1];
    body = (
      <>
        <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} {...common} {...markers} />
        {dots(type === "line" || type === "segment")}
      </>
    );
  }

  return (
    <g {...hit} className="svg-shape">
      {body}
      {interactive && (
        <g className="shape-hit" stroke="transparent" strokeWidth={14} vectorEffect="non-scaling-stroke" fill="transparent">
          {body}
        </g>
      )}
    </g>
  );
}

const DrawingBoard = forwardRef<DrawingBoardHandle, DrawingBoardProps>(function DrawingBoard(
  {
    boundingBox = [-10, 10, -10, 10],
    xLabel = "x",
    yLabel = "y",
    initialObjects = [],
    initialDrawings,
    activeTool,
    color,
    showNavigation = false,
    toolActivationSeq = 0,
    onHistoryChange,
    onDrawingsChange,
    overlayObjects = [],
    overlayColor = "#16a34a",
  },
  ref
) {
  const svgRef = useRef<SVGSVGElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const startRef = useRef<Point2D | null>(null);
  const dragRef = useRef<{ index: number; last: Point2D } | null>(null);
  const panRef = useRef<{ client: Point2D; box: BoundingBox } | null>(null);
  const textClosingRef = useRef(false);

  // Put back the student's saved drawings, so they count as normal drawn
  // shapes (draggable, erasable, undoable). The parent remounts this
  // component (via `key`) when they should change, so a lazy initializer is
  // enough - no need to watch the prop after mount.
  const [history, setHistory] = useState<UserDrawing[]>(() => initialDrawings ?? []);
  const [redoStack, setRedoStack] = useState<UserDrawing[]>([]);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [hover, setHover] = useState<Point2D | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [textAt, setTextAt] = useState<Point2D | null>(null);
  const [textValue, setTextValue] = useState("");
  const [view, setView] = useState<BoundingBox>(boundingBox);

  const [xMin, xMax, yMin, yMax] = view;
  const vw = xMax - xMin;
  const vh = yMax - yMin;
  const padX = vw * 0.04;
  const padY = vh * 0.04;
  const displayXMin = xMin - padX;
  const displayXMax = xMax + padX;
  const displayYMin = yMin - padY;
  const displayYMax = yMax + padY;
  const displayW = displayXMax - displayXMin;
  const displayH = displayYMax - displayYMin;

  const latest = useRef(history);
  latest.current = history;
  const historyCallback = useRef(onHistoryChange);
  const drawingsCallback = useRef(onDrawingsChange);
  historyCallback.current = onHistoryChange;
  drawingsCallback.current = onDrawingsChange;

  useEffect(() => {
    historyCallback.current?.({ canUndo: history.length > 0, canRedo: redoStack.length > 0 });
    drawingsCallback.current?.();
  }, [history, redoStack]);

  useEffect(() => {
    setDraft(null);
    setHint(null);
    setTextAt(null);
    startRef.current = null;
  }, [activeTool, toolActivationSeq]);

  useEffect(() => {
    if (textAt) inputRef.current?.focus();
  }, [textAt]);

  useEffect(() => setView(boundingBox), [boundingBox.join(",")]);

  const coords = (e: ReactPointerEvent | PointerEvent): Point2D => {
    const r = svgRef.current!.getBoundingClientRect();
    return [displayXMin + ((e.clientX - r.left) / r.width) * displayW, displayYMax - ((e.clientY - r.top) / r.height) * displayH];
  };
  const pxDist = (a: Point2D, b: Point2D) =>
    Math.hypot(((a[0] - b[0]) / displayW) * (svgRef.current?.clientWidth || 1), ((a[1] - b[1]) / displayH) * (svgRef.current?.clientHeight || 1));

  const commit = useCallback((shape: UserDrawing) => {
    setHistory((h) => [...h, shape]);
    setRedoStack([]);
    setDraft(null);
    setHint(null);
    startRef.current = null;
  }, []);

  const undo = () =>
    setHistory((h) => {
      if (!h.length) return h;
      setRedoStack((r) => [h[h.length - 1], ...r]);
      return h.slice(0, -1);
    });
  const redo = () =>
    setRedoStack((r) => {
      if (!r.length) return r;
      setHistory((h) => [...h, r[0]]);
      return r.slice(1);
    });
  const clear = () =>
    setHistory((h) => {
      if (h.length) setRedoStack([...h]);
      return [];
    });

  const downloadImage = async (filename = "drawing.png") => {
    const svg = svgRef.current;
    if (!svg) return;
    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    clone.querySelectorAll(".shape-hit").forEach((el) => el.remove());
    const style = document.createElementNS("http://www.w3.org/2000/svg", "style");
    style.textContent = "text{font-family:Inter,system-ui,sans-serif}.axis-labels{font-size:.34px;fill:#374151}.axis-title{font-size:.45px;fill:#111827}";
    clone.prepend(style);
    const blob = new Blob([new XMLSerializer().serializeToString(clone)], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Could not render board image"));
      img.src = url;
    });
    const canvas = document.createElement("canvas");
    const scale = 2;
    canvas.width = svg.clientWidth * scale;
    canvas.height = svg.clientHeight * scale;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.fillStyle = "#fff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    URL.revokeObjectURL(url);
    const a = document.createElement("a");
    a.download = filename;
    a.href = canvas.toDataURL("image/png");
    a.click();
  };

  useImperativeHandle(ref, () => ({
    undo,
    redo,
    clear,
    getUserDrawings: () => latest.current.map((x) => ({ ...x, points: x.points.map((p) => [...p] as Point2D) })),
    downloadImage,
  }));

  const finishMulti = () => {
    if (!draft) return;
    const min = draft.tool === "polygon" ? 3 : 2;
    if (draft.points.length >= min) commit({ tool: draft.tool, points: draft.points, color: draft.color, closed: draft.closed });
    else {
      setDraft(null);
      setHint(null);
    }
  };

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDraft(null);
        setHint(null);
        setTextAt(null);
      } else if (e.key === "Enter" && draft) finishMulti();
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  });

  const down = (e: ReactPointerEvent) => {
    e.preventDefault();
    const p = coords(e);
    if (e.shiftKey) {
      svgRef.current?.setPointerCapture(e.pointerId);
      panRef.current = { client: [e.clientX, e.clientY], box: view };
      return;
    }
    if (activeTool === "select" || activeTool === "eraser") return;
    if (activeTool === "point" || activeTool === "coordinate") {
      commit({ tool: activeTool, points: [p], color });
      return;
    }
    if (activeTool === "text") {
      textClosingRef.current = false;
      setTextAt(p);
      setTextValue("");
      setHint("Type a label, then press Enter");
      return;
    }
    if (activeTool === "polygon" || activeTool === "scatter" || activeTool === "curve") {
      if (!draft) {
        setDraft({ tool: activeTool, points: [p], color });
        setHint(activeTool === "curve" ? "Add up to 4 points" : "Click points; Enter finishes; Escape cancels");
      } else {
        const first = draft.points[0];
        const last = draft.points[draft.points.length - 1];
        if (pxDist(p, last) < CLICK_PX && draft.points.length >= 2) {
          finishMulti();
        } else if (pxDist(p, first) < CLICK_PX && draft.points.length >= 3) {
          commit({ tool: activeTool, points: draft.points, color: draft.color, closed: true });
        } else {
          const next = { ...draft, points: [...draft.points, p] };
          if (activeTool === "curve" && next.points.length === 4) commit({ tool: "curve", points: next.points, color: next.color });
          else setDraft(next);
        }
      }
      return;
    }
    // Two-point drag shapes: line, segment, arrow, doubleArrow, rectangle, circle
    svgRef.current?.setPointerCapture(e.pointerId);
    startRef.current = p;
    setDraft({ tool: activeTool, points: [p, p], color });
  };

  const move = (e: ReactPointerEvent) => {
    const p = coords(e);
    setHover(p);
    if (panRef.current) {
      const r = svgRef.current!.getBoundingClientRect();
      const [cx, cy] = panRef.current.client;
      const b = panRef.current.box;
      const dx = ((e.clientX - cx) / r.width) * (b[1] - b[0]) * 1.08;
      const dy = ((e.clientY - cy) / r.height) * (b[3] - b[2]) * 1.08;
      setView([b[0] - dx, b[1] - dx, b[2] + dy, b[3] - dy]);
      return;
    }
    if (dragRef.current) {
      const { index, last } = dragRef.current;
      const dx = p[0] - last[0];
      const dy = p[1] - last[1];
      dragRef.current.last = p;
      setHistory((h) => h.map((s, i) => (i === index ? { ...s, points: s.points.map((q) => [q[0] + dx, q[1] + dy] as Point2D) } : s)));
      return;
    }
    if (startRef.current && draft) setDraft({ ...draft, points: [startRef.current, p] });
  };

  const up = () => {
    panRef.current = null;
    if (dragRef.current) {
      dragRef.current = null;
      return;
    }
    if (startRef.current && draft && draft.points.length > 1) {
      if (pxDist(draft.points[0], draft.points[1]) > 2) commit({ tool: draft.tool, points: draft.points, color: draft.color });
      else {
        setDraft(null);
        startRef.current = null;
      }
    }
  };

  const shapeDown = (e: ReactPointerEvent, index: number) => {
    if (activeTool === "eraser") {
      e.stopPropagation();
      setHistory((h) => h.filter((_, i) => i !== index));
      setRedoStack([]);
    } else if (activeTool === "select") {
      e.stopPropagation();
      dragRef.current = { index, last: coords(e) };
      svgRef.current?.setPointerCapture(e.pointerId);
    }
  };

  const submitText = () => {
    if (textClosingRef.current) return;
    textClosingRef.current = true;
    if (textAt && textValue.trim()) commit({ tool: "text", points: [textAt], color, text: textValue.trim() });
    setTextAt(null);
    setHint(null);
  };
  const cancelText = () => {
    textClosingRef.current = true;
    setTextAt(null);
    setHint(null);
  };

  const ticksX = useMemo(() => Array.from({ length: Math.max(0, Math.floor(xMax)) + 1 }, (_, i) => i), [xMax]);
  const ticksY = useMemo(() => Array.from({ length: Math.max(0, Math.floor(yMax)) + 1 }, (_, i) => i), [yMax]);
  const draftSpec = draft ? { type: draft.tool as InitialObjectSpec["type"], points: draft.points, color: draft.color, closed: draft.closed } : null;

  return (
    <div className="svg-board-wrapper">
      <svg
        ref={svgRef}
        className="svg-board"
        viewBox={`${displayXMin} ${-displayYMax} ${displayW} ${displayH}`}
        preserveAspectRatio="none"
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerLeave={() => setHover(null)}
        role="application"
        aria-label="Coordinate drawing board"
      >
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L8,4 L0,8 z" fill="context-stroke" />
          </marker>
          <marker id="arrow-start" markerWidth="8" markerHeight="8" refX="1" refY="4" orient="auto" markerUnits="strokeWidth">
            <path d="M8,0 L0,4 L8,8 z" fill="context-stroke" />
          </marker>
          {/* A thin open chevron (Khan Academy / Perseus graph style), not a filled triangle. */}
          <marker id="axis-arrow" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto" markerUnits="strokeWidth">
            <path d="M1,0.5 L8,3.5 L1,6.5" fill="none" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
        <g transform="scale(1,-1)">
          <rect x={displayXMin} y={-displayYMax} width={displayW} height={displayH} fill="white" />
          {ticksX.map((x) => (
            <line key={`gx${x}`} x1={x} y1={0} x2={x} y2={Math.max(0, yMax)} stroke="#e5e9ef" strokeWidth={1} vectorEffect="non-scaling-stroke" />
          ))}
          {ticksY.map((y) => (
            <line key={`gy${y}`} x1={0} y1={y} x2={Math.max(0, xMax)} y2={y} stroke="#e5e9ef" strokeWidth={1} vectorEffect="non-scaling-stroke" />
          ))}
          <line
            x1={0}
            y1={0}
            x2={Math.max(0, xMax + padX * 0.8)}
            y2={0}
            stroke="#111827"
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
            markerEnd="url(#axis-arrow)"
          />
          <line
            x1={0}
            y1={0}
            x2={0}
            y2={Math.max(0, yMax + padY * 0.8)}
            stroke="#111827"
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
            markerEnd="url(#axis-arrow)"
          />
          {ticksX.filter(Boolean).map((x) => (
            <line key={`tx${x}`} x1={x} y1={-0.12} x2={x} y2={0.12} stroke="#111827" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
          ))}
          {ticksY.filter(Boolean).map((y) => (
            <line key={`ty${y}`} x1={-0.12} y1={y} x2={0.12} y2={y} stroke="#111827" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
          ))}
          {initialObjects.map((s, i) => (
            <Shape key={`i${i}`} spec={s} />
          ))}
          {history.map((s, i) => (
            <Shape key={`u${i}`} spec={s} index={i} interactive onDown={(e) => shapeDown(e, i)} />
          ))}
          {draftSpec && <Shape spec={draftSpec} />}
          {draft && hover && (draft.tool === "polygon" || draft.tool === "scatter" || draft.tool === "curve") && (
            <line
              x1={draft.points[draft.points.length - 1][0]}
              y1={draft.points[draft.points.length - 1][1]}
              x2={hover[0]}
              y2={hover[1]}
              stroke={draft.color}
              strokeDasharray="5 4"
              vectorEffect="non-scaling-stroke"
            />
          )}
          {activeTool === "coordinate" && hover && (
            <>
              <line x1={hover[0]} y1={0} x2={hover[0]} y2={hover[1]} stroke={color} strokeDasharray="5 4" vectorEffect="non-scaling-stroke" />
              <line x1={0} y1={hover[1]} x2={hover[0]} y2={hover[1]} stroke={color} strokeDasharray="5 4" vectorEffect="non-scaling-stroke" />
              <circle cx={hover[0]} cy={hover[1]} r={0.12} fill={color} />
            </>
          )}
          {overlayObjects.map((s, i) => (
            <Shape key={`o${i}`} spec={{ ...s, color: s.color ?? overlayColor }} dashed />
          ))}
        </g>
        <g className="axis-labels">
          {ticksX.map((x) => (
            <text key={x} x={x} y={0.42} textAnchor={x === xMax ? "end" : "middle"}>
              {x}
            </text>
          ))}
          {ticksY.filter(Boolean).map((y) => (
            <text key={y} x={-0.18} y={-y + (y === yMax ? 0.36 : 0.12)} textAnchor="end">
              {y}
            </text>
          ))}
          <text x={(xMin + xMax) / 2} y={-yMin - 0.22} textAnchor="middle" className="axis-title">
            {xLabel}
          </text>
          <text transform={`translate(${xMin + 0.48} ${-(yMin + yMax) / 2}) rotate(-90)`} textAnchor="middle" className="axis-title">
            {yLabel}
          </text>
        </g>
      </svg>
      {textAt && (
        <input
          ref={inputRef}
          className="svg-text-input"
          style={{ left: `${((textAt[0] - displayXMin) / displayW) * 100}%`, top: `${((displayYMax - textAt[1]) / displayH) * 100}%`, color }}
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submitText();
            }
            if (e.key === "Escape") {
              e.preventDefault();
              cancelText();
            }
          }}
          onBlur={submitText}
        />
      )}
      {hint && <div className="drawing-hint">{hint}</div>}
      {showNavigation && (
        <div className="svg-navigation">
          <button
            onClick={() =>
              setView((b) => {
                const dx = (b[1] - b[0]) * 0.1;
                const dy = (b[3] - b[2]) * 0.1;
                return [b[0] + dx, b[1] - dx, b[2] + dy, b[3] - dy];
              })
            }
          >
            +
          </button>
          <button
            onClick={() =>
              setView((b) => {
                const dx = (b[1] - b[0]) * 0.1;
                const dy = (b[3] - b[2]) * 0.1;
                return [b[0] - dx, b[1] + dx, b[2] - dy, b[3] + dy];
              })
            }
          >
            −
          </button>
          <button onClick={() => setView(boundingBox)}>⌂</button>
        </div>
      )}
    </div>
  );
});

export default DrawingBoard;
