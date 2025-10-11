import Dashboard from '@/modules/dashboard'
import { getEventsAction } from '@/server/events/actions'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {}

async function Page() {
  const initialEvents = await getEventsAction()

  if (!initialEvents.data) {
    notFound()
  }

  return <Dashboard initialEvents={initialEvents.data} />
}

export default Page
