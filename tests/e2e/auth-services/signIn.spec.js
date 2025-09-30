const { test, expect } = require('@playwright/test');
const { SignInPage } = require('../../../pages');
const { baseUrl } = require('../../../utils/env');

test.describe('Sign In', () => {
  let signInPage;

  test.beforeEach(async ({ page }) => {
    signInPage = new SignInPage(page);
    await page.goto(baseUrl); // if you’ve got a login URL
  });

  test('should sign in successfully', async () => {
    await signInPage.validSignIn();
    // await expect(signInPage.userAvatar).toBeVisible(); // example assertion
  });

  test('should fail sign in with invalid creds', async () => {
    await signInPage.invalidSignIn();
    // await expect(signInPage.errorMessage).toContainText('Invalid credentials');
  });
});
