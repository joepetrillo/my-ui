import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: true,
  entry: [
    "src/index.ts",
    "src/components/*.tsx",
    "src/components/*.ts",
    "src/hooks/*.ts",
    "src/lib/*.ts",
    "src/base-ui/*.ts",
  ],
  external: ["@my-ui/ui", /^@my-ui\/ui\//],
  format: ["esm"],
  sourcemap: true,
});
