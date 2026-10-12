import { afterEach, describe, expect, it, vi } from "vitest";
import { assessmentReducer, createAssessmentState, type AssessmentAction, type AssessmentState } from "../engine/assessment";
import type { Assessment, Question } from "../engine/types";
import { exercise, seedCounter, testBank } from "../test/fixtures";
import { findScormApi } from "./api";
import { fakeLms } from "./fakeLms";
import { scormReport, scormTimestamp } from "./report";
import { connectScorm } from "./scormPersistence";
import { decodeSuspendData, encodeSuspendData } from "./suspend";

const NOW = "2026-01-01T00:00:00.000Z";

const essay: Question<Record<string, never>> = {
  id: "essay",
  title: "Explain",
  generate: () => ({}),
  render: () => "Explain.",
  parts: () => [{ type: "essay", name: "why" }],
};
const bank = (id: string) => (id === "essay" ? (essay as Question<unknown>) : testBank(id));
const quiz: Assessment = {
  id: "scorm-quiz",
  title: "SCORM quiz",
  mode: "exam",
  questions: [
    { questionId: "add", points: 10, maxAttempts: 3 },
    { questionId: "essay", points: 5 },
    { questionId: "two-part", points: 4 },
  ],
};

function correctSum(s: AssessmentState): string {
  const p = s.questions[0].preparedParts[0];
  return p.type === "integer" ? String(p.correct) : "";
}

function run(s: AssessmentState, ...actions: AssessmentAction[]): AssessmentState {
  return actions.reduce(assessmentReducer, s);
}

/** Q1: a wrong then a right answer; Q2: an essay (pending); Q3 untouched, with a draft. */
function played(): AssessmentState {
  let s = createAssessmentState(quiz, bank, seedCounter(7), NOW);
  s = run(
    s,
    { type: "setValue", index: 0, part: "sum", value: "999" },
    { type: "submit", index: 0, timestamp: NOW },
    { type: "setValue", index: 0, part: "sum", value: correctSum(s) },
    { type: "submit", index: 0, timestamp: "2026-01-01T00:05:00.123Z" },
    { type: "setValue", index: 1, part: "why", value: "Supply falls.\nPrices rise by $5$ units." },
    { type: "submit", index: 1, timestamp: NOW },
    { type: "setValue", index: 2, part: "double", value: "8" },
  );
  return s;
}

describe("findScormApi", () => {
  const api = fakeLms().api;
  const frame = (props: object) => {
    const w = { ...props } as Window & { parent: Window };
    if (!w.parent) w.parent = w;
    return w;
  };

  it("finds the API on a parent frame", () => {
    const top = frame({ API_1484_11: api });
    expect(findScormApi(frame({ parent: frame({ parent: top }) }))).toBe(api);
  });

  it("falls back to the window that opened this one", () => {
    expect(findScormApi(frame({ opener: frame({ API_1484_11: api }) }))).toBe(api);
  });

  it("returns null outside an LMS", () => {
    expect(findScormApi(frame({}))).toBeNull();
  });
});

describe("suspend data", () => {
  it("round-trips the state, rebuilding prepared parts and keeping only the latest answers", () => {
    const s = played();
    const data = encodeSuspendData(s);
    expect(data).toMatch(/^es1:[A-Za-z0-9+\-$]+$/);
    const back = decodeSuspendData(data, quiz, bank)!;
    expect(back.questions.map((q) => q.preparedParts)).toEqual(s.questions.map((q) => q.preparedParts));
    expect(back.questions[2].draft).toEqual({ double: "8" });
    // Q1: both attempts kept (attempt count, best score), only the latest with answers.
    expect(back.questions[0].submissions).toHaveLength(2);
    expect(back.questions[0].submissions[0]).toMatchObject({ score: 0, values: {}, results: {} });
    expect(back.questions[0].submissions[1].values).toEqual({ sum: correctSum(s) });
    expect(back.questions[0].bestScore).toBe(1);
    expect(back.questions[1].submissions[0].values.why).toContain("Prices rise");
  });

  it("rejects missing, corrupt or mismatched data", () => {
    expect(decodeSuspendData("", quiz, bank)).toBeNull();
    expect(decodeSuspendData("es1:not-really-compressed", quiz, bank)).toBeNull();
    expect(decodeSuspendData(encodeSuspendData(played()), { ...quiz, id: "other" }, bank)).toBeNull();
    const fromExercise = encodeSuspendData(createAssessmentState(exercise, testBank, seedCounter(), NOW));
    expect(decodeSuspendData(fromExercise, quiz, bank)).toBeNull();
  });

  it("stays far below SCORM's 64,000-character limit", () => {
    expect(encodeSuspendData(played()).length).toBeLessThan(2000);
  });
});

