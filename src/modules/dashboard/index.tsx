'use client'

import { useAuth } from '@/providers/AuthProvider'
import { logoutAction } from '@/server/auth/actions'

function Dashboard() {
  const { userData } = useAuth()
  return (
    <div>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
      <button onClick={async () => await logoutAction()}>logout</button>
    </div>
  )
}

export default Dashboard
