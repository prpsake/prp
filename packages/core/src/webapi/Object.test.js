import test from "ava";
import {Ava} from "@prpsake/utils";
import * as Obj from "./Object.mjs";

const title = Ava.titleWithNamespace(test, "core:webapi:Object");

test(
  `.omit: returns a shallow clone without the provided property`,
  title,
  (t) => {
    //s
    const init = {a: 1, b: 2};
    const expect = {a: 1};
    //e
    const actual = Obj.omitProp(init, "b");
    //v
    t.deepEqual(actual, expect);
  },
);

test(
  `.omit: returns a shallow clone if the property does not exist`,
  title,
  (t) => {
    //s
    const init = {a: 1, b: 2};
    //e
    const actual = Obj.omitProp(init, "c");
    //v
    t.deepEqual(actual, init);
  },
);

test(`.map: modifies entries by the provided function`, title, (t) => {
  //s
  const init = {a: 1, b: 2};
  const expect = {1: "a", 2: "b"};
  //e
  const actual = Obj.map(init, ([k, v]) => [v, k]);
  //v
  t.deepEqual(actual, expect);
});

test(
  `.isObject: returns true if the provided value is an object literal`,
  title,
  (t) => {
    //e
    const actual = Obj.isObject({});
    //v
    t.true(actual);
  },
);

test(
  `.isObject: returns false if the provided value is not an object literal`,
  title,
  (t) => {
    //s
    const init = [0, "", true, [], () => {}, null, undefined];
    const expect = [];
    //e
    const actual = init.reduce(
      (a, b) => (!Obj.isObject(b) ? a : [...a, b]),
      [],
    );
    //v
    t.deepEqual(actual, expect);
  },
);
