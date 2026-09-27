import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Markdown } from "./Markdown";

describe("Markdown", () => {
  it("renders inline math with KaTeX", () => {
    const { container } = render(<Markdown>{"Compute $x^2$ now."}</Markdown>);
    expect(container.querySelector(".katex")).not.toBeNull();
    expect(container.textContent).toContain("Compute");
  });

  it("renders display math", () => {
    const { container } = render(<Markdown>{"$$\n\\frac{a}{b}\n$$"}</Markdown>);
    expect(container.querySelector(".katex-display")).not.toBeNull();
  });

  it("renders a GFM table", () => {
    const md = "| Good | Price |\n|---|---|\n| bread | 5 |\n| coffee | 8 |";
    const { container } = render(<Markdown>{md}</Markdown>);
    const cells = Array.from(container.querySelectorAll("td")).map((td) => td.textContent);
    expect(cells).toEqual(["bread", "5", "coffee", "8"]);
  });
});
