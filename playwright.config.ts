import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL: 'http://localhost:4398' },
  webServer: {
    command: 'npx astro preview --port 4398',
    url: 'http://localhost:4398/',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
