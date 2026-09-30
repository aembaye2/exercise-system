import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ExpressionInput } from "./ExpressionInput";
import type { ExpressionPart } from "./types";

const part: ExpressionPart = {
  type: "expression",
  name: "poly",
  correct: "x^2 + 1/2 x + 1",
};

function setup(value?: string) {
  const onChange = vi.fn();
  render(
    <>
      <span id="lbl">Enter the expression</span>
      <ExpressionInput part={part} id="q-e" labelId="lbl" value={value} onChange={onChange} />
    </>,
  );
  return onChange;
}

describe("ExpressionInput", () => {
  it("shows a placeholder preview before anything is typed", () => {
    setup();
    expect(screen.getByText("Preview appears here as you type…")).toBeInTheDocument();
  });

  it("reports what the student types", async () => {
    const onChange = setup();
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "x");
    expect(onChange).toHaveBeenLastCalledWith("x");
  });

  it("renders a typeset KaTeX preview of a parseable expression", () => {
    setup("x^2 + 1/2 x + 1");
    // KaTeX renders math into .katex spans rather than plain text nodes.
    expect(document.querySelector(".katex")).not.toBeNull();
  });

  it("falls back to a quiet placeholder while the expression is mid-typing (unparseable)", () => {
    setup("x +");
    expect(document.querySelector(".katex")).toBeNull();
  });
});
