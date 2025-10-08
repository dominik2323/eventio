'use client'

import { loginAction, logoutAction } from '@/server/auth/actions'
import { LoginSchema } from '@/server/auth/schema'
import { UserData as SessionUserData } from '@/server/auth/types'
import { useRouter } from 'next/navigation'
import { createContext, ReactNode, useContext, useState } from 'react'

type UserData = SessionUserData | null

interface AuthProviderProps {
  children: ReactNode
  initialUserData: UserData
}

interface AuthContextType {
  userData: UserData
  isLoading: boolean
  logout: () => Promise<void>
  login: (input: LoginSchema) => Promise<void>
  loginError: string | null
}

const AuthContext = createContext<AuthContextType>(null!)

export function AuthProvider({ children, initialUserData }: AuthProviderProps) {
  const [userData, setUserData] = useState<UserData>(initialUserData)
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const router = useRouter()

  const login = async (input: LoginSchema) => {
    try {
      setIsLoading(true)
      setLoginError(null)
      const { data, serverError, validationErrors } = await loginAction(input)

      if (serverError) throw new Error(serverError)
      if (validationErrors) throw new Error(validationErrors?._errors?.[0])

      if (data && 'id' in data.userData) {
        setUserData(data.userData)
        router.push('/dashboard')
      } else {
        throw new Error('Unable to fetch user data.')
      }
    } catch (e) {
      if (e instanceof Error) {
        setLoginError(e.message)
      } else {
        setLoginError('Unknown error occured.')
      }
      console.log('Login failed:', e)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      setIsLoading(true)
      await logoutAction()
      router.push('/login')
      setUserData(null)
    } catch (e) {
      console.log('Logout failed:', e)
    } finally {
      setIsLoading(false)
    }
  }

  const value: AuthContextType = {
    isLoading,
    userData,
    logout,
    login,
    loginError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider.')
  return ctx
}
