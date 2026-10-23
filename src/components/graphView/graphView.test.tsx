import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { formatMultipleChoiceAnswer, formatMultipleChoiceCorrect } from "../../elements/multipleChoice/gradeMultipleChoice";
import { MultipleChoiceInput } from "../../elements/multipleChoice/MultipleChoiceInput";
import { checkMultipleChoice } from "../../elements/multipleChoice/prepareMultipleChoice";
import type { MultipleChoicePart } from "../../elements/multipleChoice/types";
import { AuthoringError } from "../../engine/types";
import { arrowHead, checkGraph, functionRuns, scales } from "./geometry";
import { GraphView } from "./GraphView";
import type { GraphSpec } from "./types";

const graph: GraphSpec = {
  xMax: 10,
  yMax: 10,
  xLabel: "Q",
  yLabel: "P",
  shapes: [
    { type: "segment", from: [0, 8], to: [8, 0], label: "D₁", color: "blue" },
    { type: "function", fn: "1 + x", dashed: true, label: "S" },
    { type: "point", at: [3.5, 4.5], guides: true, label: "E" },
    { type: "polygon", points: [[0, 8], [0, 4.5], [3.5, 4.5]], color: "green", label: "CS" },
    { type: "arrow", from: [2, 9], to: [4, 9] },
    { type: "text", at: [8, 9], text: "note" },
  ],
};

describe("graph geometry", () => {
  it("maps graph coordinates into the plot area, y upward", () => {
    const s = scales(graph);
    expect(s.x(0)).toBe(s.plot.x);
    expect(s.x(10)).toBe(s.plot.x + s.plot.width);
    expect(s.y(0)).toBe(s.plot.y + s.plot.height);
    expect(s.y(10)).toBe(s.plot.y);
  });

  it("samples a function and splits it where it's undefined", () => {
    const runs = functionRuns({ xMin: -5, xMax: 5, yMax: 10, yMin: -10, shapes: [] }, { type: "function", fn: "sqrt(x^2 - 1)" });
    expect(runs).toHaveLength(2); // undefined (complex -> not a plain number) for |x| < 1
    expect(functionRuns(graph, { type: "function", fn: "x", domain: [2, 4] })[0][0]).toEqual([2, 2]);
  });

  it("points the arrowhead back along the arrow", () => {
    const [a, b] = arrowHead([0, 0], [10, 0]);
    expect(a[0]).toBeLessThan(10);
    expect(b[0]).toBeLessThan(10);
    expect(a[1]).toBeCloseTo(-b[1]);
  });

  it("accepts a valid graph and rejects malformed ones", () => {
    expect(() => checkGraph(graph)).not.toThrow();
    expect(() => checkGraph({ ...graph, xMax: 0 })).toThrow(AuthoringError);
    expect(() => checkGraph({ ...graph, shapes: [{ type: "segment", from: [0, 1], to: [1] as never }] })).toThrow(AuthoringError);
    expect(() => checkGraph({ ...graph, shapes: [{ type: "function", fn: "x +* 1" }] })).toThrow(AuthoringError);
    expect(() => checkGraph({ ...graph, shapes: [{ type: "function", fn: "a * x" }] })).toThrow(AuthoringError);
    expect(() => checkGraph({ ...graph, shapes: [{ type: "polygon", points: [[0, 0], [1, 1]] }] })).toThrow(AuthoringError);
    expect(() => checkGraph({ ...graph, shapes: [{ type: "circle" } as never] })).toThrow(AuthoringError);
  });
});

describe("GraphView", () => {
  it("renders an SVG image with the given label, its axis labels and shape labels", () => {
    render(<GraphView spec={graph} label="A demand curve" />);
    const svg = screen.getByRole("img", { name: "A demand curve" });
    for (const t of ["Q", "P", "D₁", "S", "E", "CS", "note"]) expect(svg).toHaveTextContent(t);
    expect(svg.querySelectorAll("polyline").length).toBeGreaterThan(0);
  });
});

describe("multiple-choice with graph options", () => {
  const part: MultipleChoicePart = {
    type: "multiple-choice",
    name: "mc",
    order: "fixed",
    options: [
      { text: "Demand shifts right", correct: true, graph },
      { text: "Demand shifts left", graph },
    ],
  };

  it("shows the graphs as labelled radio cards and reports the chosen index", async () => {
    const onChange = vi.fn();
    render(
      <>
        <span id="lbl">Pick a graph</span>
        <MultipleChoiceInput part={part} id="q" labelId="lbl" value={undefined} onChange={onChange} />
      </>,
    );
    expect(screen.getByRole("radiogroup", { name: "Pick a graph" })).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(2);
    await userEvent.click(screen.getByRole("radio", { name: /Graph B/ }));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it("names graph options by letter and text in reviews", () => {
    expect(formatMultipleChoiceAnswer(part, 1)).toBe("Graph B: Demand shifts left");
    expect(formatMultipleChoiceCorrect(part)).toBe("Graph A: Demand shifts right");
  });

  it("rejects graph options in a dropdown and malformed graphs", () => {
    expect(() => checkMultipleChoice(part)).not.toThrow();
    expect(() => checkMultipleChoice({ ...part, display: "dropdown" })).toThrow(AuthoringError);
    expect(() => checkMultipleChoice({ ...part, options: [{ text: "x", correct: true, graph: { ...graph, yMax: -1 } }] })).toThrow(
      AuthoringError,
    );
  });
});
