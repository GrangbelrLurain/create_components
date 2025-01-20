import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/app/main.ts",
  output: [
    {
      file: "dist/index.mjs",
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true, // 타입 정의 파일 생성
      declarationDir: "./dist", // 타입 정의 파일 출력 디렉토리
      sourceMap: true,
    }),
    resolve({
      extensions: [".ts", ".js", ".mjs"],
    }),
    commonjs(),
  ],
};
