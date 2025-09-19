// @ts-check
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// load env based on NODE_ENV
const envFile = `.env.${process.env.NODE_ENV || "dev"}`;
dotenv.config({ path: path.resolve(__dirname, "env", envFile) });


// ---- Reporter setup ----
const ortoniConfig = {
  open: process.env.CI ? "never" : "always",
  folderPath: "report-db",
  filename: "index.html",
  title: "Ortoni Test Report",
  projectName: "Ortoni-Report",
  preferredTheme: "light"
};

const getReporters = () => {
  const reporters = [["ortoni-report", ortoniConfig]]; // always keep Ortoni

  const hasAllureFlag = process.argv.includes("--report=allure-playwright");
  const hasReporterEnv = process.env.REPORTER === "allure";

  if (hasAllureFlag || hasReporterEnv) {
    reporters.push([
      "allure-playwright",
      { outputFolder: "allure-results", detail: true, suiteTitle: false }
    ]);
  } else {
    reporters.push(["html", { outputFolder: "playwright-report", open: "never" }]);
  }

  if (process.env.CI) {
    reporters.push(["json", { outputFile: "test-results.json" }]);
  }

  return reporters;
};

// ---- Final unified config ----
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 0 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: getReporters(),

  use: {
    baseURL: process.env.BASE_URL,
    ignoreHTTPSErrors: true,
    headless: true,
    trace: "on-first-retry",
    video: "on",
    screenshot: "only-on-failure",
    viewport: { width: 1920, height: 1080 },
    actionTimeout: 5000
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 }
      }
    }
    // add more browsers if you like
  ]
});
