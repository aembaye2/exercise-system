import type { Scorm2004Api } from "./api";

/** An in-memory SCORM 2004 LMS for tests: stores values and records every call. */
export function fakeLms(initial: Record<string, string> = {}) {
  const data: Record<string, string> = { ...initial };
  const calls: string[] = [];
  let failInitialize = false;
  const api: Scorm2004Api = {
    Initialize: () => (calls.push("Initialize"), failInitialize ? "false" : "true"),
    Terminate: () => (calls.push("Terminate"), "true"),
    GetValue: (k) => data[k] ?? "",
    SetValue: (k, v) => {
      calls.push(`SetValue ${k}`);
      data[k] = v;
      return "true";
    },
    Commit: () => (calls.push("Commit"), "true"),
    GetLastError: () => "0",
    GetErrorString: () => "No error",
  };
  return {
    api,
    data,
    calls,
    failNextInitialize() {
      failInitialize = true;
    },
  };
}
