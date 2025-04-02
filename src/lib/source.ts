import { loader } from 'fumadocs-core/source'
import { isNil } from 'lodash-es'
import { Locale } from 'next-intl'

import { docs, pages } from '@source'

import { i18nDocsConfig, routing } from './i18n/routing'

export const docsSource = loader({
  i18n: i18nDocsConfig,
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
})

export const getPageSource = (slug: string, locale?: Locale) => {
  const defaultLocale = routing.defaultLocale

  // 找到所有匹配 slug 的页面
  const matchedPages = pages.filter(page => page.slug === slug)

  if (matchedPages.length === 0) {
    return null
  }

  if (locale) {
    // 尝试找到匹配语言的页面
    const localizedPage = matchedPages.find(page => page.lang === locale)
    if (localizedPage) {
      return localizedPage
    }
  }

  // 如果没有找到对应语言的页面，返回默认语言的页面
  return (
    matchedPages.find(page => isNil(page.lang) || page.lang === defaultLocale) || matchedPages[0]
  )
}
