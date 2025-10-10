import { Hind, Playfair } from 'next/font/google'

export const hind = Hind({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-hind',
})
export const playfair = Playfair({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-playfair',
})
