import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: {
    template: '%s | Eventio',
    default: 'Eventio',
  },
  description: 'Eventio is an application for managing events.',
  openGraph: {
    title: 'Eventio',
    description: 'Eventio is an application for managing events.',
    images: '/og-image.png',
  },
}

function Page() {
  redirect('/login')
}

export default Page
