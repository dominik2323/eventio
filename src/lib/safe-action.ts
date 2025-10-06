import AuthError from '@/server/auth/error'
import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from 'next-safe-action'
import z, { ZodError } from 'zod'

export const actionClient = createSafeActionClient({
  handleServerError,
})

function handleServerError(error: Error) {
  if (error instanceof AuthError) {
    console.log('auth error', error)
    return error.message
  }

  if (error instanceof ZodError) {
    console.log('zod error', z.treeifyError(error))
    return z.treeifyError(error)
  }

  if (error instanceof Error) {
    console.log('error', error.message)
    return error.message
  }

  return DEFAULT_SERVER_ERROR_MESSAGE
}
