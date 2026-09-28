import { useMemo, useRef, useState } from "react";
import { Download, Eye, EyeOff, Redo2, Trash2, Undo2 } from "lucide-react";

import DrawingToolbar, { ALL_ACTIONS, COLORS } from "./canvas/drawingTools";
import type { ActionName } from "./canvas/drawingTools";
import DrawingBoard from "./canvas/drawingLogic";
import type {
  BoundingBox,
  DrawingBoardHandle,
  InitialObjectSpec,
  ToolName,
  UserDrawing,
} from "./canvas/drawingLogic";
import { DEFAULT_BOUNDING_BOX, expectedShapeToDrawable } from "./canvas/grading";
import type { ExpectedShape } from "./canvas/grading";
import "./canvas/DrawingCanvas.css";

export type { BoundingBox, InitialObjectSpec, ToolName, ActionName, UserDrawing, ExpectedShape };
export { COLORS };
export { DEFAULT_BOUNDING_BOX, gradeDrawing } from "./canvas/grading";
export type { GradeResult } from "./canvas/grading";

/**
 * Props that describe the question, as plain JSON (they live in a question's
 * `jsxgraph` part). Grading is not done here: the host (the exercise app) grades
 * the drawings with `gradeDrawing` when the student submits.
 */
export interface DrawingQuestionProps {
  /** [xMin, xMax, yMin, yMax]. Defaults to `DEFAULT_BOUNDING_BOX`. */
  boundingBox?: BoundingBox;
  xLabel?: string;
  yLabel?: string;
  /** Shapes drawn on the board before the student touches anything. */
  initialObjects?: InitialObjectSpec[];
  /** The reference drawing the student's drawing is graded against. Also what is
   * shown as the correct answer when the question is finished (unless
   * `suggestedAnswer` is given). */
  expectedDrawing?: ExpectedShape[];
  /** Exact shapes shown (dashed, in their own `color`) as the correct answer, in
   * place of `expectedDrawing`. */
  suggestedAnswer?: InitialObjectSpec[];
  /** Which toolbar buttons are available. Defaults to all tools. */
  enabledTools?: ToolName[];
  /** Which action buttons (undo/redo/clear) are available. Defaults to all. */
  enabledActions?: ActionName[];
  /** Tool selected when the board first mounts. */
  defaultTool?: ToolName;
  /** Color new shapes are drawn with by default. */
  defaultColor?: string;
  /** Hex colors offered in the toolbar's color wheel. Defaults to the built-in palette. */
  colors?: string[];
  /** Show the color wheel picker in the toolbar. Defaults to true. */
  showColorPicker?: boolean;
  /** Show JSXGraph's built-in zoom/pan navigation widget in the corner of the board. */
  showNavigation?: boolean;
  /** Show the "Download Image" button below the board. Defaults to true. */
  showDownloadButton?: boolean;
  /** File name used by the "Download Image" button. */
  downloadFilename?: string;
  /** Show the "Show/Hide Drawing Data" button below the board. Defaults to true. */
  showOutputButton?: boolean;
  /** Width of the whole widget (board + toolbar). Any valid CSS width, e.g. 700 or "100%". */
  width?: number | string;
  /** Height of the whole widget. Any valid CSS height, e.g. 500 or "60vh". */
  height?: number | string;
}

export interface DrawingAppProps extends DrawingQuestionProps {
  /** The student's saved drawings, put back on the board when it is built. */
  initialDrawings?: UserDrawing[];
  /** Called whenever the student's drawing changes (draw, drag, erase, undo,
   * redo, clear) and once when the board is built. */
  onDrawingsChange?: (drawings: UserDrawing[]) => void;
  /** Lock the board and toolbar: the drawing stays visible but can't be changed. */
  readOnly?: boolean;
  /** Draw the correct answer (dashed) on top of the student's drawing. */
  showAnswer?: boolean;
}

