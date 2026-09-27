import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import JXGImport from "jsxgraph";

// The community JSXGraph typings are incomplete (missing overloads for
// several element types, Math.Numerics, board.select/on/off signatures),
// so the board/element objects are treated as `any` here. Everything in
// this file that *is* precisely typed (props, tool names, action specs)
// stays fully typed for consumers of DrawingBoard.
const JXG: any = JXGImport;

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
  /** Control points, meaning depends on `type` (see buildShape). */
  points: Point2D[];
  /** Only used for `type: "circle"` as an alternative to a second (radius) point. */
  radius?: number;
  /** Only used for `type: "text"`. */
  text?: string;
  /** Only used for `type: "scatter"`: also connect the last point back to the first. */
  closed?: boolean;
  color?: string;
}

export interface DrawingBoardHandle {
  undo: () => void;
  redo: () => void;
  clear: () => void;
  /** Every shape the user has drawn so far (excludes `initialObjects`). */
  getUserDrawings: () => UserDrawing[];
  /** Saves the current board (axes, initial objects and user drawings) as a PNG file. */
  downloadImage: (filename?: string) => Promise<void>;
}

export interface DrawingBoardProps {
  boundingBox?: BoundingBox;
  xLabel?: string;
  yLabel?: string;
  initialObjects?: InitialObjectSpec[];
  activeTool: ToolName;
  color: string;
  /** Show JSXGraph's built-in zoom/pan navigation widget in the corner of the board. */
  showNavigation?: boolean;
  /** Bump this (e.g. on every toolbar click) to re-arm a single-shot tool like
   * "coordinate" even when it was already the active tool. */
  toolActivationSeq?: number;
  onHistoryChange?: (state: { canUndo: boolean; canRedo: boolean }) => void;
  /** Called whenever the set of user drawings changes: a shape is drawn,
   * undone, redone, erased, cleared, or dragged to a new position. */
  onDrawingsChange?: () => void;
  /** Reference shapes drawn dashed on top of the board (e.g. the suggested
   * answer). They aren't user drawings: not graded, erasable, or undoable,
   * and they don't block drawing on top of them. */
  overlayObjects?: InitialObjectSpec[];
  /** Color of `overlayObjects` that don't set their own `color`. */
  overlayColor?: string;
}

interface DrawingAction {
  ids: string[];
  tool: ToolName;
  points: Point2D[];
  color: string;
  text?: string;
  radius?: number;
  closed?: boolean;
}

/** One shape the user drew, as reported by `DrawingBoardHandle.getUserDrawings()`. */
export type UserDrawing = Omit<DrawingAction, "ids">;

interface PendingShape {
  tool: ToolName;
  points: Point2D[];
  /** Real board elements already created for this in-progress shape. */
  liveObjects: any[];
  /** Preview line used while building multi-click shapes (polygon/curve). */
  previewLine: any;
  /** Invisible point tracking the live mouse position, used to feed the curve preview's spline. */
  previewPoint?: any;
}

/** A text label currently being typed directly on the board. */
interface PendingText {
  el: any;
  text: string;
  coords: Point2D;
}

/** Live crosshair + axis guide lines shown while hovering with the coordinate tool. */
interface CoordinateHover {
  point: any;
  xAnchor: any;
  yAnchor: any;
  vLine: any;
  hLine: any;
}

const CLICK_MERGE_DISTANCE_PX = 12;
const CURVE_MAX_POINTS = 4;

function dist(a: Point2D, b: Point2D) {
  return Math.hypot(a[0] - b[0], a[1] - b[1]);
}

function pixelDistance(board: any, a: Point2D, b: Point2D) {
  const ca = new JXG.Coords(JXG.COORDS_BY_USER, a, board).scrCoords;
  const cb = new JXG.Coords(JXG.COORDS_BY_USER, b, board).scrCoords;
  return Math.hypot(ca[1] - cb[1], ca[2] - cb[2]);
}

/**
 * Creates the board elements for a shape. Used both for user-drawn shapes
 * (so redo can replay it) and for the `initialObjects` prop.
 */
