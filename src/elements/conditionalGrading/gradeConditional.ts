import type { MathNode } from "mathjs/number";
import { AuthoringError, type GradeResult, type JsonValue, type Rng, type ValidationResult } from "../../engine/types";
import { detectVariables, evaluateAt, isMathName, parseExpression, toLatex } from "../expression/mathUtils";
import { NUMBER_DEFAULTS, parseNumber } from "../number/gradeNumber";
import type { ConditionalGradingPart, ConditionalStep } from "./types";

const DEFAULT_RANGE: [number, number] = [1, 9];
const DEFAULT_SAMPLES = 5;
const DEFAULT_TOLERANCE = 1e-6;
const IDENTIFIER = /^[A-Za-z_][A-Za-z0-9_]*$/;

/** Earlier steps' answers as seen by a formula: numbers, or functions of the step's variables. */
type Scope = Record<string, number | ((...args: number[]) => number)>;

// ---------------------------------------------------------------- helpers

function parsed(raw: string): MathNode | undefined {
  const p = parseExpression(raw);
  return p.ok ? p.node : undefined;
}

/** Each step's own variables (none for number steps), in a stable order. */
export function stepVariables(part: ConditionalGradingPart, index: number): string[] {
  const step = part.steps[index];
  if (step.kind !== "expression") return [];
  if (step.variables) return Object.keys(step.variables);
  const node = parsed(step.correct);
  if (!node) return [];
  const earlier = new Set(part.steps.slice(0, index).map((s) => s.name));
  return detectVariables(node)
    .filter((v) => !earlier.has(v))
    .sort();
}

function rangeOf(step: ConditionalStep, name: string): [number, number] {
  return (step.kind === "expression" && step.variables?.[name]) || DEFAULT_RANGE;
}

/** A step's answer as a function of its variables, for later formulas (e.g. `a(0)`). */
function asFunction(node: MathNode, variables: string[], scope: Scope): (...args: number[]) => number {
  return (...args) => {
    const point = Object.fromEntries(variables.map((v, i) => [v, args[i]]));
    const r = evaluateAt(node, { ...scope, ...point });
    if (!r.ok) throw new Error(r.message);
    return r.value;
  };
}

/** Add step `index`'s answer, given by `node` (evaluated in `scope`), to a copy of `scope`. */
function bind(part: ConditionalGradingPart, index: number, node: MathNode, scope: Scope): Scope | undefined {
  const step = part.steps[index];
  if (step.kind === "expression") {
    return { ...scope, [step.name]: asFunction(node, stepVariables(part, index), scope) };
  }
  const r = evaluateAt(node, scope);
  return r.ok ? { ...scope, [step.name]: r.value } : undefined;
}

/** The scope of correct answers to steps before `upTo`. */
function correctScope(part: ConditionalGradingPart, upTo: number): Scope | undefined {
  let scope: Scope = {};
  for (let i = 0; i < upTo; i++) {
    const node = parsed(part.steps[i].correct);
    const next = node && bind(part, i, node, scope);
    if (!next) return undefined;
    scope = next;
  }
  return scope;
}

function rawOf(value: JsonValue | undefined, name: string): string {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return "";
  const v = value[name];
  return typeof v === "string" ? v.trim() : "";
}

/** The scope of the student's own answers to steps before `upTo` (undefined if one won't evaluate). */
function studentScope(part: ConditionalGradingPart, value: JsonValue | undefined, upTo: number): Scope | undefined {
  let scope: Scope = {};
  for (let i = 0; i < upTo; i++) {
    const step = part.steps[i];
    const raw = rawOf(value, step.name);
    if (step.kind === "number") {
      const p = parseNumber(raw);
      if (!p.ok) return undefined;
      scope = { ...scope, [step.name]: p.value };
    } else {
      const node = parsed(raw);
      if (!node) return undefined;
      // The student's expression only uses the step's variables, so it needs no earlier answers.
      scope = { ...scope, [step.name]: asFunction(node, stepVariables(part, i), {}) };
    }
  }
  return scope;
}

/** Does the student's answer to step `index` match its formula evaluated with `scope`? */
function matches(part: ConditionalGradingPart, index: number, raw: string, scope: Scope): boolean {
  const step = part.steps[index];
  const formula = parsed(step.correct);
  if (!formula) return false;
  if (step.kind === "number") {
    const submitted = parseNumber(raw);
    const expected = evaluateAt(formula, scope);
    if (!submitted.ok || !expected.ok) return false;
    const rtol = step.rtol ?? NUMBER_DEFAULTS.rtol;
    const atol = step.atol ?? NUMBER_DEFAULTS.atol;
    return Math.abs(submitted.value - expected.value) <= atol + rtol * Math.abs(expected.value);
  }
  const submitted = parsed(raw);
  if (!submitted) return false;
  const tolerance = step.tolerance ?? DEFAULT_TOLERANCE;
  const variables = stepVariables(part, index);
  const points = part.testPoints ?? [];
  if (points.length === 0) return false;
  return points.every((all) => {
    const point = Object.fromEntries(variables.map((v) => [v, all[v] ?? rangeOf(step, v)[0]]));
    const a = evaluateAt(submitted, point);
    const b = evaluateAt(formula, { ...scope, ...point });
    return a.ok && b.ok && Math.abs(a.value - b.value) <= tolerance + tolerance * Math.abs(b.value);
  });
}

