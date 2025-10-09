'use server'

import { actionClient } from '@/lib/safe-action'
import { eventio } from '@/server'
import { createEventSchema, eventIdSchema } from '@/server/events/schema'
import { revalidatePath } from 'next/cache'

export const getEventsAction = actionClient.action(async () => {
  return await eventio.events.getEvents()
})

export const createEventAction = actionClient
  .inputSchema(createEventSchema)
  .action(async ({ parsedInput }) => {
    const res = await eventio.events.createEvent(parsedInput)
    revalidatePath('/dashboard')
    return res
  })

export const joinEventAction = actionClient
  .inputSchema(eventIdSchema)
  .action(async ({ parsedInput }) => {
    const res = await eventio.events.joinEvent(parsedInput)
    revalidatePath('/dashboard')
    return res
  })

export const leaveEventAction = actionClient
  .inputSchema(eventIdSchema)
  .action(async ({ parsedInput }) => {
    const res = await eventio.events.leaveEvent(parsedInput)
    revalidatePath('/dashboard')
    return res
  })

export const deleteEventAction = actionClient
  .inputSchema(eventIdSchema)
  .action(async ({ parsedInput }) => {
    const res = await eventio.events.deleteEvent(parsedInput)
    revalidatePath('/dashboard')
    return res
  })
