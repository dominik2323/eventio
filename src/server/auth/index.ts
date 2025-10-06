import { env } from '@/env'
import AuthError from '@/server/auth/error'
import { LoginSchema, loginSchema } from '@/server/auth/schema'
import { UserRes } from '@/server/auth/types'

async function login(payload: LoginSchema) {
  const data = loginSchema.parse(payload)

  const userRes = await fetch(`${env.EVENTIO_API_URL}/auth/sign-in`, {
    method: 'POST',
    headers: {
      apikey: env.EVENTIO_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const userData: UserRes = await userRes.json()

  if ('message' in userData) {
    throw new AuthError(userData.message)
  }

  return userData
}

export const auth = { login }
