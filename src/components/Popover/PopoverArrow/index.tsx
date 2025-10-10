interface PopoverArrowProps {
  className?: string
}

function PopoverArrow({ className }: PopoverArrowProps) {
  return (
    <svg
      width="30"
      height="13"
      viewBox="0 0 30 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform="rotate(180)"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.298 0.768555C20.298 0.768555 24.298 12.7686 29.298 12.7686C34.298 12.7686 -3.70197 12.7686 1.29803 12.7686C6.29803 12.7686 10.298 0.768555 15.298 0.768555Z"
        fill="white"
      />
    </svg>
  )
}

export { PopoverArrow }
