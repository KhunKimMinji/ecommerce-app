import { LoginPage } from '../../page-objects/login.page'
import { LoginData } from '../../test-data/testData.ts'

type LoginFunctionProp = {
  loginPage: LoginPage
  loginData: LoginData
}

export class LoginFunction {
  async validLogin({ loginPage, loginData }: LoginFunctionProp) {
    await loginPage.verifyloginYourAccountMessage()
    await loginPage.filllLoginData(
      loginData.correctEmail,
      loginData.correctPassword
    )
    await loginPage.clickLoginButton()
  }
}
