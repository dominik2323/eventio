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
            label="Title"
            name="title"
            required
            form={form}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">Description:</Label>
          <TextField
            type="text"
            name="description"
            label="Description"
            form={form}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="date">Date:</Label>
          <TextField
            type="date"
            name="date"
            required
            label="Date"
            form={form}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="time">Time:</Label>
          <TextField
            type="time"
            name="time"
            required
            label="Time"
            form={form}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="capacity">Capacity:</Label>
          <TextField
            type="number"
            name="capacity"
            required
            label="Capacity"
            form={form}
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
