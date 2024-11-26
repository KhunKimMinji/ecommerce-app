import { Locator, Page, expect } from '@playwright/test'
import * as fs from 'fs'

export class OrderPlacedPage {
  page: Page
  orderPlacedMsg: Locator
  countinueButton: Locator

  constructor(page: Page) {
    this.page = page
    this.orderPlacedMsg = page.getByText(
      'Congratulations! Your order has been confirmed!'
    )
    this.countinueButton = page.getByText('Continue')
  }

  async verifyOrderPlacedMessage() {
    await expect(this.orderPlacedMsg).toBeVisible()
  }

  async clickContinueButton() {
    await this.countinueButton.click()
  }
}
