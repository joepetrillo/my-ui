import { defineConfig } from "tsdown";

export default defineConfig({
  clean: true,
  deps: {
    neverBundle: ["@my-ui/ui", /^@my-ui\/ui\//u],
  },
  dts: true,
  entry: [
    "src/index.ts",
    "src/components/*.tsx",
    "src/components/*.ts",
    "src/hooks/*.ts",
    "src/lib/*.ts",
    "src/base-ui/*.ts",
  ],
  format: ["esm"],
  platform: "browser",
  sourcemap: true,
  target: false,
});
