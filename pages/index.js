import { BasePage } from './base.page.js';
import { AdminPage } from '../pages/adminpanel/admin.page.js';
import { LoginPage } from './auth/login.page.js';
import { DealsPage } from './deals/deals.page.js';
import { BudgetPage } from './budgets/budget.page.js';

export class AppPages {
  constructor(page) {
    this.loginPage = new LoginPage(page);
    this.adminPage = new AdminPage(page);
    this.dealsPage = new DealsPage(page);
    this.budgetPage = new BudgetPage(page);
    this.basePage = new BasePage(page);
  }
} 