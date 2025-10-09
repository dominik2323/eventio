import { forwardRef } from 'react'

export interface FormGroupProps {
  children: React.ReactNode
}

export const FormGroup = forwardRef<HTMLDivElement, FormGroupProps>(
  ({ children, ...props }, ref) => {
    return (
      <div {...props} ref={ref}>
        {children}
      </div>
    )
  }
)

FormGroup.displayName = 'FormGroup'
