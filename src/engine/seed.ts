/**
 * Fresh seeds for new variants. This is the ONLY place non-seeded randomness is
 * allowed; question code must always use the seeded Rng it is given.
 */
export function randomSeed(): number {
  try {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    return buf[0];
  } catch {
    return (Date.now() ^ Math.floor(performance.now() * 1000)) >>> 0;
  }
}
