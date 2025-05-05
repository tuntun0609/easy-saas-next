import { eq } from 'drizzle-orm'
import { createRelativeLink } from 'fumadocs-ui/mdx'
import { DocsPage, DocsBody, DocsDescription, DocsTitle } from 'fumadocs-ui/page'
import { headers } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getLocale, getTranslations } from 'next-intl/server'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { db } from '@/db'
import { oneTimePurchase } from '@/db/schema'
import { redirect } from '@/i18n/navigation'
import { auth } from '@/lib/auth'
import { defaultMdxComponents, docsSource } from '@/lib/source'

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const locale = await getLocale()
  const t = await getTranslations('docs')
  const params = await props.params
  const page = docsSource.getPage(params.slug, locale)

  if (!page) {
    notFound()
  }

  // 可以在这里写一些权限控制
  if (page.data.pro) {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      // 重定向到登录页面
      redirect({
        href: {
          pathname: `/${locale}/login`,
          query: {
            callbackURL: `/${locale}/docs${params.slug && params.slug?.length > 0 ? `/${params.slug?.join('/')}` : ''}`,
          },
        },
        locale,
      })
    }

    // 查询用户是否订阅了该产品
    const orders = await db.query.oneTimePurchase.findMany({
      where: session?.user.id ? eq(oneTimePurchase.userId, session.user.id) : undefined,
    })

    if (orders.length === 0) {
      return (
        <DocsPage>
          <Card className="mx-auto mt-8 max-w-2xl">
            <CardHeader>
              <CardTitle>{t('proAccess.title')}</CardTitle>
              <CardDescription>{t('proAccess.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t('proAccess.content')}</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/${locale}/pricing`}>{t('proAccess.buyButton')}</Link>
              </Button>
            </CardFooter>
          </Card>
        </DocsPage>
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
