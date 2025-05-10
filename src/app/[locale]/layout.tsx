import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import NextTopLoader from 'nextjs-toploader'

import { Clarity, GoogleAnalytics, Umami } from '@/components/analytics'
import { TailwindIndicator } from '@/components/blocks/tailwind-indicator'
import { ThemeProvider } from '@/components/theme'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { UserProvider } from '@/components/user-provider'
import { siteConfig } from '@/config'
import { routing } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { caveat, geistMono, geistSans, notoSans } from '@/style/font'

import type { Metadata } from 'next'

import '@/style/globals.css'

export const metadata: Metadata = {
  title: 'Easy Saas Next',
  description: 'Easy Saas Next',
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
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
        className={cn(
          notoSans.variable,
          geistSans.variable,
          geistMono.variable,
          caveat.variable,
          'antialiased'
        )}
        style={{
          fontFamily: 'var(--font-noto-sans)',
        }}
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
              <TooltipProvider>
                {children}
                <Toaster richColors />
              </TooltipProvider>
            </ThemeProvider>
            <TailwindIndicator />
          </NextIntlClientProvider>
        </UserProvider>

        {/* Analytics */}
        <GoogleAnalytics />
        <Umami />
        <Clarity />
      </body>
    </html>
  )
}
