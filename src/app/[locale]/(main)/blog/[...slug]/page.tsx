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
  const page = blogSource.getPage(params.slug, locale)
  const t = await getTranslations('Blog')

  if (!page) {
    notFound()
  }

  const MDXContent = page.data.body

  return (
    <div className="container mx-auto max-w-2xl px-4 py-16">
      <DocsBody>
        <InlineTOC items={page.data.toc}>{t('toc')}</InlineTOC>
        <MDXContent
          components={{
            ...defaultMdxComponents,
            a: createRelativeLink(blogSource, page),
          }}
        />
      </DocsBody>
    </div>
  )
}

export default BlogPage
