import test from "ava";
import sinon from "sinon";
import fs from "fs";
import {JSDOM} from "jsdom";
import {Ava} from "@prpsake/utils";

const title = Ava.titleWithNamespace(test, "core:webapi:FileReader");
const libContent = fs.readFileSync("./dist/index.umd.js", {encoding: "utf8"});

let window;
test.beforeEach(() => {
  window = new JSDOM("", {runScripts: "dangerously"}).window;

  const libScript = window.document.createElement("script");
  libScript.textContent = libContent;
  window.document.body.appendChild(libScript);

  const input = window.document.createElement("input");
  input.type = "file";
});

test(`.readFileAsText`, async (t) => {
  //s
  const file = new window.File([`{"hello": "kitty"}`], "file.json", {
    type: "application/json",
  });

  //e
  const actual = await window.PRPCore.Webapi.FileReader.readFileAsText(file);

  //v
  t.log(actual);
  t.true(true);
});
