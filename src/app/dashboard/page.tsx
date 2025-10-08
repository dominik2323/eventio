import Dashboard from '@/modules/dashboard'
import { getEventsAction } from '@/server/events/actions'
import { Metadata } from 'next'

export const metadata: Metadata = {}

async function Page() {
  const initialEvents = await getEventsAction()

  return <Dashboard initialEvents={initialEvents.data ?? null} />
}

export default Page
