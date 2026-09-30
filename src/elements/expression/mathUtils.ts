import { create, all, type MathNode } from "mathjs/number";

// `mathjs/number` (plain JS numbers only, no BigNumber/Fraction/Complex/Matrix/Unit
// support) keeps the embeddable bundle far smaller than the full `mathjs` build;
// everything this element needs (parsing, evaluating, LaTeX) works the same either
// way. A plain instance (no unsafe imports like `createUnit`/`import`), shared by
// parsing, evaluating and LaTeX conversion so all three agree on syntax.
const math = create(all, {});

export type ParseResult = { ok: true; node: MathNode } | { ok: false; message: string };

export function parseExpression(raw: string): ParseResult {
  try {
    return { ok: true, node: math.parse(raw) };
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : "Couldn't parse that expression." };
  }
}

/** Every symbol in the expression that isn't a mathjs constant or function (e.g. `pi`, `sqrt`, `e`). */
export function detectVariables(node: MathNode): string[] {
  const names = new Set<string>();
  node
    .filter((n) => n.type === "SymbolNode")
    .forEach((n) => names.add((n as MathNode & { name: string }).name));
  return [...names].filter((name) => !(name in math));
}

/** Evaluate a node at a scope, returning a finite number or an error message. */
export function evaluateAt(node: MathNode, scope: Record<string, number>): { ok: true; value: number } | { ok: false; message: string } {
  try {
    const value: unknown = node.evaluate({ ...scope });
    if (typeof value !== "number" || !Number.isFinite(value)) {
      return { ok: false, message: "did not evaluate to a plain number" };
    }
    return { ok: true, value };
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : "failed to evaluate" };
  }
}

/** LaTeX for live preview / revealing the correct answer. Falls back to the raw text if it won't parse. */
export function toLatex(raw: string): string {
  const parsed = parseExpression(raw);
  return parsed.ok ? parsed.node.toTex() : raw;
}
