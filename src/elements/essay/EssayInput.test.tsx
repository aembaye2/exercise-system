import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EssayInput } from "./EssayInput";
import type { EssayPart } from "./types";

// jsdom can't run MathLive; a minimal custom element stands in for <math-field>.
vi.mock("mathlive", () => {
  class MathfieldElement extends HTMLElement {
    static fontsDirectory: string | null = "./fonts";
    static soundsDirectory: string | null = "./sounds";
    value = "";
    getValue() {
      return this.value;
    }
  }
  customElements.define("mock-math-field", MathfieldElement);
  return { MathfieldElement };
});

const part: EssayPart = { type: "essay", name: "e", modelAnswer: "m", maxWords: 3, maxChars: 100, equationEditor: true };

function setup(value?: string, disabled = false) {
  const onChange = vi.fn();
  const { container } = render(
    <>
      <span id="lbl">Explain</span>
      <EssayInput part={part} id="q-e" labelId="lbl" value={value} onChange={onChange} disabled={disabled} />
    </>,
  );
  return { onChange, container };
}

describe("EssayInput", () => {
  it("reports typed text", async () => {
    const { onChange } = setup("");
    await userEvent.type(screen.getByRole("textbox", { name: "Explain" }), "H");
    expect(onChange).toHaveBeenCalledWith("H");
  });

  it("shows word and character counts against the limits", () => {
    setup("one two three four");
    expect(screen.getByText(/4 \/ 3 words/)).toHaveClass("text-red-700");
    expect(screen.getByText(/18 \/ 100 characters/)).not.toHaveClass("text-red-700");
  });

  it("typesets $...$ in the preview and keeps an escaped \\$ as a dollar sign", () => {
    const { container } = setup("Rent is \\$5 and $x^2 + 5$ here");
    const preview = screen.getByLabelText("Preview");
    expect(preview.querySelectorAll(".katex")).toHaveLength(1);
    expect(preview.querySelector("annotation")?.textContent).toBe("x^2 + 5");
    expect(preview.textContent).toContain("Rent is $5 and");
    expect(container.querySelector(".katex-display")).toBeNull();
  });

  it("still typesets $$...$$", () => {
    setup("so $$x^2$$ works too");
    expect(screen.getByLabelText("Preview").querySelector("annotation")?.textContent).toBe("x^2");
  });

  it("starts a new line in the preview at each Enter", () => {
    setup("Step 1: $x^2 - 5x + 6 = 0$\nStep 2: $(x-2)(x-3) = 0$");
    const preview = screen.getByLabelText("Preview");
    expect(preview.querySelectorAll("br")).toHaveLength(1);
    expect(preview.querySelectorAll(".katex")).toHaveLength(2);
  });

  it("typesets a multi-line aligned equation", () => {
    setup("$$\n\\begin{aligned}\nx^2 - 5x + 6 &= 0 \\\\\n(x-2)(x-3) &= 0\n\\end{aligned}\n$$");
    const preview = screen.getByLabelText("Preview");
    expect(preview.querySelector(".katex-display")).not.toBeNull();
    expect(preview.querySelector(".katex-error")).toBeNull();
    expect(preview.querySelectorAll(".katex-html .vlist-t").length).toBeGreaterThan(0);
  });

  it("hides the equation button unless the question turns the editor on", () => {
    const { unmount } = render(<EssayInput part={{ ...part, equationEditor: false }} id="q-e2" labelId="lbl" value="" onChange={vi.fn()} />);
    expect(screen.queryByRole("button", { name: "Insert equation" })).toBeNull();
    unmount();
    const { equationEditor: _, ...byDefault } = part;
    render(<EssayInput part={byDefault} id="q-e3" labelId="lbl" value="" onChange={vi.fn()} />);
    expect(screen.queryByRole("button", { name: "Insert equation" })).toBeNull();
  });

  it("shows no preview when there is no math", () => {
    setup("plain text");
    expect(screen.queryByLabelText("Preview")).toBeNull();
  });

  it("inserts an equation from the editor at the cursor as $...$", async () => {
    const { onChange } = setup("so x = .");
    (screen.getByRole("textbox", { name: "Explain" }) as HTMLTextAreaElement).setSelectionRange(7, 7);
    await userEvent.click(screen.getByRole("button", { name: "Insert equation" }));
    const field = (await screen.findByLabelText("Equation editor")) as HTMLElement & { value: string };
    field.value = "\\frac{1}{2}";
    await userEvent.click(screen.getByRole("button", { name: "Insert" }));
    expect(onChange).toHaveBeenCalledWith("so x = $\\frac{1}{2}$.");
    expect(screen.queryByLabelText("Equation editor")).toBeNull();
  });

  it("closes the editor without changes on Cancel or an empty equation", async () => {
    const { onChange } = setup("text");
    await userEvent.click(screen.getByRole("button", { name: "Insert equation" }));
    await screen.findByLabelText("Equation editor");
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.queryByLabelText("Equation editor")).toBeNull();

    await userEvent.click(screen.getByRole("button", { name: "Insert equation" }));
    await screen.findByLabelText("Equation editor");
    await userEvent.click(screen.getByRole("button", { name: "Insert" }));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.queryByLabelText("Equation editor")).toBeNull();
  });

  it("turns off MathLive's own font and sound loading", async () => {
    setup("");
    await userEvent.click(screen.getByRole("button", { name: "Insert equation" }));
    await screen.findByLabelText("Equation editor");
    const { MathfieldElement } = await import("mathlive");
    expect(MathfieldElement.fontsDirectory).toBeNull();
    expect(MathfieldElement.soundsDirectory).toBeNull();
  });

  it("has no equation button once the answer is submitted", () => {
    setup("done", true);
    expect(screen.queryByRole("button", { name: "Insert equation" })).toBeNull();
  });
});
