import { Hind, Playfair } from 'next/font/google'

export const hind = Hind({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-hind',
})

export const playfair = Playfair({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-playfair',
})
