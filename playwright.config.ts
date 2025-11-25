import { defineConfig, devices } from "@playwright/test";

const reuseServer = !process.env.CI;

export default defineConfig({
  testDir: ".",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "web",
      testDir: "apps/web/e2e",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "http://127.0.0.1:3000",
      },
    },
    {
      name: "stats",
      testDir: "apps/stats/e2e",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "http://127.0.0.1:3001",
      },
    },
  ],
  webServer: [
    {
      command: "pnpm --dir apps/web dev --hostname 0.0.0.0 --port 3000",
      url: "http://127.0.0.1:3000",
      reuseExistingServer: reuseServer,
      stdout: "pipe",
      stderr: "pipe",
      timeout: 120_000,
    },
    {
      command: "pnpm --dir apps/stats dev --hostname 0.0.0.0",
      url: "http://127.0.0.1:3001",
      reuseExistingServer: reuseServer,
      stdout: "pipe",
      stderr: "pipe",
      timeout: 120_000,
    },
  ],
});
