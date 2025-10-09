'use client'

import { Button } from '@/components/Button'
import { Label, TextField } from '@/components/Form'
import { FormGroup } from '@/components/Form/FormGroup'
import { useAuth } from '@/providers/AuthProvider'
import { loginSchema, type LoginSchema } from '@/server/auth/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

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
    <main>
      {error && <span>{error}</span>}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="email" required>
            Email:
          </Label>
          <TextField
            id="email"
            type="email"
            error={form.formState.errors.email?.message}
            {...form.register('email')}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password" required>
            Password:
          </Label>
          <TextField
            id="password"
            type="password"
            error={form.formState.errors.password?.message}
            {...form.register('password')}
          />
        </FormGroup>
        <Button type="submit" disabled={isExecuting} loading={isExecuting}>
          {'Log in'}
        </Button>
      </form>
    </main>
  )
}

export default Login
