import { getUserData } from '@/lib/session'
import { AuthProvider } from '@/providers/AuthProvider'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'a',
}

interface PageProps {
  children: React.ReactNode
}

async function RootLayout({ children }: PageProps) {
  const session = await getUserData()

  return (
    <html lang="en">
      <AuthProvider
        initialUserData={
          session
            ? { accessToken: session.accessToken, user: session.user }
            : null
        }
      >
        <body>{children}</body>
      </AuthProvider>
    </html>
  )
}

export default RootLayout
