import { questionPoints, totals, type AssessmentState, type Submission } from "./assessment";
import type { Assessment } from "./types";

// ---------- localStorage persistence ----------

const KEY_PREFIX = "assess:v1:";

export function storageKey(assessmentId: string): string {
  return `${KEY_PREFIX}${assessmentId}`;
}

/** Load saved state, or null if missing, unreadable, or out of date with the assessment definition. */
export function loadState(assessment: Assessment): AssessmentState | null {
  let raw: string | null;
  try {
    raw = localStorage.getItem(storageKey(assessment.id));
  } catch {
    return null;
  }
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    return isCompatibleState(parsed, assessment) ? parsed : null;
  } catch {
    return null;
  }
}

/** Returns false if the state could not be saved (storage full, disabled, private mode...). */
export function saveState(state: AssessmentState): boolean {
  try {
    localStorage.setItem(storageKey(state.assessmentId), JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function clearState(assessmentId: string): void {
  try {
    localStorage.removeItem(storageKey(assessmentId));
  } catch {
    // Nothing to do: in-memory state is still reset by the caller.
  }
}

function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

function isCompatibleState(x: unknown, assessment: Assessment): x is AssessmentState {
  if (!isRecord(x) || x.version !== 1 || x.assessmentId !== assessment.id || x.mode !== assessment.mode) return false;
  if (typeof x.currentIndex !== "number" || typeof x.startedAt !== "string") return false;
  if (!Array.isArray(x.questions) || x.questions.length !== assessment.questions.length) return false;
  return x.questions.every((q: unknown, i) => {
    if (!isRecord(q)) return false;
    return (
      q.questionId === assessment.questions[i].questionId &&
      typeof q.seed === "number" &&
      typeof q.variant === "number" &&
      Array.isArray(q.preparedParts) &&
      Array.isArray(q.submissions) &&
      isRecord(q.draft) &&
      typeof q.bestScore === "number"
    );
  });
}

// ---------- JSON export / import ----------

export const EXPORT_FORMAT = "exercise-system/results";

export interface ExportedQuestion {
  questionId: string;
  points: number;
  maxAttempts: number | null;
  currentVariant: number;
  currentSeed: number;
  bestScore: number; // 0..1
  earned: number; // points
  submissions: Submission[];
}

export interface ResultsExport {
  format: typeof EXPORT_FORMAT;
  version: 1;
  assessmentId: string;
  assessmentTitle: string;
  mode: Assessment["mode"];
  studentName: string;
  startedAt: string;
  exportedAt: string;
  earned: number;
  possible: number;
  questions: ExportedQuestion[];
}

export function buildExport(state: AssessmentState, assessment: Assessment, exportedAt: string): ResultsExport {
  const { earned, possible } = totals(state);
  return {
    format: EXPORT_FORMAT,
    version: 1,
    assessmentId: state.assessmentId,
    assessmentTitle: assessment.title,
    mode: state.mode,
    studentName: state.studentName.trim(),
    startedAt: state.startedAt,
    exportedAt,
    earned,
    possible,
    questions: state.questions.map((q) => ({
      questionId: q.questionId,
      points: q.points,
      maxAttempts: q.maxAttempts,
      currentVariant: q.variant,
      currentSeed: q.seed,
      bestScore: q.bestScore,
      earned: questionPoints(q),
      submissions: q.submissions,
    })),
  };
}

export function exportFileName(data: ResultsExport): string {
  const who = data.studentName.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "student";
  const when = data.exportedAt.slice(0, 19).replace(/[:T]/g, "-");
  return `${data.assessmentId}-${who}-${when}.json`;
}

export class ImportError extends Error {}

/** Parse and structurally validate an exported results file. Throws ImportError. */
export function parseExport(text: string): ResultsExport {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    throw new ImportError("This file is not valid JSON.");
  }
  if (!isRecord(data) || data.format !== EXPORT_FORMAT) {
    throw new ImportError("This is not an exercise-system results file.");
  }
  if (data.version !== 1) throw new ImportError(`Unsupported results version: ${String(data.version)}.`);
  const str = (k: string) => {
    if (typeof data[k] !== "string") throw new ImportError(`Missing or invalid field "${k}".`);
  };
  ["assessmentId", "assessmentTitle", "studentName", "startedAt", "exportedAt"].forEach(str);
  if (data.mode !== "exercise" && data.mode !== "exam") throw new ImportError('Invalid field "mode".');
  if (!Array.isArray(data.questions)) throw new ImportError('Missing field "questions".');
  data.questions.forEach((q: unknown, i: number) => {
    const where = `question ${i + 1}`;
    if (!isRecord(q)) throw new ImportError(`Invalid ${where}.`);
    if (typeof q.questionId !== "string") throw new ImportError(`Missing questionId in ${where}.`);
    if (typeof q.currentSeed !== "number") throw new ImportError(`Missing currentSeed in ${where}.`);
    if (!Array.isArray(q.submissions)) throw new ImportError(`Missing submissions in ${where}.`);
    q.submissions.forEach((s: unknown, j: number) => {
      if (!isRecord(s) || typeof s.seed !== "number" || typeof s.variant !== "number" || !isRecord(s.values)) {
        throw new ImportError(`Invalid submission ${j + 1} in ${where}.`);
      }
    });
  });
  return data as unknown as ResultsExport;
}

/** Trigger a browser download of `data` as a JSON file. */
export function downloadJson(filename: string, data: unknown): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
