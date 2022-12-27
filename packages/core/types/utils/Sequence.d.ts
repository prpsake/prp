type generatorResult<V> = {
  value: V;
  done: boolean;
};

type generator<V> = {
  next: () => generatorResult<V>;
};

/**
 *
 * @param {string} [prefix=""] - The prefix for `n`
 * @param {number} [n=0] - The initial integer of the sequence
 */
export function intStr(prefix: string, n: number): generator<string>;
