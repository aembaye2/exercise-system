import { describe, expect, it } from "vitest";
import { createRng, deriveSeed, hashString, mulberry32, toSeed } from "./rng";

describe("mulberry32", () => {
  it("is deterministic for the same seed", () => {
    const a = mulberry32(12345);
    const b = mulberry32(12345);
    const seqA = Array.from({ length: 20 }, a);
    const seqB = Array.from({ length: 20 }, b);
    expect(seqA).toEqual(seqB);
  });

  it("differs across seeds and stays in [0, 1)", () => {
    const a = Array.from({ length: 1000 }, mulberry32(1));
    const b = Array.from({ length: 1000 }, mulberry32(2));
    expect(a).not.toEqual(b);
    for (const x of a) {
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThan(1);
    }
  });
});

describe("createRng", () => {
  it("produces the same sequence of every helper for the same seed", () => {
    const run = (seed: number) => {
      const rng = createRng(seed);
      return {
        n: rng.next(),
        i: rng.int(-5, 5),
        f: rng.float(0, 10, 2),
        p: rng.pick(["a", "b", "c", "d"]),
        s: rng.shuffle([1, 2, 3, 4, 5, 6]),
        k: rng.sample([1, 2, 3, 4, 5, 6], 3),
      };
    };
    expect(run(42)).toEqual(run(42));
    expect(run(42)).not.toEqual(run(43));
  });

  it("int is inclusive and covers the range", () => {
    const rng = createRng(7);
    const seen = new Set<number>();
    for (let i = 0; i < 500; i++) {
      const x = rng.int(1, 4);
      expect(Number.isInteger(x)).toBe(true);
      expect(x).toBeGreaterThanOrEqual(1);
      expect(x).toBeLessThanOrEqual(4);
      seen.add(x);
    }
    expect([...seen].sort()).toEqual([1, 2, 3, 4]);
  });

  it("float respects decimals and bounds", () => {
    const rng = createRng(99);
    for (let i = 0; i < 200; i++) {
      const x = rng.float(1.5, 2.5, 1);
      expect(x).toBeGreaterThanOrEqual(1.5);
      expect(x).toBeLessThanOrEqual(2.5);
      expect(Math.round(x * 10) / 10).toBe(x);
    }
  });

  it("shuffle returns a new permutation without mutating input", () => {
    const input = [1, 2, 3, 4, 5];
    const out = createRng(3).shuffle(input);
    expect(input).toEqual([1, 2, 3, 4, 5]);
    expect([...out].sort()).toEqual(input);
  });

  it("rejects bad arguments", () => {
    const rng = createRng(1);
    expect(() => rng.int(3, 1)).toThrow();
    expect(() => rng.pick([])).toThrow();
    expect(() => rng.sample([1, 2], 3)).toThrow();
  });
});

describe("seed helpers", () => {
  it("hashString is stable and 32-bit", () => {
    expect(hashString("hello")).toBe(hashString("hello"));
    expect(hashString("hello")).not.toBe(hashString("hellp"));
    expect(hashString("x")).toBeLessThanOrEqual(0xffffffff);
    expect(hashString("x")).toBeGreaterThanOrEqual(0);
  });

  it("deriveSeed gives independent, stable sub-seeds", () => {
    expect(deriveSeed(10, "part:a")).toBe(deriveSeed(10, "part:a"));
    expect(deriveSeed(10, "part:a")).not.toBe(deriveSeed(10, "part:b"));
  });

  it("toSeed accepts numbers, numeric strings and arbitrary strings", () => {
    expect(toSeed(123)).toBe(123);
    expect(toSeed("123")).toBe(123);
    expect(toSeed("alice-ex1")).toBe(hashString("alice-ex1"));
  });
});
