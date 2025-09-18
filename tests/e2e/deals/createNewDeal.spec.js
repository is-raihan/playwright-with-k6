import { test, expect } from '@playwright/test';
import { AppPages } from '../../../pages/index.js';
import { HOME_URL } from '../../../utils/env.js';
import { AllureHelper } from '../../../utils/allure.js';

test.describe('Create New Deal', () => {
  test.beforeEach(async ({ page }) => {
    // Add test metadata
    AllureHelper.feature('Deals Management');
    AllureHelper.story('Create New Deal');
    AllureHelper.severity('critical');
    AllureHelper.owner('QA Team');
    AllureHelper.tag('deals');
    AllureHelper.tag('smoke');
    
    await page.goto(`${HOME_URL}`);
    
    // Add environment info
    AllureHelper.parameter('Environment', process.env.NODE_ENV || 'dev');
    AllureHelper.parameter('Base URL', HOME_URL);
  });

  test('Navigate from Deals to Budget dashboard', async ({ page }) => {
    // Add test description
    AllureHelper.description('Test navigation from Deals page to Budget dashboard');
    
    const app = new AppPages(page);
    
    await AllureHelper.step('Navigate to Deals page', async () => {
      await app.dealsPage.navigateToDealsRepository();
    });
    
    await AllureHelper.step('Create new deal', async () => {
      await app.dealsPage.CreateNewDeal();
    });
    
    await AllureHelper.step('Verify deal creation', async () => {
      // Add verification logic here
      await expect(page).toHaveTitle(/.*Deals.*/);
    });
    
    // Add screenshot
    const screenshot = await page.screenshot();
    await AllureHelper.screenshot('Deal Creation Screenshot', screenshot);
  });

  test('Navigate from Budget dashboard', async ({ page }) => {
    AllureHelper.description('Test navigation from Budget dashboard');
    AllureHelper.severity('normal');
    
    const app = new AppPages(page);
    
    await AllureHelper.step('Navigate to Budget dashboard', async () => {
      await app.budgetPage.navigateToBudgetDashboard();
    });
    
    await AllureHelper.step('Verify budget dashboard loaded', async () => {
      await expect(page).toHaveTitle(/.*Budget.*/);
    });
  });
});