describe("scormReport", () => {
  const report = (s: AssessmentState, passing: number | null = null) => Object.fromEntries(scormReport(s, bank, passing));

  it("reports the score, progress and per-question interactions", () => {
    const r = report(played());
    expect(r).toMatchObject({
      "cmi.score.min": "0",
      "cmi.score.max": "19",
      "cmi.score.raw": "10",
      "cmi.score.scaled": String(Math.round((10 / 19) * 1e7) / 1e7),
      "cmi.completion_status": "incomplete",
      "cmi.success_status": "unknown",
      "cmi.interactions.0.id": "urn:exercise-system:scorm-quiz:q1-add",
      "cmi.interactions.0.type": "other",
      "cmi.interactions.0.description": "Addition",
      "cmi.interactions.0.weighting": "10",
      "cmi.interactions.0.result": "correct",
      "cmi.interactions.0.timestamp": "2026-01-01T00:05:00.12Z",
      "cmi.interactions.1.result": "neutral",
      "cmi.interactions.1.learner_response": "Supply falls.\nPrices rise by $5$ units.",
    });
    expect(r["cmi.interactions.0.learner_response"]).toBe(correctSum(played()));
    expect(r["cmi.progress_measure"]).toBe(String(Math.round((2 / 3) * 1e7) / 1e7));
    // Q3 has only a draft: no interaction yet.
    expect(r["cmi.interactions.2.id"]).toBeUndefined();
  });

  it("creates interaction indices in order, even when a later question is answered first", () => {
    let s = createAssessmentState(quiz, bank, seedCounter(), NOW);
    s = run(s, { type: "setValue", index: 1, part: "why", value: "x" }, { type: "submit", index: 1, timestamp: NOW });
    const keys = scormReport(s, bank, null).map(([k]) => k).filter((k) => k.endsWith(".id"));
    expect(keys).toEqual(["cmi.interactions.0.id", "cmi.interactions.1.id"]);
    expect(report(s)["cmi.interactions.0.learner_response"]).toBeUndefined();
  });

  it("decides passed/failed against the passing score once nothing is pending", () => {
    let s = createAssessmentState({ ...quiz, questions: [quiz.questions[0]] }, bank, seedCounter(7), NOW);
    s = run(s, { type: "setValue", index: 0, part: "sum", value: correctSum(s) }, { type: "submit", index: 0, timestamp: NOW });
    expect(report(s, 0.7)["cmi.success_status"]).toBe("passed");
    expect(report(s, null)["cmi.success_status"]).toBe("unknown");
    expect(report(s)["cmi.completion_status"]).toBe("completed");
    expect(report(played(), 0.1)["cmi.success_status"]).toBe("unknown"); // an essay is still pending
  });
});

describe("connectScorm", () => {
  afterEach(() => vi.useRealTimers());

  it("starts a resumable session and reads the learner's name and passing score", () => {
    const lms = fakeLms({ "cmi.learner_name": "Doe, Jane" });
    const scorm = connectScorm(lms.api, bank)!;
    expect(lms.calls[0]).toBe("Initialize");
    expect(lms.data["cmi.exit"]).toBe("suspend");
    expect(scorm.learnerName).toBe("Jane Doe");
    expect(scorm.canReset).toBe(false);
  });

  it("returns null when the LMS refuses to initialize", () => {
    const lms = fakeLms();
    lms.failNextInitialize();
    expect(connectScorm(lms.api, bank, { warn: () => {} })).toBeNull();
  });

  it("saves suspend data, reports and commits right away after a submission, and resumes later", () => {
    const lms = fakeLms({ "cmi.scaled_passing_score": "0.5" });
    const scorm = connectScorm(lms.api, bank)!;
    const s = played();
    expect(scorm.save(s)).toBe(true);
    expect(lms.data["cmi.score.raw"]).toBe("10");
    expect(lms.data["cmi.interactions.1.learner_response"]).toContain("Supply falls");
    expect(lms.calls.at(-1)).toBe("Commit");

    const resumed = connectScorm(fakeLms(lms.data).api, bank)!.load(quiz, bank)!;
    expect(resumed.questions[0].bestScore).toBe(1);
    expect(resumed.questions[2].draft).toEqual({ double: "8" });
  });

  it("only updates suspend data while typing, with one delayed commit", () => {
    vi.useFakeTimers();
    const lms = fakeLms();
    const scorm = connectScorm(lms.api, bank)!;
    let s = played();
    scorm.save(s);
    lms.calls.length = 0;
    for (const v of ["1", "12", "16"]) {
      s = run(s, { type: "setValue", index: 2, part: "double", value: v });
      scorm.save(s);
    }
    expect(lms.calls).toEqual(["SetValue cmi.suspend_data", "SetValue cmi.suspend_data", "SetValue cmi.suspend_data"]);
    vi.advanceTimersByTime(2000);
    expect(lms.calls.filter((c) => c === "Commit")).toHaveLength(1);
  });

  it("records the session time and terminates once", () => {
    const lms = fakeLms();
    const scorm = connectScorm(lms.api, bank)!;
    scorm.terminate();
    scorm.terminate();
    expect(lms.data["cmi.session_time"]).toMatch(/^PT\d+H\d+M\d+S$/);
    expect(lms.calls.filter((c) => c === "Terminate")).toHaveLength(1);
    expect(scorm.save(played())).toBe(false);
  });
});

describe("scormTimestamp", () => {
  // SCORM 2004 time(second,10,2): YYYY[-MM[-DD[Thh[:mm[:ss[.s[TZD]]]]]]], at most 2 fractional digits.
  const SCORM_TIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,2}(Z|[+-]\d{2}(:\d{2})?)?)?$/;

  it("keeps 2 fractional digits so the time zone is allowed", () => {
    expect(scormTimestamp("2026-10-12T15:12:36.123Z")).toBe("2026-10-12T15:12:36.12Z");
    expect(scormTimestamp("2026-10-12T15:12:36.000Z")).toMatch(SCORM_TIME);
    expect("2026-10-12T15:12:36Z").not.toMatch(SCORM_TIME); // what Blackboard rejected
  });
});
