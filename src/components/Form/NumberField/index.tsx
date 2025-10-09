import { forwardRef } from 'react'

export interface NumberFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: string
}

export const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(
  ({ error, ...props }, ref) => {
    return (
      <>
        <input
          type="number"
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

NumberField.displayName = 'NumberField'
