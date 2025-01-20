import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import alias from "@rollup/plugin-alias";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  input: "src/app/main.tsx",
  output: [
    {
      file: "dist/index.mjs",
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    alias({
      entries: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    }),
    typescript({
      sourceMap: true,
      declaration: true,
    }),
    resolve({
      extensions: [".ts", ".tsx", ".js", ".mjs"],
    }),
    commonjs(),
  ],
  external: [
    "react",
    "react-dom",
    "@whole-ui/core",
    "@whole-ui/plugins",
    "@whole-ui/components",
  ],
};
