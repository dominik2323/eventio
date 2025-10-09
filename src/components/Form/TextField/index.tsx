import { forwardRef } from 'react'

export interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ error, ...props }, ref) => {
    return (
      <>
        <input
          {...props}
          ref={ref}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${props.id}-error` : undefined}
        />
        {error && (
          <div id={`${props.id}-error`} role="alert">
            {error}
          </div>
        )}
      </>
    )
  }
)

TextField.displayName = 'TextField'
