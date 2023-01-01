import {resolve} from "path";
import {defineConfig} from "vite";
import createReScriptPlugin from "@jihchi/vite-plugin-rescript";
import replace from "@rollup/plugin-replace";
import {Utils} from "./src";

const errorCauseIdSeq = Utils.Sequence.intStr(
  process.env.npm_package_name + "#",
  0,
);

export default (_) =>
  defineConfig({
    publicDir: "public",
    build: {
      target: "esnext",
      minify: true,
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        fileName: "index",
        formats: ["es"],
      },
    },
    plugins: [
      createReScriptPlugin(),
      replace({
        preventAssignment: false,
        __ERROR_CAUSE_ID__: () => `${errorCauseIdSeq.next().value}`,
      }),
    ],
  });
