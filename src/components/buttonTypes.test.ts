import { describe, expect, it } from "vitest";

// Every component's source text (tests excluded below).
const files = import.meta.glob<string>("../**/*.tsx", { query: "?raw", import: "default", eager: true });

// Inputs render inside the question's <form>, where a <button> without a type submits it: a
// click on a drawing tool or undo would press Grade (and, with one grade per variant, lock the
// question and reveal the answer).
describe("buttons", () => {
  it("every <button> sets its type", () => {
    const missing: string[] = [];
    for (const [file, text] of Object.entries(files)) {
      if (file.includes(".test.")) continue;
      for (const m of text.matchAll(/<button\b/g)) {
        const tag = text.slice(m.index, text.indexOf("</button>", m.index));
        if (!/\btype=/.test(tag)) missing.push(`${file}:${text.slice(0, m.index).split("\n").length}`);
      }
    }
    expect(Object.keys(files).length).toBeGreaterThan(20);
    expect(missing).toEqual([]);
  });
});
