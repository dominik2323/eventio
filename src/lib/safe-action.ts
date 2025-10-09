import { getSession } from '@/lib/session'
import AuthError from '@/server/auth/error'
import EventError from '@/server/events/error'
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

  if (error instanceof EventError) {
    console.error('Event error:', error)
    return error.message
  }

  if (error instanceof ZodError) {
    console.error('Validation error', error)
    return 'Validation failed. Please check your input.'
  }

  if (error instanceof Error) {
    console.error('Generic error:', error)
    return 'Something went wrong.'
  }

  console.error('Unknown error occurred', error)
  return DEFAULT_SERVER_ERROR_MESSAGE
}

export const authActionClient = actionClient.use(async ({ next }) => {
  const session = await getSession()

  if (!session) {
    throw new Error('User is not authenticated.')
  }

  return next({ ctx: session.user })
})
