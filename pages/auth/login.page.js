import { BasePage } from '../base.page.js';
import { BASE_URL, TEST_DATA } from '../../utils/env.js';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.getByRole('textbox', { name: 'Username:' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password:' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async navigate() {
    await this.page.goto(`${BASE_URL}`);
  }

  async login() {
    await this.usernameInput.fill(`${TEST_DATA.credentials.validUser.username}`);
    await this.passwordInput.fill(`${TEST_DATA.credentials.validUser.password}`);
    await this.loginButton.click();
    await this.waitForLoadState();
  }
} 