function buildShape(
  board: any,
  tool: ToolName,
  points: Point2D[],
  color: string,
  opts: { text?: string; radius?: number; closed?: boolean; fixed?: boolean } = {}
): any[] {
  const { text, radius, closed = false, fixed = true } = opts;

  const pointAttr = {
    withLabel: false,
    name: "",
    size: 2,
    strokeColor: color,
    fillColor: color,
    fixed,
  };
  const lineAttr = { strokeColor: color, strokeWidth: 2, fixed };
  const fillAttr = { fillColor: color, fillOpacity: 0.12 };

  switch (tool) {
    case "point": {
      const p = board.create("point", points[0], { ...pointAttr, size: 4, fixed });
      return [p];
    }

    case "coordinate": {
      const p = board.create("point", points[0], { ...pointAttr, size: 4, fixed });

      // Invisible anchors on each axis so the guide lines stay attached if
      // the point is later dragged (in select mode).
      const xAnchor = board.create("point", [() => p.X(), () => 0], {
        visible: false,
        fixed: true,
      });
      const yAnchor = board.create("point", [() => 0, () => p.Y()], {
        visible: false,
        fixed: true,
      });
      const guideAttr = { strokeColor: color, strokeWidth: 1, dash: 2, fixed: true, highlight: false };
      const vLine = board.create("segment", [p, xAnchor], guideAttr);
      const hLine = board.create("segment", [p, yAnchor], guideAttr);

      const label = board.create(
        "text",
        [
          () => p.X() + 0.2,
          () => p.Y() + 0.2,
          () => `(${p.X().toFixed(2)}, ${p.Y().toFixed(2)})`,
        ],
        { strokeColor: color, fontSize: 13, fixed: true, cssStyle: "pointer-events:none;" }
      );
      return [p, xAnchor, yAnchor, vLine, hLine, label];
    }

    case "text": {
      const t = board.create("text", [points[0][0], points[0][1], text ?? "Text"], {
        strokeColor: color,
        fontSize: 16,
        fixed,
      });
      return [t];
    }

    case "line": {
      const p1 = board.create("point", points[0], pointAttr);
      const p2 = board.create("point", points[1], pointAttr);
      const l = board.create("line", [p1, p2], lineAttr);
      return [p1, p2, l];
    }

    case "segment": {
      const p1 = board.create("point", points[0], pointAttr);
      const p2 = board.create("point", points[1], pointAttr);
      const l = board.create("segment", [p1, p2], lineAttr);
      return [p1, p2, l];
    }

    case "arrow": {
      const p1 = board.create("point", points[0], { ...pointAttr, visible: false });
      const p2 = board.create("point", points[1], { ...pointAttr, visible: false });
      const l = board.create("arrow", [p1, p2], lineAttr);
      return [p1, p2, l];
    }

    case "doubleArrow": {
      const p1 = board.create("point", points[0], { ...pointAttr, visible: false });
      const p2 = board.create("point", points[1], { ...pointAttr, visible: false });
      const l = board.create("segment", [p1, p2], {
        ...lineAttr,
        firstArrow: { type: 1, size: 6 },
        lastArrow: { type: 1, size: 6 },
      });
      return [p1, p2, l];
    }

    case "rectangle": {
      const p1 = board.create("point", points[0], pointAttr);
      const p2 = board.create("point", points[1], pointAttr);
      const p3 = board.create("point", [() => p2.X(), () => p1.Y()], pointAttr);
      const p4 = board.create("point", [() => p1.X(), () => p2.Y()], pointAttr);
      const poly = board.create("polygon", [p1, p3, p2, p4], {
        ...lineAttr,
        ...fillAttr,
        vertices: { visible: false },
        withLines: true,
      });
      return [p1, p2, p3, p4, poly];
    }

    case "circle": {
      const center = board.create("point", points[0], pointAttr);
      if (points.length > 1) {
        const rim = board.create("point", points[1], pointAttr);
        const c = board.create("circle", [center, rim], { ...lineAttr, ...fillAttr });
        return [center, rim, c];
      }
      const c = board.create("circle", [center, radius ?? 1], { ...lineAttr, ...fillAttr });
      return [center, c];
    }

    case "polygon": {
      const pts = points.map((pt) => board.create("point", pt, pointAttr));
      const poly = board.create("polygon", pts, {
        ...lineAttr,
        ...fillAttr,
        vertices: { visible: false },
      });
      return [...pts, poly];
    }

    case "scatter": {
      // Connected scatter plot: visible markers joined in click order. Open
      // unless `closed`, and never filled (unlike a polygon).
      const pts = points.map((pt) => board.create("point", pt, { ...pointAttr, size: 3 }));
      const segs = pts.slice(1).map((p, i) => board.create("segment", [pts[i], p], lineAttr));
      if (closed && pts.length >= 3) {
        segs.push(board.create("segment", [pts[pts.length - 1], pts[0]], lineAttr));
      }
      return [...pts, ...segs];
    }

    case "curve": {
      const pts = points.map((pt) => board.create("point", pt, pointAttr));
      const spline = JXG.Math.Numerics.CardinalSpline(pts, 0.5);
      const curve = board.create("curve", spline, { strokeColor: color, strokeWidth: 2, fixed });
      return [...pts, curve];
    }

    default:
      return [];
  }
}

