import { useId } from "react";
import { arrowHead, bounds, CANVAS, centroid, functionRuns, scales } from "./geometry";
import type { GraphColor, GraphSpec, Point } from "./types";

// Full class names (not built from parts) so Tailwind finds them.
const STROKE: Record<GraphColor | "default", string> = {
  default: "stroke-slate-800 dark:stroke-slate-200",
  blue: "stroke-blue-600 dark:stroke-blue-400",
  red: "stroke-red-600 dark:stroke-red-400",
  green: "stroke-emerald-600 dark:stroke-emerald-400",
  orange: "stroke-orange-600 dark:stroke-orange-400",
  purple: "stroke-purple-600 dark:stroke-purple-400",
  gray: "stroke-slate-400 dark:stroke-slate-500",
};
const FILL: Record<GraphColor | "default", string> = {
  default: "fill-slate-800 dark:fill-slate-200",
  blue: "fill-blue-600 dark:fill-blue-400",
  red: "fill-red-600 dark:fill-red-400",
  green: "fill-emerald-600 dark:fill-emerald-400",
  orange: "fill-orange-600 dark:fill-orange-400",
  purple: "fill-purple-600 dark:fill-purple-400",
  gray: "fill-slate-400 dark:fill-slate-500",
};

// Labels get an outline in the page background color, so they stay readable over lines.
const HALO = "stroke-white dark:stroke-slate-900";
const haloProps = { paintOrder: "stroke", strokeWidth: 3, strokeLinejoin: "round" } as const;

export interface GraphViewProps {
  spec: GraphSpec;
  /** Describes the graph for screen readers (the SVG is an image to them). */
  label: string;
  className?: string;
}

