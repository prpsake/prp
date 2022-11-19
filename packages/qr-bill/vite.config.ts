import { resolve } from "path"
import { defineConfig } from "vite"
import createReScriptPlugin from "@jihchi/vite-plugin-rescript"


export default ({ mode }) => defineConfig({
    publicDir: "public",
    build: {
      target: "esnext",
      minify: false, // "esbuild"
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


// export const blub = () => defineConfig({
//   publicDir: "public",
//   build: {
//     target: "esnext",
//     minify: "esbuild",
//     rollupOptions: {
//       external: ["@prpsake/template-viewer"],
//       output: {
//         preserveModules: true,
//         entryFileNames: "[name].mjs"
//       }
//     },
//     lib: {
//       entry: resolve(__dirname, "src/index.ts"),
//       formats: ["es"]
//     },
//   }
// })
