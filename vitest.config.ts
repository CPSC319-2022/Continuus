import { configDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { loadEnvConfig } from "@next/env";

// https://vitejs.dev/config/
export default defineConfig(() => {
  process.env['DATABASE_URL'] = 'postgresql://postgres:password@localhost:5432/continuus'
  process.env['NEXTAUTH_URL'] = 'http://localhost:3000'
  process.env['GOOGLE_CLIENT_ID'] = 'TEST_PLACEHOLDER'
  process.env['GOOGLE_CLIENT_SECRET'] = 'TEST_PLACEHOLDER'
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
