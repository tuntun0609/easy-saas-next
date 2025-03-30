import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import NextTopLoader from 'nextjs-toploader'

import { TailwindIndicator } from '@/components/tailwind-indicator'
import { ThemeProvider } from '@/components/theme'
import { UserProvider } from '@/components/user-provider'
import { siteConfig } from '@/config'
import { routing } from '@/lib/i18n/routing'
import { caveat, geistMono, geistSans } from '@/style/font'

import type { Metadata } from 'next'

import '../../style/globals.css'

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} antialiased`}
      >
        <UserProvider>
          <NextIntlClientProvider>
            <NextTopLoader
              color={siteConfig.topLoaderColor}
              zIndex={51}
              showSpinner={false}
              showForHashAnchor={false}
            />
            <ThemeProvider>
              {children}
              <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(149,119,198,0.3),rgba(255,255,255,0))] dark:hidden"></div>
            </ThemeProvider>
            <TailwindIndicator />
          </NextIntlClientProvider>
        </UserProvider>
      </body>
    </html>
  )
}
