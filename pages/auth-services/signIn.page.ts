import { Page, expect } from '@playwright/test';
import { BasePage } from '../base.page';
import { baseUrl, validemail, validpassword, invalidemail, invalidpassword } from '../../utils/env';

export class SignInPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // Locators for the sign-in page elements
    private readonly emailInput = 'input[name="email"]';
    private readonly passwordInput = 'input[name="password"]';
    private readonly signInButton = 'button:has-text("Sign In")';
    // private readonly pageTitle = 'h1:has-text("Sign In")';
    // private readonly pageDescription = 'p:has-text("Enter your credential to get started.")';

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
        await expect(this.page.getByText("Sign Out")).toBeVisible();
    }


    async invalidsignIn() {
        await this.navigate();
        await this.page.fill(this.emailInput, invalidemail);
        await this.page.fill(this.passwordInput, invalidpassword);
        await this.page.click(this.signInButton);
        //assertion
        // await expect(this.page).toHaveURL(baseUrl + '/signin');
        await expect(this.page.getByText("No user found with this email!")).toBeVisible();
    }

}
