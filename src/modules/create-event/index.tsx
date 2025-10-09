'use client'

import { Button } from '@/components/Button'
import { Label, TextField } from '@/components/Form'
import { FormGroup } from '@/components/Form/FormGroup'
import { createEventAction } from '@/server/events/actions'
import { createEventSchema } from '@/server/events/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { set } from 'date-fns'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import z from 'zod'

const createEventFormSchema = createEventSchema
  .omit({ startsAt: true, capacity: true })
  .extend({
    capacity: z.string(),
    time: z.string(),
    date: z.string(),
  })

type CreateEventFormSchema = z.infer<typeof createEventFormSchema>

function CreateEvent() {
  const form = useForm<CreateEventFormSchema>({
    resolver: zodResolver(createEventFormSchema),
    defaultValues: {
      title: '',
      description: '',
      date: '',
      time: '',
      capacity: '0',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const { execute, isExecuting, result } = useAction(createEventAction, {
    onSuccess() {
      form.reset()
    },
  })

  const onSubmit = (data: CreateEventFormSchema) => {
    const date = new Date(data.date)
    const [hours, minutes] = data.time.split(':').map(Number)
    const combined = set(date, {
      hours: hours,
      minutes: minutes,
      seconds: 0,
      milliseconds: 0,
    })

    execute({
      capacity: Number(data.capacity),
      description: data.description,
      title: data.title,
      startsAt: combined.toISOString(),
    })
  }

  return (
    <div>
      {result.serverError && <div>{result.serverError}</div>}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="title">Title:</Label>
          <TextField
            type="text"
            id="title"
            required
            error={form.formState.errors.title?.message}
            {...form.register('title')}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">Description:</Label>
          <TextField
            type="text"
            id="description"
            required
            error={form.formState.errors.description?.message}
            {...form.register('description')}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="date">Date:</Label>
          <TextField
            type="date"
            id="date"
            required
            error={form.formState.errors.date?.message}
            {...form.register('date')}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="time">Time:</Label>
          <TextField
            type="time"
            id="time"
            required
            error={form.formState.errors.time?.message}
            {...form.register('time')}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="capacity">Capacity:</Label>
          <TextField
            type="number"
            id="capacity"
            required
            error={form.formState.errors.capacity?.message}
            {...form.register('capacity')}
          />
        </FormGroup>

        <Button type="submit" loading={isExecuting}>
          send
        </Button>
      </form>
    </div>
  )
}

export default CreateEvent