// ---------------------------------------------------------------- check / prepare

/** Throws AuthoringError for malformed specs. */
export function checkConditional(part: ConditionalGradingPart): void {
  if (!Array.isArray(part.steps) || part.steps.length === 0) {
    throw new AuthoringError("conditional-grading part needs at least one step.");
  }
  const names = new Set<string>();
  let totalWeight = 0;
  part.steps.forEach((step, i) => {
    const where = `step "${step.name}"`;
    if (typeof step.name !== "string" || !IDENTIFIER.test(step.name)) {
      throw new AuthoringError(`step ${i + 1} needs a name made of letters, digits and _ (got "${String(step.name)}").`);
    }
    if (isMathName(step.name)) throw new AuthoringError(`${where}: the name is a mathjs constant or function; pick another.`);
    if (names.has(step.name)) throw new AuthoringError(`${where}: duplicate step name.`);
    if (step.kind !== "number" && step.kind !== "expression") {
      throw new AuthoringError(`${where}: kind must be "number" or "expression".`);
    }
    if (typeof step.correct !== "string" || !step.correct.trim()) throw new AuthoringError(`${where} needs a "correct" formula.`);
    const p = parseExpression(step.correct);
    if (!p.ok) throw new AuthoringError(`${where}: "correct" doesn't parse: ${p.message}`);
    const variables = stepVariables(part, i);
    if (step.kind === "expression") {
      if (variables.length === 0) {
        throw new AuthoringError(`${where}: an expression step needs a variable; use a number step for a constant.`);
      }
      for (const v of variables) {
        if (part.steps.some((s) => s.name === v)) {
          throw new AuthoringError(`${where}: variable "${v}" has the same name as a step.`);
        }
        const [min, max] = rangeOf(step, v);
        if (!(min < max)) throw new AuthoringError(`${where}: variable "${v}" needs min < max (got [${min}, ${max}]).`);
      }
      if (step.tolerance !== undefined && !(step.tolerance >= 0)) throw new AuthoringError(`${where}: tolerance must be >= 0.`);
    } else {
      if (step.rtol !== undefined && !(step.rtol >= 0)) throw new AuthoringError(`${where}: rtol must be >= 0.`);
      if (step.atol !== undefined && !(step.atol >= 0)) throw new AuthoringError(`${where}: atol must be >= 0.`);
    }
    const allowed = new Set([...names, ...variables]);
    const unknown = detectVariables(p.node).filter((s) => !allowed.has(s));
    if (unknown.length > 0) {
      throw new AuthoringError(`${where}: "correct" uses "${unknown.join('", "')}", which isn't an earlier step or a variable.`);
    }
    // The correct chain must evaluate (catches e.g. calling a number step like a function).
    const scope = correctScope(part, i);
    const trial = Object.fromEntries(variables.map((v) => [v, rangeOf(step, v)[0]]));
    const r = scope ? evaluateAt(p.node, { ...scope, ...trial }) : undefined;
    if (!r?.ok) throw new AuthoringError(`${where}: "correct" ${r ? r.message : "depends on a step that doesn't evaluate"}.`);
    const weight = step.weight ?? 1;
    if (!Number.isFinite(weight) || weight < 0) throw new AuthoringError(`${where}: weight must be >= 0.`);
    totalWeight += weight;
    names.add(step.name);
  });
  if (totalWeight <= 0) throw new AuthoringError("the steps' total weight must be > 0.");
  const credit = part.carryForwardCredit;
  if (credit !== undefined && !(credit >= 0 && credit <= 1)) throw new AuthoringError("carryForwardCredit must be from 0 to 1.");
  if (part.samples !== undefined && (!Number.isInteger(part.samples) || part.samples < 1)) {
    throw new AuthoringError("samples must be a positive integer.");
  }
}

/** Sample the test points for the expression steps once per variant, so grading (and review) is deterministic. */
export function prepareConditional(part: ConditionalGradingPart, rng: Rng): ConditionalGradingPart {
  checkConditional(part);
  const ranges = new Map<string, [number, number]>();
  part.steps.forEach((step, i) => {
    for (const v of stepVariables(part, i)) if (!ranges.has(v)) ranges.set(v, rangeOf(step, v));
  });
  if (ranges.size === 0) return part;
  const samples = part.samples ?? DEFAULT_SAMPLES;
  const testPoints = Array.from({ length: samples }, () =>
    Object.fromEntries([...ranges].map(([v, [min, max]]) => [v, rng.float(min, max, 4)])),
  );
  return { ...part, testPoints };
}

// ---------------------------------------------------------------- validate / grade

