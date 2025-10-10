'use client'

import { Button } from '@/components/Button'
import { TextField } from '@/components/Form'
import { FormGroup } from '@/components/Form/FormGroup'
import { useAuth } from '@/providers/AuthProvider'
import { loginSchema, type LoginSchema } from '@/server/auth/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import styles from './Login.module.scss'

function Login() {
  const { login, error, isExecuting } = useAuth()

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const onSubmit = (data: LoginSchema) => {
    login(data)
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginHeader}>
        <h1>Sign in to Eventio.</h1>
        <p>Enter your details below.</p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.loginForm}>
        {error && <span>{error}</span>}
        <FormGroup>
          <TextField
            name="email"
            type="email"
            label="Email"
            required
            form={form}
          />
          <TextField
            name="password"
            type="password"
            label="Password"
            required
            form={form}
          />
        </FormGroup>
        <p className={styles.signUpLink}>
          Don&apos;t have account? <Link href="/signup">SIGN UP</Link>
        </p>
        <Button
          type="submit"
          disabled={isExecuting}
          loading={isExecuting}
          size="lg"
          className={styles.signInButton}
        >
          {'Sign in'}
        </Button>
      </form>
    </div>
  )
}

export default Login
