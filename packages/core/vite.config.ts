import {resolve} from "path";
import {defineConfig} from "vite";
import createReScriptPlugin from "@jihchi/vite-plugin-rescript";

export default ({mode}) => {
  return defineConfig({
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
    plugins: [createReScriptPlugin()],
  });
};
