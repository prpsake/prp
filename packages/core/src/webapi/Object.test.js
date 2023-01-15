import test from "ava";
import * as Obj from "./Object.mjs";

test(`
core:webapi:Object.omit:
removes a property from an object`, (t) => {
  //s
  const init = {a: 1, b: 2};
  const expect = {a: 1};
  //e
  const actual = Obj.omitProp(init, "b");
  //v
  t.deepEqual(actual, expect);
});

test(`
core:webapi:Object.map:
alters entries by provided function`, (t) => {
  //s
  const init = {a: 1, b: 2};
  const expect = {a_: 2, b_: 3};
  //e
  const actual = Obj.map(init, ([k, v]) => [`${k}_`, v + 1]);
  //v
  t.deepEqual(actual, expect);
});

test(`
core:webapi:Object.isObject:
{...} is an Object`, (t) => {
  //e
  const value = Obj.isObject({});
  //v
  t.true(value);
});

test(`
core:webapi:Object.isObject:
nothing else is an Object`, (t) => {
  //e
  const value = [0, "", true, [], () => {}, null, undefined].every(
    Obj.isObject,
  );
  //v
  t.false(value);
});
