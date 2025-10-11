import { FieldError } from '@/components/Form/FieldError'
import { Label } from '@/components/Form/Label'
import clsx from 'clsx'
import { useState } from 'react'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import styles from './TextField.module.scss'

export interface FormInputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  label: string
  type?: string
  required?: boolean
  form: UseFormReturn<TFieldValues>
  className?: string
  disabled?: boolean
}

function TextField<TFieldValues extends FieldValues>({
  name,
  label,
  type,
  form,
  required,
  className,
  disabled,
}: FormInputProps<TFieldValues>) {
  const [isFocused, setIsFocused] = useState(false)
  const formProps = form.register(name)
  const error = form.formState.errors?.[name]
  const value = form.getValues(name)
  const isDirty = form.formState.isDirty
  const hasError = !!error
  const isWorking = form.formState.isSubmitting
  const hasRootError = !!form.formState.errors?.rootError

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    formProps.onBlur?.(e)
  }

  return (
    <div className={clsx(styles.textFieldContainer, className)}>
      <Label
        htmlFor={name}
        required={required}
        className={clsx(styles.label, {
          [styles.focused]: isFocused || value || isDirty,
        })}
      >
        {label}
      </Label>
      <input
        {...formProps}
        className={clsx(styles.textField, {
          [styles.error]: hasError || hasRootError,
        })}
        aria-invalid={hasError ? 'true' : 'false'}
        aria-describedby={hasError ? `${name}-error` : undefined}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={isWorking || disabled}
        type={type}
      />
      {hasError && (
        <FieldError
          id={`${name}-error`}
          role="alert"
          className={styles.fieldError}
        >
          {error?.message as string}
        </FieldError>
      )}
    </div>
  )
}

export { TextField }
