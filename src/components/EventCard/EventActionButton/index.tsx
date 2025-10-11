import { Button } from '@/components/Button'

interface ActionButtonsProps {
  variant: 'edit' | 'join' | 'leave'
  onAction?: () => void
  className?: string
}

function EventActionButton({
  variant,
  onAction,
  className,
}: ActionButtonsProps) {
  if (variant === 'edit') {
    return (
      <Button
        variant="disabled"
        size="sm"
        onClick={onAction}
        className={className}
      >
        EDIT
      </Button>
    )
  }
  if (variant === 'join') {
    return (
      <Button
        variant="primary"
        size="sm"
        onClick={onAction}
        className={className}
      >
        JOIN
      </Button>
    )
  }
  if (variant === 'leave') {
    return (
      <Button
        variant="danger"
        size="sm"
        onClick={onAction}
        className={className}
      >
        LEAVE
      </Button>
    )
  }
  return null
}
export { EventActionButton }
