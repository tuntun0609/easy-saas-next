import type { ReactNode } from 'react'
import { I18nProvider } from 'fumadocs-ui/i18n'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { RootProvider } from 'fumadocs-ui/provider'
import { useLocale, useTranslations } from 'next-intl'

import { fumadocsUiTranslations } from '@/lib/i18n/fumadocs-ui-translation'
import { routing } from '@/lib/i18n/routing'
import { source } from '@/lib/source'

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
    <I18nProvider locale={locale} locales={locales} translations={fumadocsUiTranslations[locale]}>
      <RootProvider
        theme={{
          attribute: 'class',
          defaultTheme: 'system',
          enableSystem: true,
        }}
      >
        <DocsLayout
          sidebar={{ prefetch: false }}
          tree={source.pageTree[locale]}
          {...baseOptions(locale)}
        >
          {children}
        </DocsLayout>
      </RootProvider>
    </I18nProvider>
  )
}
