const { test, expect } = require('@playwright/test');
const { SignInPage } = require('../../../pages');

test.describe('Sign In', () => {
  test('should sign in successfully', async ({ page }) => {
    const signInPage = new SignInPage(page);
    await signInPage.validsignIn();
    console.log('Sign-in test completed successfully.');
  });

  test('should sign in unsuccessfully', async ({ page }) => {
    const signInPage = new SignInPage(page);
    await signInPage.invalidsignIn();
    console.log('Sign-in negative test completed.');
  });
});
