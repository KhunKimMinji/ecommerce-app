import { Locator, Page, expect } from "@playwright/test";
import { RegisterPage } from "./register.page";
import _ from "lodash";
import { ProductStore } from "../src/store/product-store";

export class CheckoutPage {
  page: Page;
  fullnameDeliveryAddress: Locator;
  companyDeliveryAddress: Locator;
  firstDeliveryAddress: Locator;
  secondDeliveryAddress: Locator;
  cityStateZipcodeDeliveryAddress: Locator;
  countryDeliveryAddress: Locator;
  mobileDeliveryAddress: Locator;
  fullnameBillingAddress: Locator;
  companyBillingAddress: Locator;
  firstBillingAddress: Locator;
  secondBillingAddress: Locator;
  cityStateZipcodeBillingAddress: Locator;
  countryBillingAddress: Locator;
  mobileBillingAddress: Locator;
  descriptionColumn: Locator;
  priceColumn: Locator;
  quantityColumn: Locator;
  totalColumn: Locator;
  totalAmount: Locator;
  placeOrderButton: Locator

  constructor(page: Page) {
    this.page = page;
    this.fullnameDeliveryAddress = page.locator(
      "#address_delivery .address_firstname.address_lastname"
    );
    this.companyDeliveryAddress = page
      .locator("#address_delivery .address_address1.address_address2")
      .nth(0);
    this.firstDeliveryAddress = page
      .locator("#address_delivery .address_address1.address_address2")
      .nth(1);
    this.secondDeliveryAddress = page
      .locator("#address_delivery .address_address1.address_address2")
      .nth(2);
    this.cityStateZipcodeDeliveryAddress = page.locator(
      "#address_delivery .address_city.address_state_name.address_postcode"
    );
    this.countryDeliveryAddress = page.locator(
      "#address_delivery .address_country_name"
    );
    this.mobileDeliveryAddress = page.locator(
      "#address_delivery .address_phone"
    );
    this.fullnameBillingAddress = page.locator(
      "#address_invoice .address_firstname.address_lastname"
    );
    this.companyBillingAddress = page
      .locator("#address_invoice .address_address1.address_address2")
      .nth(0);
    this.firstBillingAddress = page
      .locator("#address_invoice .address_address1.address_address2")
      .nth(1);
    this.secondBillingAddress = page
      .locator("#address_invoice .address_address1.address_address2")
      .nth(2);
    this.cityStateZipcodeBillingAddress = page.locator(
      "#address_invoice .address_city.address_state_name.address_postcode"
    );
    this.countryBillingAddress = page.locator(
      "#address_invoice .address_country_name"
    );
    this.mobileBillingAddress = page.locator("#address_invoice .address_phone");
    this.descriptionColumn = page.locator("td.cart_description a");
    this.priceColumn = page.locator("td.cart_price p");
    this.quantityColumn = page.locator("td.cart_quantity button");
    this.totalColumn = page.locator("td.cart_total p");
    this.totalAmount = page.locator("td p.cart_total_price").nth(2);
    this.placeOrderButton = page.getByText('Place Order')
  }

  async verfiyDeliveryAddress(
    registerPage: RegisterPage,
    deliveryFirstName: string,
    deliveryLastName: string,
    deliveryCompany: string,
    deliveryFirstAddress: string,
    deliverySecondAddress: string,
    deliveryCity: string,
    deliveryState: string,
    deliveryZipcode: string,
    deliveryCountry: string,
    diliveryMobileNumber: string
  ) {
    await expect(this.fullnameDeliveryAddress).toBeVisible();
    const fullNameDelivery = await this.fullnameDeliveryAddress.innerText();
    expect(fullNameDelivery).toBe(
      `${registerPage.selectedTitle}. ${deliveryFirstName} ${deliveryLastName}`
    );

    await expect(this.companyDeliveryAddress).toBeVisible();
    const companyDelivery = await this.companyDeliveryAddress.innerText();
    expect(companyDelivery).toBe(deliveryCompany);

    await expect(this.firstDeliveryAddress).toBeVisible();
    const firstDelivery = await this.firstDeliveryAddress.innerText();
    expect(firstDelivery).toBe(deliveryFirstAddress);

    await expect(this.secondDeliveryAddress).toBeVisible();
    const secondDelivery = await this.secondDeliveryAddress.innerText();
    expect(secondDelivery).toBe(deliverySecondAddress);

    await expect(this.cityStateZipcodeDeliveryAddress).toBeVisible();
    const addressDetailsDelivery =
      await this.cityStateZipcodeDeliveryAddress.innerText();
    expect(addressDetailsDelivery).toBe(
      `${deliveryCity} ${deliveryState} ${deliveryZipcode}`
    );

    await expect(this.countryDeliveryAddress).toBeVisible();
    const countryDelivery = await this.countryDeliveryAddress.innerText();
    expect(countryDelivery).toBe(deliveryCountry);

    await expect(this.mobileDeliveryAddress).toBeVisible();
    const phoneDelivery = await this.mobileDeliveryAddress.innerText();
    expect(phoneDelivery).toBe(diliveryMobileNumber);
  }

