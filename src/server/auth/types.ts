export interface UserData {
  id: string
  firstName: string
  lastName: string
  email: string
  createdAt: string
  updatedAt: string
}

export interface LoginError {
  message: string
  code: string
  issues: {
    message: string
  }[]
}

export type UserRes = UserData | LoginError
