import { Hind, Playfair_Display } from 'next/font/google'

export const hind = Hind({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-hind',
})
export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-playfair',
})
