import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import type { JsonValue } from "../../engine/types";
import { DrawingInput } from "./DrawingInput";
import type { DrawingPart } from "./types";

const part: DrawingPart = {
  type: "drawing",
  name: "g",
  x: { max: 20, snap: 0.5, label: "Quantity" },
  y: { max: 20, snap: 0.5, label: "Price" },
  initial: [{ type: "line", id: "D1", from: [0, 14], to: [14, 0], label: "D₁" }],
  tools: [
    { type: "point", label: "equilibrium" },
    { type: "line", copyOf: "D1", label: "new demand curve", tag: "D₂" },
  ],
  answer: [{ type: "point", label: "equilibrium", x: 10, y: 10 }],
};

function Harness({ initial, disabled, showCorrect }: { initial?: JsonValue; disabled?: boolean; showCorrect?: boolean }) {
  const [value, setValue] = useState<JsonValue | undefined>(initial);
  return (
    <>
      <span id="lbl">Graph</span>
      <DrawingInput part={part} id="d" labelId="lbl" value={value} onChange={setValue} disabled={disabled} showCorrect={showCorrect} />
      <output data-testid="value">{JSON.stringify(value ?? null)}</output>
    </>
  );
}

const valueOf = () => JSON.parse(screen.getByTestId("value").textContent ?? "null");

describe("DrawingInput", () => {
  it("adds objects from the toolbar, respecting each tool's max", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    expect(screen.getByRole("group", { name: "Graph" })).toBeInTheDocument();
    const add = screen.getByRole("button", { name: /Add equilibrium/ });
    await user.click(add);
    expect(valueOf()).toEqual([{ type: "point", tool: 0, x: 10, y: 10 }]);
    expect(add).toBeDisabled();
    expect(screen.getByText(/Your drawing: equilibrium at \(10, 10\)/)).toBeInTheDocument();
  });

  it("moves a focused handle with the arrow keys (Shift for 5 steps)", async () => {
    const user = userEvent.setup();
    render(<Harness initial={[{ type: "point", tool: 0, x: 10, y: 10 }]} />);
    const handle = screen.getByRole("button", { name: /^equilibrium at \(10, 10\)/ });
    handle.focus();
    await user.keyboard("{ArrowRight}{ArrowUp}");
    expect(valueOf()).toEqual([{ type: "point", tool: 0, x: 10.5, y: 10.5 }]);
    await user.keyboard("{Shift>}{ArrowLeft}{/Shift}");
    expect(valueOf()[0].x).toBe(8);
  });

  it("shifts a copied line with its square handle without turning it", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole("button", { name: /Add new demand curve/ }));
    const before = valueOf()[0];
    screen.getByRole("button", { name: /Move the whole new demand curve/ }).focus();
    await user.keyboard("{ArrowRight}{ArrowRight}");
    const after = valueOf()[0];
    const slope = (l: { from: number[]; to: number[] }) => (l.to[1] - l.from[1]) / (l.to[0] - l.from[0]);
    expect(slope(after)).toBeCloseTo(slope(before));
    // Shifted right by 1 = two 0.5 steps: x at y = 7 grows by 1.
    const xAt = (l: { from: number[]; to: number[] }, y: number) => l.from[0] + ((y - l.from[1]) * (l.to[0] - l.from[0])) / (l.to[1] - l.from[1]);
    expect(xAt(after, 7) - xAt(before, 7)).toBeCloseTo(1);
  });

  it("deletes with the Delete key and undoes", async () => {
    const user = userEvent.setup();
    render(<Harness initial={[{ type: "point", tool: 0, x: 4, y: 4 }]} />);
    screen.getByRole("button", { name: /^equilibrium at/ }).focus();
    await user.keyboard("{Delete}");
    expect(valueOf()).toEqual([]);
    await user.click(screen.getByRole("button", { name: "Undo" }));
    expect(valueOf()).toEqual([{ type: "point", tool: 0, x: 4, y: 4 }]);
  });

  it("is read-only when disabled and shows the correct answer when asked", () => {
    render(<Harness initial={[{ type: "point", tool: 0, x: 4, y: 4 }]} disabled showCorrect />);
    expect(screen.queryByRole("toolbar")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /equilibrium at/ })).not.toBeInTheDocument();
    expect(screen.getByText(/a correct answer/)).toBeInTheDocument();
  });
});
