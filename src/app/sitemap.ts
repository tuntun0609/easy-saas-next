import { MetadataRoute } from 'next'

import { routing } from '@/i18n/routing'
import { blogSource, docsSource } from '@/lib/source'

// Adapt this as necessary
const host = process.env.BASE_URL || 'http://localhost:3000'

type ChangeFrequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never'
  | undefined

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/pricing', '/login', '/about', '/blog', '/terms']

  const pagesSiteMap = staticPages.flatMap(page => {
    return routing.locales.map(locale => ({
      url: `${host}${locale === routing.defaultLocale ? '' : `/${locale}`}${page}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as ChangeFrequency,
      priority: page === '' ? 1.0 : 0.8,
    }))
  })

  const docsSiteMap = routing.locales.flatMap(locale => {
    const localPages = docsSource.getPages(locale)
    return localPages.map(page => ({
      url: `${host}${page.url}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as ChangeFrequency,
      priority: 0.8,
    }))
  })

  const blogSiteMap = routing.locales.flatMap(locale => {
    const localPages = blogSource.getPages(locale)
    return localPages.map(page => ({
      url: `${host}${page.url}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as ChangeFrequency,
      priority: 0.8,
    }))
  })

  return [...pagesSiteMap, ...docsSiteMap, ...blogSiteMap]
}
