import { createMDX } from 'fumadocs-mdx/next'
import createNextIntlPlugin from 'next-intl/plugin'

import { withMiddlewares } from '@/lib/utils'

import type { NextConfig } from 'next'

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts')
const withMDX = createMDX()

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
}

export default withMiddlewares(nextConfig, [withNextIntl, withMDX])
