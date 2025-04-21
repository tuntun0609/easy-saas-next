import { formats } from '@/i18n/request.js'
import { routing } from '@/i18n/routing.js'

import messages from '../../locale/zh.json'

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
    Messages: typeof messages
    Formats: typeof formats
  }
}
