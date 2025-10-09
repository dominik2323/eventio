import { forwardRef } from 'react'

export interface TimeFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: string
}

export const TimeField = forwardRef<HTMLInputElement, TimeFieldProps>(
  ({ error, ...props }, ref) => {
    return (
      <>
        <input
          type="time"
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

TimeField.displayName = 'TimeField'
