/**
 *
 * @param {string} [prefix=""] - The prefix for `n`
 * @param {number} [n=0] - The initial integer of the sequence
 */
export function* intStr(prefix: string = "", n: number = 0): Generator<string> {
  do {
    yield prefix + String(n++);
  } while (n);
}
