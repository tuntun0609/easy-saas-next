import { remarkAdmonition } from 'fumadocs-core/mdx-plugins'
import { defineDocs, defineConfig, defineCollections, frontmatterSchema } from 'fumadocs-mdx/config'
import { toString } from 'mdast-util-to-string'
import { Locale } from 'next-intl'
import getReadingTime from 'reading-time'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import { Plugin } from 'unified'
import { z } from 'zod'

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: frontmatterSchema.extend({
      pro: z.boolean().default(false),
    }),
  },
})

export const blog = defineDocs({
  dir: 'content/blog',
  docs: {
    schema: frontmatterSchema.extend({
      date: z.date().optional(),
      cover: z.string().optional(),
      tags: z.array(z.string()).optional(),
      author: z.string().optional(),
    }),
  },
})

export const pages = defineCollections({
  type: 'doc',
  dir: 'content/page',
  schema: z.object({
    slug: z.string(),
    lang: z.custom<Locale>().optional(),
  }),
})

const remarkReadingTime: Plugin = () => {
  return function (tree, { data }) {
    const textOnPage = toString(tree)
    const readingTime = getReadingTime(textOnPage)

    data.minutesRead = readingTime.time
  }
}

export default defineConfig({
  lastModifiedTime: 'git',
  mdxOptions: {
    valueToExport: ['minutesRead'],
    rehypeCodeOptions: {
      themes: {
        light: 'github-light',
        dark: 'one-dark-pro',
      },
      inline: 'tailing-curly-colon',
    },
    remarkPlugins: defaultPlugins => [
      remarkReadingTime,
      remarkMath,
      remarkAdmonition,
      ...defaultPlugins,
    ],
    rehypePlugins: defaultPlugins => [...defaultPlugins, rehypeKatex],
  },
})
