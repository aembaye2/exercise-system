import { forwardRef, createElement, useState } from "react";
import type { ReactNode, SVGProps } from "react";
import { MousePointer2, Dot, Minus, MoveDiagonal, MoveUpRight, Square, Circle, Pentagon, Type, Palette } from "lucide-react";

import "./DrawingCanvas.css";
import type { ToolName } from "./DrawingBoard";

export type { ToolName };
export type ActionName = "undo" | "redo" | "clear";

// Hex colors only.
export const COLORS = ["#111827", "#dc2626", "#2563eb", "#16a34a", "#7c3aed", "#ea580c"];

const SegmentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <line x1="5" y1="19" x2="19" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="5" cy="19" r="2.5" fill="currentColor" />
    <circle cx="19" cy="5" r="2.5" fill="currentColor" />
  </svg>
);

// The next three icons are the same custom shapes used by the jsxgraph
// board's toolbar (src/components/jsxgraphComponent/canvas/drawingTools.tsx),
// borrowed so the two boards' toolbars look the same for these tools.
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const XYCoordIcon = forwardRef<SVGSVGElement, IconProps>(({ color = "currentColor", size = 24, ...props }, ref) =>
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
    createElement("path", { d: "M 20 25 L 75 25 L 75 80", strokeDasharray: "12 12" }),
    // The filled connecting ball at the corner (75, 25)
    createElement("circle", { cx: 75, cy: 25, r: 12, fill: "red", stroke: "none" })
  )
);

const FourPointArcIcon = forwardRef<SVGSVGElement, IconProps>(({ color = "currentColor", size = 24, ...props }, ref) =>
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
const ConnectedScatterIcon = forwardRef<SVGSVGElement, IconProps>(({ color = "currentColor", size = 24, ...props }, ref) =>
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

const TOOLS: { name: ToolName; label: string; icon: ReactNode }[] = [
  { name: "select", label: "Select", icon: <MousePointer2 /> },
  { name: "segment", label: "Segment", icon: <SegmentIcon /> },
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
];

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
  const [open, setOpen] = useState(false);
  const shown = enabledTools ? TOOLS.filter((t) => enabledTools.includes(t.name)) : TOOLS;

  return (
    <aside className="toolbar">
      <div className="tools-grid">
        {shown.map((t) => (
          <div className="tool-wrapper" key={t.name}>
            <button
              type="button"
              className={`tool-button ${activeTool === t.name ? "tool-button-active" : ""}`}
              onClick={() => onToolChange(t.name)}
              aria-label={t.label}
            >
              {t.icon}
            </button>
            <span className="tool-tooltip">{t.label}</span>
          </div>
        ))}
      </div>

      {showColorPicker && (
        <>
          <div className="toolbar-divider" />
          <div className="tool-wrapper">
            <button type="button" className="color-picker-trigger" onClick={() => setOpen((v) => !v)} aria-label="Choose color">
              <Palette style={{ color }} />
            </button>
            {open && (
              <div className="color-picker-popover">
                <input type="color" value={color} onChange={(e) => onColorChange(e.target.value)} aria-label="Pick a custom color" />
                <div className="color-swatch-row">
                  {colors.map((c) => (
                    <button
                      key={c}
                      className={`color-swatch ${c === color ? "selected-color" : ""}`}
                      style={{ background: c }}
                      onClick={() => {
                        onColorChange(c);
                        setOpen(false);
                      }}
                      aria-label={`Select ${c}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </aside>
  );
}
