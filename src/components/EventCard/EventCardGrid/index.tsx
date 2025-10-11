import { EventActionButton } from '@/components/EventCard/EventActionButton'
import { Person } from '@/components/svg/Person'
import clsx from 'clsx'
import { format } from 'date-fns'
import type { EventCardGridProps } from '../types'
import styles from './EventCardGrid.module.scss'

function EventCardGrid({
  title,
  description,
  date,
  author,
  attendees,
  variant,
  onAction,
  className,
}: EventCardGridProps) {
  return (
    <article className={clsx(styles.card, className)}>
      <div className={styles.content}>
        <time className={styles.date}>
          {format(new Date(date), 'MMMM d, yyyy - h:mm aa')}
        </time>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.author}>{author}</p>
        <p className={styles.description}>{description}</p>
      </div>

      <footer className={styles.footer}>
        <div className={styles.attendees}>
          <div className={styles.attendeeIcon} aria-hidden="true">
            <Person />
          </div>
          <span className={styles.attendeeCount}>
            {attendees.current} of {attendees.capacity}
          </span>
        </div>
        <EventActionButton
          variant={variant}
          onAction={onAction}
          className={styles.actionButton}
        />
      </footer>
    </article>
  )
}

export { EventCardGrid }
