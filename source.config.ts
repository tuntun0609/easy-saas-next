import { remarkMermaid } from '@theguild/remark-mermaid'
import { remarkAdmonition } from 'fumadocs-core/mdx-plugins'
import { defineDocs, defineConfig, defineCollections } from 'fumadocs-mdx/config'
import { Locale } from 'next-intl'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import { z } from 'zod'

export const docs = defineDocs({
  dir: 'content/docs',
})

export const pages = defineCollections({
  type: 'doc',
  dir: 'content/page',
  schema: z.object({
    slug: z.string(),
    lang: z.custom<Locale>().optional(),
  }),
})

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: 'github-light',
        dark: 'one-dark-pro',
      },
      inline: 'tailing-curly-colon',
    },
    remarkPlugins: defaultPlugins => [
      ...defaultPlugins,
      remarkMath,
      remarkAdmonition,
      remarkMermaid,
    ],
    rehypePlugins: defaultPlugins => [...defaultPlugins, rehypeKatex],
  },
})
