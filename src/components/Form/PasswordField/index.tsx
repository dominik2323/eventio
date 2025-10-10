import { FormInputProps, TextField } from '@/components/Form/TextField'
import { Eye } from '@/components/svg/Eye'
import { useState } from 'react'
import { FieldValues } from 'react-hook-form'
import styles from './PasswordField.module.scss'

function PasswordField<TFieldValues extends FieldValues>(
  props: Omit<FormInputProps<TFieldValues>, 'type'>
) {
  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className={styles.passwordField}>
      <TextField {...props} type={showPassword ? 'text' : 'password'} />
      <button
        onClick={togglePassword}
        type="button"
        className={styles.eyeButton}
      >
        <Eye />
      </button>
    </div>
  )
}

export { PasswordField }
