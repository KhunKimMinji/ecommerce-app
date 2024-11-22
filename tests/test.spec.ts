import { test } from "../page-objects/fixtures";
import { faker } from "@faker-js/faker";
import { loginData, registerData } from "../test-data/test-data";
import { MainPage } from "../page-objects/main.page";
import { RegisterPage } from "../page-objects/register.page";
import { LoginPage } from "../page-objects/login.page";
import { ViewCartPage } from "../page-objects/viewCart.page";
import { ProductStore } from "../src/store/product-store";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

const randomName = faker.person.fullName();
const randomEmail = faker.internet.email();
const randomPassword = faker.internet.password();
const randomFirstName = faker.person.firstName();
const randomLastName = faker.person.lastName();
const randomCompany = faker.company.name();
const randomAddress = faker.location.streetAddress();
const randomAddress2 = faker.location.streetAddress();
const randomState = faker.location.state();
const randomCity = faker.location.city();
const randomZipcode = faker.location.zipCode();
const randomMobileNumber = faker.phone.number();

async function register(mainPage: MainPage, registerPage: RegisterPage) {
  await mainPage.verifyMainPageVisible();
  await mainPage.clickSignupAndLoginButton();
  await registerPage.verifyNewSignupMessage();
  await registerPage.fillRegisterData(randomName, randomEmail);
  await registerPage.clickSignupButton();
  await registerPage.verifyEnterAccountMessage();
  await registerPage.verifyNameTextboxValue(randomName);
  await registerPage.verifyEmailTextboxValue(randomEmail);
  await registerPage.fillAccountInformation(
    randomPassword,
    registerData.days,
    registerData.months,
    registerData.years
  );
  await registerPage.fillAddressInformation(
    randomFirstName,
    randomLastName,
    randomCompany,
    randomAddress,
    randomAddress2,
    registerData.country,
    randomState,
    randomCity,
    randomZipcode,
    randomMobileNumber
  );
  await registerPage.clickCreateAccountButton();
  await registerPage.verifyAccountCreatedMessage();
  await registerPage.clickContinueButton();
  await mainPage.verifyLoginUsername(randomName);
}

async function login(mainPage: MainPage, loginPage: LoginPage) {
  await mainPage.clickSignupAndLoginButton();
  await loginPage.verifyloginYourAccountMessage();
  await loginPage.filllLoginData(
    loginData.correctEmail,
    loginData.correctPassword
  );
  await loginPage.clickLoginButton();
}

test("Register User with existing email", async ({
  mainPage,
  registerPage,
  logoutPage,
}) => {
  await register(mainPage, registerPage);
  await logoutPage.clickLogoutButton();
  await registerPage.verifyNewSignupMessage();
  await registerPage.fillRegisterData(randomName, randomEmail);
  await registerPage.clickSignupButton();
  await registerPage.verifyEmailAlreadyExistMessage();
});

test.describe("Login Flow", () => {
  test("Login User with correct email and password", async ({
    mainPage,
    logoutPage,
    loginPage,
    registerPage,
  }) => {
    await register(mainPage, registerPage);
    await logoutPage.clickLogoutButton();
    await loginPage.verifyloginYourAccountMessage();
    await loginPage.filllLoginData(randomEmail, randomPassword);
    await loginPage.clickLoginButton();
    await mainPage.verifyLoginUsername(randomName);
  });

  test("Login User with incorrect email", async ({ loginPage, mainPage }) => {
    await mainPage.clickSignupAndLoginButton();
    await loginPage.verifyloginYourAccountMessage();
    await loginPage.filllLoginData(
      loginData.wrongEmail,
      loginData.correctPassword
    );
    await loginPage.clickLoginButton();
    await loginPage.verifyLoginFailedMessage();
  });

  test("Login User with incorrect password", async ({
    loginPage,
    mainPage,
  }) => {
    await mainPage.clickSignupAndLoginButton();
    await loginPage.verifyloginYourAccountMessage();
    await loginPage.filllLoginData(
      loginData.correctEmail,
      loginData.wrongPassword
    );
    await loginPage.clickLoginButton();
    await loginPage.verifyLoginFailedMessage();
  });
});

test.describe("Verify Products Page", () => {
  test.beforeEach(async ({ mainPage, loginPage }) => {
    await login(mainPage, loginPage);
  });
  test("Verify All Products and product detail page", async ({
    mainPage,
    productsPage,
    productDetailsPage,
  }) => {
    await mainPage.clickProductsMenu();
    await productsPage.verifyAllProductsHeader();
    await productsPage.verifyProductsVisible();
    await productsPage.clickViewProductButton();
    await productDetailsPage.verifyProductName(productsPage);
    await productDetailsPage.verifyProductDetails();
  });

  test("Search Product", async ({ mainPage, productsPage }) => {
    await mainPage.clickProductsMenu();
    await productsPage.verifyAllProductsHeader();
    await productsPage.fillProductName();
    await productsPage.clickSearchBotton();
    await productsPage.verifyProductrelatedToSearch();
  });
});

test.describe("Verify Products Page", () => {
  test("Add Products in Cart", async ({
    mainPage,
    registerPage,
    productsPage,
    viewCartPage,
    productStore,
  }) => {
    await register(mainPage, registerPage);
    await mainPage.clickProductsMenu();
    await productsPage.productHover(0);
    await productsPage.clickAddToCartButton(0, productStore);
    await productsPage.clickContinueShoppingButton();
    await productsPage.productHover(1);
    await productsPage.clickAddToCartButton(1, productStore);
    await productsPage.clickContinueShoppingButton();
    await productsPage.productHover(0);
    await productsPage.clickAddToCartButton(0, productStore);
    await productsPage.clickViewCartButton();
    console.log("DONE Add product in Cart -> Store :", productStore);
  });

  test("Add more products", async ({ productStore }) => {
    console.log("Add more products -> check product store :", productStore);
  });
});
