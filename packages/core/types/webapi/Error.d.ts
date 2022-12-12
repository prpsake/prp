type Details<V, E> = {
  name: string;
  key?: string;
  value?: V;
  message: string;
  cause?: E;
};

export interface PRPError<V> extends Error {
  key: string;
  value: V;
}

export function make<V>(details: Details<V, Error>): PRPError<V>;

export function fromOriginal<V, E>(
  details: Details<V, E>,
): (cause: Error) => PRPError<V>;

export function resolveFromOriginal<V, E>(
  details: Details<V, E>,
): (cause: Error) => PromiseLike<PRPError<V>>;
