import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OrderingInput } from "./OrderingInput";
import type { OrderingPart } from "./types";

const part: OrderingPart = {
  type: "ordering",
  name: "chain",
  items: ["Income increases", "Demand shifts right", "Price increases"],
  startOrder: [2, 0, 1],
};

function setup(props: { value?: number[]; disabled?: boolean; showCorrect?: boolean; part?: OrderingPart } = {}) {
  const onChange = vi.fn();
  render(
    <>
      <span id="lbl">Put the steps in order</span>
      <OrderingInput
        part={props.part ?? part}
        id="q-o"
        labelId="lbl"
        value={props.value}
        onChange={onChange}
        disabled={props.disabled}
        showCorrect={props.showCorrect}
      />
    </>,
  );
  return onChange;
}

describe("OrderingInput", () => {
  it("renders the boxes in the shuffled starting order", () => {
    setup();
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
    // startOrder = [2, 0, 1]: position 0 shows item 2's text, position 1 item 0's, position 2 item 1's.
    expect(items[0]).toHaveTextContent("Price increases");
    expect(items[1]).toHaveTextContent("Income increases");
    expect(items[2]).toHaveTextContent("Demand shifts right");
  });

  it("moves a box down (vertical layout) and reports the new arrangement", async () => {
    const onChange = setup();
    await userEvent.click(screen.getByRole("button", { name: "Move box 1 down" }));
    // Position 0 (item 2) and position 1 (item 0) swap.
    expect(onChange).toHaveBeenCalledWith([0, 2, 1]);
  });

  it("disables the first box's up button and the last box's down button", () => {
    setup();
    expect(screen.getByRole("button", { name: "Move box 1 up" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Move box 3 down" })).toBeDisabled();
  });

  it("uses left/right buttons in horizontal layout", () => {
    setup({ part: { ...part, layout: "horizontal" } });
    expect(screen.getByRole("button", { name: "Move box 1 left" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Move box 1 right" })).toBeInTheDocument();
  });

  it("marks correct and incorrect boxes once the answer is shown", () => {
    // value [0, 2, 1]: position 0 correct (item 0), positions 1/2 swapped.
    setup({ value: [0, 2, 1], showCorrect: true });
    const items = screen.getAllByRole("listitem");
    expect(items[0].className).toMatch(/emerald/);
    expect(items[1].className).toMatch(/red/);
    expect(items[2].className).toMatch(/red/);
    expect(items[0]).not.toHaveTextContent("Correct item");
    // Position 1 shows item 2's text but should hint item 1's (the correct item for position 2).
    expect(items[1]).toHaveTextContent("Demand shifts right");
    // Position 2 shows item 1's text but should hint item 2's (the correct item for position 3).
    expect(items[2]).toHaveTextContent("Price increases");
  });
});
