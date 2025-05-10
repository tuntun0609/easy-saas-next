import { Geist, Geist_Mono, Caveat, Noto_Sans } from 'next/font/google'

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

export const notoSans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['latin'],
  preload: false,
})
