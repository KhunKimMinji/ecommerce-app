import { test } from '../page-objects/fixtures'
import { faker } from '@faker-js/faker'
import { loginData, registerData } from '../test-data/test-data'
import { MainPage } from '../page-objects/main.page'
import { LoginPage } from '../page-objects/login.page'
import _ from 'lodash'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

async function login(mainPage: MainPage, loginPage: LoginPage) {
  await mainPage.clickSignupAndLoginButton()
  await loginPage.verifyloginYourAccountMessage()
  await loginPage.filllLoginData(
    loginData.correctEmail,
    loginData.correctPassword
  )
  await loginPage.clickLoginButton()
}

test('Register User with existing email', async ({
  registerPage,
  logoutPage,
  randomData,
  registerFunction
}) => {
  await registerFunction()
  await logoutPage.clickLogoutButton()
  await registerPage.verifyNewSignupMessage()
  await registerPage.fillRegisterData(
    randomData.randomName,
    randomData.randomEmail
  )
  await registerPage.clickSignupButton()
  await registerPage.verifyEmailAlreadyExistMessage()
})

test.describe('Login Flow', () => {
  test('Login User with correct email and password', async ({
    mainPage,
    logoutPage,
    loginPage,
    registerFunction,
    randomData
  }) => {
    await registerFunction()
    await logoutPage.clickLogoutButton()
    await loginPage.verifyloginYourAccountMessage()
    await loginPage.filllLoginData(
      randomData.randomEmail,
      randomData.randomPassword
    )
    await loginPage.clickLoginButton()
    await mainPage.verifyLoginUsername(randomData.randomName)
  })

  test('Login User with incorrect email', async ({ loginPage, mainPage }) => {
    await mainPage.clickSignupAndLoginButton()
    await loginPage.verifyloginYourAccountMessage()
    await loginPage.filllLoginData(
      loginData.wrongEmail,
      loginData.correctPassword
    )
    await loginPage.clickLoginButton()
    await loginPage.verifyLoginFailedMessage()
  })

  test('Login User with incorrect password', async ({
    loginPage,
    mainPage
  }) => {
    await mainPage.clickSignupAndLoginButton()
    await loginPage.verifyloginYourAccountMessage()
    await loginPage.filllLoginData(
      loginData.correctEmail,
      loginData.wrongPassword
    )
    await loginPage.clickLoginButton()
    await loginPage.verifyLoginFailedMessage()
  })
})

test.describe('Verify Products Page', () => {
  test.beforeEach(async ({ mainPage, loginPage }) => {
    await login(mainPage, loginPage)
  })
  test('Verify All Products and product detail page', async ({
    mainPage,
    productsPage,
    productDetailsPage
  }) => {
    await mainPage.clickProductsMenu()
    await productsPage.verifyAllProductsHeader()
    await productsPage.verifyProductsVisible()
    await productsPage.clickViewProductButton()
    await productDetailsPage.verifyProductName(productsPage)
    await productDetailsPage.verifyProductDetails()
  })

  test('Search Product', async ({ mainPage, productsPage }) => {
    await mainPage.clickProductsMenu()
    await productsPage.verifyAllProductsHeader()
    await productsPage.fillProductName()
    await productsPage.clickSearchBotton()
    await productsPage.verifyProductrelatedToSearch()
  })
})

test.describe('Order Product E2E Flow', () => {
  const randomCardName = faker.finance.accountName()
  const randomCardNumber = faker.finance.creditCardNumber()
  const radomCVC = faker.finance.creditCardCVV()
  const randomCardExpiration = _.random(1, 12).toString().padStart(2, '0')
  const randomYearCard = new Date().getFullYear() + 1

  test('Order product when the user is already logged in', async ({
    mainPage,
    registerPage,
    productsPage,
    productStore,
    viewCartPage,
    checkoutPage,
    paymentpage,
    orderPlacedPage,
    randomData,
    registerFunction
  }) => {
    await registerFunction()
    await mainPage.clickProductsMenu()
    await productsPage.scrollDoewn(0)
    await productsPage.productHover(0)
    await productsPage.clickAddToCartButton(0, productStore)
    await productsPage.clickContinueShoppingButton()
    await productsPage.productHover(1)
    await productsPage.clickAddToCartButton(1, productStore)
    await productsPage.clickContinueShoppingButton()
    await productsPage.productHover(0)
    await productsPage.clickAddToCartButton(0, productStore)
    await productsPage.clickViewCartButton()
    await viewCartPage.verifyProductList(productStore)
    await viewCartPage.clickCheckoutButton()
    await checkoutPage.verfiyDeliveryAddress(
      registerPage,
      randomData.randomFirstName,
      randomData.randomLastName,
      randomData.randomCompany,
      randomData.randomFristAddress,
      randomData.randomSecondAddress,
      randomData.randomCity,
      randomData.randomState,
      randomData.randomZipcode,
      registerData.country,
      randomData.randomMobileNumber
    )
    await checkoutPage.verfiyBillingAddress(
      registerPage,
      randomData.randomFirstName,
      randomData.randomLastName,
      randomData.randomCompany,
      randomData.randomFristAddress,
      randomData.randomSecondAddress,
      randomData.randomCity,
      randomData.randomState,
      randomData.randomZipcode,
      registerData.country,
      randomData.randomMobileNumber
    )
    await checkoutPage.verifyProductsCheckout(productStore)
    await checkoutPage.verifyTotalAmount(productStore)
    await checkoutPage.clickPlaceOrderButton()
    await paymentpage.fillPaymentData(
      randomCardName,
      randomCardNumber,
      radomCVC,
      randomCardExpiration,
      randomYearCard
    )
    await paymentpage.clickPayAndConfirmButton()
    await orderPlacedPage.verifyOrderPlacedMessage()
    await orderPlacedPage.clickContinueButton()
    await mainPage.verifyLoginUsername(randomData.randomName)

    console.log(
      'DONE Add product in Cart -> Store :',
      productStore,
      productStore.sum()
    )
  })

  test('Order product before logging in', async ({ productStore }) => {
    // console.log("Add more products -> check product store :", productStore);
  })
})
