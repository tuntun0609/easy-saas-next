'use client'

import { useEffect, useState } from 'react'
import defaultMdxComponents from 'fumadocs-ui/mdx'
import { DocsBody } from 'fumadocs-ui/page'
import { notFound } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useTheme } from 'next-themes'

import { getPageSource } from '@/lib/source'
import { cn } from '@/lib/utils'

import style from './index.module.css'

const SinglePage = ({ slug, className }: { slug: string; className?: string }) => {
  const locale = useLocale()
  const page = getPageSource(slug, locale)
  const { resolvedTheme } = useTheme()
  const [isLight, setIsLight] = useState(false)

  useEffect(() => {
    setIsLight(resolvedTheme === 'light')
  }, [resolvedTheme])

  if (!page) notFound()

  const MDXContent = page.body

  return (
    <DocsBody className={cn(className, isLight && style.singlePage)}>
      <MDXContent
        components={{
          ...defaultMdxComponents,
        }}
      />
    </DocsBody>
  )
}

export default SinglePage
