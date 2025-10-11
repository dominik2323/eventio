const errorMap = {
  'Username or password is incorrect':
    'Oops! That email and pasword combination is not valid.',
}

function getErrorMessage(error: string) {
  return errorMap[error as keyof typeof errorMap] || error
}

export default class AuthError extends Error {
  constructor(message: string) {
    super(message)
    this.message = getErrorMessage(message)
    this.name = 'AuthError'
  }
}
