import { resolve } from "path"
import { defineConfig } from "vite"
import createReScriptPlugin from "@jihchi/vite-plugin-rescript"
import { defaults as postcssConfigDefaults } from "./postcss.config.cjs"


export default ({ mode }) => {
  return defineConfig({
    css: { postcss: postcssConfigDefaults },
    publicDir: "public",
    build: {
      target: "esnext",
      minify: false,
      lib: {
        entry: resolve(__dirname, "src/index.js"),
        fileName: "[name]",
        formats: ["es"],
      },
      rollupOptions: {
        external: ["hybrids"]
      }
    },
    plugins: [
      createReScriptPlugin(),
    ]
  })
}
