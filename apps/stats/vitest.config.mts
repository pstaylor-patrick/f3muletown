import { fileURLToPath } from "node:url";

import baseConfig from "@f3muletown/vitest-config";
import { configDefaults, mergeConfig } from "vitest/config";

const projectRoot = fileURLToPath(new URL("./", import.meta.url));

export default mergeConfig(baseConfig, {
  resolve: {
    alias: {
      "@": projectRoot,
    },
  },
  test: {
    exclude: [...configDefaults.exclude, "e2e/**"],
    coverage: {
      include: ["app/**/*.ts?(x)", "lib/**/*.ts"],
      exclude: ["app/**/layout.tsx", "**/*.test.*"],
    },
  },
});
