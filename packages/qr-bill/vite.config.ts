import { resolve } from "path"
import { defineConfig } from "vite"
import createReScriptPlugin from "@jihchi/vite-plugin-rescript"


export default ({ mode }) => defineConfig({
    publicDir: "public",
    build: {
      target: "esnext",
      minify: true,
      rollupOptions: {
        external: ["hybrids"]
      },
      lib: {
        entry: resolve(__dirname, "./src/index.ts"),
        fileName: "index",
        formats: ["es"],
      },
    },
    plugins: [
      createReScriptPlugin(),
    ]
  })
