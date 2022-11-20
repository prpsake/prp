import { resolve } from "path"
import { defineConfig } from "vite"



export default ({ mode }) => {
  return defineConfig({
    envPrefix: ["EXP_"],
    publicDir: "public",
    build: {
      target: "esnext",
      minify: true,
      lib: {
        entry: resolve(__dirname, "src/index.js"),
        fileName: "index",
        formats: ["es"],
      }
    }
  })
}
