// vitest.config.ts
import { mergeConfig, defineConfig } from "vitest/config";
import baseConfig from "./vite.config";

export default mergeConfig(baseConfig, {
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    coverage: {
      provider: "v8",
      enabled: true,
      reporter: ["text", "html"],
      reportsDirectory: "./coverage",
      exclude: ["**/test-utils/**", "**/*.d.ts"],
    },
  },
});
