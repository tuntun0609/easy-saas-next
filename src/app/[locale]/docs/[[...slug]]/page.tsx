import { createRelativeLink } from 'fumadocs-ui/mdx'
import { DocsPage, DocsBody, DocsDescription, DocsTitle } from 'fumadocs-ui/page'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { getLocale, getTranslations } from 'next-intl/server'

import LoginCard from '@/components/blocks/login-card'
import { auth } from '@/lib/auth'
import { defaultMdxComponents, docsSource } from '@/lib/source'

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const locale = await getLocale()
  const params = await props.params
  const page = docsSource.getPage(params.slug, locale)
  const t = await getTranslations('LoginCard')

  if (!page) {
    notFound()
  }

  // 可以在这里写一些权限控制，比如这里只允许登录用户访问私有文档
  if (page.data.private) {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    if (!session) {
      return (
        <div className="flex flex-1 items-center justify-center">
          <LoginCard
            title={t('private')}
            callbackURL={`/${locale}/docs${params.slug && params.slug?.length > 0 ? `/${params.slug?.join('/')}` : ''}`}
          />
        </div>
      )
    }
  }

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
