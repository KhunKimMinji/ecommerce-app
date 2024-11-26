import { test } from '../src/fixtures'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('Register User with existing email', async ({
  registerPage,
  logoutPage,
  registerFunction,
  randomData,
  mainPage,
  registerData
}) => {
  await mainPage.verifyMainPageVisible()
  await mainPage.clickSignupAndLoginButton()
  await registerFunction.validRegister({
    mainPage,
    registerPage,
    randomData,
    registerData
  })
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
    randomData,
    registerPage,
    registerData
  }) => {
    await mainPage.verifyMainPageVisible()
    await mainPage.clickSignupAndLoginButton()
    await registerFunction.validRegister({
      mainPage,
      registerPage,
      randomData,
      registerData
    })
    await logoutPage.clickLogoutButton()
    await loginPage.verifyloginYourAccountMessage()
    await loginPage.filllLoginData(
      randomData.randomEmail,
      randomData.randomPassword
    )
    await loginPage.clickLoginButton()
    await mainPage.verifyLoginUsername(randomData.randomName)
  })

  test('Login User with incorrect email', async ({
    loginPage,
    mainPage,
    loginData
  }) => {
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
    mainPage,
    loginData
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
  test.beforeEach(async ({ mainPage, loginFunction, loginPage, loginData }) => {
    await mainPage.clickSignupAndLoginButton()
    await loginFunction.validLogin({ loginPage, loginData })
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
  test('Order product when the user is already logged in', async ({
    mainPage,
    registerPage,
    productsPage,
    productStore,
    cartPage,
    checkoutPage,
    paymentpage,
    orderPlacedPage,
    registerFunction,
    randomData,
    registerData
  }) => {
    await mainPage.verifyMainPageVisible()
    await mainPage.clickSignupAndLoginButton()
    await registerFunction.validRegister({
      mainPage,
      registerPage,
      randomData,
      registerData
    })
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
    await cartPage.verifyProductList(productStore)
    await cartPage.clickCheckoutButton()
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
      randomData.randomCardName,
      randomData.randomCardNumber,
      randomData.radomCVC,
      randomData.randomCardExpiration,
      randomData.randomYearCard
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

  test('Order product before logging in', async ({
    mainPage,
    productsPage,
    productStore,
    cartPage,
    loginFunction,
    loginPage,
    loginData
  }) => {
    await mainPage.clickProductsMenu()
    await productsPage.scrollDoewn(0)
    await productsPage.productHover(0)
    await productsPage.clickAddToCartButton(0, productStore)
    await productsPage.clickContinueShoppingButton()
    await productsPage.productHover(1)
    await productsPage.clickAddToCartButton(1, productStore)
    await productsPage.clickViewCartButton()
    await cartPage.verifyProductList(productStore)
    await cartPage.clickCheckoutButton()
    await cartPage.clickRegisterAndLoginButton()
    await loginFunction.validLogin({ loginPage, loginData })
  })
})
