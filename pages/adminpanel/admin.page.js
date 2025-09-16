import { BasePage } from '../base.page.js';

export class AdminPage extends BasePage {
  constructor(page) {
    super(page);
    this.adminButton = page.getByRole('link', { name: 'Admin' });
    this.userLink = page.getByRole('link', { name: 'Users', exact: true });
    this.searchBoxselect = page.getByRole('textbox', { name: 'Search' });
    this.userNameFill = page.getByRole('textbox', { name: 'Search' });
    this.clickSearchButton = page.getByRole('button', { name: 'Search' });
    this.clickTheUserName = page.getByRole('link', { name: 'shikder' });
    this.scrolltoview = page.locator('#id_groups_from');
    this.selectTextfromList = page.locator('#id_groups_from', { hasText: 'AREX1' });
    this.Arrowbutton = page.locator('#id_groups_add_link');
  }

  async navigateToAdminDashboard() {
    await this.adminButton.click();
    await this.userLink.click();
  }

  async searchAndSelectUser() {
    await this.searchBoxselect.click();
    await this.userNameFill.fill('shikder');
    await this.clickSearchButton.click();
    await this.clickTheUserName.click();
  }

  async selectUserPermission() {
    await this.scrolltoview.scrollIntoViewIfNeeded();
    await this.selectTextfromList.selectOption('41');
    await this.Arrowbutton.click();
    await this.page.waitForTimeout(5000);
  }
} 