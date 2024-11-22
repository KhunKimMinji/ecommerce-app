import { Locator, Page, expect } from '@playwright/test';
import { ProductsPage } from './products.page';

export class ViewCartPage {
  page: Page;
  productRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productRows = page.locator('table.table.table-condensed tbody  tr');
  }

  async verifyProductRows() {
    const cartTableRows = this.productRows;
    await expect(cartTableRows).toHaveCount(2);
    for (let i = 0; i < 2; i++) {
      const row = cartTableRows.nth(i);
    }
  }
}
