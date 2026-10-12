import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { MathfieldElement } from "mathlive";
import { Button } from "../../components/ui";

let mathLive: Promise<typeof import("mathlive")> | null = null;

/** MathLive (~850 KB) loads on first use, not with the page. */
function loadMathLive() {
  mathLive ??= import("mathlive").then((m) => {
    // Its fonts are the KaTeX fonts the page already loads (katex.min.css); no sounds.
    m.MathfieldElement.fontsDirectory = null;
    m.MathfieldElement.soundsDirectory = null;
    return m;
  });
  return mathLive;
}

interface MathEditorProps {
  onInsert: (latex: string) => void;
  onCancel: () => void;
}

/** A MathLive equation editor (with its on-screen math keyboard) that hands back LaTeX. */
export function MathEditor({ onInsert, onCancel }: MathEditorProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<MathfieldElement | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    loadMathLive().then(
      ({ MathfieldElement }) => {
        if (cancelled || !hostRef.current) return;
        const field = new MathfieldElement();
        field.setAttribute("aria-label", "Equation editor");
        field.className = "block w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-lg dark:border-slate-600";
        hostRef.current.appendChild(field);
        fieldRef.current = field;
        setStatus("ready");
        field.focus();
      },
      () => {
        if (!cancelled) setStatus("error");
      },
    );
    return () => {
      cancelled = true;
      fieldRef.current?.remove();
      fieldRef.current = null;
    };
  }, []);

  const insert = () => {
    const latex = fieldRef.current?.getValue("latex").trim() ?? "";
    if (latex) onInsert(latex);
    else onCancel();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onCancel();
    } else if (e.key === "Enter" && e.target === fieldRef.current) {
      e.preventDefault();
      insert();
    }
  };

  return (
    <div
      role="group"
      aria-label="Insert an equation"
      onKeyDown={onKeyDown}
      className="space-y-2 rounded-md border border-indigo-200 bg-indigo-50 p-2 dark:border-indigo-900 dark:bg-indigo-950/40"
    >
      <div ref={hostRef} />
      {status === "loading" && <p className="text-sm text-slate-500 dark:text-slate-400">Loading the equation editor…</p>}
      {status === "error" && (
        <p role="alert" className="text-sm text-red-700 dark:text-red-300">
          The equation editor couldn't load. You can still type math between dollar signs, e.g. $x^2 + 5$.
        </p>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="primary" onClick={insert} disabled={status !== "ready"}>
          Insert
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
        {status === "ready" && (
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Type math or use the keyboard icon; Enter inserts, Esc cancels.
          </span>
        )}
      </div>
    </div>
  );
}
