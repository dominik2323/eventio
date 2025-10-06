'use server'

import { actionClient } from '@/lib/safe-action'
import { storeRefreshToken, storeUserData } from '@/lib/session'
import { eventio } from '@/server'
import { loginSchema } from '@/server/auth/schema'
import { UserData } from '@/server/auth/types'

export const loginAction = actionClient
  .inputSchema(loginSchema)
  .action(async ({ parsedInput }) => {
    const { userData, accessToken, refreshToken } =
      await eventio.auth.login(parsedInput)

    if (refreshToken) {
      await storeRefreshToken(refreshToken)
    }

    if ('id' in userData) {
      await storeUserData(userData as UserData)
    }

    return {
      accessToken,
      userData,
    }
  })
