import { createMDX } from 'fumadocs-mdx/next'
import createNextIntlPlugin from 'next-intl/plugin'

import { withMiddlewares } from '@/lib/utils'

import type { NextConfig } from 'next'

// 如果需要，可以在开发环境可以对 fetch 使用代理
const isDev = process.env.NODE_ENV === 'development'

if (isDev && process.env.USE_PROXY === 'true') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('./proxy-setup')
}

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')
const withMDX = createMDX()

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  crossOrigin: 'anonymous',
  images: {
    remotePatterns: [{ hostname: 'image.tuntun.site' }],
  },
}

export default withMiddlewares(nextConfig, [withNextIntl, withMDX])
