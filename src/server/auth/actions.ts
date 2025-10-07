'use server'

import { actionClient } from '@/lib/safe-action'
import {
  clearSession,
  storeAccessToken,
  storeRefreshToken,
  storeUserData,
} from '@/lib/session'
import { eventio } from '@/server'
import { loginSchema } from '@/server/auth/schema'
import { UserData } from '@/server/auth/types'
import { redirect } from 'next/navigation'

export const loginAction = actionClient
  .inputSchema(loginSchema)
  .action(async ({ parsedInput }) => {
    const { userData, accessToken, refreshToken } =
      await eventio.auth.login(parsedInput)

    if (refreshToken) await storeRefreshToken(refreshToken)
    if (accessToken) await storeAccessToken(accessToken)
    if ('id' in userData) await storeUserData(userData as UserData)

    redirect('/dashboard')
  })

export const refreshSessionAction = actionClient.action(async () => {
  try {
    const { userData, accessToken } = await eventio.auth.getAccessToken()

    if (accessToken) await storeAccessToken(accessToken)
    if ('id' in userData) await storeUserData(userData as UserData)

    return { success: true, userData, accessToken }
  } catch {
    await clearSession()
    return { success: false, error: 'Failed to refresh session' }
  }
})

export const logoutAction = actionClient.action(async () => {
  await clearSession()
  redirect('/login')
})
