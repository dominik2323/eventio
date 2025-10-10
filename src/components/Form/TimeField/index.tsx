export interface TimeFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: string
}

function TimeField({ error, ...props }: TimeFieldProps) {
  return (
    <>
      <input
        type="time"
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

export { TimeField }
