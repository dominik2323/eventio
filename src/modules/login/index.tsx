'use client'

import { loginAction } from '@/app/login/actions'

function Login() {
  async function handleSubmit(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const res = await loginAction({ email, password })
    console.log(res.serverError, res)
  }

  return (
    <div>
      <form action={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}

export default Login
