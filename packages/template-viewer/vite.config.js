import {resolve} from "path";
import {defineConfig} from "vite";
//import createReScriptPlugin from "@jihchi/vite-plugin-rescript";

export default ({mode}) =>
  defineConfig({
    publicDir: "public",
    build: {
      target: "esnext",
      minify: true,
      lib: {
        entry: resolve(__dirname, "src/index.js"),
        fileName: "index",
        formats: ["es"],
      },
    },
    //plugins: [createReScriptPlugin()],
  });
