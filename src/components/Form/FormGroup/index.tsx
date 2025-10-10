import styles from './FormGroup.module.scss'

export interface FormGroupProps {
  children: React.ReactNode
}

function FormGroup({ children, ...props }: FormGroupProps) {
  return (
    <div {...props} className={styles.formGroup}>
      {children}
    </div>
  )
}

export { FormGroup }
