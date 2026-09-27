import { useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Eye, EyeOff, CheckCircle2, Download, Lightbulb, LightbulbOff } from "lucide-react";

import DrawingToolbar, { COLORS } from "./canvas/drawingTools";
import type { ActionName } from "./canvas/drawingTools";
import DrawingBoard from "./canvas/drawingLogic";
import type {
  BoundingBox,
  DrawingBoardHandle,
  InitialObjectSpec,
  ToolName,
  UserDrawing,
} from "./canvas/drawingLogic";
import { expectedShapeToDrawable, gradeDrawing } from "./canvas/grading";
import type { ExpectedShape, GradeResult } from "./canvas/grading";
import "./canvas/DrawingCanvas.css";

export type { BoundingBox, InitialObjectSpec, ToolName, ActionName, UserDrawing, ExpectedShape, GradeResult };
export { COLORS };

export interface DrawingAppProps {
  /** Question/instructions shown above the widget, outside its frame and at
   * the same width. A string is split into paragraphs on blank lines (single
   * line breaks are kept); pass JSX instead for rich formatting. */
  questionText?: ReactNode;
  /** [xMin, xMax, yMin, yMax]. Defaults to a symmetric [-10, 10, -10, 10] square. */
  boundingBox?: BoundingBox;
  xLabel?: string;
  yLabel?: string;
  /** Shapes drawn on the board before the student touches anything. */
  initialObjects?: InitialObjectSpec[];
  /** The teacher's reference drawing, compared against the student's drawing
   * when the "Grade" button is clicked. Only shapes with a `tool` grading is
   * implemented for (currently just "line") are actually checked. */
  expectedDrawing?: ExpectedShape[];
  /** Exact shapes shown (dashed) by the "Suggested Answer" button, each in its
   * own `color`. When omitted, the button shows `expectedDrawing` instead. */
  suggestedAnswer?: InitialObjectSpec[];
  /** Which toolbar buttons are available for this exercise. Defaults to all tools. */
  enabledTools?: ToolName[];
  /** Which action buttons (undo/redo/clear) are available for this exercise. Defaults to all actions. */
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
  /** Show the "Grade" button below the board. Defaults to true; the button
   * only appears when `expectedDrawing` is non-empty. */
  showGradeButton?: boolean;
  /** Show the "Suggested Answer" button below the board, which toggles
   * `suggestedAnswer` (or, without it, `expectedDrawing`) on the board.
   * Defaults to true; the button only appears when one of them is non-empty. */
  showSuggestedAnswerButton?: boolean;
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

/** Renders `questionText`: strings become one <p> per blank-line-separated paragraph. */
function renderQuestion(questionText: ReactNode) {
  if (typeof questionText !== "string") return questionText;
  return questionText
    .trim()
    .split(/\n\s*\n/)
    .map((para, i) => <p key={i}>{para.trim()}</p>);
}

export default function DrawingApp({
  questionText,
  boundingBox = [-10, 10, -10, 10],
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
  showGradeButton = true,
  showSuggestedAnswerButton = true,
  showDownloadButton = true,
  downloadFilename = "drawing.png",
  showOutputButton = true,
  width = "100%",
  height = 720,
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
  const [gradeResult, setGradeResult] = useState<GradeResult | null>(null);
  const [showSuggested, setShowSuggested] = useState(false);

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

  const handleToggleDrawings = () => {
    if (!showDrawings) {
      console.log("User drawings:", refreshDrawingsOutput());
    }
    setShowDrawings((v) => !v);
  };

  const hasExpected = !!expectedDrawing && expectedDrawing.length > 0;
  const gradeEnabled = showGradeButton && hasExpected;
  const hasSuggested = !!suggestedAnswer && suggestedAnswer.length > 0;
  const suggestedEnabled = showSuggestedAnswerButton && (hasSuggested || hasExpected);

  const [bbXMin, bbXMax, bbYMin, bbYMax] = boundingBox;
  // Memoized so the board only redraws the overlay when it actually changes.
  const suggestedObjects = useMemo(
    () =>
      !suggestedEnabled || !showSuggested
        ? undefined
        : hasSuggested
        ? suggestedAnswer
        : (expectedDrawing ?? [])
            .map((shape) => expectedShapeToDrawable(shape, [bbXMin, bbXMax, bbYMin, bbYMax]))
            .filter((spec): spec is InitialObjectSpec => spec !== null),
    [suggestedEnabled, showSuggested, hasSuggested, suggestedAnswer, expectedDrawing, bbXMin, bbXMax, bbYMin, bbYMax]
  );

  const handleDownload = () => {
    boardRef.current?.downloadImage(downloadFilename).catch((err) => {
      console.error("Download failed:", err);
    });
  };

  const handleGrade = () => {
    const userDrawings = boardRef.current?.getUserDrawings() ?? [];
    const result = gradeDrawing(expectedDrawing ?? [], userDrawings, boundingBox);
    console.log("Grade result:", result);
    setGradeResult(result);
  };

  return (
    <div className="drawing-app-root" style={{ width }}>
      {questionText != null && questionText !== "" && (
        <div className="drawing-app-question">{renderQuestion(questionText)}</div>
      )}
      <div className="drawing-app" style={{ height }}>
        <div className="canvas-row">
          <main className="board-container">
            <div className="board">
              <DrawingBoard
                ref={boardRef}
                boundingBox={boundingBox}
                xLabel={xLabel}
                yLabel={yLabel}
                initialObjects={initialObjects}
                activeTool={activeTool}
                color={color}
                showNavigation={showNavigation}
                toolActivationSeq={toolActivationSeq}
                onHistoryChange={({ canUndo, canRedo }) => {
                  setCanUndo(canUndo);
                  setCanRedo(canRedo);
                }}
                // Keep the open data panel in sync with undo/redo/erase/clear/drag.
                onDrawingsChange={refreshDrawingsOutput}
                overlayObjects={suggestedObjects}
              />
            </div>
          </main>

          <DrawingToolbar
            activeTool={activeTool}
            onToolChange={handleToolChange}
            color={color}
            onColorChange={setColor}
            enabledTools={enabledTools}
            enabledActions={enabledActions}
            colors={colors}
            showColorPicker={showColorPicker}
            canUndo={canUndo}
            canRedo={canRedo}
            onUndo={() => boardRef.current?.undo()}
            onRedo={() => boardRef.current?.redo()}
            onClear={() => boardRef.current?.clear()}
          />
        </div>

        {(showDownloadButton || showOutputButton || gradeEnabled || suggestedEnabled) && (
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
                    onClick={handleToggleDrawings}
                    aria-label={showDrawings ? "Hide Drawing Data" : "Show Drawing Data"}
                  >
                    {showDrawings ? <EyeOff /> : <Eye />}
                  </button>
                  <div className="output-tooltip">
                    {showDrawings ? "Hide Drawing Data" : "Show Drawing Data"}
                  </div>
                </div>
              )}

              {gradeEnabled && (
                <button className="grade-button" onClick={handleGrade}>
                  <CheckCircle2 />
                  Grade
                </button>
              )}

              {suggestedEnabled && (
                <button
                  className="grade-button suggested-button"
                  onClick={() => setShowSuggested((v) => !v)}
                  aria-pressed={showSuggested}
                >
                  {showSuggested ? <LightbulbOff /> : <Lightbulb />}
                  {showSuggested ? "Hide Feedback" : "Feedback"}
                </button>
              )}
            </div>

            {showOutputButton && showDrawings && <pre className="output-panel">{drawingsOutput}</pre>}

            {gradeEnabled && gradeResult && (
              <div className="grade-result">
                <div className="grade-score">
                  Score: {gradeResult.correct} / {gradeResult.total} ({gradeResult.score}%)
                </div>
                <ul className="grade-details">
                  {gradeResult.details.map((d) => (
                    <li key={d.index} className={d.correct ? "grade-correct" : "grade-incorrect"}>
                      Shape {d.index + 1} ({d.tool}): {d.correct ? "Correct" : "Incorrect"} — {d.reason}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
