export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async waitForLoadState(state = 'networkidle') {
    await this.page.waitForLoadState(state);
  }
} 