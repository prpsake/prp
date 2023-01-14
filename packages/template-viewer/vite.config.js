import {resolve} from "path";
import {defineConfig} from "vite";
import {Utils} from "@prpsake/core";
import replace from "@rollup/plugin-replace";

const errorCauseIdSeq = Utils.Sequence.intStr(
  process.env.npm_package_name + "#",
  0,
);

const sharedOptions = {
  plugins: [
    replace({
      preventAssignment: false,
      __ERROR_CAUSE_ID__: () => `${errorCauseIdSeq.next().value}`,
    }),
  ],
};

export default ({mode}) =>
  mode === "production"
    ? defineConfig({
        publicDir: false,
        build: {
          target: "esnext",
          minify: false,
          lib: {
            entry: resolve(__dirname, "src/index.js"),
            fileName: "index",
            formats: ["es"],
          },
        },
        ...sharedOptions,
      })
    : defineConfig({
        publicDir: "public",
        ...sharedOptions,
      });
