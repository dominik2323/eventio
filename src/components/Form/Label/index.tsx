import { forwardRef } from 'react'

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
  children: React.ReactNode
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ required, children, ...props }, ref) => {
    return (
      <label {...props} ref={ref}>
        {children}
        {required && <span aria-label="required field">*</span>}
      </label>
    )
  }
)

Label.displayName = 'Label'
