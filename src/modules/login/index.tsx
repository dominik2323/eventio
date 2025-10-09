'use client'

import { useAuth } from '@/providers/AuthProvider'
import { FormEvent } from 'react'

function Login() {
  const { login, error, isExecuting } = useAuth()
  console.log(isExecuting)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    login({ email, password })
  }

  return (
    <div>
      {error && <span>{error}</span>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit" disabled={isExecuting}>
          {isExecuting ? 'Logging in...' : 'Log in'}
        </button>
      </form>
    </div>
  )
}

export default Login
