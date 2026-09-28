import { forwardRef, createElement, useEffect, useRef, useState } from "react";
import type { SVGProps } from "react";
import {
  MousePointer2,
  Dot,
  Minus,
  MoveDiagonal,
  MoveUpRight,
  Square,
  Circle,
  Pentagon,
  Type,
  Eraser,
  Octagon,
} from "lucide-react";

import "./DrawingCanvas.css";
import type { ToolName } from "./drawingLogic";

export type { ToolName };

// Hex colors only.
export const COLORS = ["#111827", "#dc2626", "#2563eb", "#16a34a", "#7c3aed", "#ea580c"];

const SEGMENT_ICON = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <line x1="5" y1="19" x2="19" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="5" cy="19" r="2.5" fill="currentColor" />
    <circle cx="19" cy="5" r="2.5" fill="currentColor" />
  </svg>
);

type XYCoordIconProps = SVGProps<SVGSVGElement> & { size?: number };

const XYCoordIcon = forwardRef<SVGSVGElement, XYCoordIconProps>(
  ({ color = "currentColor", size = 24, ...props }, ref) =>
    createElement(
      "svg",
      {
        ...props,
        ref,
        width: size,
        height: size,
        viewBox: "0 0 100 100",
        fill: "none",
        stroke: color,
        strokeWidth: 8,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        xmlns: "http://www.w3.org/2000/svg",
      },
      // The broken horizontal and vertical lines (forming the '7')
      createElement("path", {
        d: "M 20 25 L 75 25 L 75 80",
        strokeDasharray: "12 12",
      }),
      // The filled connecting ball at the corner (75, 25)
      createElement("circle", {
        cx: 75,
        cy: 25,
        r: 12,
        fill: "red",
        stroke: "none",
      })
    )
);

type FourPointArcIconProps = SVGProps<SVGSVGElement> & { size?: number };

const FourPointArcIcon = forwardRef<SVGSVGElement, FourPointArcIconProps>(
  ({ color = "currentColor", size = 24, ...props }, ref) =>
    createElement(
      "svg",
      {
        ...props,
        ref,
        width: size,
        height: size,
        viewBox: "0 0 100 100",
        fill: "none",
        stroke: color,
        strokeWidth: 7,
        strokeLinecap: "round",
        xmlns: "http://www.w3.org/2000/svg",
      },
      createElement("path", { d: "M 10 20 Q 10 80 50 85 T 90 80" }),
      createElement("circle", { cx: 10, cy: 20, r: 11, fill: color, stroke: "none" }),
      createElement("circle", { cx: 18, cy: 68, r: 11, fill: color, stroke: "none" }),
      createElement("circle", { cx: 50, cy: 85, r: 11, fill: color, stroke: "none" }),
      createElement("circle", { cx: 90, cy: 80, r: 11, fill: color, stroke: "none" })
    )
);

/** Connected scatter plot: dots joined by straight segments. */
const ConnectedScatterIcon = forwardRef<SVGSVGElement, FourPointArcIconProps>(
  ({ color = "currentColor", size = 24, ...props }, ref) =>
    createElement(
      "svg",
      {
        ...props,
        ref,
        width: size,
        height: size,
        viewBox: "0 0 100 100",
        fill: "none",
        stroke: color,
        strokeWidth: 7,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        xmlns: "http://www.w3.org/2000/svg",
      },
      createElement("polyline", { points: "12,82 36,42 62,62 88,18" }),
      createElement("circle", { cx: 12, cy: 82, r: 10, fill: color, stroke: "none" }),
      createElement("circle", { cx: 36, cy: 42, r: 10, fill: color, stroke: "none" }),
      createElement("circle", { cx: 62, cy: 62, r: 10, fill: color, stroke: "none" }),
      createElement("circle", { cx: 88, cy: 18, r: 10, fill: color, stroke: "none" })
    )
);

const ALL_TOOLS: { name: ToolName; label: string; icon: React.ReactNode }[] = [
  { name: "select", label: "Select", icon: <MousePointer2 /> },
  { name: "segment", label: "Segment", icon: SEGMENT_ICON },
  { name: "point", label: "Point", icon: <Dot /> },
  { name: "line", label: "Line", icon: <Minus /> },
  { name: "arrow", label: "Arrow", icon: <MoveUpRight /> },
  { name: "doubleArrow", label: "Double Arrow", icon: <MoveDiagonal /> },  
  { name: "rectangle", label: "Rectangle", icon: <Square /> },
  { name: "circle", label: "Circle", icon: <Circle /> },
  { name: "polygon", label: "Polygon", icon: <Pentagon /> },
  { name: "scatter", label: "Connected Scatter", icon: <ConnectedScatterIcon /> },
  { name: "curve", label: "4-Point Curve", icon: <FourPointArcIcon /> },
  { name: "text", label: "Text", icon: <Type /> },
  { name: "coordinate", label: "Coordinate", icon: <XYCoordIcon /> },
  { name: "eraser", label: "Eraser", icon: <Eraser /> },
];

