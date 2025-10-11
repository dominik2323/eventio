import { HeroLayout } from '@/components/Layouts/HeroLayout'
import React from 'react'

interface PageProps {
  children: React.ReactNode
}

async function RootLayout({ children }: PageProps) {
  return <HeroLayout>{children}</HeroLayout>
}

export default RootLayout
