import { resolve } from "path"
import { defineConfig } from "vite"
import createReScriptPlugin from "@jihchi/vite-plugin-rescript"


export default ({ mode }) => {
  return defineConfig({
    publicDir: "public",
    build: {
      target: "esnext",
      minify: "esbuild",
      lib: {
        entry: resolve(__dirname, "src/api.js"),
        fileName: "index",
        formats: ["es"],
      }
    },
    plugins: [
      createReScriptPlugin(),
    ]
  })
}
