import type { Rng } from "./types";

/**
 * mulberry32: a small, fast 32-bit seeded PRNG.
 * Returns a function producing floats in [0, 1).
 */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** FNV-1a 32-bit hash. Turns any string into an unsigned 32-bit seed. */
export function hashString(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Derive an independent sub-seed, e.g. one stream per question part. */
export function deriveSeed(seed: number, label: string): number {
  return hashString(`${seed >>> 0}:${label}`);
}

/** Normalize user-facing seed input (number or string) into a 32-bit seed. */
export function toSeed(input: number | string): number {
  if (typeof input === "number" && Number.isInteger(input)) return input >>> 0;
  const str = String(input).trim();
  if (/^\d+$/.test(str) && Number(str) <= 0xffffffff) return Number(str) >>> 0;
  return hashString(str);
}

export function createRng(seed: number): Rng {
  const next = mulberry32(seed);

  const int = (min: number, max: number): number => {
    if (!Number.isInteger(min) || !Number.isInteger(max) || max < min) {
      throw new Error(`rng.int: invalid range [${min}, ${max}]`);
    }
    return min + Math.floor(next() * (max - min + 1));
  };

  const float = (min: number, max: number, decimals?: number): number => {
    if (!(max >= min)) throw new Error(`rng.float: invalid range [${min}, ${max}]`);
    const x = min + next() * (max - min);
    if (decimals === undefined) return x;
    const rounded = Number(x.toFixed(decimals));
    return Math.min(max, Math.max(min, rounded));
  };

  const pick = <T>(arr: readonly T[]): T => {
    if (arr.length === 0) throw new Error("rng.pick: empty array");
    return arr[int(0, arr.length - 1)];
  };

  const shuffle = <T>(arr: readonly T[]): T[] => {
    const out = arr.slice();
    for (let i = out.length - 1; i > 0; i--) {
      const j = int(0, i);
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  };

  const sample = <T>(arr: readonly T[], k: number): T[] => {
    if (!Number.isInteger(k) || k < 0 || k > arr.length) {
      throw new Error(`rng.sample: cannot take ${k} from ${arr.length}`);
    }
    return shuffle(arr).slice(0, k);
  };

  return { next, int, float, pick, shuffle, sample };
}
