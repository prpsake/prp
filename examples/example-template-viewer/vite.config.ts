import { resolve } from "path"
import { defineConfig } from "vite"


export default () => defineConfig({
    publicDir: "public",
    build: {
      target: "esnext",
      minify: "esbuild",
      rollupOptions: {
        external: ["@prpsake/template-viewer"],
        output: {
          preserveModules: true,
          entryFileNames: "[name].mjs"
        }
      },
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        formats: ["es"]
      },
    }
  })
