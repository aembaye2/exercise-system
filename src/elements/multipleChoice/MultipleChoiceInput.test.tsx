import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MultipleChoiceInput } from "./MultipleChoiceInput";
import type { MultipleChoicePart } from "./types";

const part: MultipleChoicePart = {
  type: "multiple-choice",
  name: "mc",
  order: "fixed",
  options: [{ text: "Alpha" }, { text: "Beta", correct: true }, { text: "$\\gamma$" }],
};

function setup(display: "radio" | "dropdown", value?: number) {
  const onChange = vi.fn();
  render(
    <>
      <span id="lbl">Pick one</span>
      <MultipleChoiceInput part={{ ...part, display }} id="q-mc" labelId="lbl" value={value} onChange={onChange} />
    </>,
  );
  return onChange;
}

describe("MultipleChoiceInput", () => {
  it("renders a labelled radio group and reports the chosen index", async () => {
    const onChange = setup("radio");
    const group = screen.getByRole("radiogroup", { name: "Pick one" });
    expect(group).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(3);
    await userEvent.click(screen.getByLabelText("Beta"));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it("renders LaTeX in radio options", () => {
    setup("radio");
    expect(document.querySelector(".katex")).not.toBeNull();
  });

  it("renders a dropdown and reports the chosen index", async () => {
    const onChange = setup("dropdown");
    const select = screen.getByRole("combobox", { name: "Pick one" });
    await userEvent.selectOptions(select, "Beta");
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it("reflects the current value", () => {
    setup("radio", 2);
    expect((screen.getAllByRole("radio")[2] as HTMLInputElement).checked).toBe(true);
  });
});
