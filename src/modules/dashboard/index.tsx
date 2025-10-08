'use client'

import { useAuth } from '@/providers/AuthProvider'
import { joinEventAction, leaveEventAction } from '@/server/events/actions'
import { EventData } from '@/server/events/types'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'

interface DashboardProps {
  initialEvents: EventData[]
}

function updateEvents(currentEvents: EventData[], newEvent: EventData) {
  const replaceIndex = currentEvents?.findIndex((e) => e.id === newEvent.id)
  if (replaceIndex === -1) return currentEvents

  return currentEvents.map((event, index) =>
    index === replaceIndex ? newEvent : event
  )
}

function Dashboard({ initialEvents }: DashboardProps) {
  const { userData, logout } = useAuth()
  const [events, setEvents] = useState<EventData[]>(initialEvents)

  const { execute: executeJoin, isExecuting: isJoining } = useAction(
    joinEventAction,
    {
      onSuccess({ data: newEvent }) {
        setEvents((prevEvents) => updateEvents(prevEvents, newEvent))
      },
      onError(args) {
        console.log(args)
      },
    }
  )

  const { execute: executeLeave, isExecuting: isLeaving } = useAction(
    leaveEventAction,
    {
      onSuccess({ data: newEvent }) {
        setEvents((prevEvents) => updateEvents(prevEvents, newEvent))
      },
      onError(args) {
        console.log(args)
      },
    }
  )

  function handleLeaveEvent(id: string) {
    executeLeave(id)
  }

  function handleJoinEvent(id: string) {
    executeJoin(id)
  }

  const isLoading = isJoining || isLeaving

  return (
    <div>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
      <button onClick={logout}>logout</button>
      {isLoading && <div>loading</div>}

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
