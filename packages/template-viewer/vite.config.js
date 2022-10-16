import path from "path"
import { defineConfig } from "vite"



export default ({ mode }) => {
  return defineConfig({
    envPrefix: ["EXP_"],
    publicDir: "public",
    build: {
      target: "esnext",
      minify: true,
      lib: {
        entry: path.resolve(__dirname, "src/api.js"),
        fileName: "index",
        formats: ["es"],
      }
    }
  })
}
