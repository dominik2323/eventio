import React from 'react'
import styles from './HeroLayout.module.scss'

interface HeroLayoutProps {
  children: React.ReactNode
}

const HeroLayout = ({ children }: HeroLayoutProps) => {
  return <div className={styles.heroLayout}>{children}</div>
}

export default HeroLayout
