'use client'

import { useAuth } from '@/providers/AuthProvider'

function Dashboard() {
  const { userData, logout } = useAuth()

  async function handleFetch() {}

  return (
    <div>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
      <button onClick={logout}>logout</button>
      <button onClick={handleFetch}>fetch</button>
    </div>
  )
}

export default Dashboard
