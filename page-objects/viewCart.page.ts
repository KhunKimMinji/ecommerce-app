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

  async verifyDescriptionList(productStore: ProductStore) {
    const descriptions = await this.descriptionColumn.allInnerTexts();
    for (const productName of descriptions) {
      console.log(productName, productStore);
      const product = productStore.get(productName.trim());
      expect(product).toBeTruthy();
    }
  }

  async verifyPriceList() {
    const textPrices = await this.priceColumn.allInnerTexts();
    const prices = textPrices.map((textPrice) => {
      return parseFloat(textPrice.replace("Rs. ", "").trim() || "0");
    });
    console.log("Prices:", prices);
  }

  async verifyQuantityList() {
    const textQuantity = await this.quantityColumn.allInnerTexts();
    const quantity = textQuantity.map((textPrice) => {
      return parseFloat(textPrice || "0");
    });
    console.log("Quantity:", quantity);
  }

  async verifyTotalList() {
    const textTotal = await this.totalColumn.allInnerTexts();
    const total = textTotal.map((textPrice) => {
      return parseFloat(textPrice.replace("Rs. ", "").trim() || "0");
    });
    console.log("Total:", total);
  }
}
