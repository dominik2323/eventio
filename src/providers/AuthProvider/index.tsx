'use client'

import { SessionUserData } from '@/lib/session'
import { logoutAction, refreshSessionAction } from '@/server/auth/actions'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

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

const makeRequest = async (
  path: string,
  accessToken: string,
  options: RequestInit = {}
) => {
  const res = await fetch(path, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...options.headers,
    },
  })

  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)

  return res.json()
}

const AuthContext = createContext<AuthContextType>(null!)

export function AuthProvider({ children, initialUserData }: AuthProviderProps) {
  const [userData, setUserData] = useState<UserData>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setUserData(initialUserData)
  }, [initialUserData?.user?.id])

  const authFetch = async (path: string, options: RequestInit = {}) => {
    try {
      if (!userData?.accessToken) {
        await logout()
        throw new Error('No access token available')
      }

      setIsLoading(true)
      const result = await makeRequest(path, userData.accessToken, options)
      setIsLoading(false)
      return result
    } catch (e: unknown) {
      console.log(e)

      setIsLoading(false)

      if (e instanceof Error && e.message.includes('401')) {
        try {
          const { data } = await refreshSessionAction()
          if (data?.accessToken && data?.userData && 'id' in data.userData) {
            setUserData({ accessToken: data.accessToken, user: data.userData })
            const result = await makeRequest(path, data.accessToken, options)
            return result
          } else {
            await logout()
            throw new Error('Failed to refresh session')
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError)
          await logout()
          throw refreshError
        }
      }

      console.error('Auth fetch error:', e)
      throw e
    }
  }

  const logout = async () => {
    try {
      setIsLoading(true)
      setUserData(null)
      await logoutAction()
    } catch (e) {
      console.error('Logout failed:', e)
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
