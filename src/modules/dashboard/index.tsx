'use client'

import { updateEvents } from '@/modules/dashboard/utils'
import { useAuth } from '@/providers/AuthProvider'
import { joinEventAction, leaveEventAction } from '@/server/events/actions'
import { EventData } from '@/server/events/types'
import { compareAsc } from 'date-fns'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'

interface DashboardProps {
  initialEvents: EventData[]
}

function Dashboard({ initialEvents }: DashboardProps) {
  const { userData, logout } = useAuth()
  const [events, setEvents] = useState<EventData[]>(initialEvents)
  const [error, setError] = useState<string | undefined>(undefined)

  const { execute: executeJoin, isExecuting: isJoining } = useAction(
    joinEventAction,
    {
      onSuccess({ data: newEvent }) {
        setEvents((prevEvents) => updateEvents(prevEvents, newEvent))
      },
      onError({ error: { serverError } }) {
        setError(serverError)
      },
    }
  )

  const { execute: executeLeave, isExecuting: isLeaving } = useAction(
    leaveEventAction,
    {
      onSuccess({ data: newEvent }) {
        setEvents((prevEvents) => updateEvents(prevEvents, newEvent))
      },
      onError({ error: { serverError } }) {
        setError(serverError)
      },
    }
  )

  function handleLeaveEvent(id: string) {
    setError(undefined)
    executeLeave(id)
  }

  function handleJoinEvent(id: string) {
    setError(undefined)
    executeJoin(id)
  }

  const isLoading = isJoining || isLeaving

  return (
    <div>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
      <button onClick={logout}>logout</button>
      {isLoading && <div>loading</div>}
      {error && <div>{error}</div>}

      <div>
        {events?.map((event) => {
          const isAttendant = event.attendees.some(
            (person) => person.id === userData?.id
          )
          const isInPast = compareAsc(event.startsAt, new Date()) < 1

          return (
            <div key={event.id}>
              <h2>{event.title}</h2>

              <span>owner: {event.owner.firstName}</span>
              <span>
                {event.attendees.map((person) => (
                  <div key={person.id}>
                    <span>{person.firstName}</span>
                  </div>
                ))}
              </span>

              {isAttendant && (
                <button
                  onClick={() => handleLeaveEvent(event.id)}
                  disabled={isInPast}
                >
                  leave
                </button>
              )}
              {!isAttendant && (
                <button
                  onClick={() => handleJoinEvent(event.id)}
                  disabled={isInPast}
                >
                  join
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* <button onClick={handleCreateEvent}>create event</button> */}
    </div>
  )
}

export default Dashboard

// async function handleCreateEvent() {
//   const result = await createEventAction({
//     title: 'Test',
//     capacity: 10,
//     description: 'Test test',
//     startsAt: '2026-10-03T09:34:07.206Z',
//   })
//   console.log(result)
// }
