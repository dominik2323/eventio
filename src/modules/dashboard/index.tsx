'use client'

import { EventCard } from '@/components/EventCard'
import { getEventVariant } from '@/modules/dashboard/utils'
import { useAuth } from '@/providers/AuthProvider'
import { joinEventAction, leaveEventAction } from '@/server/events/actions'
import { EventData } from '@/server/events/types'
import { useOptimisticAction } from 'next-safe-action/hooks'
import { useState } from 'react'

interface DashboardProps {
  initialEvents: EventData[]
}

function Dashboard({ initialEvents }: DashboardProps) {
  const { userData } = useAuth()
  const [error, setError] = useState<string | undefined>(undefined)
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')

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

  function handleEventAction(event: EventData) {
    const variant = getEventVariant(event, userData!)

    switch (variant) {
      case 'join':
        handleJoinEvent(event.id)
        break
      case 'leave':
        handleLeaveEvent(event.id)
        break
      case 'edit':
        // TODO: Navigate to edit page or open edit modal
        console.log('Edit event:', event.id)
        break
    }
  }

  return (
    <div>
      {isLoading && <div>loading</div>}
      {error && <div>{error}</div>}

      {/* Layout Toggle */}
      <div
        style={{
          marginBottom: '2rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        <span>View:</span>
        <button
          onClick={() => setLayout('grid')}
          style={{
            background: layout === 'grid' ? '#22d486' : '#d9dce1',
            color: layout === 'grid' ? 'white' : '#a9aeb4',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Grid
        </button>
        <button
          onClick={() => setLayout('list')}
          style={{
            background: layout === 'list' ? '#22d486' : '#d9dce1',
            color: layout === 'list' ? 'white' : '#a9aeb4',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          List
        </button>
      </div>

      <div>
        {events?.map((event) => {
          const variant = getEventVariant(event, userData!)

          return (
            <EventCard
              key={event.id}
              layout={layout}
              title={event.title}
              description={event.description}
              date={event.startsAt}
              author={`${event.owner.firstName} ${event.owner.lastName}`}
              attendees={{
                current: event.attendees.length,
                capacity: event.capacity,
              }}
              variant={variant}
              onAction={() => handleEventAction(event)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Dashboard
