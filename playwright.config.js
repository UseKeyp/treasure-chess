/**
 * See https://playwright.dev/docs/test-configuration
 *
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const CONFIG = {
  testDir: './e2e',
  timeout: 60 * 1000,
  expect: { timeout: 5000 },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',
  /* See https://playwright.dev/docs/api/class-testoptions */
  use: {
    baseURL: 'http://localhost:8910',
    /* See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
  webServer: {
    command: './serve.sh',
    url: 'http://localhost:8910',
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
}

module.exports = CONFIG
