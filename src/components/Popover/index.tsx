'use client'

import { PopoverArrow } from '@/components/Popover/PopoverArrow'
import * as RadixPopover from '@radix-ui/react-popover'
import clsx from 'clsx'
import { type ReactNode } from 'react'
import styles from './Popover.module.scss'

interface PopoverProps {
  trigger: ReactNode
  content: ReactNode
  sideOffset?: number
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

function Popover({
  trigger,
  content,
  sideOffset = 8,
  align = 'center',
  side = 'bottom',
  open = false,
  onOpenChange,
  ...props
}: PopoverProps) {
  return (
    <RadixPopover.Root open={open} onOpenChange={onOpenChange}>
      <RadixPopover.Trigger className={clsx(styles.trigger)}>
        {trigger}
      </RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          className={clsx(styles.content)}
          sideOffset={sideOffset}
          align={align}
          collisionPadding={16}
          side={side}
          {...props}
        >
          <RadixPopover.Arrow asChild>
            <PopoverArrow className={styles.arrow} />
          </RadixPopover.Arrow>
          {content}
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  )
}

export { Popover }
