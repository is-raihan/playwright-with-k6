const { expect } = require('@playwright/test');
const { BasePage } = require('../base.page');
const { baseUrl, validemail, validpassword, invalidemail, invalidpassword } = require('../../utils/env');

class SignInPage extends BasePage {
  constructor(page) {
    super(page);
  }

  // Locators for the sign-in page elements
  emailInput = 'input[name="email"]';
  passwordInput = 'input[name="password"]';
  signInButton = 'button:has-text("Sign In")';

  // Navigate to the sign-in page
  async navigate() {
    await this.page.goto(baseUrl);
  }

  // Perform sign-in
  async validsignIn() {
    await this.navigate();
    await this.page.fill(this.emailInput, validemail);
    await this.page.fill(this.passwordInput, validpassword);
    await this.page.click(this.signInButton);

    // URL assertion
    await expect(this.page).toHaveURL(baseUrl);
    // Sign Out button visible assertion
    await expect(this.page.getByText('Sign Out')).toBeVisible();
  }

  async invalidsignIn() {
    await this.navigate();
    await this.page.fill(this.emailInput, invalidemail);
    await this.page.fill(this.passwordInput, invalidpassword);
    await this.page.click(this.signInButton);
    await expect(this.page.getByText('No user found with this email!')).toBeVisible();
  }
}

module.exports = { SignInPage };
