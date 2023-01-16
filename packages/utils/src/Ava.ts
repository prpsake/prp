import {type TestFn} from "ava";

export function titleWithNamespace(test: TestFn, ns: string) {
  return test.macro({
    exec: (t, fn: Function) => {
      fn(t);
    },
    title: (title) => `${ns}${title}`,
  });
}
