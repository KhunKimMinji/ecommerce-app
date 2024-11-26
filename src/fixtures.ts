import { test as base } from '@playwright/test'
import { RegisterPage } from '../page-objects/register.page'
import { MainPage } from '../page-objects/main.page'
import { LoginPage } from '../page-objects/login.page'
import { LogoutPage } from '../page-objects/logout.page'
import { ProductsPage } from '../page-objects/products.page'
import { ProductDetailsPage } from '../page-objects/productDetails.page'
import { CartPage } from '../page-objects/cart.page'
import { ProductStore } from './store/product-store'
import { CheckoutPage } from '../page-objects/checkout.page'
import { Paymentpage } from '../page-objects/payment.page'
import { OrderPlacedPage } from '../page-objects/orderPlaced.page'
import { randomData } from '../test-data/randomData'
import { RegisterFunction } from './functions/register'
import { LoginFunction } from './functions/login'
import {
  loginData,
  registerData,
  RegisterData,
  LoginData
} from '../test-data/testData'

export const test = base.extend<{
  mainPage: MainPage
  registerPage: RegisterPage
  loginPage: LoginPage
  logoutPage: LogoutPage
  productsPage: ProductsPage
  productDetailsPage: ProductDetailsPage
  cartPage: CartPage
  productStore: ProductStore
  checkoutPage: CheckoutPage
  paymentpage: Paymentpage
  orderPlacedPage: OrderPlacedPage
  randomData: typeof randomData
  registerData: RegisterData
  loginData: LoginData
  registerFunction: RegisterFunction
  loginFunction: LoginFunction
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
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page))
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
  registerData: async ({}, use) => {
    await use(registerData)
  },
  loginData: async ({}, use) => {
    await use(loginData)
  },
  registerFunction: async ({}, use ) => {
    await use(new RegisterFunction())
  },
  loginFunction: async ({}, use) => {
    await use(new LoginFunction())
  }
})
