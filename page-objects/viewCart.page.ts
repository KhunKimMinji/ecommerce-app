import { Locator, Page, expect } from '@playwright/test'
import { ProductStore } from '../src/store/product-store'
import _ from 'lodash'

export class ViewCartPage {
  page: Page
  descriptionColumn: Locator
  priceColumn: Locator
  quantityColumn: Locator
  totalColumn: Locator
  checkoutButton: Locator

  constructor(page: Page) {
    this.page = page
    this.descriptionColumn = page.locator('td.cart_description a')
    this.priceColumn = page.locator('td.cart_price p')
    this.quantityColumn = page.locator('td.cart_quantity button')
    this.totalColumn = page.locator('td.cart_total p')
    this.checkoutButton = page.getByText('Proceed To Checkout')
  }

  async verifyProductList(productStore: ProductStore) {
    const descriptions = await this.descriptionColumn.allInnerTexts()
    const kebabCaseDescription = descriptions.map((value) => _.kebabCase(value))
    console.log('Description:', descriptions, 'KebubDes:', kebabCaseDescription)

    const textPrices = await this.priceColumn.allInnerTexts()
    const prices = textPrices.map((textPrice) => {
      return parseFloat(textPrice.replace('Rs. ', '').trim() || '0')
    })

    const textQuantity = await this.quantityColumn.allInnerTexts()
    const quantities = textQuantity.map((textQuantity) => {
      return parseFloat(textQuantity || '0')
    })

    const textTotalProduct = await this.totalColumn.allInnerTexts()
    const totalProducts = textTotalProduct.map((textPrice) => {
      return parseFloat(textPrice.replace('Rs. ', '').trim() || '0')
    })

    const productList = kebabCaseDescription.length
    for (let index = 0; index < productList; index++) {
      const productName = kebabCaseDescription[index]
      const price = prices[index]
      const quantity = quantities[index]
      const total = totalProducts[index]
      const productStoreValue = productStore.get(productName)

      console.log('Product details:', productName, price, quantity, total)
      console.log('Product in store:', productStoreValue)

      expect(productName).toBe(productStoreValue?.name)
      expect(price).toBe(productStoreValue?.price)
      expect(quantity).toBe(productStoreValue?.quantity)
      expect(total).toBe(productStoreValue?.total)
    }
  }

  async clickCheckoutButton() {
    await this.checkoutButton.click()
  }
}
