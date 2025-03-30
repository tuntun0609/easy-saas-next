import defaultMdxComponents, { createRelativeLink } from 'fumadocs-ui/mdx'
import { DocsPage, DocsBody, DocsDescription, DocsTitle } from 'fumadocs-ui/page'
import { notFound } from 'next/navigation'
import { getLocale } from 'next-intl/server'

import { source } from '@/lib/source'

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const locale = await getLocale()
  const params = await props.params
  const page = source.getPage(params.slug, locale)
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
            a: createRelativeLink(source, page),
          }}
        />
      </DocsBody>
    </DocsPage>
  )
}

// export async function generateStaticParams() {
//   return source.generateParams()
// }

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  return {
    title: page.data.title,
    description: page.data.description,
  }
}