const DrawingBoard = forwardRef<DrawingBoardHandle, DrawingBoardProps>(function DrawingBoard(
  {
    boundingBox = [-10, 10, -10, 10],
    xLabel = "x",
    yLabel = "y",
    initialObjects = [],
    activeTool,
    color,
    showNavigation = false,
    toolActivationSeq = 0,
    onHistoryChange,
    onDrawingsChange,
    overlayObjects,
    overlayColor = "#16a34a",
  },
  ref
) {
  const [xMin, xMax, yMin, yMax] = boundingBox;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const containerIdRef = useRef(`jxgbox-${Math.random().toString(36).slice(2)}`);
  const boardRef = useRef<any>(null);

  const activeToolRef = useRef<ToolName>(activeTool);
  const colorRef = useRef(color);
  const pendingRef = useRef<PendingShape | null>(null);
  const pendingTextRef = useRef<PendingText | null>(null);
  /** Whether the coordinate tool may still place a point: true right after
   * (re-)selecting it, false after the first click, until reselected. */
  const coordinateArmedRef = useRef(true);
  const coordinateHoverRef = useRef<CoordinateHover | null>(null);
  const userElementIdsRef = useRef<Set<string>>(new Set());

  const undoStackRef = useRef<DrawingAction[]>([]);
  const redoStackRef = useRef<DrawingAction[]>([]);
  /** Ids of the elements currently drawn for `overlayObjects`. */
  const overlayIdsRef = useRef<Set<string>>(new Set());
  const onDrawingsChangeRef = useRef(onDrawingsChange);
  onDrawingsChangeRef.current = onDrawingsChange;

  const [hint, setHint] = useState<string | null>(null);

  useEffect(() => {
    activeToolRef.current = activeTool;
  }, [activeTool]);

  useEffect(() => {
    colorRef.current = color;
  }, [color]);

  const notifyHistory = () => {
    onHistoryChange?.({
      canUndo: undoStackRef.current.length > 0,
      canRedo: redoStackRef.current.length > 0,
    });
    onDrawingsChangeRef.current?.();
  };

  /** The shapes currently on the board (not counting `initialObjects`), in
   * drawing order. The undo stack is exactly what's on the board, so it's the
   * source of truth; points are read from the live elements so shapes dragged
   * in "select" mode report where they are now, not where they were drawn. */
  const readUserDrawings = (): UserDrawing[] => {
    const board = boardRef.current;
    return undoStackRef.current.map(({ ids, ...spec }) => {
      if (!board) return spec;
      // buildShape returns the elements defining `points` first, in order
      // (for text, the text element itself), so they line up by index.
      const points = spec.points.map((pt, i): Point2D => {
        const el = board.select(ids[i]);
        return el && typeof el.X === "function" ? [el.X(), el.Y()] : pt;
      });
      return { ...spec, points };
    });
  };

  const cancelPendingShapeRef = useRef<() => void>();
  const commitPendingTextRef = useRef<() => void>();
  const cancelPendingTextRef = useRef<() => void>();
  const clearCoordinateHoverRef = useRef<() => void>();

  // Toggle draggability of user-drawn elements: only draggable in "select" mode.
  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;
    const shouldBeFixed = activeTool !== "select";
    userElementIdsRef.current.forEach((id) => {
      const el = board.select(id);
      if (el && el.setAttribute) {
        el.setAttribute({ fixed: shouldBeFixed });
      }
    });
    setHint(null);
    cancelPendingShapeRef.current?.();
    commitPendingTextRef.current?.();
    clearCoordinateHoverRef.current?.();
    coordinateArmedRef.current = true;
    // toolActivationSeq re-runs this even when the same tool is clicked again,
    // which is how a single-shot tool like "coordinate" gets re-armed.
  }, [activeTool, toolActivationSeq]);

  useEffect(() => {
    if (!containerRef.current) return;

    const board = JXG.JSXGraph.initBoard(containerIdRef.current, {
      boundingbox: [xMin, yMax, xMax, yMin],
      axis: false,
      keepaspectratio: false,
      showCopyright: false,
      showNavigation,
      pan: { enabled: true, needShift: true },
      zoom: { enabled: false, wheel: false, needShift: false },
    });

    // Only non-negative tick/grid lines - this is an economics board, negative
    // quadrants aren't needed. The x-axis owns the "0" tick so it isn't drawn twice.
    const xTicks = Array.from({ length: Math.max(0, Math.floor(xMax)) + 1 }, (_, i) => i);
    const yTicks = Array.from({ length: Math.max(0, Math.floor(yMax)) }, (_, i) => i + 1);

    board.create(
      "axis",
      [
        [0, 0],
        [1, 0],
      ],
      {
        // Start the axis at the origin instead of extending into negative x.
        straightFirst: false,
        ticks: {
          ticks: xTicks,
          minorTicks: 0,
          majorHeight: -1,
          strokeColor: "#e5e9ef",
          strokeOpacity: 1,
          label: { anchorX: "middle", anchorY: "top", offset: [0, -6], fontSize: 19 },
        },
      }
    );
    board.create(
      "axis",
      [
        [0, 0],
        [0, 1],
      ],
      {
        // Start the axis at the origin instead of extending into negative y.
        straightFirst: false,
        ticks: {
          ticks: yTicks,
          minorTicks: 0,
          majorHeight: -1,
          strokeColor: "#e5e9ef",
          strokeOpacity: 1,
          // Numbers to the left of the y-axis line.
          label: { anchorX: "right", anchorY: "middle", offset: [-8, 0], fontSize: 19 },
        },
      }
    );

    // Axis titles, centered on each axis and pushed well clear of the tick
    // numbers - drawn as plain text instead of the axis's own built-in label,
    // which only anchors near one end of the line.
    board.create("text", [(xMin + xMax) / 2, yMin, xLabel], {
      anchorX: "middle",
      anchorY: "bottom",
      offset: [0, 6],
      fontSize: 20,
      fixed: true,
      display: "internal",
    });
    board.create("text", [.5*xMin, .6*(yMin + yMax) , yLabel], {
      anchorX: "middle",
      anchorY: "bottom",
      offset: [-4, 0],
      fontSize: 20,
      fixed: true,
      display: "internal",
      rotate: 90,
    });

    boardRef.current = board;
    userElementIdsRef.current = new Set();
    undoStackRef.current = [];
    redoStackRef.current = [];
    notifyHistory();

    initialObjects.forEach((spec) => {
      buildShape(board, spec.type, spec.points, spec.color ?? "#111827", {
        text: spec.text,
        radius: spec.radius,
        closed: spec.closed,
        fixed: true,
      });
    });

    // ---- action helpers -------------------------------------------------

    const trackAction = (
      elements: any[],
      spec: {
        tool: ToolName;
        points: Point2D[];
        color: string;
        text?: string;
        radius?: number;
        closed?: boolean;
      }
    ) => {
      const ids = elements.map((el) => el.id);
      ids.forEach((id) => userElementIdsRef.current.add(id));
      undoStackRef.current.push({ ids, ...spec });
      redoStackRef.current = [];

      console.log("User drawings:", readUserDrawings());

      notifyHistory();
    };

    const removeAction = (action: DrawingAction) => {
      action.ids.forEach((id) => userElementIdsRef.current.delete(id));
      const els = action.ids.map((id) => board.select(id)).filter(Boolean);
      board.removeObject(els);
    };

    const clearPreviewLine = (pending: PendingShape) => {
      if (pending.previewLine) {
        board.removeObject(pending.previewLine);
        pending.previewLine = null;
      }
      if (pending.previewPoint) {
        board.removeObject(pending.previewPoint);
        pending.previewPoint = null;
      }
    };

    const cancelPendingShape = () => {
      const pending = pendingRef.current;
      if (!pending) return;
      clearPreviewLine(pending);
      pending.liveObjects.forEach((el) => board.removeObject(el));
      pendingRef.current = null;
      setHint(null);
      board.update();
    };
    cancelPendingShapeRef.current = cancelPendingShape;

    /** Keeps the typed text if any, otherwise removes the empty label. */
    const commitPendingText = () => {
      const pending = pendingTextRef.current;
      if (!pending) return;
      pendingTextRef.current = null;
      setHint(null);

      if (pending.text.trim() === "") {
        board.removeObject(pending.el);
        board.update();
        return;
      }

      pending.el.setText(pending.text);
      trackAction([pending.el], {
        tool: "text",
        points: [pending.coords],
        color: colorRef.current,
        text: pending.text,
      });
      board.update();
    };
    commitPendingTextRef.current = commitPendingText;

    /** Discards the in-progress label regardless of what was typed. */
    const cancelPendingText = () => {
      const pending = pendingTextRef.current;
      if (!pending) return;
      pendingTextRef.current = null;
      setHint(null);
      board.removeObject(pending.el);
      board.update();
    };
    cancelPendingTextRef.current = cancelPendingText;

    const clearCoordinateHover = () => {
      const hover = coordinateHoverRef.current;
      if (!hover) return;
      board.removeObject([hover.vLine, hover.hLine, hover.point, hover.xAnchor, hover.yAnchor]);
      coordinateHoverRef.current = null;
    };
    clearCoordinateHoverRef.current = clearCoordinateHover;

    /** Live crosshair + dashed axis guides that follow the mouse before the
     * coordinate tool's click places the real point. */
    const updateCoordinateHover = (coords: Point2D) => {
      const hover = coordinateHoverRef.current;
      if (hover) {
        hover.point.setPosition(JXG.COORDS_BY_USER, coords);
        board.update();
        return;
      }

      const point = board.create("point", coords, {
        size: 3,
        strokeColor: colorRef.current,
        fillColor: colorRef.current,
        withLabel: false,
        name: "",
        fixed: true,
        highlight: false,
      });
      const xAnchor = board.create("point", [() => point.X(), () => 0], {
        visible: false,
        fixed: true,
      });
      const yAnchor = board.create("point", [() => 0, () => point.Y()], {
        visible: false,
        fixed: true,
      });
      const guideAttr = {
        strokeColor: colorRef.current,
        strokeWidth: 1,
        dash: 2,
        fixed: true,
        highlight: false,
      };
      const vLine = board.create("segment", [point, xAnchor], guideAttr);
      const hLine = board.create("segment", [point, yAnchor], guideAttr);

      coordinateHoverRef.current = { point, xAnchor, yAnchor, vLine, hLine };
      board.update();
    };

    /** `closed` only matters for "scatter": true when finished by clicking
     * back on the first point. */
    const finalizePendingShape = (closed = false) => {
      const pending = pendingRef.current;
      if (!pending) return;
      clearPreviewLine(pending);
      pending.liveObjects.forEach((el) => board.removeObject(el));
      pending.liveObjects = [];

      const minPoints = pending.tool === "polygon" || closed ? 3 : 2;
      if (pending.points.length < minPoints) {
        pendingRef.current = null;
        setHint(null);
        board.update();
        return;
      }

      const isClosedScatter = pending.tool === "scatter" && closed;
      const elements = buildShape(board, pending.tool, pending.points, colorRef.current, {
        closed: isClosedScatter,
        fixed: true,
      });
      trackAction(elements, {
        tool: pending.tool,
        points: pending.points,
        color: colorRef.current,
        ...(isClosedScatter ? { closed: true } : {}),
      });
      pendingRef.current = null;
      setHint(null);
      board.update();
    };

    /** Solid rubber-band line through the confirmed points, plus an optional
     * trailing segment to `extra` (the live mouse position), styled like the
     * final polygon edges so the in-progress shape looks like the real one. */
    const redrawPreview = (pending: PendingShape, extra?: Point2D) => {
      clearPreviewLine(pending);
      const pts = extra ? [...pending.points, extra] : pending.points;
      if (pts.length < 2) return;
      pending.previewLine = board.create(
        "curve",
        [pts.map((p) => p[0]), pts.map((p) => p[1])],
        { strokeColor: colorRef.current, strokeWidth: 2, fixed: true, highlight: false }
      );
    };

    /** Solid spline preview through the confirmed vertex markers, plus an
     * optional trailing segment to `extra` (the live mouse position), so the
     * curve tool looks like the real curve while it's still being drawn. */
    const redrawCurvePreview = (pending: PendingShape, extra?: Point2D) => {
      clearPreviewLine(pending);

      let pts: any[] = pending.liveObjects;
      if (extra) {
        pending.previewPoint = board.create("point", extra, {
          name: "",
          visible: false,
          fixed: true,
          withLabel: false,
        });
        pts = [...pending.liveObjects, pending.previewPoint];
      }
      if (pts.length < 2) return;

      const spline = JXG.Math.Numerics.CardinalSpline(pts, 0.5);
      pending.previewLine = board.create("curve", spline, {
        strokeColor: colorRef.current,
        strokeWidth: 2,
        fixed: true,
        highlight: false,
      });
    };

    const eraseAt = (evt: Event) => {
      const hits = board
        .getAllObjectsUnderMouse(evt)
        .filter((el: any) => userElementIdsRef.current.has(el.id));
      if (hits.length === 0) return;
      const target = hits[hits.length - 1];
      const actionIndex = undoStackRef.current.findIndex((a) => a.ids.includes(target.id));
      if (actionIndex === -1) {
        userElementIdsRef.current.delete(target.id);
        board.removeObject(target);
        board.update();
        return;
      }
      const [action] = undoStackRef.current.splice(actionIndex, 1);
      removeAction(action);
      redoStackRef.current = [];
      notifyHistory();
      board.update();
    };

    // ---- pointer handlers -------------------------------------------------

    const onDown = (evt: Event) => {
      const tool = activeToolRef.current;

      if (tool === "eraser") {
        eraseAt(evt);
        return;
      }

      if (tool === "select") return;

      const coords = board.getUsrCoordsOfMouse(evt) as Point2D;
      // Exclude the coordinate tool's own hover preview from the hit test -
      // otherwise the click that's meant to place the point always lands on
      // top of the preview it's tracking and gets treated as "hits existing".
      const hover = coordinateHoverRef.current;
      const hoverEls: any[] = hover
        ? [hover.point, hover.xAnchor, hover.yAnchor, hover.vLine, hover.hLine]
        : [];
      // Overlay (suggested answer) elements are ignored too, so students can
      // draw right on top of them.
      const hitsExisting = board
        .getAllObjectsUnderMouse(evt)
        .some((el: any) => !hoverEls.includes(el) && !overlayIdsRef.current.has(el.id));

      if (tool === "point" || tool === "coordinate") {
        if (tool === "coordinate" && !coordinateArmedRef.current) return;
        if (board.mode !== board.BOARD_MODE_NONE || hitsExisting) return;
        clearCoordinateHover();
        const elements = buildShape(board, tool, [coords], colorRef.current, { fixed: true });
        trackAction(elements, { tool, points: [coords], color: colorRef.current });
        if (tool === "coordinate") coordinateArmedRef.current = false;
        board.update();
        return;
      }

      if (tool === "text") {
        if (board.mode !== board.BOARD_MODE_NONE) return;

        // A click elsewhere while already typing commits the current label first.
        if (pendingTextRef.current) {
          commitPendingText();
        }

        if (hitsExisting) return;

        const el = board.create("text", [coords[0], coords[1], "|"], {
          strokeColor: colorRef.current,
          fontSize: 16,
          fixed: true,
        });
        pendingTextRef.current = { el, text: "", coords };
        setHint("Type your text, press Enter to finish, Esc to cancel.");
        board.update();
        return;
      }

      if (tool === "polygon" || tool === "scatter" || tool === "curve") {
        if (board.mode !== board.BOARD_MODE_NONE) return;
        let pending = pendingRef.current;

        if (pending && pending.tool !== tool) {
          cancelPendingShape();
          pending = null;
        }

        if (!pending) {
          pending = { tool, points: [], liveObjects: [], previewLine: null };
          pendingRef.current = pending;
        }

        const last = pending.points[pending.points.length - 1];
        if (last && pixelDistance(board, last, coords) < CLICK_MERGE_DISTANCE_PX) {
          finalizePendingShape();
          return;
        }

        // Clicking back on the first point closes a polygon, or turns a
        // connected scatter into a closed loop.
        if (
          (tool === "polygon" || tool === "scatter") &&
          pending.points.length >= 3 &&
          pixelDistance(board, pending.points[0], coords) < CLICK_MERGE_DISTANCE_PX
        ) {
          finalizePendingShape(true);
          return;
        }

        if (hitsExisting && pending.points.length === 0) return;

        pending.points.push(coords);
        const marker = board.create("point", coords, {
          withLabel: false,
          name: "",
          size: 3,
          strokeColor: colorRef.current,
          fillColor: colorRef.current,
          fixed: true,
          highlight: false,
        });
        pending.liveObjects.push(marker);

        if (tool === "curve" && pending.points.length >= CURVE_MAX_POINTS) {
          finalizePendingShape();
          return;
        }

        if (tool === "curve") {
          redrawCurvePreview(pending);
        } else {
          redrawPreview(pending);
        }
        setHint(
          tool === "polygon"
            ? "Click to add corners, click the first point (or press Enter) to close, Esc to cancel."
            : tool === "scatter"
            ? "Click to add points. Press Enter or click the last point again to finish; click the first point to close the loop. Esc to cancel."
            : `Click up to ${CURVE_MAX_POINTS} points; the curve completes automatically after the ${CURVE_MAX_POINTS}th (Esc to cancel).`
        );
        return;
      }

      // Two-point drag shapes: line, segment, arrow, doubleArrow, rectangle, circle
      if (board.mode !== board.BOARD_MODE_NONE || hitsExisting) return;
      const elements = buildShape(board, tool, [coords, coords], colorRef.current, { fixed: true });
      pendingRef.current = { tool, points: [coords, coords], liveObjects: elements, previewLine: null };
    };

    const onMove = (evt: Event) => {
      if (activeToolRef.current === "coordinate" && coordinateArmedRef.current) {
        if (board.mode === board.BOARD_MODE_NONE) {
          updateCoordinateHover(board.getUsrCoordsOfMouse(evt) as Point2D);
        }
      } else if (coordinateHoverRef.current) {
        clearCoordinateHover();
        board.update();
      }

      const pending = pendingRef.current;
      if (!pending) return;

      if (pending.tool === "polygon" || pending.tool === "scatter" || pending.tool === "curve") {
        if (pending.points.length === 0) return;
        const coords = board.getUsrCoordsOfMouse(evt) as Point2D;
        if (pending.tool === "curve") {
          redrawCurvePreview(pending, coords);
        } else {
          redrawPreview(pending, coords);
        }
        board.update();
        return;
      }

      if (pending.liveObjects.length === 0) return;
      const coords = board.getUsrCoordsOfMouse(evt) as Point2D;
      pending.points[1] = coords;
      pending.liveObjects[1].setPosition(JXG.COORDS_BY_USER, coords);
      board.update();
    };

    const onUp = () => {
      // A drag in select mode may have moved a user shape.
      if (activeToolRef.current === "select") onDrawingsChangeRef.current?.();
      const pending = pendingRef.current;
      if (!pending || pending.liveObjects.length === 0) return;
      if (pending.tool === "polygon" || pending.tool === "scatter" || pending.tool === "curve") return;

      const [a, b] = pending.points;
      if (dist(a, b) < (Math.abs(xMax - xMin) + Math.abs(yMax - yMin)) * 0.005) {
        pending.liveObjects.forEach((el) => board.removeObject(el));
      } else {
        trackAction(pending.liveObjects, {
          tool: pending.tool,
          points: pending.points,
          color: colorRef.current,
        });
      }
      pendingRef.current = null;
      board.update();
    };

    const onKeyDown = (evt: KeyboardEvent) => {
      const pendingText = pendingTextRef.current;
      if (pendingText) {
        if (evt.key === "Enter") {
          evt.preventDefault();
          commitPendingText();
        } else if (evt.key === "Escape") {
          evt.preventDefault();
          cancelPendingText();
        } else if (evt.key === "Backspace") {
          evt.preventDefault();
          pendingText.text = pendingText.text.slice(0, -1);
          pendingText.el.setText(pendingText.text + "|");
          board.update();
        } else if (evt.key.length === 1 && !evt.ctrlKey && !evt.metaKey && !evt.altKey) {
          evt.preventDefault();
          pendingText.text += evt.key;
          pendingText.el.setText(pendingText.text + "|");
          board.update();
        }
        return;
      }

      if (!pendingRef.current) return;
      if (evt.key === "Enter") {
        finalizePendingShape();
      } else if (evt.key === "Escape") {
        cancelPendingShape();
      }
    };

    board.on("down", onDown);
    board.on("move", onMove);
    board.on("up", onUp);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      board.off("down", onDown);
      board.off("move", onMove);
      board.off("up", onUp);
      JXG.JSXGraph.freeBoard(board);
      boardRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xMin, xMax, yMin, yMax, xLabel, yLabel, showNavigation]);

  // Draw/remove the overlay shapes. Declared after the board effect so it
  // re-runs (and redraws on the new board) whenever the board is rebuilt.
  useEffect(() => {
    const board = boardRef.current;
    if (!board || !overlayObjects || overlayObjects.length === 0) return;
    const elements: any[] = [];
    overlayObjects.forEach((spec) => {
      buildShape(board, spec.type, spec.points, spec.color ?? overlayColor, {
        text: spec.text,
        radius: spec.radius,
        closed: spec.closed,
        fixed: true,
      }).forEach((el) => {
        el.setAttribute({ dash: 2, highlight: false });
        elements.push(el);
      });
    });
    elements.forEach((el) => overlayIdsRef.current.add(el.id));
    board.update();
    return () => {
      overlayIdsRef.current.clear();
      // The board may already have been freed if it was rebuilt.
      if (boardRef.current === board) {
        board.removeObject(elements);
        board.update();
      }
    };
  }, [overlayObjects, overlayColor, xMin, xMax, yMin, yMax, xLabel, yLabel, showNavigation]);

  useImperativeHandle(ref, () => ({
    undo: () => {
      const board = boardRef.current;
      if (!board) return;
      const action = undoStackRef.current.pop();
      if (!action) return;
      action.ids.forEach((id) => userElementIdsRef.current.delete(id));
      const els = action.ids.map((id) => board.select(id)).filter(Boolean);
      board.removeObject(els);
      redoStackRef.current.push(action);
      notifyHistory();
      board.update();
    },
    redo: () => {
      const board = boardRef.current;
      if (!board) return;
      const action = redoStackRef.current.pop();
      if (!action) return;
      const elements = buildShape(board, action.tool, action.points, action.color, {
        text: action.text,
        radius: action.radius,
        closed: action.closed,
        fixed: activeToolRef.current !== "select",
      });
      const ids = elements.map((el) => el.id);
      ids.forEach((id) => userElementIdsRef.current.add(id));
      undoStackRef.current.push({ ...action, ids });
      notifyHistory();
      board.update();
    },
    clear: () => {
      const board = boardRef.current;
      if (!board) return;
      cancelPendingShapeRef.current?.();
      cancelPendingTextRef.current?.();
      clearCoordinateHoverRef.current?.();
      const allIds = Array.from(userElementIdsRef.current);
      const els = allIds.map((id) => board.select(id)).filter(Boolean);
      board.removeObject(els);
      userElementIdsRef.current.clear();
      undoStackRef.current = [];
      redoStackRef.current = [];
      notifyHistory();
      board.update();
    },
    getUserDrawings: readUserDrawings,
    downloadImage: async (filename = "drawing.png") => {
      const board = boardRef.current;
      const container = containerRef.current;
      if (!board || !container) return;
      // Finish any in-progress text so it shows up in the image.
      commitPendingTextRef.current?.();
      clearCoordinateHoverRef.current?.();
      board.update();

      // JSXGraph serializes the board (including HTML texts, via a
      // foreignObject) to an SVG data URI; rasterize it onto a canvas.
      const svgUri: string = board.renderer.dumpToDataURI(false);
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Could not render board image"));
        img.src = svgUri;
      });

      const width = container.clientWidth;
      const height = container.clientHeight;
      // 2x so the PNG stays crisp when printed or zoomed.
      const scale = 2;
      const canvas = document.createElement("canvas");
      canvas.width = width * scale;
      canvas.height = height * scale;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      // The SVG has a transparent background.
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    },
  }));

  return (
    <div className="jxg-board-wrapper">
      <div id={containerIdRef.current} ref={containerRef} className="jxg-board" />
      {hint && <div className="jxg-hint">{hint}</div>}
    </div>
  );
});

export default DrawingBoard;
