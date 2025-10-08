'use client'

import { useAuth } from '@/providers/AuthProvider'
import {
  createEventAction,
  deleteEventAction,
  joinEventAction,
  leaveEventAction,
} from '@/server/events/actions'
import { EventData } from '@/server/events/types'
import { useState } from 'react'

type Event = EventData[] | null

interface DashboardProps {
  initialEvents: Event
}

function Dashboard({ initialEvents }: DashboardProps) {
  const { userData, logout } = useAuth()
  const [events, setEvents] = useState<Event>(initialEvents)

  async function handleCreateEvent() {
    const result = await createEventAction({
      title: 'Test',
      capacity: 10,
      description: 'Test test',
      startsAt: '2026-10-03T09:34:07.206Z',
    })
    console.log(result)
  }

  async function handleDeleteEvent(id: string) {
    const result = await deleteEventAction(id)
    console.log('deleted', id, result)
  }

  async function handleLeaveEvent(id: string) {
    const result = await leaveEventAction(id)
    console.log('left', id, result)
  }

  async function handleJoinEvent(id: string) {
    const result = await joinEventAction(id)
    console.log('join', id, result)
  }

  return (
    <div>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
      <button onClick={logout}>logout</button>

      <div>
        {events?.map((event) => {
          const isAttendant = event.attendees.some(
            (person) => person.id === userData?.id
          )

          return (
            <div key={event.id}>
              <h2>{event.title}</h2>
              <span>{event.id}</span>
              <span>
                {event.attendees.map((person) => (
                  <div key={person.id}>
                    <span>{person.firstName}</span>
                  </div>
                ))}
              </span>
              <button onClick={() => handleDeleteEvent(event.id)}>
                delete
              </button>
              {isAttendant && (
                <button onClick={() => handleLeaveEvent(event.id)}>
                  leave
                </button>
              )}
              {!isAttendant && (
                <button onClick={() => handleJoinEvent(event.id)}>join</button>
              )}
            </div>
          )
        })}
      </div>

      <button onClick={handleCreateEvent}>create event</button>
    </div>
  )
}

export default Dashboard
