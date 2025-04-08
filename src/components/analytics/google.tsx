import { GoogleAnalytics as GoogleAnalyticsScript } from '@next/third-parties/google'

export const GoogleAnalytics = () => {
  const gaId = process.env.GA_ID

  if (process.env.NODE_ENV === 'development') {
    return null
  }

  if (!gaId) {
    return null
  }

  return <GoogleAnalyticsScript gaId={gaId} />
}
