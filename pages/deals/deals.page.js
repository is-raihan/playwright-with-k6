import { BasePage } from '../base.page.js';

export class DealsPage extends BasePage {
  constructor(page) {
    super(page);
    this.dealsMenuItem = page.getByRole('listitem').filter({ hasText: 'Deals Dashboard Repository' }).locator('span');
    this.repositorySubmenu = page.locator('li:nth-child(2) > .sidebar__submenu > li:nth-child(2) > .sidebar__submenu-link');
    this.dealsrepositorySubmenu = page.locator('li:nth-child(2) > .sidebar__submenu > li:nth-child(3) > .sidebar__submenu-link');
    this.draftRadio = page.getByRole('radio', { name: 'Draft 4' });
    this.dealLink_682 = page.getByRole('cell', { name: '682' }).getByRole('link');
    this.createDeal = page.getByRole('link', { name: 'Create deal' });
    this.RoamingPartner = page.getByRole('textbox', { name: 'Operators' });
    this.selectOperators = page.getByRole('option', { name: 'Operators' });
    this.Click_To_Select = page.locator('div').filter({ hasText: /^Click to Select$/ }).locator('span');
    this.Select_RoamSmart = page.getByRole('listitem').filter({ hasText: '21610 (RoamSmart)' });
    this.Digicel_Limited = page.getByRole('listitem').filter({ hasText: '(Digicel (St Lucia) Limited)' });
    this.Confirm = page.getByRole('button', { name: 'Confirm' });
    this.Save = page.getByRole('button', { name: 'Save' });
  }

  async navigateToDealsRepository() {
    await this.dealsMenuItem.click();
    await this.repositorySubmenu.click();
  }

  async CreateNewDeal() {
    await this.dealsMenuItem.click();
    await this.dealsrepositorySubmenu.click();
    await this.createDeal.click();
    await this.RoamingPartner.click();
    await this.selectOperators.click();
    await this.Click_To_Select.click();
    await this.Select_RoamSmart.click({ force: true });
    await this.Confirm.click({ force: true });
    await this.Save.click();
    await this.page.waitForTimeout(2000);
  }
} 