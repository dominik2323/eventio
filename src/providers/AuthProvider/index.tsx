'use client'

import { SessionUserData } from '@/lib/session'
import { createContext, ReactNode, useContext } from 'react'

interface AuthProviderProps extends UserData {
  children: ReactNode
}

interface UserData {
  userData: SessionUserData | null
}

const AuthContext = createContext<UserData>(null!)

export function AuthProvider({ children, userData }: AuthProviderProps) {
  return <AuthContext value={{ userData }}>{children}</AuthContext>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider.')
  return ctx
}
