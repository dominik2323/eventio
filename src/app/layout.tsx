import { hind, playfair } from '@/consts/fonts'
import { getUserData } from '@/lib/session'
import { AuthProvider } from '@/providers/AuthProvider'
import { Metadata } from 'next'
import React from 'react'
import '../styles/globals.scss'

export const metadata: Metadata = {
  title: 'Eventio',
}

interface PageProps {
  children: React.ReactNode
}

async function RootLayout({ children }: PageProps) {
  const session = await getUserData()

  return (
    <html lang="en" className={`${playfair.variable} ${hind.variable}`}>
      <AuthProvider initialUserData={session ?? null}>
        <body>{children}</body>
      </AuthProvider>
    </html>
  )
}

export default RootLayout
