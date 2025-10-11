import { Navbar } from '@/components/Navbar'
import { Fragment } from 'react'
import styles from './DashboardLayout.module.scss'

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <Navbar />
      <main className={styles.dashboardLayout}>{children}</main>
    </Fragment>
  )
}

export { DashboardLayout }
