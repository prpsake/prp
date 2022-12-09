import {resolve} from "path";
import {defineConfig} from "vite";

export default ({mode}) =>
  mode === "production"
    ? defineConfig({
        publicDir: false,
        build: {
          target: "esnext",
          minify: true,
          lib: {
            entry: resolve(__dirname, "src/index.js"),
            fileName: "index",
            formats: ["es"],
          },
        },
      })
    : defineConfig({
        publicDir: "public",
      });
