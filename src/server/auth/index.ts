import { getRefreshToken } from '@/lib/session'
import AuthError from '@/server/auth/error'
import { LoginSchema, loginSchema } from '@/server/auth/schema'
import { LoginError, UserRes } from '@/server/auth/types'
import { eventioClient } from '@/server/client'

async function login(payload: LoginSchema) {
  const data = loginSchema.parse(payload)
  const userRes = await eventioClient<UserRes>('/auth/sign-in', data)

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
    refreshToken,
  })

  if (!userRes.ok) {
    throw new AuthError((userRes.data as LoginError).message)
  }

  const accessToken = userRes.res.headers.get('access-token')

  return { accessToken }
}

export const auth = { login, getAccessToken }
