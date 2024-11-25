import { Locator, Page, expect } from "@playwright/test";
import { ProductStore } from "../src/store/product-store";

export class ProductsPage {
  page: Page;
  allProductHeader: Locator;
  viewProductButton: Locator;
  productName: Locator;
  selectedProductName: string;
  searchTextbox: Locator;
  searchButton: Locator;
  addToCart: Locator;
  continueShoppingButton: Locator;
  viewCartButton: Locator;
  productPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.allProductHeader = page.locator("h2.title.text-center");
    this.viewProductButton = page.locator("i.fa.fa-plus-square");
    this.productName = page.locator("div.productinfo.text-center p");
    this.searchTextbox = page.locator("#search_product");
    this.searchButton = page.locator("#submit_search");
    this.addToCart = page.locator(
      '//div[contains(@class, "overlay-content")]//a[contains(text(), "Add to cart")]'
    );
    this.continueShoppingButton = page.getByText("Continue Shopping");
    this.viewCartButton = page.getByText("View Cart");
    this.productPrice = page.locator("div.productinfo.text-center h2");
  }

  async verifyAllProductsHeader() {
    await expect(this.allProductHeader).toBeVisible();
  }

  async verifyProductsVisible() {
    const productList = await this.productName.count();
    for (let index = 0; index < productList; index++) {
      await expect(this.productName.nth(index)).toBeVisible();
    }
  }

  async clickViewProductButton() {
    const nameProduct = await this.productName.nth(0).innerText();
    this.selectedProductName = nameProduct;
    await this.viewProductButton.nth(0).click();
  }

  async fillProductName() {
    const searchProductName = await this.productName.nth(0).innerText();
    await this.searchTextbox.fill(searchProductName);
  }

  async clickSearchBotton() {
    await this.searchButton.click();
  }

  async verifyProductrelatedToSearch() {
    const getDataInTextbox = await this.searchTextbox.inputValue();
    const productDisplay = await this.productName.innerText();
    expect(productDisplay).toEqual(getDataInTextbox);
  }

  async productHover(index: number) {
    await this.productName.nth(index).hover();
  }

  // add first product to cart
  async clickAddToCartButton(index: number, productStore: ProductStore) {
    await this.addToCart.nth(index).click();
    const productName = await this.productName.nth(index).innerText();
    this.selectedProductName = productName;
    const priceText = await this.productPrice.nth(index).innerText();
    const price = parseFloat(priceText?.replace("Rs. ", "").trim() || "0");
    productStore.set(productName, price, 1);
  }

  async clickContinueShoppingButton() {
    await this.continueShoppingButton.click();
  }

  async clickViewCartButton() {
    await this.viewCartButton.click();
  }
}
