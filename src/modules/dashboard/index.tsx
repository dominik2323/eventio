'use client'

import { useAuth } from '@/providers/AuthProvider'

function Dashboard() {
  const { userData, logout, authFetch } = useAuth()

  async function handleFetch() {
    try {
      const res = await authFetch('/api/events')
      console.log(res)
    } catch (e) {
      console.log('e', e)
    }
  }

  return (
    <div>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
      <button onClick={logout}>logout</button>
      <button onClick={handleFetch}>fetch</button>
    </div>
  )
}

export default Dashboard
