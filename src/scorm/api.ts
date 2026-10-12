/** The SCORM 2004 run-time API an LMS exposes as `window.API_1484_11`. Values are strings. */
export interface Scorm2004Api {
  Initialize(param: ""): string;
  Terminate(param: ""): string;
  GetValue(element: string): string;
  SetValue(element: string, value: string): string;
  Commit(param: ""): string;
  GetLastError(): string;
  GetErrorString(code: string): string;
  GetDiagnostic?(code: string): string;
}

type ApiWindow = Window & { API_1484_11?: Scorm2004Api };

const MAX_PARENTS = 500;

function searchUp(win: ApiWindow | null): Scorm2004Api | null {
  let current = win;
  for (let i = 0; current && i < MAX_PARENTS; i++) {
    try {
      if (current.API_1484_11) return current.API_1484_11;
    } catch {
      return null; // a cross-origin frame: the API can't be above it
    }
    if (current.parent === current) break;
    current = current.parent as ApiWindow;
  }
  return null;
}

/** The LMS's API: searched up the frame chain, then up from the window that opened this one. */
export function findScormApi(win: Window = window): Scorm2004Api | null {
  const w = win as ApiWindow;
  return searchUp(w) ?? (w.opener ? searchUp(w.opener as ApiWindow) : null);
}
