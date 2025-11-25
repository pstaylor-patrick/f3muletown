import baseConfig from "@f3muletown/vitest-config";
import { mergeConfig } from "vitest/config";

export default mergeConfig(baseConfig, {
  test: {
    coverage: {
      include: ["src/**/*.ts"],
    },
  },
});
