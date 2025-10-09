import z from 'zod'

export const createEventSchema = z.object({
  title: z
    .string()
    .min(1, 'Event title is required')
    .min(3, 'Event title must be at least 3 characters long')
    .max(128, 'Event title must be no more than 128 characters'),
  description: z
    .string()
    .min(1, 'Event description is required')
    .min(6, 'Event description must be at least 6 characters long')
    .max(256, 'Event description must be no more than 256 characters'),
  startsAt: z
    .string()
    .min(1, 'Event start date and time is required')
    .datetime('Please enter a valid date and time'),
  capacity: z
    .number()
    .int('Event capacity must be a whole number')
    .min(1, 'Event capacity must be at least 1')
    .max(1000, 'Event capacity cannot exceed 1000 participants'),
})

export const eventIdSchema = z
  .string()
  .min(1, 'Event ID is required')
  .uuid('Invalid event ID format')

export type CreateEventSchema = z.infer<typeof createEventSchema>
export type EventIdSchema = z.infer<typeof eventIdSchema>
