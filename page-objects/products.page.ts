import { Locator, Page, expect } from "@playwright/test";
import { SrvRecord } from "dns";

export class ProductsPage {
  page: Page;
  allProductHeader: Locator;
  productList: Locator;
  viewProductButton: Locator;
  productName: Locator;
  selectedProductName: string;
  searchTextbox: Locator;
  searchButton: Locator;
  addToCart: Locator;
  continueShoppingButton: Locator;
  viewCartButton: Locator;
  productPrice: Locator;
  selectedProductPrice: string;
  selectedPrice: number;

  constructor(page: Page) {
    this.page = page;
    this.allProductHeader = page.locator("h2.title.text-center");
    this.productList = page.locator(".single-products");
    this.viewProductButton = page.locator("i.fa.fa-plus-square");
    this.productName = page.locator("div.productinfo.text-center p");
    this.searchTextbox = page.locator("#search_product");
    this.searchButton = page.locator("#submit_search");
    this.addToCart = page.locator(
      "div.single-products a.btn-default.add-to-cart i.fa-shopping-cart"
    );
    this.continueShoppingButton = page.getByText("Continue Shopping");
    this.viewCartButton = page.getByText("View Cart");
    this.productPrice = page.locator("div.productinfo.text-center h2");
  }

  async verifyAllProductsHeader() {
    await expect(this.allProductHeader).toBeVisible();
  }

  async verifyProductsVisible() {
    const count = await this.productList.count();
    for (let i = 0; i < count; i++) {
      await expect(this.productList.nth(i)).toBeVisible();
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

  async productHover() {
    await this.productName.nth(0).hover();
  }

  // add first product to cart
  async clickAddToCartButton() {
    await this.addToCart.nth(0).click();
  }

  async clickContinueShoppingButton() {
    await this.continueShoppingButton.click();
  }

  async secondProductHover() {
    await this.productName.nth(2).hover();
  }

  // add second product to cart
  async clickSecondProductAddToCartButton() {
    await this.addToCart.nth(2).click();
  }

  async clickViewCartButton() {
    await this.viewCartButton.click();
  }

  async getProductDetails() {
    const priceText = await this.productName.nth(0).innerText();
    const price = parseFloat(priceText?.replace("Rs. ", "").trim() || "0");
    this.selectedProductPrice = priceText;
    this.selectedPrice = price;
  }
}
