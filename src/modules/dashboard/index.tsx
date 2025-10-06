'use client'

import { logoutAction } from '@/server/auth/actions'

function Dashboard() {
  return (
    <div>
      <button onClick={async () => await logoutAction()}>logout</button>
    </div>
  )
}

export default Dashboard
