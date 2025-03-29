import { Geist, Geist_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import NextTopLoader from 'nextjs-toploader'

import { TailwindIndicator } from '@/components/tailwind-indicator'
import { ThemeProvider } from '@/components/theme'
import { siteConfig } from '@/config'
import { routing } from '@/lib/i18n/routing'

import type { Metadata } from 'next'

import '../globals.css'

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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider>
          <NextTopLoader
            color={siteConfig.topLoaderColor}
            zIndex={51}
            showSpinner={false}
            showForHashAnchor={false}
          />
          <ThemeProvider>{children}</ThemeProvider>
          <TailwindIndicator />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
