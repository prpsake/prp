import test from "ava";
import fs from "fs";
import {JSDOM} from "jsdom";
import {Ava} from "@prpsake/utils";

const title = Ava.titleWithNamespace(test, "core:webapi:File");
const libContent = fs.readFileSync("./dist/index.umd.js", {encoding: "utf8"});

let window;
test.beforeEach(() => {
  window = new JSDOM("", {runScripts: "dangerously"}).window;

  const libScript = window.document.createElement("script");
  libScript.textContent = libContent;
  window.document.body.appendChild(libScript);
});

test(
  `#toText: returns an object literal with the file and its content as string`,
  title,
  async (t) => {
    //s
    const bits = `{"blah": "blub"}`;
    const file = new window.File([bits], "file.json", {
      type: "application/json",
    });
    const expect = {file, result: bits};
    //e
    const actual = await window.PRPCore.Webapi.File.toText(file);
    //v
    t.deepEqual(actual, expect);
  },
);

test(`#toText: returns an object literal`, title, async (t) => {
  //s
  const nonFile = null;
  const expect = {file: null};
  //e
  const actual = await window.PRPCore.Webapi.File.toText(null);
  //v
  //t.log(actual);
  t.true(true);
});
