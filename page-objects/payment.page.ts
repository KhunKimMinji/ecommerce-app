import { Locator, Page, expect } from '@playwright/test'
import { random } from 'lodash'
import { randomData } from '../test-data/randomData'

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

  async fillPaymentData(randomCardData: typeof randomData) {
    await this.cardName.fill(randomCardData.randomCardName)
    await this.cardNumber.fill(randomCardData.randomCardNumber)
    await this.cvc.fill(randomCardData.radomCVC)
    await this.cardExpiration.fill(randomCardData.randomCardExpiration)
    await this.cardYear.fill(randomCardData.randomYearCard.toString())
  }

  async clickPayAndConfirmButton() {
    await this.payButton.click()
  }
}
