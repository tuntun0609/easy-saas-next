import type { MetadataRoute } from 'next'

const host = process.env.BASE_URL || 'http://localhost:3000'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/assets/', '*/404', '*/500'],
    },
    sitemap: `${host}/sitemap.xml`,
    host: host,
  }
}
