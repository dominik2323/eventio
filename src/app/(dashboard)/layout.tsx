import { DashboardLayout } from '@/components/Layouts/DashboardLayout'
import React, { Fragment } from 'react'

interface PageProps {
  children: React.ReactNode
}

async function RootLayout({ children }: PageProps) {
  return (
    <Fragment>
      <DashboardLayout>{children}</DashboardLayout>
    </Fragment>
  )
}

export default RootLayout
