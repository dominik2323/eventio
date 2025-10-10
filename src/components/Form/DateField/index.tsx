import React from 'react'

export interface DateFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: string
}

function DateField({ error, ...props }: DateFieldProps) {
  return (
    <>
      <input
        type="date"
        {...props}
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

export { DateField }
