import { Geist, Geist_Mono } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'

import { TailwindIndicator } from '@/components/tailwind-indicator'
import { ThemeProvider } from '@/components/theme'
import { siteConfig } from '@/config'

import type { Metadata } from 'next'

import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Easy Saas Next',
  description: 'Easy Saas Next',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextTopLoader
          color={siteConfig.topLoaderColor}
          zIndex={51}
          showSpinner={false}
          showForHashAnchor={false}
        />
        <ThemeProvider>{children}</ThemeProvider>

        <TailwindIndicator />
      </body>
    </html>
  )
}
