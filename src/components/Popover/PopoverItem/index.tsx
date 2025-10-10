'use client'

import React from 'react'
import styles from './PopoverItem.module.scss'

interface PopoverItemProps {
  children: React.ReactNode
  onClick?: () => void
}

function PopoverItem({ children, onClick }: PopoverItemProps) {
  return (
    <button className={styles.popoverItem} onClick={onClick}>
      {children}
    </button>
  )
}

export { PopoverItem }
