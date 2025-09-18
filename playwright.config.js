// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envFile = `.env.${process.env.NODE_ENV || 'dev'}`;
dotenv.config({ path: path.resolve(__dirname, 'env', envFile) });

// Determine reporters based on environment
const getReporters = () => {
  const reporters = [];
  
  // Always include HTML reporter
  reporters.push(['html', { 
    outputFolder: 'playwright-report',
    open: 'never'
  }]);
  
  // Add Allure reporter if requested
  if (process.env.REPORTER === 'allure' || process.argv.includes('--report=allure-playwright')) {
    reporters.push(['allure-playwright', {
      outputFolder: 'allure-results',
      detail: true,
      suiteTitle: false
    }]);
  }
  
  // Add multiple reporters for comprehensive reporting
  if (process.env.REPORTER === 'all') {
    reporters.push(['allure-playwright', {
      outputFolder: 'allure-results',
      detail: true,
      suiteTitle: false
    }]);
    reporters.push(['json', { outputFile: 'test-results.json' }]);
    reporters.push(['junit', { outputFile: 'test-results.xml' }]);
  }
  
  return reporters;
};

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 0 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: getReporters(),

  use: {
    baseURL: process.env.BASE_URL,
    ignoreHTTPSErrors: true,
    headless: true,
    trace: 'on-first-retry',
    video: 'on',
    screenshot: 'only-on-failure',
    viewport: { width: 1920, height: 1080 },
    actionTimeout: 5000,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 }
      }
    },
    // Add additional browsers as needed
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  ],

  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
