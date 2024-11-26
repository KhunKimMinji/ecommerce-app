interface RegisterData {
  days: string
  months: string
  years: string
  country: string
}
interface LoginData {
  correctEmail: string
  correctPassword: string
  wrongEmail: string
  wrongPassword: string
}
export const registerData: RegisterData = {
  days: '1',
  months: 'May',
  years: '1996',
  country: 'Canada'
}

export const loginData: LoginData = {
  correctEmail: 'test-001@test.com',
  correctPassword: '1234567890',
  wrongEmail: 'xxxxx@test.com',
  wrongPassword: 'xxxxxxxxxxxxxx'
}