/** A static graph drawn as SVG: axes, then the shapes in order. Display only. */
export function GraphView({ spec, label, className }: GraphViewProps) {
  const clipId = `graph-clip-${useId().replace(/:/g, "")}`;
  const s = scales(spec);
  const { xMin, yMin } = bounds(spec);
  const at = ([x, y]: Point): Point => [s.x(x), s.y(y)];
  const origin = at([xMin, yMin]);
  const right = s.plot.x + s.plot.width;
  const top = s.plot.y;
  const text = "fill-slate-700 dark:fill-slate-300";

  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}
      className={`h-auto w-full ${className ?? ""}`}
      fontSize={12}
    >
      <defs>
        <clipPath id={clipId}>
          <rect x={s.plot.x} y={s.plot.y} width={s.plot.width} height={s.plot.height} />
        </clipPath>
      </defs>

      {/* Axes, ticks and axis labels */}
      <g className={STROKE.default} strokeWidth={1.25} fill="none">
        <line x1={origin[0]} y1={origin[1]} x2={right + 6} y2={origin[1]} />
        <line x1={origin[0]} y1={origin[1]} x2={origin[0]} y2={top - 6} />
        {(spec.xTicks ?? []).map((v) => (
          <line key={`xt${v}`} x1={s.x(v)} y1={origin[1]} x2={s.x(v)} y2={origin[1] + 4} />
        ))}
        {(spec.yTicks ?? []).map((v) => (
          <line key={`yt${v}`} x1={origin[0] - 4} y1={s.y(v)} x2={origin[0]} y2={s.y(v)} />
        ))}
      </g>
      <g className={text}>
        {(spec.xTicks ?? []).map((v) => (
          <text key={`xl${v}`} x={s.x(v)} y={origin[1] + 15} textAnchor="middle" fontSize={10}>
            {v}
          </text>
        ))}
        {(spec.yTicks ?? []).map((v) => (
          <text key={`yl${v}`} x={origin[0] - 6} y={s.y(v) + 3.5} textAnchor="end" fontSize={10}>
            {v}
          </text>
        ))}
        {spec.xLabel && (
          <text x={right + 4} y={origin[1] + 16} textAnchor="end" fontStyle="italic">
            {spec.xLabel}
          </text>
        )}
        {spec.yLabel && (
          <text x={origin[0] - 8} y={top - 2} textAnchor="end" fontStyle="italic">
            {spec.yLabel}
          </text>
        )}
      </g>

      {/* Shapes, clipped to the plot area; their labels are drawn unclipped on top */}
      <g clipPath={`url(#${clipId})`} fill="none" strokeWidth={2} strokeLinecap="round">
        {spec.shapes.map((shape, i) => {
          const color = "color" in shape && shape.color ? shape.color : "default";
          switch (shape.type) {
            case "segment": {
              const [a, b] = [at(shape.from), at(shape.to)];
              return (
                <line key={i} className={STROKE[color]} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} strokeDasharray={shape.dashed ? "6 4" : undefined} />
              );
            }
            case "function":
              return functionRuns(spec, shape).map((run, j) => (
                <polyline
                  key={`${i}-${j}`}
                  className={STROKE[color]}
                  points={run.map((p) => at(p).join(",")).join(" ")}
                  strokeDasharray={shape.dashed ? "6 4" : undefined}
                  strokeLinejoin="round"
                />
              ));
            case "polygon":
              return (
                <polygon
                  key={i}
                  className={`${FILL[color]} ${STROKE[color]}`}
                  points={shape.points.map((p) => at(p).join(",")).join(" ")}
                  fillOpacity={0.25}
                  strokeWidth={0}
                />
              );
            case "arrow": {
              const [a, b] = [at(shape.from), at(shape.to)];
              const [c1, c2] = arrowHead(a, b);
              return (
                <g key={i} className={STROKE[color]}>
                  <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} strokeWidth={1.5} />
                  <polyline points={`${c1.join(",")} ${b.join(",")} ${c2.join(",")}`} strokeWidth={1.5} strokeLinejoin="round" />
                </g>
              );
            }
            case "point": {
              const p = at(shape.at);
              return (
                <g key={i}>
                  {shape.guides && (
                    <polyline
                      className={STROKE.gray}
                      points={`${origin[0]},${p[1]} ${p[0]},${p[1]} ${p[0]},${origin[1]}`}
                      strokeWidth={1}
                      strokeDasharray="3 3"
                    />
                  )}
                  <circle className={FILL[color]} cx={p[0]} cy={p[1]} r={3.5} stroke="none" />
                </g>
              );
            }
            default:
              return null;
          }
        })}
      </g>
      <g>
        {spec.shapes.map((shape, i) => {
          if (shape.type === "text") {
            const p = at(shape.at);
            return (
              <text key={i} className={`${shape.color ? FILL[shape.color] : text} ${HALO}`} x={p[0]} y={p[1] + 4} textAnchor="middle" {...haloProps}>
                {shape.text}
              </text>
            );
          }
          if (!shape.label) return null;
          const fill = FILL[shape.color ?? "default"];
          let p: Point;
          let anchor: "start" | "middle" = "start";
          if (shape.type === "segment" || shape.type === "arrow") p = at(shape.to);
          else if (shape.type === "point") p = at(shape.at);
          else if (shape.type === "polygon") {
            p = at(centroid(shape.points));
            anchor = "middle";
          } else {
            const runs = functionRuns(spec, shape);
            const last = runs[runs.length - 1]?.[runs[runs.length - 1].length - 1];
            if (!last) return null;
            p = at(last);
          }
          // Points: right of the dot (between the curves at an equilibrium); lines: just past the end.
          const dx = anchor === "middle" ? 0 : shape.type === "point" ? 7 : 5;
          const dy = shape.type === "polygon" || shape.type === "point" ? 4 : -4;
          return (
            <text key={i} className={`${fill} ${HALO}`} x={p[0] + dx} y={p[1] + dy} textAnchor={anchor} fontWeight={600} {...haloProps}>
              {shape.label}
            </text>
          );
        })}
      </g>
    </svg>
  );
}
