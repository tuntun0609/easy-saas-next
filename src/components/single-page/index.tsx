import { DocsBody } from 'fumadocs-ui/page'
import { notFound } from 'next/navigation'
import { useLocale } from 'next-intl'

import { defaultMdxComponents, getPageSource } from '@/lib/source'
import { cn } from '@/lib/utils'

const SinglePage = ({ slug, className }: { slug: string; className?: string }) => {
  const locale = useLocale()
  const page = getPageSource(slug, locale)

  if (!page) notFound()

  const MDXContent = page.body

  return (
    <DocsBody className={cn(className)}>
      <MDXContent
        components={{
          ...defaultMdxComponents,
        }}
      />
    </DocsBody>
  )
}

export default SinglePage
