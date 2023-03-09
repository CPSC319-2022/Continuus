import { configDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { loadEnvConfig } from "@next/env";

// https://vitejs.dev/config/
export default defineConfig(() => {
  loadEnvConfig(process.cwd());

  return {
    plugins: [react()],
    test: {
      environment: "jsdom",
      coverage: {
        exclude: [...configDefaults.coverage.exclude!, "**/generated/**", "src/env"]
      },
    },
  }
});
