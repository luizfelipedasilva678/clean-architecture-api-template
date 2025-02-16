import { defineConfig, configDefaults } from "vitest/config";

export default defineConfig({
  test: {
    dir: "./src/tests",
    globals: true,
    exclude: [...configDefaults.exclude],
    coverage: {
      reporter: ["text"],
      exclude: [...configDefaults.exclude],
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
  },
});
