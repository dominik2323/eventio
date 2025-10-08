import { getAccessToken } from '@/lib/session'
import EventError from '@/server/events/error'
import {
  CreateEventSchema,
  EventIdSchema,
  createEventSchema,
  eventIdSchema,
} from '@/server/events/schema'
import { EventRes, EventsRes } from '@/server/events/types'
import { eventioClient } from '@/server/client'
import 'server-only'

async function getEvents() {
  const eventsRes = await eventioClient<EventsRes>('/events', {
    method: 'GET',
  })

  if ('message' in eventsRes.data && !eventsRes.ok) {
    throw new EventError(eventsRes.data.message)
  }

  return eventsRes.data
}

async function createEvent(payload: CreateEventSchema) {
  const data = createEventSchema.parse(payload)
  const accessToken = await getAccessToken()

  if (!accessToken) {
    throw new EventError('Access token required')
  }

  const eventRes = await eventioClient<EventRes>('/events', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if ('message' in eventRes.data && !eventRes.ok) {
    throw new EventError(eventRes.data.message)
  }

  return eventRes.data
}

async function joinEvent(eventId: EventIdSchema) {
  const id = eventIdSchema.parse(eventId)
  const accessToken = await getAccessToken()

  if (!accessToken) {
    throw new EventError('Access token required')
  }

  const eventRes = await eventioClient<EventRes>(`/events/${id}/attendees/me`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if ('message' in eventRes.data && !eventRes.ok) {
    throw new EventError(eventRes.data.message)
  }

  return eventRes.data
}

async function leaveEvent(eventId: EventIdSchema) {
  const id = eventIdSchema.parse(eventId)
  const accessToken = await getAccessToken()

  if (!accessToken) {
    throw new EventError('Access token required')
  }

  const eventRes = await eventioClient<EventRes>(`/events/${id}/attendees/me`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if ('message' in eventRes.data && !eventRes.ok) {
    throw new EventError(eventRes.data.message)
  }

  return eventRes.data
}

export const events = { getEvents, createEvent, joinEvent, leaveEvent }
