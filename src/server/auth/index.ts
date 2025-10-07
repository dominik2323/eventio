import { getRefreshToken } from '@/lib/session'
import AuthError from '@/server/auth/error'
import { LoginSchema, loginSchema } from '@/server/auth/schema'
import { LoginError, UserRes } from '@/server/auth/types'
import { eventioClient } from '@/server/client'
import 'server-only'

async function login(payload: LoginSchema) {
  const data = loginSchema.parse(payload)
  const userRes = await eventioClient<UserRes>('/auth/sign-in', {
    body: JSON.stringify(data),
  })

  if (!userRes.ok) {
    throw new AuthError((userRes.data as LoginError).message)
  }

  const accessToken = userRes.res.headers.get('access-token')
  const refreshToken = userRes.res.headers.get('refresh-token')

  return {
    userData: userRes.data,
    accessToken,
    refreshToken,
  }
}

async function getAccessToken() {
  const refreshToken = await getRefreshToken()
  const userRes = await eventioClient<UserRes>('/auth/refresh', {
    body: JSON.stringify({ refreshToken }),
  })

  if (!userRes.ok) {
    throw new AuthError((userRes.data as LoginError).message)
  }

  const accessToken = userRes.res.headers.get('access-token')

  return { accessToken, userData: userRes.data }
}

export const auth = { login, getAccessToken }
