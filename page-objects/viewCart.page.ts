import { Locator, Page, expect } from "@playwright/test";
import { ProductsPage } from "./products.page";

export class ViewCartPage {
  page: Page;
  productRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productRows = page.locator("table.table.table-condensed tbody  tr");
  }

  //   async verifyProductRows() {
  //     const countRows = await this.productRows.count();
  //     for (let i = 0; i < countRows; i++) {
  //       await expect(this.productRows.nth(i)).toBeVisible();
  //     }
  //     console.log('Product Rows:', countRows)
  //   }
}
