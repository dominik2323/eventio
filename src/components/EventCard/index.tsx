import { Button } from '@/components/Button'
import { Person } from '@/components/svg/Person'
import clsx from 'clsx'
import styles from './EventCard.module.scss'

interface EventCardProps {
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

function EventCard({
  title,
  description,
  date,
  author,
  attendees,
  variant,
  onAction,
  className,
}: EventCardProps) {
  const getActionButton = () => {
    switch (variant) {
      case 'edit':
        return (
          <Button
            variant="disabled"
            size="sm"
            onClick={onAction}
            className={styles.actionButton}
          >
            EDIT
          </Button>
        )
      case 'join':
        return (
          <Button
            variant="primary"
            size="sm"
            onClick={onAction}
            className={styles.actionButton}
          >
            JOIN
          </Button>
        )
      case 'leave':
        return (
          <Button
            variant="danger"
            size="sm"
            onClick={onAction}
            className={styles.actionButton}
          >
            LEAVE
          </Button>
        )
    }
  }

  return (
    <article className={clsx(styles.card, className)}>
      <div className={styles.content}>
        <time className={styles.date}>{date}</time>
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

        {getActionButton()}
      </footer>
    </article>
  )
}

export { EventCard }
export type { EventCardProps }
