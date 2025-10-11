import { Navbar } from '@/components/Navbar'
import Image from 'next/image'
import React, { Fragment } from 'react'
import styles from './HeroLayout.module.scss'

interface HeroLayoutProps {
  children: React.ReactNode
}

function HeroLayout({ children }: HeroLayoutProps) {
  return (
    <Fragment>
      <Navbar className={styles.navbar} />
      <main className={styles.heroLayout}>
        <div className={styles.cover}>
          <blockquote className={styles.quoteContainer}>
            <h2 className={styles.quote}>
              “Great, kid. Don&apos;t get cocky.”
            </h2>
            <hr className={styles.quoteSeparator} />
            <p className={styles.quoteAuthor}>Han Solo</p>
          </blockquote>
          <Image
            src="/images/troopers.webp"
            alt="Hero Cover"
            fill
            className={styles.coverImage}
          />
        </div>
        <div className={styles.content}>{children}</div>
      </main>
    </Fragment>
  )
}

export { HeroLayout }
