import { loader } from 'fumadocs-core/source'

import { docs } from '@source'

import { i18nDocsConfig } from './i18n/routing'

// `loader()` also assign a URL to your pages
// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  i18n: i18nDocsConfig,
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
})
