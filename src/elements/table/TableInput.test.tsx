import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TableInput } from "./TableInput";
import type { TablePart } from "./types";

const part: TablePart = {
  type: "table",
  name: "t",
  columnGroups: [{ label: "Saudi Arabia", span: 2 }],
  columns: ["Oil", "Corn"],
  rows: [
    { label: "Without Trade" },
    { label: "Production", cells: [50, 12.5] },
    { label: "With Trade" },
    { label: "Production", cells: [{ correct: 100 }, { correct: 0 }] },
  ],
};

function setup(props: { value?: Record<string, string>; showCorrect?: boolean } = {}) {
  const onChange = vi.fn();
  render(
    <>
      <span id="lbl">Fill in</span>
      <TableInput part={part} id="q-t" labelId="lbl" value={props.value} onChange={onChange} showCorrect={props.showCorrect} />
    </>,
  );
  return onChange;
}

describe("TableInput", () => {
  it("renders a labelled table with fixed cells and one labelled box per blank", () => {
    setup();
    expect(screen.getByRole("table", { name: "Fill in" })).toBeInTheDocument();
    expect(screen.getByText("12.5")).toBeInTheDocument();
    expect(screen.getAllByRole("textbox")).toHaveLength(2);
    expect(screen.getByRole("textbox", { name: "With Trade – Production, Saudi Arabia, Corn" })).toBeInTheDocument();
  });

  it("reports the whole table value when a cell changes", async () => {
    const onChange = setup({ value: { "3:0": "100" } });
    await userEvent.type(screen.getByRole("textbox", { name: "With Trade – Production, Saudi Arabia, Corn" }), "0");
    expect(onChange).toHaveBeenLastCalledWith({ "3:0": "100", "3:1": "0" });
  });

  it("shows the correct value in place only for wrong cells once the answer is revealed", () => {
    setup({ value: { "3:0": "100", "3:1": "7" }, showCorrect: true });
    const corn = screen.getByRole("textbox", { name: "With Trade – Production, Saudi Arabia, Corn" });
    expect(corn).toHaveAttribute("aria-invalid", "true");
    expect(corn.parentElement).toHaveTextContent("Correct answer: 0");
    expect(screen.getByRole("textbox", { name: "With Trade – Production, Saudi Arabia, Oil" })).not.toHaveAttribute("aria-invalid");
  });
});
