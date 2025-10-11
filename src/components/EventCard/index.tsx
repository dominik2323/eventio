import { EventCardGrid } from './EventCardGrid'
import { EventCardList } from './EventCardList'
import type { EventCardProps } from './types'

function EventCard({ layout = 'grid', ...props }: EventCardProps) {
  if (layout === 'list') {
    return <EventCardList {...props} />
  }

  return <EventCardGrid {...props} />
}

export { EventCard }
export type { EventCardProps } from './types'
