import { test } from '@playwright/test';
import { AppPages } from '../../../pages/index.js';
import { HOME_URL } from '../../../utils/env.js';

test.describe('Create New Deal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${HOME_URL}`);
  });

  test('Navigate from Deals to Budget dashboard', async ({ page }) => {
    const app = new AppPages(page);
    await app.dealsPage.CreateNewDeal();
  });

  test('Navigate from Budget dashboard', async ({ page }) => {
    const app = new AppPages(page);
    await app.budgetPage.navigateToBudgetDashboard();
  });
}); 