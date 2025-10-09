import { UserData } from '@/server/auth/types'

export interface EventData {
  id: string
  title: string
  description: string
  startsAt: string
  capacity: number
  attendees: UserData[]
  owner: UserData
}

export interface CreateEventData {
  title: string
  description: string
  startsAt: string
  capacity: number
}

export interface EventError {
  message: string
  code: string
  issues: {
    message: string
  }[]
}

export type EventRes = EventData | EventError
export type EventsRes = EventData[] | EventError

export function isEventError(data: EventRes): data is EventError {
  return 'message' in data
}

export function isEventsError(data: EventsRes): data is EventError {
  return 'message' in data && !Array.isArray(data)
}
