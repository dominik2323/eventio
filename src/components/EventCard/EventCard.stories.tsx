import type { Meta, StoryObj } from '@storybook/nextjs'
import { EventCard } from './index'

const meta: Meta<typeof EventCard> = {
  title: 'Components/EventCard',
  component: EventCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    layout: {
      control: 'radio',
      options: ['grid', 'list'],
    },
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

// Grid Layout Stories
export const GridEdit: Story = {
  args: {
    ...defaultArgs,
    layout: 'grid',
    variant: 'edit',
  },
}

export const GridJoin: Story = {
  args: {
    ...defaultArgs,
    layout: 'grid',
    title: 'Mexican party vol.2',
    description: 'Party in Scrollbar',
    author: 'Matilda Daniels',
    variant: 'join',
  },
}

export const GridLeave: Story = {
  args: {
    ...defaultArgs,
    layout: 'grid',
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

// List Layout Stories
export const ListEdit: Story = {
  args: {
    ...defaultArgs,
    layout: 'list',
    variant: 'edit',
  },
}

export const ListJoin: Story = {
  args: {
    ...defaultArgs,
    layout: 'list',
    title: 'Mexican party vol.2',
    description: 'Party in Scrollbar',
    author: 'Matilda Daniels',
    variant: 'join',
  },
}

export const ListLeave: Story = {
  args: {
    ...defaultArgs,
    layout: 'list',
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

// Comparison Stories
export const AllGridVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.6rem', flexWrap: 'wrap' }}>
      <EventCard {...defaultArgs} layout="grid" variant="edit" />
      <EventCard
        {...defaultArgs}
        layout="grid"
        title="Mexican party vol.2"
        variant="join"
      />
      <EventCard
        {...defaultArgs}
        layout="grid"
        title="How to become Dark Soldier"
        variant="leave"
      />
    </div>
  ),
}

export const AllListVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
      <EventCard {...defaultArgs} layout="list" variant="edit" />
      <EventCard
        {...defaultArgs}
        layout="list"
        title="Mexican party vol.2"
        variant="join"
      />
      <EventCard
        {...defaultArgs}
        layout="list"
        title="How to become Dark Soldier"
        variant="leave"
      />
    </div>
  ),
}

export const LongContentList: Story = {
  args: {
    ...defaultArgs,
    layout: 'list',
    title:
      'How to become Dark Soldier with a Very Long Title That Might Wrap to Multiple Lines',
    description:
      'I will tell you insights about how I became Dark Soldier and share all the secrets that helped me on this journey. This is a much longer description to test truncation.',
    variant: 'leave',
  },
}
