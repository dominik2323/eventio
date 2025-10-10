export interface NumberFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: string
}

function NumberField({ error, ...props }: NumberFieldProps) {
  return (
    <>
      <input
        type="number"
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

export { NumberField }
