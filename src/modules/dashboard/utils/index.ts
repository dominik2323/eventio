'use client'
import { EventData } from '@/server/events/types'

export function updateEvents(currentEvents: EventData[], newEvent: EventData) {
  const replaceIndex = currentEvents?.findIndex((e) => e.id === newEvent.id)
  if (replaceIndex === -1) return currentEvents

  return currentEvents.map((event, index) =>
    index === replaceIndex ? newEvent : event
  )
}
