'use server'

import { actionClient } from '@/lib/safe-action'
import { eventio } from '@/server'
import { createEventSchema, eventIdSchema } from '@/server/events/schema'

export const getEventsAction = actionClient.action(async () => {
  return await eventio.events.getEvents()
})

export const createEventAction = actionClient
  .inputSchema(createEventSchema)
  .action(async ({ parsedInput }) => {
    return await eventio.events.createEvent(parsedInput)
  })

export const joinEventAction = actionClient
  .inputSchema(eventIdSchema)
  .action(async ({ parsedInput }) => {
    return await eventio.events.joinEvent(parsedInput)
  })

export const leaveEventAction = actionClient
  .inputSchema(eventIdSchema)
  .action(async ({ parsedInput }) => {
    return await eventio.events.leaveEvent(parsedInput)
  })

export const deleteEventAction = actionClient
  .inputSchema(eventIdSchema)
  .action(async ({ parsedInput }) => {
    return await eventio.events.deleteEvent(parsedInput)
  })
