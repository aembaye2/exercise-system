import { AuthoringError, type Rng } from "../../engine/types";
import { detectVariables, evaluateAt, parseExpression } from "./mathUtils";
import type { ExpressionPart } from "./types";

const DEFAULT_RANGE: [number, number] = [1, 9];
const DEFAULT_SAMPLES = 5;

/** The variable names in `correct`, in a stable order: explicit `variables` keys, else auto-detected. */
export function variablesOf(part: ExpressionPart): string[] {
  if (part.variables) return Object.keys(part.variables);
  const parsed = parseExpression(part.correct);
  return parsed.ok ? detectVariables(parsed.node).sort() : [];
}

function rangeOf(part: ExpressionPart, name: string): [number, number] {
  return part.variables?.[name] ?? DEFAULT_RANGE;
}

/** Throws AuthoringError for malformed expression specs. */
export function checkExpression(part: ExpressionPart): void {
  if (typeof part.correct !== "string" || !part.correct.trim()) {
    throw new AuthoringError("expression part needs a non-empty \"correct\" expression.");
  }
  const parsed = parseExpression(part.correct);
  if (!parsed.ok) throw new AuthoringError(`expression part's "correct" doesn't parse: ${parsed.message}`);
  const variables = variablesOf(part);
  if (variables.length === 0) {
    throw new AuthoringError("expression part's \"correct\" has no variables; use a number part for a constant.");
  }
  for (const name of variables) {
    const [min, max] = rangeOf(part, name);
    if (!(min < max)) throw new AuthoringError(`variable "${name}" needs min < max (got [${min}, ${max}]).`);
  }
  const trial = Object.fromEntries(variables.map((name) => [name, rangeOf(part, name)[0]]));
  const evaluated = evaluateAt(parsed.node, trial);
  if (!evaluated.ok) {
    throw new AuthoringError(`expression part's "correct" ${evaluated.message} at ${JSON.stringify(trial)}.`);
  }
  if (part.samples !== undefined && (!Number.isInteger(part.samples) || part.samples < 1)) {
    throw new AuthoringError("samples must be a positive integer.");
  }
  if (part.tolerance !== undefined && !(part.tolerance >= 0)) {
    throw new AuthoringError("tolerance must be >= 0.");
  }
}

/** Sample the random test points for one variant, so grading (including later review) is deterministic. */
export function prepareExpression(part: ExpressionPart, rng: Rng): ExpressionPart {
  checkExpression(part);
  const variables = variablesOf(part);
  const samples = part.samples ?? DEFAULT_SAMPLES;
  const testPoints = Array.from({ length: samples }, () =>
    Object.fromEntries(variables.map((name) => [name, rng.float(...rangeOf(part, name), 4)])),
  );
  return { ...part, testPoints };
}
