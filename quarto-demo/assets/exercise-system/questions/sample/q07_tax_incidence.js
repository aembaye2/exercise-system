const X_MAX = 30;

function solve({ a, c, d, t }) {
  const q0 = (a - c) / (1 + d);
  const qt = (a - c - t) / (1 + d);
  const buyers = a - qt;
  return { q0, p0: a - q0, qt, buyers, sellers: buyers - t };
}

const fmtSlope = (d) => (d === 1 ? "" : String(d));

/** Drawing question: shift a curve, mark a point, shade an area; plus a numeric part. */
export const taxIncidence = {
  id: "tax-incidence-drawing",
  title: "A per-unit tax (drawing)",
  generate: (rng) => ({
    a: rng.int(20, 28),
    c: rng.int(2, 6),
    d: rng.pick([0.5, 1]),
    t: rng.int(4, 7),
  }),
  render: ({ a, c, d, t }) =>
    `A market has demand $P = ${a} - Q$ and supply $P = ${c} + ${fmtSlope(d)}Q$, shown on the graph. ` +
    `The government imposes a tax of $${t}$ dollars per unit on **sellers**.\n\n` +
    `**(a)** On the graph: shift the supply curve to show the tax, mark the new equilibrium, and shade the deadweight loss.\n\n` +
    `**(b)** What price do buyers pay after the tax?`,
  parts: (params) => {
    const { a, c, d, t } = params;
    const { q0, p0, qt, buyers, sellers } = solve(params);
    const supply = (shift) => ({ from: [0, c + shift], to: [X_MAX, c + shift + d * X_MAX] });
    return [
      {
        type: "drawing",
        name: "graph",
        label: "**(a)**",
        weight: 3,
        x: { max: X_MAX, label: "Quantity", snap: 0.5 },
        y: { max: 30, label: "Price (dollars)", snap: 0.5 },
        initial: [
          { type: "line", id: "D", from: [0, a], to: [a, 0], label: "D" },
          { type: "line", id: "S1", ...supply(0), label: "S₁" },
        ],
        tools: [
          { type: "line", copyOf: "S1", label: "new supply curve", tag: "S₂" },
          { type: "point", label: "new equilibrium" },
          { type: "polygon", vertices: 3, label: "deadweight loss", tag: "DWL" },
        ],
        answer: [
          { type: "line", label: "new supply curve", ...supply(t) },
          { type: "point", label: "new equilibrium", x: qt, y: buyers },
          {
            type: "polygon",
            label: "deadweight loss",
            points: [
              [qt, buyers],
              [qt, sellers],
              [q0, p0],
            ],
            minOverlap: 0.6,
          },
        ],
      },
      {
        type: "number",
        name: "buyers",
        label: "**(b)** Buyers pay $P_B =$",
        correct: buyers,
        rtol: 0.01,
        suffix: "dollars",
      },
    ];
  },
};
