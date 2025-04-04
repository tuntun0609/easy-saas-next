import { createRelativeLink } from 'fumadocs-ui/mdx'
import { DocsPage, DocsBody, DocsDescription, DocsTitle } from 'fumadocs-ui/page'
import { notFound } from 'next/navigation'
import { getLocale } from 'next-intl/server'

import { defaultMdxComponents, docsSource } from '@/lib/source'

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const locale = await getLocale()
  const params = await props.params
  const page = docsSource.getPage(params.slug, locale)
  if (!page) notFound()

  const MDXContent = page.data.body

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent
          components={{
            ...defaultMdxComponents,
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(docsSource, page),
          }}
        />
      </DocsBody>
    </DocsPage>
  )
}

export async function generateStaticParams() {
  return docsSource.generateParams().map(item => ({
    slug: item.slug,
  }))
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params
  const locale = await getLocale()
  const page = docsSource.getPage(params.slug, locale)
  if (!page) notFound()

  return {
    title: page.data.title,
    description: page.data.description,
  }
}
