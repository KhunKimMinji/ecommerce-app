import { test as base } from '@playwright/test'
import { RegisterPage } from './register.page'
import { MainPage } from './main.page'
import { LoginPage } from './login.page'
import { LogoutPage } from './logout.page'
import { ProductsPage } from './products.page'
import { ProductDetailsPage } from './productDetails.page'
import { ViewCartPage } from './viewCart.page'
import { ProductStore } from '../src/store/product-store'
import { CheckoutPage } from '../page-objects/checkout.page'
import { Paymentpage } from './payment.page'
import { OrderPlacedPage } from './orderPlaced.page'
import {randomData} from '../test-data/randomData'
import {registerFunction} from '../src/functions/register'

export const test = base.extend<{
  mainPage: MainPage
  registerPage: RegisterPage
  loginPage: LoginPage
  logoutPage: LogoutPage
  productsPage: ProductsPage
  productDetailsPage: ProductDetailsPage
  viewCartPage: ViewCartPage
  productStore: ProductStore
  checkoutPage: CheckoutPage
  paymentpage: Paymentpage
  orderPlacedPage: OrderPlacedPage
  randomData: typeof randomData
  registerFunction: () => Promise<void>
}>({
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page))
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page))
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
  },
  logoutPage: async ({ page }, use) => {
    await use(new LogoutPage(page))
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page))
  },
  productDetailsPage: async ({ page }, use) => {
    await use(new ProductDetailsPage(page))
  },
  viewCartPage: async ({ page }, use) => {
    await use(new ViewCartPage(page))
  },
  productStore: async ({}, use) => {
    await use(new ProductStore())
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page))
  },
  paymentpage: async ({ page }, use) => {
    await use(new Paymentpage(page))
  },
  orderPlacedPage: async ({ page }, use) => {
    await use(new OrderPlacedPage(page))
  },
  randomData: async ({}, use) => {
    await use(randomData)
  },
  registerFunction: async ({ mainPage, registerPage, randomData }, use) => {
    await use(
      async () =>
        await registerFunction({
          mainPage,
          registerPage,
          randomData
        })
    )
  },
})
