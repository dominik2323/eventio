'use server'

import { actionClient } from '@/lib/safe-action'
import { eventio } from '@/server'
import { loginSchema } from '../../server/auth/schema'

export const loginAction = actionClient
  .inputSchema(loginSchema)
  .action(async ({ parsedInput }) => {
    const userData = await eventio.auth.login(parsedInput)

    return userData
  })
