import clsx from 'clsx'
import styles from './Label.module.scss'

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
  children: React.ReactNode
}

function Label({ required, children, ...props }: LabelProps) {
  return (
    <label {...props} className={clsx(styles.label, props.className)}>
      {children}
      {required && <span aria-label="required field"> *</span>}
    </label>
  )
}

export { Label }
