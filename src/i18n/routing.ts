import { I18nConfig } from 'fumadocs-core/i18n'
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'zh'], // 支持的语言
  defaultLocale: 'zh', // 默认语言
  localePrefix: 'as-needed',
})

export const i18nDocsConfig: I18nConfig = {
  languages: routing.locales as unknown as string[],
  defaultLanguage: routing.defaultLocale,
  hideLocale: 'default-locale',
}
