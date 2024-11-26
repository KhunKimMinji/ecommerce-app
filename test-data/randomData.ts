import { faker } from '@faker-js/faker'
import _ from 'lodash'

export const randomData = {
  randomName: faker.person.fullName(),
  randomEmail: faker.internet.email(),
  randomPassword: faker.internet.password(),
  randomFirstName: faker.person.firstName(),
  randomLastName: faker.person.lastName(),
  randomCompany: faker.company.name(),
  randomFristAddress: faker.location.streetAddress(),
  randomSecondAddress: faker.location.streetAddress(),
  randomState: faker.location.state(),
  randomCity: faker.location.city(),
  randomZipcode: faker.location.zipCode(),
  randomMobileNumber: faker.phone.number(),

  randomCardName: faker.finance.accountName(),
  randomCardNumber: faker.finance.creditCardNumber(),
  radomCVC: faker.finance.creditCardCVV(),
  randomCardExpiration: _.random(1, 12).toString().padStart(2, '0'),
  randomYearCard: new Date().getFullYear() + 1
}