import { Locator, Page, expect } from '@playwright/test'

export class MainPage {
  page: Page
  imgSlide: Locator
  signupAndLogin: Locator
  loggedInAsUsername: Locator
  productsMenu: Locator
  cartMenu: Locator

  constructor(page: Page) {
    this.page = page
    this.imgSlide = page.locator('#slider-carousel')
    this.signupAndLogin = page.locator('text=Signup / Login')
    this.loggedInAsUsername = page.getByText(' Logged in as ')
    this.productsMenu = page.locator('i.material-icons.card_travel')
    this.cartMenu = page.locator('ul.nav.navbar-nav i.fa-shopping-cart')
  }

  async verifyMainPageVisible() {
    await expect(this.imgSlide).toBeVisible()
  }

  async clickSignupAndLoginButton() {
    await this.signupAndLogin.click()
  }

  async verifyLoginUsername(randomName: string) {
    await expect(this.loggedInAsUsername).toBeVisible()
    const loginUsername = await this.loggedInAsUsername.innerText()
    expect(loginUsername).toContain(` Logged in as ${randomName}`)
  }

  async clickProductsMenu() {
    await this.productsMenu.click()
  }

  async clickCartMenu() {
    await this.cartMenu.click()
  }
}