  async verfiyBillingAddress(
    registerPage: RegisterPage,
    billingFirstName: string,
    billingLastName: string,
    billingCompany: string,
    billingFirstAddress: string,
    billingSecondAddress: string,
    billingCity: string,
    billingState: string,
    billingZipcode: string,
    billingCountry: string,
    billingMobileNumber: string
  ) {
    await expect(this.fullnameBillingAddress).toBeVisible();
    const fullNameBilling = await this.fullnameBillingAddress.innerText();
    expect(fullNameBilling).toBe(
      `${registerPage.selectedTitle}. ${billingFirstName} ${billingLastName}`
    );

    await expect(this.companyBillingAddress).toBeVisible();
    const companyBilling = await this.companyBillingAddress.innerText();
    expect(companyBilling).toBe(billingCompany);

    await expect(this.firstDeliveryAddress).toBeVisible();
    const firstBilling = await this.firstBillingAddress.innerText();
    expect(firstBilling).toBe(billingFirstAddress);

    await expect(this.secondBillingAddress).toBeVisible();
    const secondBilling = await this.secondBillingAddress.innerText();
    expect(secondBilling).toBe(billingSecondAddress);

    await expect(this.cityStateZipcodeBillingAddress).toBeVisible();
    const addressDetailsBilling =
      await this.cityStateZipcodeBillingAddress.innerText();
    expect(addressDetailsBilling).toBe(
      `${billingCity} ${billingState} ${billingZipcode}`
    );

    await expect(this.countryBillingAddress).toBeVisible();
    const countryBilling = await this.countryBillingAddress.innerText();
    expect(countryBilling).toBe(billingCountry);

    await expect(this.mobileBillingAddress).toBeVisible();
    const phoneBilling = await this.mobileBillingAddress.innerText();
    expect(phoneBilling).toBe(billingMobileNumber);
  }

  async verifyProductsCheckout(productStore: ProductStore) {
    const descriptions = await this.descriptionColumn.allInnerTexts();
    const kebabCaseDescription = descriptions.map((value) =>
      _.kebabCase(value)
    );

    const textPrice = await this.priceColumn.allInnerTexts();
    const prices = textPrice.map((textPrice) => {
      return parseFloat(textPrice.replace("Rs. ", "").trim() || "0");
    });

    const textQuantity = await this.quantityColumn.allInnerTexts();
    const quantities = textQuantity.map((textQuantity) => {
      return parseFloat(textQuantity || "0");
    });

    const textTotal = await this.totalColumn.allInnerTexts();
    const totals = textTotal.map((textTotal) => {
      return parseFloat(textTotal.replace("Rs. ", "").trim() || "0");
    });

    const productList = kebabCaseDescription.length;
    for (let index = 0; index < productList; index++) {
      const description = kebabCaseDescription[index];
      const price = prices[index];
      const quantity = quantities[index];
      const total = totals[index];
      const productValue = productStore.get(description);

      expect(description).toBe(productValue?.name);
      expect(price).toBe(productValue?.price);
      expect(quantity).toBe(productValue?.quantity);
      expect(total).toBe(productValue?.total);
    }
  }

  async verifyTotalAmount(productStore: ProductStore) {
    await expect(this.totalAmount).toBeVisible();
    const textTotalAmount = await this.totalAmount.innerText();
    const amountTotal = parseFloat(
      textTotalAmount.replace("Rs. ", "").trim() || "0"
    );
    expect(amountTotal).toBe(productStore.sum());
    console.log("A:", amountTotal, "B:", productStore.sum());
  }

  async clickPlaceOrderButton(){
    await this.placeOrderButton.click()
  }
}
