import {type TestFn} from "ava";

export function titleWithNamespace(test: TestFn, ns: string) {
  return test.macro({
    exec: async (t, fn: Function) => {
      await fn(t);
    },
    title: (title) => `${ns}${title}`,
  });
}
