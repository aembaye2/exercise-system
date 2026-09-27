import { describe, expect, it } from "vitest";
import { AuthoringError } from "../../engine/types";
import {
  blanks,
  cellKey,
  cellName,
  checkTable,
  exampleTable,
  formatTableAnswer,
  gradeTable,
  validateTable,
} from "./gradeTable";
import type { TablePart } from "./types";

const part: TablePart = {
  type: "table",
  name: "t",
  columnGroups: [
    { label: "A", span: 2 },
    { label: "B", span: 1 },
  ],
  columns: ["x", "y", "z"],
  rows: [
    { label: "Given", cells: [1, "two", null] },
    { label: "Section" },
    { label: "Fill", cells: [{ correct: 10 }, { correct: -4.5 }, 7] },
    { label: "More", cells: [3, { correct: 0.125, comparison: "sigfig", digits: 2 }, { correct: 0 }] },
  ],
};

const all = (values: string[]) => Object.fromEntries(blanks(part).map((b, i) => [b.key, values[i]]));

describe("table element", () => {
  it("finds blanks in reading order and names them with section and column group", () => {
    expect(blanks(part).map((b) => b.key)).toEqual([cellKey(2, 0), cellKey(2, 1), cellKey(3, 1), cellKey(3, 2)]);
    expect(cellName(part, 2, 1)).toBe("Section – Fill, A, y");
    expect(cellName(part, 3, 2)).toBe("Section – More, B, z");
    expect(cellName(part, 0, 0)).toBe("Given, A, x");
  });

  it("accepts a valid spec", () => {
    expect(() => checkTable(part)).not.toThrow();
  });

  it.each<[string, Partial<TablePart>]>([
    ["no columns", { columns: [] }],
    ["group spans that don't add up", { columnGroups: [{ label: "A", span: 2 }] }],
    ["a row with the wrong number of cells", { rows: [{ label: "r", cells: [{ correct: 1 }] }] }],
    ["no blanks", { rows: [{ label: "r", cells: [1, 2, 3] }] }],
    ["a blank with a non-finite answer", { rows: [{ label: "r", cells: [{ correct: NaN }, 1, 2] }] }],
  ])("rejects %s", (_name, override) => {
    expect(() => checkTable({ ...part, ...override })).toThrow(AuthoringError);
  });

  it("requires every blank to hold a valid number (without using an attempt)", () => {
    expect(validateTable(part, undefined)).toEqual({ valid: false, message: "Please fill in the table." });
    expect(validateTable(part, all(["10", "", "0.13", "0"])).message).toMatch(/1 still empty/);
    expect(validateTable(part, all(["10", "2/3", "0.13", "0"])).message).toMatch(/^Section – Fill, A, y: /);
    expect(validateTable(part, all(["10", "-4.5", "0.13", "0"]))).toEqual({ valid: true });
  });

  it("gives partial credit and names wrong cells without revealing values", () => {
    expect(gradeTable(part, all(["10", "-4.5", "0.13", "0"]))).toEqual({ score: 1 });
    const r = gradeTable(part, all(["10", "4.5", "0.13", "1"]));
    expect(r.score).toBe(0.5);
    expect(r.feedback).toBe("2 of 4 cells correct. Check: Section – Fill, A, y; Section – More, B, z.");
    expect(r.feedback).not.toMatch(/-4\.5/);
  });

  it("grades each blank with its own comparison mode", () => {
    // 0.125 to 2 s.f. is 0.13 (and so is 0.1251); 0.12 is not.
    expect(gradeTable(part, all(["10", "-4.5", "0.1251", "0"])).score).toBe(1);
    expect(gradeTable(part, all(["10", "-4.5", "0.12", "0"])).score).toBe(0.75);
  });

  it("supports all-or-nothing grading", () => {
    expect(gradeTable({ ...part, grading: "all-or-nothing" }, all(["10", "4.5", "0.13", "0"])).score).toBe(0);
  });

  it("builds a correct example answer and formats answers for review", () => {
    expect(gradeTable(part, exampleTable(part)).score).toBe(1);
    expect(formatTableAnswer(part, all(["10", "-4.5", "0.13", "0"]))).toBe("**Fill:** 10, -4.5; **More:** 0.13, 0");
    expect(formatTableAnswer(part, undefined)).toBe("_(no answer)_");
  });
});
