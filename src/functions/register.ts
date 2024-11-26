import { MainPage } from '../../page-objects/main.page'
import { RegisterPage } from '../../page-objects/register.page'
import { randomData } from '../../test-data/randomData'
import { RegisterData } from '../../test-data/testData'

type RegisterFunctionProp = {
  mainPage: MainPage
  registerPage: RegisterPage
  randomData: typeof randomData
  registerData: RegisterData
}

export class RegisterFunction {
  async validRegister({
    mainPage,
    registerPage,
    randomData,
    registerData
  }: RegisterFunctionProp) {
    await registerPage.verifyNewSignupMessage()
    await registerPage.fillRegisterData(
      randomData.randomName,
      randomData.randomEmail
    )
    await registerPage.clickSignupButton()
    await registerPage.verifyEnterAccountMessage()
    await registerPage.verifyNameTextboxValue(randomData.randomName)
    await registerPage.verifyEmailTextboxValue(randomData.randomEmail)
    await registerPage.fillAccountInformation(
      randomData.randomPassword,
      registerData.days,
      registerData.months,
      registerData.years
    )
    await registerPage.fillAddressInformation(
      randomData.randomFirstName,
      randomData.randomLastName,
      randomData.randomCompany,
      randomData.randomFristAddress,
      randomData.randomSecondAddress,
      registerData.country,
      randomData.randomState,
      randomData.randomCity,
      randomData.randomZipcode,
      randomData.randomMobileNumber
    )
    await registerPage.clickCreateAccountButton()
    await registerPage.verifyAccountCreatedMessage()
    await registerPage.clickContinueButton()
    await mainPage.verifyLoginUsername(randomData.randomName)
  }
}
