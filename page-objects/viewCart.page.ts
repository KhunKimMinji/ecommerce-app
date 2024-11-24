import { Locator, Page, expect } from "@playwright/test";
import { ProductsPage } from "./products.page";
import { ProductStore } from "../src/store/product-store";

export class ViewCartPage {
  page: Page;
  descriptionColumn: Locator;
  priceColumn: Locator;
  quantityColumn: Locator;
  totalColumn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.descriptionColumn = page.locator("td.cart_description a");
    this.priceColumn = page.locator("td.cart_price p");
    this.quantityColumn = page.locator("td.cart_quantity button");
    this.totalColumn = page.locator("td.cart_total p");
  }

  async verifyProductList(productStore: ProductStore) {
    const descriptions = await this.descriptionColumn.allInnerTexts();
    const textPrices = await this.priceColumn.allInnerTexts();
    const prices = textPrices.map((textPrice) => {
      return parseFloat(textPrice.replace("Rs. ", "").trim() || "0");
    });
    const textQuantity = await this.quantityColumn.allInnerTexts();
    const quantities = textQuantity.map((textPrice) => {
      return parseFloat(textPrice || "0");
    });
    const textTotal = await this.totalColumn.allInnerTexts();
    const totals = textTotal.map((textPrice) => {
      return parseFloat(textPrice.replace("Rs. ", "").trim() || "0");
    });

    for (const index in descriptions) {
      const productName = descriptions[index];
      const price = prices[index];
      const quantity = quantities[index];
      const total = totals[index];
      console.log('Product details:', productName, price, quantity, total)
    }

    // for (const productName of descriptions) {
    //   console.log(productName, productStore);
    //   const product = productStore.get(productName.trim());
    //   expect(product).toBe(`${descriptions}":{ quantity:"${quantity},"price:"${prices},"total:"${total} }`)
    // }
  }
}
