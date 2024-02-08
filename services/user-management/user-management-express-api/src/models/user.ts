export default interface User {
  email: string
  password?: string
  emailVerified?: boolean
  disabled?: boolean
}
