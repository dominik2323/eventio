'use client'

import { SessionUserData } from '@/lib/session'
import { authUtils } from '@/providers/AuthProvider/utils'
import { logoutAction, refreshSessionAction } from '@/server/auth/actions'
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
  authFetch: (path: string, options?: RequestInit) => Promise<unknown>
}

const AuthContext = createContext<AuthContextType>(null!)

export function AuthProvider({ children, initialUserData }: AuthProviderProps) {
  const [userData, setUserData] = useState<UserData>(initialUserData)
  const [isLoading, setIsLoading] = useState(false)

  const authFetch = async (
    path: string,
    options: RequestInit = {},
    isRetryAttempt = false
  ) => {
    try {
      setIsLoading(true)
      // prettier-ignore
      return await authUtils.makeRequest(path,  userData?.accessToken, options)
    } catch (e: unknown) {
      if (e instanceof Error && e.message.includes('401')) {
        // If this is already a retry attempt, logout to prevent infinite loops
        if (isRetryAttempt) {
          await logout()
          throw e
        }

        try {
          const { data } = await refreshSessionAction()
          if (data?.accessToken && data?.userData && 'id' in data.userData) {
            setUserData({ accessToken: data.accessToken, user: data.userData })
            return await authFetch(path, options, true)
          } else {
            await logout()
          }
        } catch (e) {
          console.error('Token refresh failed:', e)
          await logout()
        }
      }

      throw e
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      setIsLoading(true)
      setUserData(null)
      await logoutAction()
    } catch (e) {
      console.error('Logout failed:', e)
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    isLoading,
    userData,
    logout,
    authFetch,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider.')
  return ctx
}
