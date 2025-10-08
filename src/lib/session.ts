'use server'

import { env } from '@/env'
import { UserData } from '@/server/auth/types'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'

export interface SessionData {
  refreshToken?: string
  accessToken?: string
  user?: UserData
}

const sessionOptions = {
  password: env.SESSION_SECRET,
  cookieName: 'eventio-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
}

export async function getSession() {
  return getIronSession<SessionData>(await cookies(), sessionOptions)
}

export async function clearSession() {
  const session = await getSession()
  session.destroy()
}

export async function storeRefreshToken(refreshToken: string) {
  const session = await getSession()
  session.refreshToken = refreshToken
  await session.save()
}

export async function storeAccessToken(accessToken: string) {
  const session = await getSession()
  session.accessToken = accessToken
  await session.save()
}

export async function storeUserData(user: UserData) {
  const session = await getSession()
  session.user = user
  await session.save()
}

export async function getRefreshToken(): Promise<string | undefined> {
  const session = await getSession()
  return session.refreshToken
}

export async function getUserData(): Promise<UserData | undefined> {
  const session = await getSession()
  return session.user
}

export async function getAccessToken(): Promise<string | undefined> {
  const session = await getSession()
  return session.accessToken
}
