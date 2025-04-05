'use client'

import { DocsBody } from 'fumadocs-ui/page'
import { notFound } from 'next/navigation'
import { useLocale } from 'next-intl'

import { defaultMdxComponents, getPageSource } from '@/lib/source'
import { cn } from '@/lib/utils'

import { Mermaid } from '../blocks/mermaid'

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
          Mermaid,
        }}
      />
    </DocsBody>
  )
}

export default SinglePage
