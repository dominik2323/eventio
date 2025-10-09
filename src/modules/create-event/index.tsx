'use client'

import { createEventAction } from '@/server/events/actions'
import { useAction } from 'next-safe-action/hooks'
import { FormEvent } from 'react'

function CreateEvent() {
  const { execute } = useAction(createEventAction)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    execute({
      title: 'Test 10',
      capacity: 10,
      description: 'Test test',
      startsAt: '2026-10-03T09:34:07.206Z',
    })
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
