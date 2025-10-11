import Login from '@/modules/login'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your Eventio account.',
}

function LoginPage() {
  return <Login />
}

export default LoginPage
