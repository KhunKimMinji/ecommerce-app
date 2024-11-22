import { Locator, Page, expect } from "@playwright/test";

export class RegisterPage {
  page: Page;
  newSignupMsg: Locator;
  nameTextbox: Locator;
  emailTextbox: Locator;
  signupButton: Locator;
  enterAccountMsg: Locator;
  titleRadio: Locator;
  nameValue: Locator;
  emailValue: Locator;
  passwordTextbox: Locator;
  dayDropdown: Locator;
  mouthDropdown: Locator;
  yearDropdown: Locator;
  newLatterCheckbox: Locator;
  receiveSpecialOffersCheckbox: Locator;
  firstNameTextbox: Locator;
  lastNameTextbox: Locator;
  companyTextbox: Locator;
  addressTextbox: Locator;
  address2Textbox: Locator;
  countryDropdown: Locator;
  stateTextbox: Locator;
  cityTextbox: Locator;
  zipcodetTextbox: Locator;
  mobileNumberTextbox: Locator;
  createAccountButton: Locator;
  accountCreatedMsg: Locator;
  continueButton: Locator;
  
  deleteButton: Locator;
  accountDeleteMsg: Locator;
  emailAlreadyExistMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newSignupMsg = page.locator("text=New User Signup!");
    this.nameTextbox = page.getByPlaceholder("Name");
    this.emailTextbox = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.getByRole("button", { name: "Signup" });
    this.enterAccountMsg = page.getByText("Enter Account Information");
    this.nameValue = page.locator("#name");
    this.emailValue = page.locator("#email");
    this.titleRadio = page.locator("#id_gender2");
    this.passwordTextbox = page.locator("#password");
    this.dayDropdown = page.locator("#days");
    this.mouthDropdown = page.locator("#months");
    this.yearDropdown = page.locator("#years");
    this.newLatterCheckbox = page.locator("#newsletter");
    this.receiveSpecialOffersCheckbox = page.locator("#optin");
    this.firstNameTextbox = page.locator("#first_name");
    this.lastNameTextbox = page.locator("#last_name");
    this.companyTextbox = page.locator("#company");
    this.addressTextbox = page.locator("#address1");
    this.address2Textbox = page.locator("#address2");
    this.countryDropdown = page.locator('select[data-qa="country"]');
    this.stateTextbox = page.locator("#state");
    this.cityTextbox = page.locator("#city");
    this.zipcodetTextbox = page.locator("#zipcode");
    this.mobileNumberTextbox = page.locator("#mobile_number");
    this.createAccountButton = page.getByRole("button", {
      name: "Create Account",
    });
    this.accountCreatedMsg = page.getByText("Account Created!");
    this.continueButton = page.locator("a.btn.btn-primary");
   
    this.deleteButton = page.getByText(" Delete Account");
    this.accountDeleteMsg = page.getByText("Account Deleted!");
    this.emailAlreadyExistMsg = page.getByText("Email Address already exist!");
  }

  async verifyNewSignupMessage() {
    await expect(this.newSignupMsg).toBeVisible();
  }

  async fillRegisterData(name: string, email: string) {
    await this.nameTextbox.fill(name);
    await this.emailTextbox.fill(email);
  }

  async clickSignupButton() {
    await this.signupButton.click();
  }

  async verifyEnterAccountMessage() {
    await expect(this.enterAccountMsg).toBeVisible();
  }

  async verifyNameTextboxValue(randomName: string) {
    const nameValueInput = await this.nameValue.inputValue();
    expect(nameValueInput).toEqual(randomName);
  }

  async verifyEmailTextboxValue(randomEmail: string) {
    const emailValueInput = await this.emailValue.inputValue();
    expect(emailValueInput).toEqual(randomEmail);
  }

  async fillAccountInformation(
    password: string,
    dayOption: string,
    monthOption: string,
    yearOption: string
  ) {
    await this.titleRadio.click();
    await this.passwordTextbox.fill(password);
    await this.dayDropdown.selectOption(dayOption);
    await this.mouthDropdown.selectOption(monthOption);
    await this.yearDropdown.selectOption(yearOption);
    await this.newLatterCheckbox.check();
    await this.receiveSpecialOffersCheckbox.uncheck();
  }
  async fillAddressInformation(
    firstName: string,
    lastName: string,
    company: string,
    address: string,
    address2: string,
    country: string,
    state: string,
    city: string,
    zipcode: string,
    mobilenumber: string
  ) {
    await this.firstNameTextbox.fill(firstName);
    await this.lastNameTextbox.fill(lastName);
    await this.companyTextbox.fill(company);
    await this.addressTextbox.fill(address);
    await this.address2Textbox.fill(address2);
    await this.countryDropdown.selectOption(country);
    await this.stateTextbox.fill(state);
    await this.cityTextbox.fill(city);
    await this.zipcodetTextbox.fill(zipcode);
    await this.mobileNumberTextbox.fill(mobilenumber);
  }

  async clickCreateAccountButton() {
    await this.createAccountButton.click();
  }

  async verifyAccountCreatedMessage() {
    await expect(this.accountCreatedMsg).toBeVisible();
  }

  async clickContinueButton() {
    await this.continueButton.click();
  }

  async clickDeleteButton() {
    await this.deleteButton.click();
  }

  async verifyAccountDeletedMessage() {
    await expect(this.accountDeleteMsg).toBeVisible();
  }

  async verifyEmailAlreadyExistMessage() {
    await expect(this.emailAlreadyExistMsg).toBeVisible();
  }
}
