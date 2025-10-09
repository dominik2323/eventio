'use client'

import { loginAction, logoutAction } from '@/server/auth/actions'
import { LoginSchema } from '@/server/auth/schema'
import { UserData as SessionUserData } from '@/server/auth/types'
import { useAction } from 'next-safe-action/hooks'
import { useRouter } from 'next/navigation'
import { createContext, ReactNode, useContext, useState } from 'react'

type UserData = SessionUserData | null

interface AuthProviderProps {
  children: ReactNode
  initialUserData: UserData
}

interface AuthContextType {
  userData: UserData
  isExecuting: boolean
  logout: () => void
  login: (input: LoginSchema) => void
  error: string | null
}

const AuthContext = createContext<AuthContextType>(null!)

export function AuthProvider({ children, initialUserData }: AuthProviderProps) {
  const [userData, setUserData] = useState<UserData>(initialUserData)
  const router = useRouter()

  const {
    execute: executeLogin,
    isExecuting: isLoginExecuting,
    result: loginResult,
  } = useAction(loginAction, {
    onSuccess: ({ data }) => {
      if (data && 'id' in data.userData) {
        router.push('/dashboard')
        setUserData(data.userData)
      }
    },
    onError: ({ error }) => {
      console.log('Login failed:', error)
    },
  })

  const {
    execute: executeLogout,
    isExecuting: isLogoutExecuting,
    result: logoutResult,
  } = useAction(logoutAction, {
    onSuccess: () => {
      router.push('/login')
      setUserData(null)
    },
    onError: ({ error }) => {
      console.log('Logout failed:', error)
    },
  })

  const login = (input: LoginSchema) => {
    executeLogin(input)
  }

  const logout = () => {
    executeLogout()
  }

  const value: AuthContextType = {
    isExecuting: isLoginExecuting || isLogoutExecuting,
    userData,
    logout,
    login,
    error: loginResult?.serverError || logoutResult?.serverError || null,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider.')
  return ctx
}
