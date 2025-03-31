import { Book } from 'lucide-react'

import { i18nDocsConfig } from '@/lib/i18n/routing'

import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions = (_locale: string): BaseLayoutProps => ({
  i18n: i18nDocsConfig,
  themeSwitch: {
    mode: 'light-dark-system',
  },
  nav: {
    title: (
      <>
        <Book size={16} />
        Easy SaaS Next
      </>
    ),
  },
  // links: [
  //   {
  //     text: 'Documentation',
  //     url: '/docs',
  //     active: 'nested-url',
  //   },
  // ],
})
