import z from 'zod'

export const createEventSchema = z.object({
  title: z.string().min(3).max(128),
  description: z.string().min(6).max(256),
  startsAt: z.string().datetime(),
  capacity: z.number().min(1),
})

export const eventIdSchema = z.string().min(1)

export type CreateEventSchema = z.infer<typeof createEventSchema>
export type EventIdSchema = z.infer<typeof eventIdSchema>
