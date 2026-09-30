import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MatchingInput } from "./MatchingInput";
import type { MatchingPart } from "./types";

const part: MatchingPart = {
  type: "matching",
  name: "m",
  pairs: [
    { left: "Scarcity", right: "Unlimited wants, limited resources" },
    { left: "Opportunity cost", right: "Value of the next best alternative" },
    { left: "Elastic demand", right: "Quantity responds a lot to price" },
  ],
  rightOrder: [2, 0, 1],
};

function setup(props: { value?: number[]; disabled?: boolean; showCorrect?: boolean } = {}) {
  const onChange = vi.fn();
  render(
    <>
      <span id="lbl">Match each term</span>
      <MatchingInput part={part} id="q-m" labelId="lbl" value={props.value} onChange={onChange} disabled={props.disabled} showCorrect={props.showCorrect} />
    </>,
  );
  return onChange;
}

describe("MatchingInput", () => {
  it("interleaves left and right rows (left0, right0, left1, right1, ...) so each pair shares a grid row", () => {
    setup();
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(6);
    expect(items[0]).toHaveTextContent("Scarcity");
    // rightOrder = [2, 0, 1]: row 0 shows pair 2's text, row 1 pair 0's, row 2 pair 1's.
    expect(items[1]).toHaveTextContent("Quantity responds a lot to price");
    expect(items[2]).toHaveTextContent("Opportunity cost");
    expect(items[3]).toHaveTextContent("Unlimited wants, limited resources");
    expect(items[4]).toHaveTextContent("Elastic demand");
    expect(items[5]).toHaveTextContent("Value of the next best alternative");
  });

  it("moves a right-column row down and reports the new arrangement", async () => {
    const onChange = setup();
    await userEvent.click(screen.getByRole("button", { name: "Move item a down" }));
    // Row 0 (pair 2) and row 1 (pair 0) swap.
    expect(onChange).toHaveBeenCalledWith([0, 2, 1]);
  });

  it("disables the top row's up button and the bottom row's down button", () => {
    setup();
    expect(screen.getByRole("button", { name: "Move item a up" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Move item c down" })).toBeDisabled();
  });

  it("marks correct and incorrect rows once the answer is shown", () => {
    // value [0, 2, 1]: row 0 correct (pair 0), rows 1/2 swapped.
    setup({ value: [0, 2, 1], showCorrect: true });
    const items = screen.getAllByRole("listitem");
    const rightRows = [items[1], items[3], items[5]];
    expect(rightRows[0].className).toMatch(/emerald/);
    expect(rightRows[1].className).toMatch(/red/);
    expect(rightRows[2].className).toMatch(/red/);
    expect(rightRows[0]).not.toHaveTextContent("Correct match");
    // Row 1 shows pair 2's text but should hint pair 1's (the correct match for item 2).
    expect(rightRows[1]).toHaveTextContent("Value of the next best alternative");
    // Row 2 shows pair 1's text but should hint pair 2's (the correct match for item 3).
    expect(rightRows[2]).toHaveTextContent("Quantity responds a lot to price");
  });
});
