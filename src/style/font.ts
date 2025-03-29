import { Geist, Geist_Mono, Caveat } from 'next/font/google'

export const caveat = Caveat({
  variable: '--font-caveat',
  subsets: ['latin'],
  preload: false,
})

export const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  preload: false,
})

export const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  preload: false,
})