export default function DrawingApp({
  boundingBox = DEFAULT_BOUNDING_BOX,
  xLabel = "x",
  yLabel = "y",
  initialObjects,
  expectedDrawing,
  suggestedAnswer,
  enabledTools,
  enabledActions,
  defaultTool = "select",
  defaultColor = "#111827",
  colors,
  showColorPicker = true,
  showNavigation = false,
  showDownloadButton = true,
  downloadFilename = "drawing.png",
  showOutputButton = true,
  width = "100%",
  height = 720,
  initialDrawings,
  onDrawingsChange,
  readOnly = false,
  showAnswer = false,
}: DrawingAppProps) {
  const [activeTool, setActiveTool] = useState<ToolName>(defaultTool);
  const [color, setColor] = useState(defaultColor);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  // Bumped on every toolbar click (even re-clicking the already-active tool)
  // so single-shot tools like "coordinate" can be re-armed by reselecting them.
  const [toolActivationSeq, setToolActivationSeq] = useState(0);
  const [showDrawings, setShowDrawings] = useState(false);
  const [drawingsOutput, setDrawingsOutput] = useState("");

  const boardRef = useRef<DrawingBoardHandle>(null);

  const handleToolChange = (tool: ToolName) => {
    setActiveTool(tool);
    setToolActivationSeq((n) => n + 1);
  };

  const refreshDrawingsOutput = () => {
    const drawings = boardRef.current?.getUserDrawings() ?? [];
    setDrawingsOutput(JSON.stringify(drawings, null, 2));
    return drawings;
  };

  const [bbXMin, bbXMax, bbYMin, bbYMax] = boundingBox;
  // Memoized so the board only redraws the overlay when it actually changes.
  const answerObjects = useMemo(
    () =>
      !showAnswer
        ? undefined
        : suggestedAnswer && suggestedAnswer.length > 0
        ? suggestedAnswer
        : (expectedDrawing ?? [])
            .map((shape) => expectedShapeToDrawable(shape, [bbXMin, bbXMax, bbYMin, bbYMax]))
            .filter((spec): spec is InitialObjectSpec => spec !== null),
    [showAnswer, suggestedAnswer, expectedDrawing, bbXMin, bbXMax, bbYMin, bbYMax]
  );

  const actions = enabledActions ?? ALL_ACTIONS;

  const handleDownload = () => {
    boardRef.current?.downloadImage(downloadFilename).catch((err) => {
      console.error("Download failed:", err);
    });
  };

  return (
    <div className="drawing-app-root" style={{ width }}>
      <div className={`drawing-app${readOnly ? " drawing-app-readonly" : ""}`} style={{ height }}>
        <div className="canvas-row">
          <main className="board-container">
            <div className="board">
              <DrawingBoard
                ref={boardRef}
                boundingBox={boundingBox}
                xLabel={xLabel}
                yLabel={yLabel}
                initialObjects={initialObjects}
                initialDrawings={initialDrawings}
                activeTool={activeTool}
                color={color}
                showNavigation={showNavigation}
                toolActivationSeq={toolActivationSeq}
                onHistoryChange={({ canUndo, canRedo }) => {
                  setCanUndo(canUndo);
                  setCanRedo(canRedo);
                }}
                // Keep the open data panel in sync with undo/redo/erase/clear/drag.
                onDrawingsChange={() => onDrawingsChange?.(refreshDrawingsOutput())}
                overlayObjects={answerObjects}
              />
            </div>
          </main>

          <DrawingToolbar
            activeTool={activeTool}
            onToolChange={handleToolChange}
            color={color}
            onColorChange={setColor}
            enabledTools={enabledTools}
            colors={colors}
            showColorPicker={showColorPicker}
          />
        </div>

        {(showDownloadButton || showOutputButton || actions.length > 0) && (
          <div className="drawing-app-footer">
            <div className="footer-actions">
              {showDownloadButton && (
                <div className="output-button-wrapper">
                  <button className="output-button" onClick={handleDownload} aria-label="Download Image">
                    <Download />
                  </button>
                  <div className="output-tooltip">Download</div>
                </div>
              )}

              {showOutputButton && (
                <div className="output-button-wrapper">
                  <button
                    className="output-button"
                    onClick={() => setShowDrawings((v) => !v)}
                    aria-label={showDrawings ? "Hide Drawing Data" : "Show Drawing Data"}
                  >
                    {showDrawings ? <EyeOff /> : <Eye />}
                  </button>
                  <div className="output-tooltip">{showDrawings ? "Hide Drawing Data" : "Show Drawing Data"}</div>
                </div>
              )}

              {actions.includes("undo") && (
                <div className="output-button-wrapper">
                  <button
                    className="output-button"
                    onClick={() => boardRef.current?.undo()}
                    disabled={readOnly || !canUndo}
                    aria-label="Undo"
                  >
                    <Undo2 />
                  </button>
                  <div className="output-tooltip">Undo</div>
                </div>
              )}

              {actions.includes("redo") && (
                <div className="output-button-wrapper">
                  <button
                    className="output-button"
                    onClick={() => boardRef.current?.redo()}
                    disabled={readOnly || !canRedo}
                    aria-label="Redo"
                  >
                    <Redo2 />
                  </button>
                  <div className="output-tooltip">Redo</div>
                </div>
              )}

              {actions.includes("clear") && (
                <div className="output-button-wrapper">
                  <button
                    className="output-button delete-button"
                    onClick={() => boardRef.current?.clear()}
                    disabled={readOnly}
                    aria-label="Clear board"
                  >
                    <Trash2 />
                  </button>
                  <div className="output-tooltip">Clear board</div>
                </div>
              )}
            </div>

            {showOutputButton && showDrawings && <pre className="output-panel">{drawingsOutput}</pre>}
          </div>
        )}
      </div>
    </div>
  );
}
