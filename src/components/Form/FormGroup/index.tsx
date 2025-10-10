import { forwardRef } from 'react'
import styles from './FormGroup.module.scss'

export interface FormGroupProps {
  children: React.ReactNode
}

export const FormGroup = forwardRef<HTMLDivElement, FormGroupProps>(
  ({ children, ...props }, ref) => {
    return (
      <div {...props} ref={ref} className={styles.formGroup}>
        {children}
      </div>
    )
  }
)

FormGroup.displayName = 'FormGroup'
