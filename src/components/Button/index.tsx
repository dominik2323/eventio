import { Spinner } from '@/components/Spinner'
import clsx from 'clsx'
import type { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'disabled'
  size?: 'sm' | 'lg'
  loading?: boolean
}

export function Button({
  children,
  variant = 'primary',
  size = 'sm',
  loading = false,
  disabled,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={clsx(styles.button, styles[variant], styles[size], className)}
    >
      {loading ? <Spinner className={styles.spinner} /> : children}
    </button>
  )
}
