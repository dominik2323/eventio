'use client'

import { loginAction } from '@/app/login/actions'

function Login() {
  return (
    <div>
      <button
        onClick={async () => {
          const res = await loginAction({
            email: 'brucebanner@strv.com',
            password: 'kill3r',
          })

          console.log(res.serverError, res)
        }}
      >
        Log in
      </button>
    </div>
  )
}

export default Login
