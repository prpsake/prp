import test from "ava";
import fs from "fs";
import {JSDOM} from "jsdom";
import {Ava} from "@prpsake/utils";

const title = Ava.titleWithNamespace(test, "core:webapi:File");
const bpfContent = fs.readFileSync("./src/lib/blob.lib.js", {encoding: "utf8"});
const libContent = fs.readFileSync("./dist/index.umd.js", {encoding: "utf8"});

let window;
test.beforeEach(() => {
  window = new JSDOM("", {runScripts: "dangerously"}).window;

  const bpfScript = window.document.createElement("script");
  const libScript = window.document.createElement("script");

  bpfScript.textContent = bpfContent;
  libScript.textContent = libContent;

  window.document.body.appendChild(bpfScript);
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

test(
  `#toText: returns an object literal with an error cause if no file is provided`,
  title,
  async (t) => {
    //s
    const nonFile = null;
    const include = /^@prpsake\/core#[0-9]+/;
    //e
    const actual = await window.PRPCore.Webapi.File.toText(nonFile);
    //v
    t.regex(String(actual?.error?.id_), include);
  },
);
