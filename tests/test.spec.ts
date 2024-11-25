import { test } from "../page-objects/fixtures";
import { faker } from "@faker-js/faker";
import { loginData, registerData } from "../test-data/test-data";
import { MainPage } from "../page-objects/main.page";
import { RegisterPage } from "../page-objects/register.page";
import { LoginPage } from "../page-objects/login.page";
import _ from "lodash";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

const randomName = faker.person.fullName();
const randomEmail = faker.internet.email();
const randomPassword = faker.internet.password();
const randomFirstName = faker.person.firstName();
const randomLastName = faker.person.lastName();
const randomCompany = faker.company.name();
const randomFristAddress = faker.location.streetAddress();
const randomSecondAddress = faker.location.streetAddress();
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
    randomFristAddress,
    randomSecondAddress,
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

test.describe("Order Product E2E Flow", () => {
  const randomCardName = faker.finance.accountName();
  const randomCardNumber = faker.finance.creditCardNumber();
  const radomCVC = faker.finance.creditCardCVV();
  const randomCardExpiration = _.random(1, 12).toString().padStart(2, "0");
  const randomYearCard = new Date().getFullYear() + 1;

  test("Order product when the user is already logged in", async ({
    mainPage,
    registerPage,
    productsPage,
    productStore,
    viewCartPage,
    checkoutPage,
    paymentpage,
    orderPlacedPage,
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
    await viewCartPage.verifyProductList(productStore);
    await viewCartPage.clickCheckoutButton();
    await checkoutPage.verfiyDeliveryAddress(
      registerPage,
      randomFirstName,
      randomLastName,
      randomCompany,
      randomFristAddress,
      randomSecondAddress,
      randomCity,
      randomState,
      randomZipcode,
      registerData.country,
      randomMobileNumber
    );
    await checkoutPage.verfiyBillingAddress(
      registerPage,
      randomFirstName,
      randomLastName,
      randomCompany,
      randomFristAddress,
      randomSecondAddress,
      randomCity,
      randomState,
      randomZipcode,
      registerData.country,
      randomMobileNumber
    );
    await checkoutPage.verifyProductsCheckout(productStore);
    await checkoutPage.verifyTotalAmount(productStore);
    await checkoutPage.clickPlaceOrderButton();
    await paymentpage.fillPaymentData(
      randomCardName,
      randomCardNumber,
      radomCVC,
      randomCardExpiration,
      randomYearCard
    );
    await paymentpage.clickPayAndConfirmButton();
    await orderPlacedPage.verifyOrderPlacedMessage()

    await console.log(
      "DONE Add product in Cart -> Store :",
      productStore,
      productStore.sum()
    );
  });

  test("Add more products", async ({ productStore }) => {
    // console.log("Add more products -> check product store :", productStore);
  });
});
