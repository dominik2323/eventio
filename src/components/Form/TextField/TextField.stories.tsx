import type { Meta, StoryObj } from '@storybook/nextjs'
import React from 'react'
import { useForm } from 'react-hook-form'
import { FormInputProps, TextField } from './index'

interface FormData {
  email: string
  password: string
  name: string
}

const meta: Meta<typeof TextField<FormData>> = {
  title: 'Components/Form/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'select' },
      options: ['email', 'password', 'name'],
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password'],
    },
    required: {
      control: { type: 'boolean' },
    },
    label: {
      control: { type: 'text' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const TextFieldWrapper = (args: Partial<FormInputProps<FormData>>) => {
  const form = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  })

  const props = {
    name: 'email' as keyof FormData,
    label: 'Email',
    form,
    ...args,
  }

  return <TextField {...props} />
}

export const Default: Story = {
  render: (args) => <TextFieldWrapper {...args} />,
  args: {
    name: 'email',
    label: 'Email',
    type: 'email',
  },
}

export const Required: Story = {
  render: (args) => <TextFieldWrapper {...args} />,
  args: {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
  },
}

export const Password: Story = {
  render: (args) => <TextFieldWrapper {...args} />,
  args: {
    name: 'password',
    label: 'Password',
    type: 'password',
    required: true,
  },
}

const WithErrorComponent = () => {
  const form = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  })

  React.useEffect(() => {
    form.setError('email', {
      type: 'manual',
      message: 'This email is already taken',
    })
  }, [form])

  return (
    <TextField name="email" label="Email" type="email" required form={form} />
  )
}

export const WithError: Story = {
  render: () => <WithErrorComponent />,
}

const WithValueComponent = () => {
  const form = useForm<FormData>({
    defaultValues: {
      email: 'john.doe@example.com',
      password: '',
      name: '',
    },
  })

  return <TextField name="email" label="Email" type="email" form={form} />
}

export const WithValue: Story = {
  render: () => <WithValueComponent />,
}

const AllTypesComponent = () => {
  const form = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  })

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '300px',
      }}
    >
      <TextField form={form} name="name" label="Full Name" type="text" />
      <TextField form={form} name="email" label="Email" type="email" required />
      <TextField
        form={form}
        name="password"
        label="Password"
        type="password"
        required
      />
    </div>
  )
}

export const AllTypes: Story = {
  render: () => <AllTypesComponent />,
}
