import { MainPage } from '../../page-objects/main.page'
import { LoginPage } from '../../page-objects/login.page'
import { LoginData } from '../../test-data/testData.ts'

type LoginFunctionProp = {
  mainPage: MainPage
  loginPage: LoginPage
  loginData: LoginData
}

export async function loginFunction({
  mainPage,
  loginPage,
  loginData
}: LoginFunctionProp) {
  await mainPage.clickSignupAndLoginButton()
  await loginPage.verifyloginYourAccountMessage()
  await loginPage.filllLoginData(
    loginData.correctEmail,
    loginData.correctPassword
  )
  await loginPage.clickLoginButton()
}
