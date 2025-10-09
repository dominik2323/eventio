import { Navbar } from '@/components/Navbar'
import { hind, playfair } from '@/consts/fonts'
import { getUserData } from '@/lib/session'
import { AuthProvider } from '@/providers/AuthProvider'
import clsx from 'clsx'
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
    <html lang="en" className={clsx(playfair.variable, hind.variable)}>
      <AuthProvider initialUserData={session ?? null}>
        <body>
          <Navbar />
          {children}
        </body>
      </AuthProvider>
    </html>
  )
}

export default RootLayout
