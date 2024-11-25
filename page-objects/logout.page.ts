import { Locator, Page, expect } from '@playwright/test'

export class LogoutPage {
  page: Page
  logoutButton: Locator

  constructor(page: Page) {
    this.page = page
    this.logoutButton = page.getByText(' Logout')
  }

  async clickLogoutButton() {
    await this.logoutButton.click()
  }
}
