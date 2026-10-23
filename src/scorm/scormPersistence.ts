import type { QuestionBank } from "../engine/assessment";
import type { Persistence } from "../engine/persistence";
import type { Scorm2004Api } from "./api";
import { scormReport } from "./report";
import { decodeSuspendData, encodeSuspendData, SUSPEND_LIMIT } from "./suspend";

export interface ScormPersistence extends Persistence {
  /** Commit and end the session (call when the page is closing). Safe to call twice. */
  terminate(): void;
}

export interface ConnectOptions {
  /** The assessment hides grades from students (Save only); see `hidesGrades`. */
  hideGrades?: boolean;
  /** Show "Reset assessment" (exercises only: an exam reset would erase the student's attempts). Default false. */
  canReset?: boolean;
  warn?: (msg: string) => void;
}

const COMMIT_DELAY_MS = 2000;

/** "Doe, Jane" (the SCORM convention) -> "Jane Doe". */
function displayName(learnerName: string): string {
  const [last, first] = learnerName.split(",").map((s) => s.trim());
  return first ? `${first} ${last}` : learnerName.trim();
}

/** SCORM timeinterval, e.g. PT1H2M3S. */
function sessionTime(ms: number): string {
  const total = Math.max(0, Math.round(ms / 1000));
  return `PT${Math.floor(total / 3600)}H${Math.floor((total % 3600) / 60)}M${total % 60}S`;
}

/**
 * Keeps the assessment state in the LMS (cmi.suspend_data) and reports the score,
 * status and per-question interactions to it. Null if the session can't be started.
 */
export function connectScorm(
  api: Scorm2004Api,
  bank: QuestionBank,
  { hideGrades = false, canReset = false, warn = console.warn }: ConnectOptions = {},
): ScormPersistence | null {
  if (api.Initialize("") !== "true") {
    warn(`SCORM Initialize failed: ${api.GetErrorString(api.GetLastError())}`);
    return null;
  }
  const startedAt = Date.now();
  const set = (element: string, value: string): boolean => {
    if (api.SetValue(element, value) === "true") return true;
    // Error code, message and the LMS's own diagnostic, plus the value's length (size limits are a common cause).
    const code = api.GetLastError();
    const diagnostic = api.GetDiagnostic?.(code);
    warn(
      `SCORM SetValue(${element}) failed: error ${code} ${api.GetErrorString(code)}` +
        (diagnostic ? ` (${diagnostic})` : "") +
        ` [value length ${value.length}: ${JSON.stringify(value.slice(0, 80))}]`,
    );
    return false;
  };
  const passing = Number.parseFloat(api.GetValue("cmi.scaled_passing_score"));
  const passingScore = Number.isFinite(passing) ? passing : null;
  let lastReport = "";
  let commitTimer: ReturnType<typeof setTimeout> | undefined;
  let terminated = false;

  const commit = () => {
    clearTimeout(commitTimer);
    commitTimer = undefined;
    if (!terminated && api.Commit("") !== "true") warn(`SCORM Commit failed: ${api.GetErrorString(api.GetLastError())}`);
  };

  // Resume the same attempt (and its suspend_data) the next time the student opens it.
  set("cmi.exit", "suspend");
  const learnerName = api.GetValue("cmi.learner_name");

  return {
    canReset,
    saveFailedMessage:
      "Your latest answers couldn't be saved to the course site. Keep this page open and check your internet connection; " +
      "the quiz tries again each time you change or save an answer. If this message doesn't go away, tell your instructor.",
    learnerName: learnerName ? displayName(learnerName) : undefined,
    load: (assessment) => decodeSuspendData(api.GetValue("cmi.suspend_data"), assessment, bank),
    save(state) {
      if (terminated) return false;
      const suspend = encodeSuspendData(state);
      if (suspend.length > SUSPEND_LIMIT) {
        warn(`SCORM suspend_data is ${suspend.length} characters, over the ${SUSPEND_LIMIT} limit; not saved.`);
        return false;
      }
      let ok = set("cmi.suspend_data", suspend);
      const report = scormReport(state, bank, passingScore, hideGrades);
      const reportKey = JSON.stringify(report);
      if (reportKey !== lastReport) {
        for (const [element, value] of report) ok = set(element, value) && ok;
        lastReport = reportKey;
        commit();
      } else if (commitTimer === undefined) {
        commitTimer = setTimeout(commit, COMMIT_DELAY_MS);
      }
      return ok;
    },
    // The fresh state replaces suspend_data and the score on the next save. Interactions already
    // written stay in the LMS until the fresh attempt overwrites them (SCORM can't delete them).
    clear: () => {},
    terminate() {
      if (terminated) return;
      set("cmi.session_time", sessionTime(Date.now() - startedAt));
      commit();
      terminated = true;
      if (api.Terminate("") !== "true") warn(`SCORM Terminate failed: ${api.GetErrorString(api.GetLastError())}`);
    },
  };
}
