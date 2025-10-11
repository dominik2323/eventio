export interface EventCardProps {
  layout?: 'grid' | 'list'
  title: string
  description: string
  date: string
  author: string
  attendees: {
    current: number
    capacity: number
  }
  variant: 'edit' | 'join' | 'leave'
  onAction?: () => void
  className?: string
}

export type EventCardGridProps = Omit<EventCardProps, 'layout'>

export type EventCardListProps = Omit<EventCardProps, 'layout'>
