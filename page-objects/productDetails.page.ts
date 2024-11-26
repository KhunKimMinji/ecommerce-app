import { Locator, Page, expect } from '@playwright/test'
import { ProductsPage } from './products.page'

export class ProductDetailsPage {
  page: Page
  proName: Locator
  productCategory: Locator
  productPrice: Locator
  productAvailability: Locator
  productCondition: Locator
  productBand: Locator

  constructor(page: Page) {
    this.page = page
    this.proName = page.locator('div.product-information h2')
    this.productCategory = page.getByText('Category:')
    this.productPrice = page.locator(
      '//div[@class="product-information"]//span//span'
    )
    this.productAvailability = page.getByText('Availability')
    this.productCondition = page.getByText('Condition:')
    this.productBand = page.locator('//p//b[text()="Brand:"]')
  }

  async verifyProductName(productPage: ProductsPage) {
    const productdetailsName = await this.proName.innerText()
    await expect(this.proName).toBeVisible()
    expect(productdetailsName).toBe(productPage.selectedProductName)
  }

  async verifyProductDetails() {
    await expect(this.productCategory).toBeVisible()
    await expect(this.productPrice).toBeVisible()
    await expect(this.productBand).toBeVisible()
  }
}
