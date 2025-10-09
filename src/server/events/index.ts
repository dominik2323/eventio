import { getAccessToken } from '@/lib/session'
import { eventioAuthClient, eventioClient } from '@/server/client'
import EventError from '@/server/events/error'
import {
  CreateEventSchema,
  EventIdSchema,
  createEventSchema,
  eventIdSchema,
} from '@/server/events/schema'
import {
  EventData,
  EventRes,
  EventsRes,
  isEventError,
  isEventsError,
} from '@/server/events/types'
import 'server-only'

async function getEvents(): Promise<EventData[]> {
  const eventsRes = await eventioClient<EventsRes>('/events', {
    method: 'GET',
  })

  if (isEventsError(eventsRes.data) && !eventsRes.ok) {
    throw new EventError(eventsRes.data.message)
  }

  return eventsRes.data as EventData[]
}

async function createEvent(payload: CreateEventSchema): Promise<EventData> {
  const data = createEventSchema.parse(payload)
  const accessToken = await getAccessToken()

  if (!accessToken) {
    throw new EventError('Access token required')
  }

  const eventRes = await eventioAuthClient<EventRes>('/events', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (isEventError(eventRes.data) && !eventRes.ok) {
    throw new EventError(eventRes.data.message)
  }

  return eventRes.data as EventData
}

async function joinEvent(eventId: EventIdSchema): Promise<EventData> {
  const id = eventIdSchema.parse(eventId)
  const accessToken = await getAccessToken()

  if (!accessToken) {
    throw new EventError('Access token required')
  }

  const eventRes = await eventioAuthClient<EventRes>(
    `/events/${id}/attendees/me`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  if (isEventError(eventRes.data) && !eventRes.ok) {
    throw new EventError(eventRes.data.message)
  }

  return eventRes.data as EventData
}

async function leaveEvent(eventId: EventIdSchema): Promise<EventData> {
  const id = eventIdSchema.parse(eventId)
  const accessToken = await getAccessToken()

  if (!accessToken) {
    throw new EventError('Access token required')
  }

  const eventRes = await eventioAuthClient<EventRes>(
    `/events/${id}/attendees/me`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  if (isEventError(eventRes.data) && !eventRes.ok) {
    throw new EventError(eventRes.data.message)
  }

  return eventRes.data as EventData
}

async function deleteEvent(eventId: EventIdSchema): Promise<EventData> {
  const id = eventIdSchema.parse(eventId)
  const accessToken = await getAccessToken()

  if (!accessToken) {
    throw new EventError('Access token required')
  }

  const eventRes = await eventioAuthClient<EventRes>(`/events/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (isEventError(eventRes.data) && !eventRes.ok) {
    throw new EventError(eventRes.data.message)
  }

  return eventRes.data as EventData
}

export const events = {
  getEvents,
  createEvent,
  joinEvent,
  leaveEvent,
  deleteEvent,
}
