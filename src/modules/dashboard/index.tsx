'use client'

import CreateEvent from '@/modules/create-event'
import { useAuth } from '@/providers/AuthProvider'
import { joinEventAction, leaveEventAction } from '@/server/events/actions'
import { EventData } from '@/server/events/types'
import { compareAsc, format } from 'date-fns'
import { useOptimisticAction } from 'next-safe-action/hooks'
import { useState } from 'react'

interface DashboardProps {
  initialEvents: EventData[]
}

function Dashboard({ initialEvents }: DashboardProps) {
  const { userData, logout } = useAuth()
  const [error, setError] = useState<string | undefined>(undefined)

  const {
    execute: executeJoin,
    isExecuting: isJoining,
    optimisticState: joinOptimisticEvents,
  } = useOptimisticAction(joinEventAction, {
    currentState: initialEvents,
    updateFn(state, eventId) {
      if (!userData) return state
      return state.map((event) =>
        event.id === eventId
          ? {
              ...event,
              attendees: [...event.attendees, userData],
            }
          : event
      )
    },
    onError({ error: { serverError } }) {
      setError(serverError)
    },
  })

  const {
    execute: executeLeave,
    isExecuting: isLeaving,
    optimisticState: leaveOptimisticEvents,
  } = useOptimisticAction(leaveEventAction, {
    currentState: joinOptimisticEvents,
    updateFn(state, eventId) {
      if (!userData) return state
      return state.map((event) =>
        event.id === eventId
          ? {
              ...event,
              attendees: event.attendees.filter(
                (attendee) => attendee.id !== userData.id
              ),
            }
          : event
      )
    },
    onError({ error: { serverError } }) {
      setError(serverError)
    },
  })

  const events = leaveOptimisticEvents

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
              <span>date: {format(event.startsAt, 'Pp')}</span>
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

      <CreateEvent />
    </div>
  )
}

export default Dashboard
