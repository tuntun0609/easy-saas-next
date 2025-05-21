import { Book } from 'lucide-react'
import Link from 'next/link'

import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions = (_locale: string): BaseLayoutProps => ({
  i18n: false,
  themeSwitch: {
    mode: 'light-dark-system',
    enabled: false,
  },
  nav: {
    title: (
      <Link className="flex items-center gap-2" href="/docs">
        <Book size={16} />
        Easy SaaS Next
      </Link>
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
