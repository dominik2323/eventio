import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'a',
}

interface PageProps {
  children: React.ReactNode
}

function RootLayout({ children }: PageProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
