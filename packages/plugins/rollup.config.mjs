import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
  {
    input: "./lifecycle/src/app/main.ts", // 경로 수정
    output: [
      {
        file: "./lifecycle/dist/index.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "./lifecycle/dist/index.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({
        tsconfig: "./lifecycle/tsconfig.json", // tsconfig 경로도 수정
        sourceMap: true,
        declaration: true,
      }),
      resolve({
        extensions: [".ts", ".js"],
      }),
      commonjs(),
    ],
    external: [/@whole-ui\/core\/.*/],
  },
];
