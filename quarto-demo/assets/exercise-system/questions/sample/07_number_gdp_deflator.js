const GOODS_POOL = [
  "bicycles",
  "textbooks",
  "coffee makers",
  "backpacks",
  "umbrellas",
  "desk lamps",
  "sneakers",
  "board games",
];

function nominalGDP({ goods, prices, quantities }, year) {
  return goods.reduce((sum, _, g) => sum + prices[year][g] * quantities[year][g], 0);
}

function realGDP({ goods, prices, quantities }, year, baseYear = 0) {
  return goods.reduce((sum, _, g) => sum + prices[baseYear][g] * quantities[year][g], 0);
}

function table({ goods, years, prices, quantities }) {
  const header = `| Year | ${goods.map((g) => `${g} price | ${g} quantity`).join(" | ")} |`;
  const sep = `|---|${goods.map(() => "---|---").join("|")}|`;
  const rows = years.map(
    (y, yi) => `| ${y} | ${goods.map((_, gi) => `${prices[yi][gi]} | ${quantities[yi][gi]}`).join(" | ")} |`,
  );
  return [header, sep, ...rows].join("\n");
}

export const gdpDeflator = {
  id: "gdp-deflator",
  title: "Nominal GDP, real GDP, and the GDP deflator",
  generate: (rng) => {
    const goods = rng.sample(GOODS_POOL, 2);
    const base = rng.int(2019, 2022);
    const years = [base, base + 1, base + 2];
    const prices = years.map(() => goods.map(() => rng.int(2, 20)));
    const quantities = years.map(() => goods.map(() => rng.int(10, 100)));
    return { goods, years, prices, quantities };
  },
  render: (params) =>
    `This small economy produces only the goods below. Prices are in dollars per unit, ` +
    `and ${params.years[0]} is the **base year**.\n\n` +
    `${table(params)}\n\n` +
    `**(a)** Compute nominal GDP in ${params.years[2]}: the value of ${params.years[2]}'s output at ${params.years[2]} prices.\n\n` +
    `**(b)** Compute real GDP in ${params.years[2]}: the value of ${params.years[2]}'s output at ${params.years[0]} (base-year) prices.\n\n` +
    `**(c)** Compute the GDP deflator for ${params.years[2]}.`,
  parts: (params) => {
    const nominal = nominalGDP(params, 2);
    const real = realGDP(params, 2);
    return [
      {
        type: "number",
        name: "nominal",
        label: "**(a)** Nominal GDP $=$",
        correct: nominal,
        rtol: 0.01,
        suffix: "dollars",
      },
      {
        type: "number",
        name: "real",
        label: "**(b)** Real GDP $=$",
        correct: real,
        rtol: 0.01,
        suffix: "dollars",
      },
      {
        type: "number",
        name: "deflator",
        label: "**(c)** GDP deflator $=$",
        correct: (nominal / real) * 100,
        rtol: 0.01,
        atol: 0.01,
      },
    ];
  },
};
