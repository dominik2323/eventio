import { useAuth } from '@/providers/AuthProvider'
import styles from './UserAvatar.module.scss'

function UserAvatar() {
  const { userData } = useAuth()

  return (
    <div className={styles.userAvatar}>
      <span className={styles.initials}>
        {userData?.firstName[0]}
        {userData?.lastName[0]}
      </span>
    </div>
  )
}

export { UserAvatar }
