import { test as base } from '@playwright/test';
import { RegisterPage } from './register.page';
import { MainPage } from './main.page';
import { LoginPage } from './login.page';
import { LogoutPage } from './logout.page';
import { ProductsPage } from './products.page';
import { ProductDetailsPage } from './product-details.page';
import { ViewCartPage } from './viewCart.page';

export const test = base.extend<{
  mainPage: MainPage;
  registerPage: RegisterPage;
  loginPage: LoginPage;
  logoutPage: LogoutPage;
  productsPage: ProductsPage;
  productDetailsPage: ProductDetailsPage;
  viewCartPage: ViewCartPage;
}>({
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  logoutPage: async ({ page }, use) => {
    await use(new LogoutPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  productDetailsPage: async ({ page }, use) => {
    await use(new ProductDetailsPage(page));
  },
  viewCartPage: async ({ page }, use) => {
    await use(new ViewCartPage(page));
  },
});
