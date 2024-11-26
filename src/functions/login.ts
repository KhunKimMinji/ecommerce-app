import { LoginPage } from '../../page-objects/login.page'
import { randomData } from '../../test-data/randomData'

type LoginFunctionProp = {
  loginPage: LoginPage
  randomData: typeof randomData
}

export class LoginFunction {
  async validLogin({ loginPage, randomData }: LoginFunctionProp) {
    await loginPage.verifyloginYourAccountMessage()
    await loginPage.filllLoginData(
      randomData.randomEmail,
      randomData.randomPassword
    )
    await loginPage.clickLoginButton()
  }
}