/** Is the answer to one step well-formed? (The input marks invalid steps with it.) */
export function validateStep(part: ConditionalGradingPart, index: number, raw: string): ValidationResult {
  const step = part.steps[index];
  if (step.kind === "number") {
    const p = parseNumber(raw);
    return p.ok ? { valid: true } : { valid: false, message: p.message };
  }
  if (!raw) return { valid: false, message: "Please enter an expression." };
  const p = parseExpression(raw);
  if (!p.ok) return { valid: false, message: `Couldn't parse that: ${p.message}` };
  const variables = stepVariables(part, index);
  const unexpected = detectVariables(p.node).filter((s) => !variables.includes(s));
  if (unexpected.length > 0) {
    return { valid: false, message: `Unexpected symbol "${unexpected.join('", "')}". Use only: ${variables.join(", ")}.` };
  }
  const trial = evaluateAt(p.node, Object.fromEntries(variables.map((v) => [v, rangeOf(step, v)[0] + 0.5])));
  return trial.ok ? { valid: true } : { valid: false, message: `Couldn't evaluate that: ${trial.message}.` };
}

export function validateConditional(part: ConditionalGradingPart, value: JsonValue | undefined): ValidationResult {
  for (let i = 0; i < part.steps.length; i++) {
    const r = validateStep(part, i, rawOf(value, part.steps[i].name));
    if (!r.valid) return { valid: false, message: `${part.steps[i].name}) ${r.message}` };
  }
  return { valid: true };
}

export type StepOutcome = "correct" | "carried-forward" | "wrong";

/** How each step was graded: right, right only given the student's earlier answers, or wrong. */
export function gradeSteps(part: ConditionalGradingPart, value: JsonValue | undefined): StepOutcome[] {
  return part.steps.map((step, i) => {
    const raw = rawOf(value, step.name);
    const right = correctScope(part, i);
    if (right && matches(part, i, raw, right)) return "correct";
    const own = studentScope(part, value, i);
    return own && matches(part, i, raw, own) ? "carried-forward" : "wrong";
  });
}

const OUTCOME_TEXT: Record<StepOutcome, string> = {
  correct: "✓",
  "carried-forward": "✓ (follows from your earlier answers)",
  wrong: "✗",
};

/**
 * Each step is checked against its formula twice: with the correct earlier answers and with
 * the student's own. So one early mistake costs only that step; later steps that correctly
 * build on it still get credit (`carryForwardCredit`, default full).
 */
export function gradeConditional(part: ConditionalGradingPart, value: JsonValue | undefined): GradeResult {
  const outcomes = gradeSteps(part, value);
  const credit = part.carryForwardCredit ?? 1;
  let total = 0;
  let sum = 0;
  outcomes.forEach((o, i) => {
    const w = part.steps[i].weight ?? 1;
    total += w;
    sum += w * (o === "correct" ? 1 : o === "carried-forward" ? credit : 0);
  });
  const feedback = outcomes.map((o, i) => `${part.steps[i].name}) ${OUTCOME_TEXT[o]}`).join(" · ");
  return { score: total > 0 ? sum / total : 0, feedback };
}

// ---------------------------------------------------------------- formatting

export function formatConditionalAnswer(part: ConditionalGradingPart, value: JsonValue | undefined): string {
  return part.steps
    .map((step) => {
      const raw = rawOf(value, step.name);
      const shown = !raw ? "_(no answer)_" : step.kind === "expression" ? `$${toLatex(raw)}$` : `\`${raw}\``;
      return `${step.name}) ${shown}`;
    })
    .join("; ");
}

/** The correct answers: expressions typeset, number steps evaluated through the correct chain. */
export function formatConditionalCorrect(part: ConditionalGradingPart): string {
  return part.steps
    .map((step, i) => {
      let shown = `$${toLatex(step.correct)}$`;
      if (step.kind === "number") {
        const node = parsed(step.correct);
        const scope = correctScope(part, i);
        const r = node && scope ? evaluateAt(node, scope) : undefined;
        if (r?.ok) shown = String(Number(r.value.toPrecision(12)));
      }
      return `${step.name}) ${shown}${step.suffix ? ` ${step.suffix}` : ""}`;
    })
    .join("; ");
}

export function conditionalHelpText(part: ConditionalGradingPart): string | undefined {
  if (part.showHelpText === false) return undefined;
  return (
    "Numbers like -4 or 2.5; expressions like -2x + 3 or 1/2 x^2. " +
    "Later steps are graded using your own earlier answers, so a mistake costs only the step where you made it."
  );
}

/** A fully correct answer (for tests and examples): the number steps evaluated, the expressions as authored. */
export function exampleConditional(part: ConditionalGradingPart): Record<string, string> {
  return Object.fromEntries(
    part.steps.map((step, i) => {
      if (step.kind === "expression") return [step.name, step.correct];
      const node = parsed(step.correct);
      const scope = correctScope(part, i);
      const r = node && scope ? evaluateAt(node, scope) : undefined;
      return [step.name, r?.ok ? String(r.value) : ""];
    }),
  );
}
