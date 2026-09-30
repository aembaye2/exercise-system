import type { GradeResult, JsonValue, ValidationResult } from "../../engine/types";
import { detectVariables, evaluateAt, parseExpression, toLatex } from "./mathUtils";
import { variablesOf } from "./prepareExpression";
import type { ExpressionPart } from "./types";

const DEFAULT_TOLERANCE = 1e-6;

function toValue(raw: JsonValue | undefined): string {
  return typeof raw === "string" ? raw.trim() : "";
}

/** A trial point (every variable set to its range's midpoint) used to catch typos like an undefined function. */
function trialScope(part: ExpressionPart): Record<string, number> {
  return Object.fromEntries(variablesOf(part).map((name) => [name, (part.variables?.[name]?.[0] ?? 1) + 0.5]));
}

export function validateExpression(part: ExpressionPart, value: JsonValue | undefined): ValidationResult {
  const raw = toValue(value);
  if (!raw) return { valid: false, message: "Please enter an expression." };
  const parsed = parseExpression(raw);
  if (!parsed.ok) return { valid: false, message: `Couldn't parse that: ${parsed.message}` };
  const allowed = new Set(variablesOf(part));
  const used = new Set(detectVariables(parsed.node));
  const unexpected = [...used].filter((name) => !allowed.has(name));
  if (unexpected.length > 0) {
    return {
      valid: false,
      message: `Unexpected symbol${unexpected.length > 1 ? "s" : ""} "${unexpected.join('", "')}". Use only: ${[...allowed].join(", ")}.`,
    };
  }
  const trial = evaluateAt(parsed.node, trialScope(part));
  if (!trial.ok) return { valid: false, message: `Couldn't evaluate that: ${trial.message}.` };
  return { valid: true };
}

/**
 * Checked by evaluating both expressions at the prepared random test points and
 * comparing within `tolerance` — not by comparing text, so equivalent forms like
 * "x^2 + 1/2 x + 1" and "x^2 + .5 x + 1" both grade as correct.
 */
export function gradeExpression(part: ExpressionPart, value: JsonValue | undefined): GradeResult {
  const raw = toValue(value);
  const submitted = parseExpression(raw);
  const correct = parseExpression(part.correct);
  if (!submitted.ok || !correct.ok) return { score: 0 };
  const tolerance = part.tolerance ?? DEFAULT_TOLERANCE;
  const points = part.testPoints ?? [];
  for (const point of points) {
    const a = evaluateAt(submitted.node, point);
    const b = evaluateAt(correct.node, point);
    if (!a.ok || !b.ok) return { score: 0, feedback: "Your expression isn't equivalent to the expected one." };
    if (Math.abs(a.value - b.value) > tolerance + tolerance * Math.abs(b.value)) {
      return { score: 0, feedback: "Your expression isn't equivalent to the expected one." };
    }
  }
  return { score: 1 };
}

/** Review summary: the student's expression, rendered as Markdown math. */
export function formatExpressionAnswer(_part: ExpressionPart, value: JsonValue | undefined): string {
  const raw = toValue(value);
  return raw ? `$${toLatex(raw)}$` : "_(no answer)_";
}

export function formatExpressionCorrect(part: ExpressionPart): string {
  return `$${toLatex(part.correct)}$`;
}

export function expressionHelpText(part: ExpressionPart): string | undefined {
  if (part.showHelpText === false) return undefined;
  const vars = variablesOf(part).join(", ");
  return `Enter an expression in ${vars}, e.g. 2*x, x^2, sqrt(x), 1/2 x. A live preview shows it typeset below.`;
}

/** A fully correct answer (for tests and examples). */
export function exampleExpression(part: ExpressionPart): string {
  return part.correct;
}
