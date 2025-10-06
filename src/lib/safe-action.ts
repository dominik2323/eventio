import strings from '@/dictionaries/en'
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
