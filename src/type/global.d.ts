import { formats } from '@/lib/i18n/request'
import { routing } from '@/lib/i18n/routing'

import messages from '../../locale/zh.ts'

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
    Messages: typeof messages
    Formats: typeof formats
  }
}
