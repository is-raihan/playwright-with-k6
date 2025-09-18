import { test, expect } from '@playwright/test';
import { AppPages } from '../../../pages/index.js';
import { HOME_URL } from '../../../utils/env.js';

test.describe('Create New Deal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${HOME_URL}`);
  });

  test('Navigate from Deals to Budget dashboard', async ({ page }) => {
    const app = new AppPages(page);
    
    await test.step('Navigate to Deals page', async () => {
      await app.dealsPage.navigateToDealsRepository();
    });
    
    await test.step('Create new deal', async () => {
      await app.dealsPage.CreateNewDeal();
    });
    
    await test.step('Verify deal creation', async () => {
      // Add verification logic here
      await expect(page).toHaveTitle(/.*Deals.*/);
    });
  });

  test('Navigate from Budget dashboard', async ({ page }) => {
    const app = new AppPages(page);
    
    await test.step('Navigate to Budget dashboard', async () => {
      await app.budgetPage.navigateToBudgetDashboard();
    });
    
    await test.step('Verify budget dashboard loaded', async () => {
      await expect(page).toHaveTitle(/.*Budget.*/);
    });
  });
});