interface ToolButtonProps {
  name: ToolName;
  label: string;
  icon: React.ReactNode;
  activeTool: ToolName;
  onClick: (tool: ToolName) => void;
}

function ToolButton({ name, label, icon, activeTool, onClick }: ToolButtonProps) {
  return (
    <div className="tool-wrapper">
      <button
        className={`tool-button ${activeTool === name ? "tool-button-active" : ""}`}
        onClick={() => onClick(name)}
        aria-label={label}
      >
        {icon}
      </button>

      <div className="tool-tooltip">{label}</div>
    </div>
  );
}

// Vertical space used by one toolbar button (34px + 4px gap) and by the color picker
// section (divider + wheel).
const BUTTON_PITCH = 38;
const COLOR_SECTION_HEIGHT = 60;

export type ActionName = "undo" | "redo" | "clear";

export const ALL_ACTIONS: ActionName[] = ["undo", "redo", "clear"];

export interface DrawingToolbarProps {
  activeTool: ToolName;
  onToolChange: (tool: ToolName) => void;
  color: string;
  onColorChange: (color: string) => void;
  enabledTools?: ToolName[];
  /** Hex colors offered in the color wheel. Defaults to the built-in palette. */
  colors?: string[];
  /** Show the color wheel picker. Defaults to true. */
  showColorPicker?: boolean;
}

export default function DrawingToolbar({
  activeTool,
  onToolChange,
  color,
  onColorChange,
  enabledTools,
  colors = COLORS,
  showColorPicker = true,
}: DrawingToolbarProps) {
  const [showColors, setShowColors] = useState(false);
  const toolbarRef = useRef<HTMLElement>(null);
  const [twoColumns, setTwoColumns] = useState(false);

  const tools = enabledTools
    ? ALL_TOOLS.filter((t) => enabledTools.includes(t.name))
    : ALL_TOOLS;

  // One column of buttons needs about this much height; when the widget is shorter,
  // switch to two columns instead of clipping the buttons at the bottom.
  const neededHeight =
    20 +
    tools.length * BUTTON_PITCH +
    (showColorPicker ? COLOR_SECTION_HEIGHT : 0);

  useEffect(() => {
    const row = toolbarRef.current?.parentElement;
    if (!row) return;
    const measure = () => setTwoColumns(neededHeight > row.clientHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    return () => observer.disconnect();
  }, [neededHeight]);

  return (
    <aside ref={toolbarRef} className={`toolbar${twoColumns ? " toolbar-two-columns" : ""}`}>
      {/* <div className="toolbar-title">DT</div> */}
      <div className="tools-grid">
        {tools.map((tool) => (
          <ToolButton
            key={tool.name}
            name={tool.name}
            label={tool.label}
            icon={tool.icon}
            activeTool={activeTool}
            onClick={onToolChange}
          />
        ))}
      </div>

      {showColorPicker && (
        <>
          <div className="toolbar-divider" />

          {/* Color */}
          <div className="style-section">
            <div className="color-wheel">
              {showColors && (
                <div className="color-picker-backdrop" onClick={() => setShowColors(false)} />
              )}

              <button
                className="color-picker-trigger"
                onClick={() => setShowColors(!showColors)}
                title="Choose color"
                aria-label="Choose color"
              >
                <Octagon fill="#2563eb" color="#2563eb" />
              </button>

              {showColors && (
                <div className="color-picker-popover">
                  <input
                    type="color"
                    className="color-picker-native"
                    value={color}
                    onChange={(e) => onColorChange(e.target.value)}
                    aria-label="Pick a custom color"
                  />

                  <div className="color-swatch-row">
                    {colors.map((c) => (
                      <button
                        key={c}
                        className={`color-swatch ${color === c ? "selected-color" : ""}`}
                        style={{ backgroundColor: c }}
                        onClick={() => {
                          onColorChange(c);
                          setShowColors(false);
                        }}
                        aria-label={`Select ${c}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
