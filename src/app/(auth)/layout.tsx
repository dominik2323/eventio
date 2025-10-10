import { HeroLayout } from '@/components/Layouts/HeroLayout'
import React, { Fragment } from 'react'

interface PageProps {
  children: React.ReactNode
}

async function RootLayout({ children }: PageProps) {
  return (
    <Fragment>
      <HeroLayout>{children}</HeroLayout>
    </Fragment>
  )
}

export default RootLayout
