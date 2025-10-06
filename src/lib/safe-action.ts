import strings from '@/dictionaries/en'
import { getSession } from '@/lib/session'
import AuthError from '@/server/auth/error'
import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from 'next-safe-action'
import { ZodError } from 'zod'

export const actionClient = createSafeActionClient({
  handleServerError,
})

function handleServerError(error: Error) {
  if (error instanceof AuthError) {
    console.error('Authentication error:', error)
    return error.message
  }

  if (error instanceof ZodError) {
    console.error('Validation error', error)
    return strings.errors.validation
  }

  if (error instanceof Error) {
    console.error('Server error:', error)
    return error.message
  }

  console.error('Unknown error occurred', error)
  return DEFAULT_SERVER_ERROR_MESSAGE
}

export const authActionClient = actionClient.use(async ({ next }) => {
  const session = await getSession()

  if (!session) {
    throw new AuthError('User is not authenticated.')
  }

  return next({ ctx: session.user })
})
