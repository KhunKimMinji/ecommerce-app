import { Locator, Page, expect } from '@playwright/test'

export class LoginPage {
  page: Page
  loginYourAccountMsg: Locator
  emailTextbox: Locator
  passwordTextbox: Locator
  loginButton: Locator
  loginFailedMsg: Locator

  constructor(page: Page) {
    this.page = page
    this.loginYourAccountMsg = page.getByText('Login to your account')
    this.emailTextbox = page.locator('input[data-qa="login-email"]')
    this.passwordTextbox = page.locator('input[data-qa="login-password"]')
    this.loginButton = page.getByRole('button', { name: 'Login' })
    this.loginFailedMsg = page.getByText('Your email or password is incorrect!')
  }

  async verifyloginYourAccountMessage() {
    await expect(this.loginYourAccountMsg).toBeVisible()
  }

  async filllLoginData(name: string, email: string) {
    await this.emailTextbox.fill(name)
    await this.passwordTextbox.fill(email)
  }

  async clickLoginButton() {
    await this.loginButton.click()
  }

  async verifyLoginFailedMessage() {
    await expect(this.loginFailedMsg).toBeVisible()
  }
}
