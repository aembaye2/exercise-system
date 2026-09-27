import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-300 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:disabled:bg-indigo-900 dark:disabled:text-indigo-300",
  secondary:
    "border border-slate-300 bg-white text-slate-800 hover:bg-slate-100 disabled:text-slate-400 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800",
  danger: "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400",
  ghost: "text-slate-700 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-800",
};

export function Button({
  variant = "secondary",
  className = "",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      type="button"
      {...rest}
      className={`inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed ${VARIANTS[variant]} ${className}`}
    />
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 dark:border-slate-800 dark:bg-slate-900 ${className}`}
    >
      {children}
    </div>
  );
}

export function formatPercent(score: number): string {
  return `${Math.round(score * 1000) / 10}%`;
}

export function formatPoints(x: number): string {
  return String(Math.round(x * 100) / 100);
}

/** Correct / partially correct / incorrect badge for a 0..1 score. */
export function ScoreBadge({ score }: { score: number }) {
  if (score >= 1) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200">
        <span aria-hidden="true">✓</span> Correct
      </span>
    );
  }
  if (score > 0) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800 dark:bg-amber-900/60 dark:text-amber-200">
        <span aria-hidden="true">◐</span> Partially correct ({formatPercent(score)})
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-800 dark:bg-red-900/60 dark:text-red-200">
      <span aria-hidden="true">✗</span> Incorrect
    </span>
  );
}

export function ModeBadge({ mode }: { mode: "exercise" | "exam" }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ${
        mode === "exam"
          ? "bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200"
          : "bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-200"
      }`}
    >
      {mode}
    </span>
  );
}

/** Two-step confirmation button (the artifact-free alternative to window.confirm). */
export function ConfirmButton({
  label,
  confirmLabel,
  prompt,
  onConfirm,
  confirming,
  setConfirming,
}: {
  label: string;
  confirmLabel: string;
  prompt: string;
  onConfirm: () => void;
  confirming: boolean;
  setConfirming: (v: boolean) => void;
}) {
  if (!confirming) {
    return <Button onClick={() => setConfirming(true)}>{label}</Button>;
  }
  return (
    <span role="group" aria-label={prompt} className="inline-flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium">{prompt}</span>
      <Button
        variant="danger"
        onClick={() => {
          setConfirming(false);
          onConfirm();
        }}
        autoFocus
      >
        {confirmLabel}
      </Button>
      <Button onClick={() => setConfirming(false)}>Cancel</Button>
    </span>
  );
}
