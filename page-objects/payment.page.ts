import { Locator, Page, expect } from '@playwright/test'

export class Paymentpage {
  page: Page
  cardName: Locator
  cardNumber: Locator
  cvc: Locator
  cardExpiration: Locator
  cardYear: Locator
  payButton: Locator

  constructor(page: Page) {
    this.page = page
    this.cardName = page.locator('input[name="name_on_card"]')
    this.cardNumber = page.locator('input[name="card_number"]')
    this.cvc = page.locator('input[name="cvc"]')
    this.cardExpiration = page.locator('input[name="expiry_month"]')
    this.cardYear = page.locator('input[name="expiry_year"]')
    this.payButton = page.getByText('Pay and Confirm Order')
  }

  async fillPaymentData(
    namecard: string,
    numberCard: string,
    cvc: string,
    expirationCard: string,
    yearCard: number
  ) {
    await this.cardName.fill(namecard)
    await this.cardNumber.fill(numberCard)
    await this.cvc.fill(cvc)
    await this.cardExpiration.fill(expirationCard)
    await this.cardYear.fill(yearCard.toString())
  }

  async clickPayAndConfirmButton() {
    await this.payButton.click()
  }
}
