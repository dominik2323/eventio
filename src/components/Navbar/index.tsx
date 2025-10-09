'use client'

import styles from '@/components/Navbar/Navbar.module.scss'
import { UserAvatar } from '@/components/Navbar/UserAvatar'
import { Popover } from '@/components/Popover'
import { PopoverItem } from '@/components/Popover/PopoverItem'
import { Chevron } from '@/components/svg/Chevron'
import { EventioLogo } from '@/components/svg/EventioLogo'
import { useAuth } from '@/providers/AuthProvider'
import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'

interface NavbarProps {
  className?: string
}

function Navbar({ className }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const { logout, userData } = useAuth()

  function handleLogout() {
    logout()
    setOpen(false)
  }

  return (
    <nav className={clsx(styles.navbar, className)}>
      <Link href="/" className={styles.logo}>
        <EventioLogo />
      </Link>

      {userData && (
        <Popover
          open={open}
          onOpenChange={setOpen}
          trigger={
            <div className={styles.user}>
              <UserAvatar />
              <span className={styles.name}>
                {userData.firstName} {userData.lastName}
              </span>
              <Chevron className={clsx(styles.chevron, open && styles.open)} />
            </div>
          }
          content={<PopoverItem onClick={handleLogout}>Logout</PopoverItem>}
        />
      )}
    </nav>
  )
}

export { Navbar }
