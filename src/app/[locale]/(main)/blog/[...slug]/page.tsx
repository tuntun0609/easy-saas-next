import dayjs from 'dayjs'
import { InlineTOC } from 'fumadocs-ui/components/inline-toc'
import { createRelativeLink } from 'fumadocs-ui/mdx'
import { DocsBody } from 'fumadocs-ui/page'
import { notFound } from 'next/navigation'
import { getLocale, getTranslations } from 'next-intl/server'

import { blogSource, defaultMdxComponents } from '@/lib/source'

export async function generateStaticParams() {
  return blogSource.generateParams().map(item => ({
    slug: item.slug,
  }))
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params
  const locale = await getLocale()
  const page = blogSource.getPage(params.slug, locale)
  if (!page) notFound()

  return {
    title: page.data.title,
    description: page.data.description,
  }
}

async function BlogPage(props: { params: Promise<{ slug?: string[] }> }) {
  const locale = await getLocale()
  const params = await props.params
  const blog = blogSource.getPage(params.slug, locale)
  const t = await getTranslations('Blog')

  if (!blog) {
    notFound()
  }

  const MDXContent = blog.data.body

  return (
    <div className="container mx-auto max-w-2xl px-4 py-16">
      <DocsBody>
        <div className="bg-background border-primary/80 dark:border-primary/60 mb-8 space-y-1 rounded-lg border px-4 py-6">
          <h1 className="text-primary mb-2 text-center text-3xl font-bold">{blog.data.title}</h1>
          {blog.data.author && (
            <div className="text-center text-sm text-gray-500">
              {t('author')}: {blog.data.author}
            </div>
          )}
          <div className="text-center text-sm text-gray-500">
            {t('date')}:{' '}
            {dayjs(blog.data.date ?? blog.data.lastModified ?? new Date()).format('YYYY-MM-DD')}
          </div>
        </div>
        <InlineTOC items={blog.data.toc}>{t('toc')}</InlineTOC>
        <MDXContent
          components={{
            ...defaultMdxComponents,
            a: createRelativeLink(blogSource, blog),
          }}
        />
      </DocsBody>
    </div>
  )
}

export default BlogPage
