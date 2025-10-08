'use client'

import { useAuth } from '@/providers/AuthProvider'
import { FormEvent } from 'react'

function CreateEvent() {
  const { login, loginError, isLoading } = useAuth()
  console.log(isLoading)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    await login({ email, password })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" name="description" required />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" required />
        </div>
        <div>
          <label htmlFor="time">Time:</label>
          <input type="text" id="time" name="time" required />
        </div>
        <div>
          <label htmlFor="capacity">Capacity:</label>
          <input type="text" id="capacity" name="capacity" required />
        </div>

        <button type="submit">send</button>
      </form>
    </div>
  )
}

export default CreateEvent
