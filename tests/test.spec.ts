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
  registerData,
  loginFunction,
  loginPage
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
  await loginFunction.validLogin({ loginPage, randomData })
  await mainPage.verifyLoginUsername(randomData.randomName)
  await mainPage.clickDeleteAccountMenu()
  await mainPage.verifyDeleteAccountMsg()
  await mainPage.clickContinueButton()
  await mainPage.verifyMainPageVisible()
})

test.describe('Login Flow', () => {
  test.beforeEach(
    async ({
      mainPage,
      registerFunction,
      registerPage,
      registerData,
      logoutPage,
      randomData
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
    }
  )
  test.afterEach(async ({ mainPage, loginFunction, loginPage, randomData }) => {
    await loginFunction.validLogin({ loginPage, randomData })
    await mainPage.verifyLoginUsername(randomData.randomName)
    await mainPage.clickDeleteAccountMenu()
    await mainPage.verifyDeleteAccountMsg()
    await mainPage.clickContinueButton()
    await mainPage.verifyMainPageVisible()
  })

  test('Login User with incorrect email', async ({
    loginPage,
    mainPage,
    loginData,
    randomData
  }) => {
    await mainPage.clickSignupAndLoginButton()
    await loginPage.verifyloginYourAccountMessage()
    await loginPage.filllLoginData(
      loginData.wrongEmail,
      randomData.randomPassword
    )
    await loginPage.clickLoginButton()
    await loginPage.verifyLoginFailedMessage()
  })

  test('Login User with incorrect password', async ({
    loginPage,
    mainPage,
    loginData,
    randomData
  }) => {
    await mainPage.clickSignupAndLoginButton()
    await loginPage.verifyloginYourAccountMessage()
    await loginPage.filllLoginData(
      randomData.randomEmail,
      loginData.wrongPassword
    )
    await loginPage.clickLoginButton()
    await loginPage.verifyLoginFailedMessage()
  })
})

test.describe('Verify Products Page', () => {
  test.beforeEach(
    async ({ mainPage, loginFunction, loginPage, randomData }) => {
      await mainPage.clickSignupAndLoginButton()
      await loginFunction.validLogin({ loginPage, randomData })
    }
  )
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
  test.afterEach(
    async ({
      cartPage,
      checkoutPage,
      paymentpage,
      orderPlacedPage,
      randomData,
      registerData,
      registerPage,
      productStore,
      mainPage
    }) => {
      await cartPage.verifyProductList(productStore)
      await cartPage.clickCheckoutButton()
      await checkoutPage.verfiyDeliveryAddress(
        registerPage,
        registerData,
        randomData
      )
      await checkoutPage.verfiyBillingAddress(
        registerPage,
        registerData,
        randomData
      )
      await checkoutPage.verifyProductsCheckout(productStore)
      await checkoutPage.verifyTotalAmount(productStore)
      await checkoutPage.clickPlaceOrderButton()
      await paymentpage.fillPaymentData(randomData)
      await paymentpage.clickPayAndConfirmButton()
      await orderPlacedPage.verifyOrderPlacedMessage()
      await orderPlacedPage.clickContinueButton()
      await mainPage.verifyLoginUsername(randomData.randomName)
      await mainPage.clickDeleteAccountMenu()
      await mainPage.verifyDeleteAccountMsg()
      await mainPage.clickContinueButton()
      await mainPage.verifyMainPageVisible()
    }
  )
  test('Order product when the user is already logged in', async ({
    mainPage,
    registerPage,
    productsPage,
    productStore,
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
  })

  test('Order product before logging in', async ({
    mainPage,
    productsPage,
    productStore,
    cartPage,
    registerFunction,
    registerPage,
    registerData,
    randomData
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
    await registerFunction.validRegister({
      mainPage,
      registerPage,
      randomData,
      registerData
    })
    await mainPage.clickCartMenu()

    console.log(
      'DONE Add product in Cart -> Store :',
      productStore,
      productStore.sum()
    )
  })
})
