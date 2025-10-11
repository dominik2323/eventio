import { Metadata } from 'next'

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
  return <main>Hello World</main>
}

export default Page
