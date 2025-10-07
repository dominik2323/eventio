export default class AuthError extends Error {
  constructor(message: string) {
    super(`AuthError: ${message}`)
    this.name = 'AuthError'
  }
}
