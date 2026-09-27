import { afterEach, describe, expect, it, vi } from "vitest";
import { assessmentReducer, createAssessmentState, type AssessmentState } from "./assessment";
import {
  EXPORT_FORMAT,
  ImportError,
  buildExport,
  clearState,
  exportFileName,
  loadState,
  parseExport,
  saveState,
  storageKey,
} from "./storage";
import { exercise, seedCounter, testBank } from "../test/fixtures";

const NOW = "2026-01-01T00:00:00.000Z";

function played(): AssessmentState {
  let s = createAssessmentState(exercise, testBank, seedCounter(100), NOW);
  const part = s.questions[0].preparedParts[0];
  const correct = part.type === "integer" ? part.correct : 0;
  s = assessmentReducer(s, { type: "setValue", index: 0, part: "sum", value: "999" });
  s = assessmentReducer(s, { type: "submit", index: 0, timestamp: NOW });
  s = assessmentReducer(s, { type: "setValue", index: 0, part: "sum", value: String(correct) });
  s = assessmentReducer(s, { type: "submit", index: 0, timestamp: NOW });
  return assessmentReducer(s, { type: "setStudentName", name: "  Ada Lovelace " });
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("localStorage persistence", () => {
  it("uses a versioned key", () => {
    expect(storageKey("ex1")).toBe("assess:v1:ex1");
  });

  it("round-trips state", () => {
    const s = played();
    expect(saveState(s)).toBe(true);
    expect(loadState(exercise)).toEqual(s);
    clearState(exercise.id);
    expect(loadState(exercise)).toBeNull();
  });

  it("ignores corrupt or mismatched data", () => {
    localStorage.setItem(storageKey(exercise.id), "{not json");
    expect(loadState(exercise)).toBeNull();
    const s = played();
    localStorage.setItem(storageKey(exercise.id), JSON.stringify({ ...s, version: 2 }));
    expect(loadState(exercise)).toBeNull();
    const changed = { ...exercise, questions: [exercise.questions[1], exercise.questions[0]] };
    localStorage.setItem(storageKey(exercise.id), JSON.stringify(s));
    expect(loadState(changed)).toBeNull();
  });

  it("falls back gracefully when storage throws", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceeded");
    });
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("SecurityError");
    });
    vi.spyOn(Storage.prototype, "removeItem").mockImplementation(() => {
      throw new Error("SecurityError");
    });
    expect(saveState(played())).toBe(false);
    expect(loadState(exercise)).toBeNull();
    expect(() => clearState(exercise.id)).not.toThrow();
  });
});

describe("export / import", () => {
  it("builds an export with seeds, submissions and scores", () => {
    const s = played();
    const data = buildExport(s, exercise, "2026-02-03T04:05:06.000Z");
    expect(data.format).toBe(EXPORT_FORMAT);
    expect(data.studentName).toBe("Ada Lovelace");
    expect(data.earned).toBe(10);
    expect(data.possible).toBe(14);
    expect(data.questions[0].currentSeed).toBe(100);
    expect(data.questions[0].submissions.map((x) => x.score)).toEqual([0, 1]);
    expect(data.questions[0].submissions[0].values).toEqual({ sum: "999" });
    expect(exportFileName(data)).toBe("test-hw-ada-lovelace-2026-02-03-04-05-06.json");
  });

  it("parses its own output", () => {
    const data = buildExport(played(), exercise, NOW);
    expect(parseExport(JSON.stringify(data))).toEqual(data);
  });

  it("rejects invalid files with a clear message", () => {
    expect(() => parseExport("nope")).toThrow(ImportError);
    expect(() => parseExport("{}")).toThrow(/not an exercise-system results file/);
    const data = buildExport(played(), exercise, NOW);
    expect(() => parseExport(JSON.stringify({ ...data, version: 9 }))).toThrow(/Unsupported/);
    const broken = structuredClone(data) as unknown as { questions: { submissions: unknown[] }[] };
    broken.questions[0].submissions[0] = { foo: 1 };
    expect(() => parseExport(JSON.stringify(broken))).toThrow(/Invalid submission 1 in question 1/);
  });
});
