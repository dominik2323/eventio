import clsx from 'clsx'
import { format } from 'date-fns'
import { EventActionButton } from '../EventActionButton'
import type { EventCardListProps } from '../types'
import styles from './EventCardList.module.scss'

function EventCardList({
  title,
  description,
  date,
  attendees,
  variant,
  onAction,
  className,
}: EventCardListProps) {
  return (
    <article className={clsx(styles.card, className)}>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <time className={styles.date}>
          {format(new Date(date), 'MMMM d, yyyy - h:mm aa')}
        </time>
        <p className={styles.attendees}>
          {attendees.current} of {attendees.capacity}
        </p>
      </div>

      <div className={styles.action}>
        <EventActionButton
          variant={variant}
          onAction={onAction}
          className={styles.actionButton}
        />
      </div>
    </article>
  )
}

export { EventCardList }
