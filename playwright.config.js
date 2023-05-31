// @ts-check
const { devices } = require("@playwright/test");

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: "./tests",
  retries: 0,
  workers: 1,
  /* Maximum time one test can run for. */
  timeout: 200 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 10000,
    toMatchSnapshot: {
      threshold: 0.3,
      maxDiffPixels: 5,
      maxDiffPixelRatio: 0.01,
    },
  },
  /* Run tests in files in parallel */
  // fullyParallel: true,
  // /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: !!process.env.CI,
  // /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  // /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,
  // /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  
    reporter: [
      [
        "allure-playwright",
        {
          detail: true,
          outputFolder: "my-allure-results",
          suiteTitle: false,
          environmentInfo: {
            E2E_NODE_VERSION: process.version,
            E2E_OS: process.platform,
            },
        },
      ],
    ],
 // reporter: "html",
  projects: [
    {
      name: "safari-headless",
      use: {
        browserName: "webkit",
        headless: true,
        screenshot: "on",
        video: "retain-on-failure",
        trace: "on", //'on','off','retain-on-failure'
      },
    },
    {
      name: "safari-headed",
      use: {
        browserName: "webkit",
        headless: false,
        screenshot: "on",
        video: "retain-on-failure",
        trace: "on", //'on','off','retain-on-failure'
      },
    },
    {
      name: "chrome-headed",
      use: {
        browserName: "chromium",
        headless: false,
        screenshot: "on",
        video: "retain-on-failure",
        trace: "on", //'on','off','retain-on-failure'
        // permissions: ['geolocation'],
        // ignoreHTTPSErrors: true,
        // ...devices['iPad Pro 11 landscape'],
        viewport: { width: 1280, height: 1024 },
      },
    },
    {
      name: "chrome-headless",
      use: {
        browserName: "chromium",
        headless: true,
        screenshot: "on",
        video: "retain-on-failure",
        trace: "on", //'on','off','retain-on-failure'
      },
    },
    {
      name: "firefox-headed",
      use: {
        browserName: "firefox",
        headless: false,
        screenshot: "on",
        trace: "on", //'on','off','retain-on-failure'
      },
    },
  ],
  use: {
    browserName: "webkit",
    headless: false,
    screenshot: "on",
    video: "retain-on-failure",
    trace: "on", //'on','off','retain-on-failure'
  },
};

module.exports = config;
