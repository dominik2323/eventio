import clsx from 'clsx'
import styles from './FieldError.module.scss'

export interface FieldErrorProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
  className?: string
}

function FieldError({ children, className }: FieldErrorProps) {
  return <p className={clsx(styles.fieldError, className)}>{children}</p>
}

export { FieldError }
