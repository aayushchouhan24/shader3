import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import terser from "@rollup/plugin-terser"
import babel from "@rollup/plugin-babel"
import dts from "rollup-plugin-dts"

const extensions = [".js", ".ts"]

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/shader3.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/shader3.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript(),
      babel({
        babelHelpers: "runtime",
        extensions,
        exclude: "node_modules/**",
        plugins: ["@babel/plugin-transform-runtime"],
      }),
      terser(),
    ],
    external: ["three", "@babel/runtime"],
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/shader3.d.ts",
      format: "es",
    },
    plugins: [dts()],
  },
]
