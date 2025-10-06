import { env } from '@/env'
import { getRefreshToken } from '@/lib/session'
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

  const accessToken = userRes.headers.get('access-token')
  const refreshToken = userRes.headers.get('refresh-token')

  return {
    userData,
    accessToken,
    refreshToken,
  }
}

async function getAccessToken() {
  const refreshToken = await getRefreshToken()

  const userRes = await fetch(`${env.EVENTIO_API_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      apikey: env.EVENTIO_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  })

  const userData: UserRes = await userRes.json()

  if ('message' in userData) {
    throw new AuthError(userData.message)
  }

  const accessToken = userRes.headers.get('access-token')

  return { accessToken }
}

export const auth = { login, getAccessToken }
