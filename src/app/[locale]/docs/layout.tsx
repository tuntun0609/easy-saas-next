import type { ReactNode } from 'react'
import { NextProvider } from 'fumadocs-core/framework/next'
import { I18nProvider } from 'fumadocs-ui/i18n'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { RootProvider } from 'fumadocs-ui/provider'
import { useLocale, useTranslations } from 'next-intl'

import { LocaleSwitch } from '@/components/blocks/locale-switch'
import { UserButton } from '@/components/blocks/user-button'
import ThemeToggle from '@/components/theme/theme-toggle'
import { fumadocsUiTranslations } from '@/i18n/fumadocs-ui-translation'
import { routing } from '@/i18n/routing'
import { docsSource } from '@/lib/source'

import { baseOptions } from './layout.config'

import './fumadocs.css'

export default function Layout({ children }: { children: ReactNode }) {
  const locale = useLocale()
  const t = useTranslations('LocaleSwitch')

  const locales = routing.locales.map(locale => ({
    name: t('locale', { locale }),
    locale,
  }))

  return (
    <NextProvider>
      <I18nProvider locale={locale} locales={locales} translations={fumadocsUiTranslations[locale]}>
        <RootProvider
          theme={{
            attribute: 'class',
            defaultTheme: 'system',
            enableSystem: true,
          }}
        >
          <DocsLayout
            sidebar={{
              prefetch: false,
              footer: (
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <LocaleSwitch />
                    <ThemeToggle />
                  </div>
                  <div className="mt-2 flex w-full items-center">
                    <UserButton size="large" showName />
                  </div>
                </div>
              ),
            }}
            tree={docsSource.pageTree[locale]}
            {...baseOptions(locale)}
          >
            {children}
          </DocsLayout>
        </RootProvider>
      </I18nProvider>
    </NextProvider>
  )
}
