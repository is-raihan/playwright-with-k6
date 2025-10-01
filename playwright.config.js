const { defineConfig } = require("@playwright/test");
const { baseUrl } = require("./utils/env");
const os = require("os");

// Ortoni Report Configuration with Meta Information
const ortoniConfig = {
  title: "PippaSync Test Report",
  port: 9324,
  projectName: "PippaSync",
  testType: "End-to-End Testing",
  authorName: "Raihan Khan",
  showProject: true,
  base64Image: false,
  stdIO: false,
  meta: {
    "Author": "Raihan Khan",
    "Project": "PippaSync",
    "Version": "1.0.0",
    "Description": "Playwright-based end-to-end tests for PippaSync with K6 performance testing",
    "Test Environment": process.env.NODE_ENV || "dev",
    "Platform": os.type(),
    "Node Version": process.version,
    "OS": `${os.type()} ${os.release()}`,
    "Architecture": os.arch(),
    "Test Framework": "Playwright + K6",
    "Report Generated": new Date().toISOString(),
    "CI/CD": process.env.CI ? "Yes" : "No"
  }
};

module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["ortoni-report", ortoniConfig]],
  use: {
    baseURL: baseUrl,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
    // { name: 'firefox', use: { browserName: 'firefox' } },
    // { name: 'webkit', use: { browserName: 'webkit' } },
  ],
});
