import { forwardRef } from 'react'

export interface DateFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: string
}

export const DateField = forwardRef<HTMLInputElement, DateFieldProps>(
  ({ error, ...props }, ref) => {
    return (
      <>
        <input
          type="date"
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

DateField.displayName = 'DateField'
