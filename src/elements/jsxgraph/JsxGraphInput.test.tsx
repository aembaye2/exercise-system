import { render, screen, act } from "@testing-library/react";
import { useState } from "react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import type { JsonValue } from "../../engine/types";
import type { DrawingAppProps } from "../../components/jsxgraphComponent";
import type { JsxGraphPart } from "./types";

// The real board needs a browser (JSXGraph draws into SVG it measures); stand in for it.
// The test setup already imported the real one (through ../elements), so re-import the input
// after the mock is in place.
let boards: DrawingAppProps[] = [];
let JsxGraphInput: typeof import("./JsxGraphInput").JsxGraphInput;
beforeAll(async () => {
  vi.doMock("../../components/jsxgraphComponent/DrawingApp", () => ({
    default: (props: DrawingAppProps) => {
      boards.push(props);
      return <div data-testid="board" data-readonly={String(!!props.readOnly)} data-answer={String(!!props.showAnswer)} />;
    },
  }));
  vi.resetModules();
  ({ JsxGraphInput } = await import("./JsxGraphInput"));
});

const part: JsxGraphPart = {
  type: "jsxgraph",
  name: "g",
  props: { expectedDrawing: [{ type: "segment", slope: -1, yIntercept: 8 }] },
};
const drawn = [{ tool: "segment", points: [[1, 7], [6, 2]], color: "#111827" }];

function Harness({ initial, disabled, showCorrect }: { initial?: JsonValue; disabled?: boolean; showCorrect?: boolean }) {
  const [value, setValue] = useState<JsonValue | undefined>(initial);
  return (
    <>
      <JsxGraphInput part={part} id="j" labelId="l" value={value} onChange={setValue} disabled={disabled} showCorrect={showCorrect} />
      <output data-testid="value">{JSON.stringify(value ?? null)}</output>
      <button onClick={() => setValue(undefined)}>reset</button>
    </>
  );
}

const last = () => boards[boards.length - 1];

describe("JsxGraphInput", () => {
  it("stores the drawing as the part's value whenever the board reports a change", () => {
    boards = [];
    render(<Harness />);
    act(() => last().onDrawingsChange?.([]));
    expect(screen.getByTestId("value").textContent).toBe("null"); // building the empty board isn't a change
    act(() => last().onDrawingsChange?.(drawn as never));
    expect(JSON.parse(screen.getByTestId("value").textContent!)).toEqual(drawn);
  });

  it("puts saved drawings back on the board, and doesn't rebuild it for its own changes", () => {
    boards = [];
    render(<Harness initial={drawn as never} />);
    expect(last().initialDrawings).toEqual(drawn);
    const count = boards.length;
    act(() => last().onDrawingsChange?.([]));
    // A user change is stored, and the board (which already shows it) is not remounted.
    expect(screen.getByTestId("value").textContent).toBe("[]");
    expect(screen.getAllByTestId("board")).toHaveLength(1);
    expect(boards.length - count).toBeLessThanOrEqual(1);
  });

  it("rebuilds the board when the value is reset from outside (a new variant)", () => {
    boards = [];
    render(<Harness initial={drawn as never} />);
    act(() => screen.getByText("reset").click());
    expect(last().initialDrawings).toEqual([]);
  });

  it("locks the board and shows the answer when the question is finished, ignoring further changes", () => {
    boards = [];
    render(<Harness initial={drawn as never} disabled showCorrect />);
    expect(screen.getByTestId("board").dataset.readonly).toBe("true");
    expect(screen.getByTestId("board").dataset.answer).toBe("true");
    act(() => last().onDrawingsChange?.([]));
    expect(JSON.parse(screen.getByTestId("value").textContent!)).toEqual(drawn);
  });
});
