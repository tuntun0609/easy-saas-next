import Script from 'next/script'

export const Umami = () => {
  const umamiBaseUrl = process.env.UMAMI_BASE_URL || 'https://cloud.umami.is/script.js'
  const umamiWebsiteId = process.env.UMAMI_WEBSITE_ID

  if (process.env.NODE_ENV === 'development') {
    return null
  }

  if (!umamiWebsiteId) {
    return null
  }

  return <Script defer src={umamiBaseUrl} data-website-id={umamiWebsiteId} />
}
