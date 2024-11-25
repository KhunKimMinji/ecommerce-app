import { Locator, Page, expect } from "@playwright/test";

export class OrderPlacedPage {
  page: Page;
  orderPlacedMsg: Locator

  constructor(page: Page) {
    this.page = page;
    this.orderPlacedMsg = page.getByText('Congratulations! Your order has been confirmed!')
  }

  async verifyOrderPlacedMessage(){
    await expect(this.orderPlacedMsg).toBeVisible()
  }


}
