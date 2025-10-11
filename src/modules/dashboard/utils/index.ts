'use client'
import { UserData } from '@/server/auth/types'
import { EventData } from '@/server/events/types'

function updateEvents(currentEvents: EventData[], newEvent: EventData) {
  const replaceIndex = currentEvents?.findIndex((e) => e.id === newEvent.id)
  if (replaceIndex === -1) return currentEvents

  return currentEvents.map((event, index) =>
    index === replaceIndex ? newEvent : event
  )
}

function getEventVariant(
  event: EventData,
  userData: UserData
): 'edit' | 'join' | 'leave' {
  const isOwner = event.owner.id === userData?.id
  const isAttendant = event.attendees.some(
    (person) => person.id === userData?.id
  )

  if (isOwner) return 'edit'
  if (isAttendant) return 'leave'
  return 'join'
}

export { getEventVariant, updateEvents }
