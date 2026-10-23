import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConditionalGradingInput } from "./ConditionalGradingInput";
import type { ConditionalGradingPart } from "./types";

const part: ConditionalGradingPart = {
  type: "conditional-grading",
  name: "steps",
  steps: [
    { name: "a", kind: "expression", label: "a) Derivative", correct: "-x + 2" },
    { name: "b", kind: "number", label: "b) Maximum at", correct: "-a(0) / (a(1) - a(0))" },
  ],
};

function setup(value?: Record<string, string>, invalid = false) {
  const onChange = vi.fn();
  render(
    <>
      <span id="lbl">Steps</span>
      <ConditionalGradingInput part={part} id="q-s" labelId="lbl" value={value} onChange={onChange} invalid={invalid} />
    </>,
  );
  return onChange;
}

describe("ConditionalGradingInput", () => {
  it("shows one labelled box per step", () => {
    setup();
    expect(screen.getByRole("textbox", { name: "a) Derivative" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "b) Maximum at" })).toBeInTheDocument();
  });

  it("shows the default placeholder on expression steps only, unless a step sets its own", () => {
    setup();
    expect(screen.getByRole("textbox", { name: "a) Derivative" })).toHaveAttribute("placeholder", "e.g. -2x + 3");
    expect(screen.getByRole("textbox", { name: "b) Maximum at" })).not.toHaveAttribute("placeholder");
    const steps = part.steps.map((s) => ({ ...s, placeholder: s.name === "a" ? "e.g. 2q + 3" : "a number" }));
    render(<ConditionalGradingInput part={{ ...part, steps }} id="q-t" labelId="lbl" value={undefined} onChange={vi.fn()} />);
    expect(screen.getByPlaceholderText("e.g. 2q + 3")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("a number")).toBeInTheDocument();
  });

  it("reports the value of every step when one changes", async () => {
    const onChange = setup({ a: "-x + 2" });
    await userEvent.type(screen.getByRole("textbox", { name: "b) Maximum at" }), "2");
    expect(onChange).toHaveBeenLastCalledWith({ a: "-x + 2", b: "2" });
  });

  it("typesets a preview of expression steps", () => {
    setup({ a: "-x + 2" });
    expect(document.querySelector(".katex")).not.toBeNull();
  });

  it("marks only the steps that are invalid", () => {
    setup({ a: "-x + 2", b: "two" }, true);
    expect(screen.getByRole("textbox", { name: "a) Derivative" })).not.toHaveAttribute("aria-invalid");
    expect(screen.getByRole("textbox", { name: "b) Maximum at" })).toHaveAttribute("aria-invalid", "true");
  });
});
