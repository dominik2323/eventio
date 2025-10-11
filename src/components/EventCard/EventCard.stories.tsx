import type { Meta, StoryObj } from '@storybook/nextjs'
import { EventCard } from './index'

const meta: Meta<typeof EventCard> = {
  title: 'Components/EventCard',
  component: EventCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['edit', 'join', 'leave'],
    },
    onAction: { action: 'clicked' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const defaultArgs = {
  title: 'How to get angry',
  description: 'I will show you how to get angry in a second',
  date: 'April 4, 2017 – 2:17 PM',
  author: 'Tom Watts',
  attendees: {
    current: 9,
    capacity: 31,
  },
}

export const Edit: Story = {
  args: {
    ...defaultArgs,
    variant: 'edit',
  },
}

export const Join: Story = {
  args: {
    ...defaultArgs,
    title: 'Mexican party vol.2',
    description: 'Party in Scrollbar',
    author: 'Matilda Daniels',
    variant: 'join',
  },
}

export const Leave: Story = {
  args: {
    ...defaultArgs,
    title: 'How to become Dark Soldier',
    description: 'I will tell you insights about how I became Dark Soldier',
    author: 'Matilda Daniels',
    attendees: {
      current: 5,
      capacity: 50,
    },
    variant: 'leave',
  },
}

export const LongTitle: Story = {
  args: {
    ...defaultArgs,
    title: 'How to become Dark Soldier with a Very Long Title That Might Wrap',
    variant: 'leave',
  },
}

export const ShortDescription: Story = {
  args: {
    ...defaultArgs,
    description: 'Short description',
    variant: 'join',
  },
}
