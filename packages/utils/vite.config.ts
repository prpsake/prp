import {resolve} from "path";
import {defineConfig} from "vite";

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
      rollupOptions: {
        external: [/node_modules/, "fs"],
      },
    },
    plugins: [],
  });
